# Capital Care Loan Application System - Documentation

## Overview

This is a **unified, production-ready loan application system** handling three loan types (Personal Loan, Business Loan, Loan Against Property) through a single API with config-driven validation and dual email notifications.

### Key Features

- ✅ **One Unified API** - All loan types processed through single endpoint
- ✅ **Config-Driven Validation** - Add new loan types without backend changes
- ✅ **Type-Safe Forms** - TypeScript discriminated unions ensure correct fields per loan type
- ✅ **Dual Email Notifications** - Admin gets complete details, user gets confirmation
- ✅ **Document Storage** - In-memory mock, easily swappable to S3/cloud
- ✅ **Audit Trail** - MySQL schema includes user tracking, rejection reasons, admin notes
- ✅ **Console Logging** - Detailed request tracing for debugging
- ✅ **Error Handling** - Comprehensive field-level validation feedback

---

## Architecture

### API Flow

```
User Form Submit
    ↓
FormData Payload
    ↓
POST /api/loan-applications
    ├─ Parse & Extract (FormData → JSON)
    ├─ Config Lookup (match loan type + subtype)
    ├─ Validation (required fields + documents + formats)
    ├─ ❌ If invalid → Return fieldErrors (400)
    ├─ ✅ If valid → Continue
    ├─ Generate applicationId (LA-{timestamp}-{random})
    ├─ Store Documents (in-memory, attach metadata)
    ├─ Insert to MySQL
    ├─ Send Admin Email (full details + attachments)
    ├─ Send User Email (confirmation only)
    └─ Return applicationId + status (201)
```

### File Structure

```
src/
├── lib/
│   ├── loan-application-config.ts          ← Config: loan types, subtypes, fields
│   ├── loan-application-mail-template.ts   ← HTML template for admin email
│   ├── loan-application-mailer.ts          ← Send admin email via nodemailer
│   ├── loan-application-user-email-template.ts  ← HTML template for user email
│   ├── loan-application-user-mailer.ts     ← Send user email via nodemailer
│   └── db.ts                                 ← MySQL connection pool
├── app/
│   ├── api/loan-applications/
│   │   ├── route.ts                         ← POST /submit | GET /list
│   │   ├── [id]/route.ts                    ← GET /detail
│   │   └── [id]/status/route.ts             ← PATCH /update-status
│   └── loans/
│       ├── personal-loan/apply/page.tsx     ← User form (7 steps)
│       ├── business-loan/apply/page.tsx     ← User form (7 steps)
│       └── loan-against-property/apply/page.tsx ← User form (7 steps)
└── assets/                                   ← Images, logos
```

---

## Quick Start

### Prerequisites

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values:
# - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
# - EMAIL_USER, EMAIL_PASS
# - ADMIN_EMAIL
```

### Start Development Server

```bash
npm run dev
# Server runs on http://localhost:3000
```

### Test Application Submission

```bash
curl -X POST http://localhost:3000/api/loan-applications \
  -H "Content-Type: multipart/form-data" \
  -F "loanType=personal-loan" \
  -F "loanSubtype=salaried" \
  -F "formData={\"fullName\":\"John\",\"email\":\"john@example.com\",\"mobile\":\"9876543210\",\"panNumber\":\"ABCDE1234F\"}" \
  -F "salary_slip=@path/to/file.pdf" \
  -F "bank_statement=@path/to/file.pdf"
```

<details><summary>Sample Response</summary>

```json
{
  "success": true,
  "data": {
    "applicationId": "LA-1708956123456-ABCDE",
    "status": "submitted",
    "message": "Application submitted successfully"
  }
}
```

</details>

---

## Configuration Reference

### Loan Types & Subtypes

Edit `src/lib/loan-application-config.ts`:

```typescript
LOAN_APPLICATION_CONFIG = {
  "personal-loan": {
    label: "Personal Loan",
    subtypes: {
      "salaried": {
        requiredFields: ["fullName", "email", "mobile", "panNumber", "employmentType", "company", "grossSalary"],
        requiredDocs: ["salary_slip", "bank_statement", "aadhar_card", "pan_card"]
      },
      "self-employed": { ... }
    }
  },
  "business-loan": { ... },
  "loan-against-property": { ... }
}
```

**Adding New Loan Type:** Just add new entry to config. No API changes needed!

---

## Environment Variables

See [.env.example](.env.example) for full list:

```
# Database
DB_HOST=localhost           # MySQL host
DB_USER=root               # MySQL user
DB_NAME=capital_care       # Database name
DB_PASSWORD=password       # MySQL password

