type BuildLoanApplicationEmailTemplateParams = {
  applicationId: string;
  loanTypeLabel: string;
  loanSubtype: string;
  fullName: string;
  email: string;
  mobile: string;
  formData: Record<string, unknown>;
};

function escapeHtml(input: unknown): string {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildLoanApplicationEmailTemplate(
  params: BuildLoanApplicationEmailTemplateParams,
): string {
  const rows = Object.entries(params.formData)
    .filter(([, value]) => value !== "" && value !== null && value !== undefined)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 0;color:#64748b;width:180px">${escapeHtml(
          key,
        )}</td><td style="padding:6px 0;color:#0f172a">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden">
      <div style="padding:18px 22px;background:#0f172a;color:#fff">
        <h2 style="margin:0">Loan Application Submitted</h2>
        <p style="margin:8px 0 0;opacity:.85">Application ID: ${escapeHtml(
          params.applicationId,
        )}</p>
      </div>
      <div style="padding:18px 22px;background:#f8fafc">
        <p><strong>Loan:</strong> ${escapeHtml(params.loanTypeLabel)} (${escapeHtml(
          params.loanSubtype,
        )})</p>
        <p><strong>Applicant:</strong> ${escapeHtml(params.fullName)} | ${escapeHtml(
          params.mobile,
        )} | ${escapeHtml(params.email)}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:8px">${rows}</table>
      </div>
    </div>
  `;
}
