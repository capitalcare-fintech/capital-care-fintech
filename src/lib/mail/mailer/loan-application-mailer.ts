import nodemailer from "nodemailer";
import { buildLoanApplicationEmailTemplate } from "@/lib/mail/template/loan-application-mail-template";

type SendLoanApplicationAdminEmailParams = {
  applicationId: string;
  loanTypeLabel: string;
  loanSubtype: string;
  fullName: string;
  email: string;
  mobile: string;
  formData: Record<string, unknown>;
  files: Array<{ key: string; file: File }>;
};

export async function sendLoanApplicationAdminEmail(
  params: SendLoanApplicationAdminEmailParams,
): Promise<void> {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const attachments = await Promise.all(
    params.files.map(async ({ key, file }) => ({
      filename: `${key}-${file.name}`,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    })),
  );

  await transporter.sendMail({
    from: `"Capital Care Loans" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL ?? process.env.EMAIL_USER,
    subject: `New ${params.loanTypeLabel} Application: ${params.fullName}`,
    html: buildLoanApplicationEmailTemplate({
      applicationId: params.applicationId,
      loanTypeLabel: params.loanTypeLabel,
      loanSubtype: params.loanSubtype,
      fullName: params.fullName,
      email: params.email,
      mobile: params.mobile,
      formData: params.formData,
    }),
    attachments,
  });
}