# Email (Gmail)
EMAIL_USER=email@gmail.com                 # Gmail account
EMAIL_PASS=xxxx xxxx xxxx xxxx            # App-specific password (16 chars)
ADMIN_EMAIL=admin@company.com             # Receives applications

# Email (Future: Resend)
# RESEND_API_KEY=re_xxxxx                 # Will replace Gmail
```

**Generate Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" + "Windows Computer"
3. Copy 16-character password
4. Paste into EMAIL_PASS

---

## Database Schema

### Loan Applications Table

```sql
CREATE TABLE loan_applications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  application_id VARCHAR(40) NOT NULL UNIQUE,    -- LA-{timestamp}-{random}
  user_id VARCHAR(36) NULL,                       -- Future: links to user account
  loan_type VARCHAR(60) NOT NULL,                 -- personal-loan,business-loan,loan-against-property
  loan_subtype VARCHAR(80) NOT NULL,              -- salaried,self-employed,etc
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  status ENUM(...) DEFAULT 'submitted',          -- submitted,in_review,approved,rejected
  status_note TEXT NULL,
  rejection_reason TEXT NULL,                    -- Why rejected (audit)
  internal_notes TEXT NULL,                      -- Admin notes
  reviewed_by VARCHAR(36) NULL,                  -- Which admin (future: links to users table)
  form_data LONGTEXT NOT NULL,                   -- All form fields as JSON
  documents_metadata LONGTEXT NOT NULL,           -- Document info + storage keys as JSON
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  
  INDEX idx_user_id (user_id),
  INDEX idx_loan_type (loan_type),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

---

## API Reference

### POST /api/loan-applications - Submit Application

**Request (FormData):**

```javascript
const formData = new FormData();
formData.append("loanType", "personal-loan");
formData.append("loanSubtype", "salaried");
formData.append("formData", JSON.stringify({
  fullName: "John Doe",
  email: "john@example.com",
  mobile: "9876543210",
  panNumber: "ABCDE1234F",
  employmentType: "full-time",
  company: "TechCorp",
  grossSalary: "500000"
}));
formData.append("salary_slip", salarySlipFile);
formData.append("bank_statement", bankStatementFile);

const response = await fetch("/api/loan-applications", {
  method: "POST",
  body: formData
});
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "applicationId": "LA-1708956123456-ABCDE",
    "status": "submitted",
    "message": "Application submitted successfully"
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "error": "Validation failed",
  "fieldErrors": {
    "panNumber": ["Invalid PAN format"],
    "salary_slip": ["Required document missing"]
  }
}
```

### GET /api/loan-applications - List Applications

**Query Parameters:**

```
?status=submitted                    -- Optional: submitted,in_review,approved,rejected
&loanType=personal-loan             -- Optional: personal-loan,business-loan,loan-against-property
&loanSubtype=salaried               -- Optional
&page=1                              -- Page number (default: 1)
&limit=20                            -- Items per page (max: 100)
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "application_id": "LA-1708956123456-ABCDE",
        "loan_type": "personal-loan",
        "full_name": "John Doe",
        "status": "submitted",
        "form_data": { ... },
        "documents_metadata": { ... },
        "created_at": "2024-02-26T10:30:45.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 153,
      "hasMore": true
    }
  }
}
```

### GET /api/loan-applications/[id] - Get Detail

**Response:**

```json
{
  "success": true,
  "data": {
    "application_id": "LA-1708956123456-ABCDE",
    "full_name": "John Doe",
    "form_data": { /* all submitted fields */ },
    "documents_metadata": { /* with storage keys */ },
    ...
  }
}
```

### PATCH /api/loan-applications/[id]/status - Update Status

**Request:**

```json
{
  "status": "approved",
  "note": "All documents verified and submitted to underwriting"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "application_id": "LA-1708956123456-ABCDE",
    "status": "approved",
    "reviewed_at": "2024-02-26T11:45:00.000Z"
  }
}
```

