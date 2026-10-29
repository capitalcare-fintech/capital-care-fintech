/**
 * googleSheets.ts
 *
 * Reusable service for sending form submission data to a Google Apps Script
 * Web App, which writes it to Google Sheets.
 *
 * Usage (one line from any API route):
 *   await sendToGoogleSheets({ formType: "Contact", fullName, email, ... });
 *
 * Rules:
 *  - Never throws ÔÇö a Sheets failure must never break the API response.
 *  - Reads the endpoint URL from GOOGLE_SHEETS_WEBHOOK_URL in the environment.
 *  - Logs success/failure with a consistent prefix for easy grep.
 */

export type GoogleSheetsPayload = Record<string, unknown> & {
  /** Identifies which sheet / tab to write to (e.g. "Contact", "LoanLead"). */
  formType: string;
};

/**
 * Sends `payload` to the Google Apps Script Web App via HTTP POST.
 *
 * @returns `true` if the Sheets webhook accepted the request, `false` otherwise.
 *          Errors are swallowed so the caller's success response is unaffected.
 */
export async function sendToGoogleSheets(payload: GoogleSheetsPayload): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    console.warn("[googleSheets] GOOGLE_SHEETS_WEBHOOK_URL is not set ÔÇö skipping.");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        // Attach a server-side timestamp so the sheet always has it,
        // regardless of what the form sends.
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "(unreadable body)");
      console.error(
        `[googleSheets] Webhook returned HTTP ${response.status} for formType="${payload.formType}":`,
        text,
      );
      return false;
    }

    console.log(`[googleSheets] Ô£ô Data sent to Sheets for formType="${payload.formType}"`);
    return true;
  } catch (err) {
    // Network error, DNS failure, timeout, etc. ÔÇö must NOT crash the API.
    console.error(
      `[googleSheets] Failed to send data for formType="${payload.formType}":`,
      err,
    );
    return false;
  }
}
