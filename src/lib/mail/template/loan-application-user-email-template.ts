type BuildUserApplicationConfirmationEmailParams = {
  applicationId: string;
  loanTypeLabel: string;
  fullName: string;
  email: string;
  mobile: string;
  panNumber: string;
};

function escapeHtml(input: unknown): string {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildUserApplicationConfirmationEmail(
  params: BuildUserApplicationConfirmationEmailParams,
): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden">
      <div style="padding:20px 24px;background:linear-gradient(135deg, #3b82f6, #1e40af);color:#fff">
        <h2 style="margin:0">Application Received ✓</h2>
        <p style="margin:8px 0 0;font-size:14px;opacity:.9">We have received your ${escapeHtml(
          params.loanTypeLabel,
        )} application</p>
      </div>
      <div style="padding:24px;background:#f8fafc">
        <p style="margin:0 0 16px;font-size:14px;color:#475569">Dear ${escapeHtml(
          params.fullName,
        )},</p>
        <p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.6">
          Thank you for submitting your application. We have received all your documents and information. Our team will review your application and get back to you shortly.
        </p>
        
        <div style="background:#dbeafe;border-left:4px solid #0284c7;padding:12px 16px;margin:16px 0;border-radius:4px">
          <p style="margin:0;font-size:13px;color:#0c4a6e;font-weight:600">Application Details</p>
          <table style="width:100%;margin-top:8px;font-size:13px">
            <tr><td style="color:#0c4a6e;padding:4px 0">Application ID:</td><td style="color:#0c4a6e;font-weight:600">${escapeHtml(
              params.applicationId,
            )}</td></tr>
            <tr><td style="color:#0c4a6e;padding:4px 0">Mobile:</td><td style="color:#0c4a6e">${escapeHtml(
              params.mobile,
            )}</td></tr>
            <tr><td style="color:#0c4a6e;padding:4px 0">Email:</td><td style="color:#0c4a6e">${escapeHtml(
              params.email,
            )}</td></tr>
            <tr><td style="color:#0c4a6e;padding:4px 0">PAN:</td><td style="color:#0c4a6e">${escapeHtml(
              params.panNumber,
            )}</td></tr>
          </table>
        </div>

        <p style="margin:16px 0 8px;font-size:14px;color:#475569;font-weight:600">What's Next?</p>
        <ul style="margin:8px 0;padding-left:20px;font-size:14px;color:#475569;line-height:1.8">
          <li>Our team will review your documents</li>
          <li>We will contact you within 2-3 business days</li>
          <li>Keep this Application ID for reference</li>
        </ul>

        <p style="margin:20px 0 0;font-size:12px;color:#64748b;line-height:1.6">
          Have questions? <a href="mailto:support@capitalcare.in" style="color:#0284c7;text-decoration:none">Contact support</a> or reply to this email.
        </p>
      </div>
      <div style="padding:16px 24px;background:#f1f5f9;font-size:12px;color:#64748b;text-align:center">
        Capital Care Loans | Made with ❤️ for your financial growth
      </div>
    </div>
  `;
}