---

## Console Logging Output

The system logs detailed request flow for debugging:

```
[POST /api/loan-applications] ✅ Request received
[POST /api/loan-applications] 📋 Form parsed {loanType: "personal-loan", loanSubtype: "salaried", hasFormData: true}
[POST /api/loan-applications] 📎 Files extracted {count: 2, names: ["salary_slip.pdf", "bank_statement.pdf"]}
[POST /api/loan-applications] ✅ All validations passed
[POST /api/loan-applications] 💾 Inserting application {applicationId: "LA-1708956123456-ABCDE", loanType: "personal-loan", ...}
[POST /api/loan-applications] ✅ Application inserted to DB {applicationId: "LA-1708956123456-ABCDE"}
[POST /api/loan-applications] 📧 Sending admin email
[POST /api/loan-applications] ✅ Admin email sent
[POST /api/loan-applications] 📧 Sending user confirmation email
[POST /api/loan-applications] ✅ User confirmation email sent
[POST /api/loan-applications] 🎉 Request completed successfully {applicationId: "LA-1708956123456-ABCDE"}
```

**Debug:** Check browser DevTools console or server terminal output to trace application flow.

---

## Email Templates

### Admin Email

**Contains:**
- Full form data table
- All uploaded documents (PDF/JPG/PNG attachments)
- Application ID (for reference)
- Loan type & subtype info
- Timestamps

**To:** ADMIN_EMAIL environment variable

### User Confirmation Email

**Contains:**
- Confirmation message
- Application ID (for reference)
- Submitted mobile & email
- PAN number
- Next steps information
- Support contact

**To:** User's email address from form

---

## Scaling & Extension

### Add New Loan Type

See [SCALING_GUIDE.md](SCALING_GUIDE.md#adding-new-loan-categories)

1. Edit `src/lib/loan-application-config.ts` 
2. Create frontend apply page (copy from personal-loan)
3. Done! No backend changes needed

### Replace Email Provider

See [SCALING_GUIDE.md](SCALING_GUIDE.md#email-provider-swap---resend)

Change from Gmail → Resend (or SendGrid, etc.):
1. Create new mailer file (e.g., `loan-application-resend-mailer.ts`)
2. Update route import
3. Done! API unchanged

### Use Cloud Storage (S3)

See [SCALING_GUIDE.md](SCALING_GUIDE.md#cloud-storage-adapter-pattern)

1. Create `S3DocumentStorage` class implementing interface
2. Update route to use new storage provider
3. Done! Rest of logic unchanged

---

## Troubleshooting

### Application Not Submitting

**Check console logs:**
```
[POST /api/loan-applications] ❌ Error: ...
```

**Common Issues:**
- Missing required field in formData
- Document file type not PDF/JPG/PNG
- Email format invalid (must be email@domain.com)
- Mobile not 10 digits

### Emails Not Sending

**Verify environment variables:**
```bash
# In .env.local
echo $EMAIL_USER      # Should be gmail account
echo $EMAIL_PASS      # Should be 16-character app password
echo $ADMIN_EMAIL     # Should be valid email
```

**Gmail app password:**
- 2FA must be enabled on Gmail account
- Generate at https://myaccount.google.com/apppasswords
- Select "Mail" + "Windows Computer"

**Database Connection Error:**

```sql
-- Test connection
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD
USE capital_care;
SELECT * FROM loan_applications LIMIT 1;
```

---

## Production Checklist

- [ ] All environment variables set in `.env`
- [ ] Database backed up before deployment
- [ ] Gmail 2FA enabled and app password generated
- [ ] SSL certificate installed for HTTPS
- [ ] Document storage upgraded from memory to S3 (or other persistent storage)
- [ ] Admin email list updated for new loan types
- [ ] Rate limiting configured on API endpoints
- [ ] Error monitoring set up (e.g., Sentry)
- [ ] User authentication integrated (for user_id field)
- [ ] Email service monitoring enabled

---

## Support

For adding new features or loan types, see [SCALING_GUIDE.md](SCALING_GUIDE.md)

For component changes, see individual page/component files
