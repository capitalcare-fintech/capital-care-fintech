import nodemailer from "nodemailer";
import { buildInsuranceApplicationEmailTemplate } from "@/lib/mail/template/insurance-application-mail-template";

type SendInsuranceApplicationAdminEmailParams = {
  applicationId: string;
  insuranceTypeLabel: string;
  fullName: string;
  email: string;
  mobile: string;
  formData: Record<string, unknown>;
  files: Array<{ key: string; file: File }>;
};

export async function sendInsuranceApplicationAdminEmail(
  params: SendInsuranceApplicationAdminEmailParams,
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
    from: `"Capital Care Insurance" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL ?? process.env.EMAIL_USER,
    subject: `New ${params.insuranceTypeLabel} Application: ${params.fullName}`,
    html: buildInsuranceApplicationEmailTemplate({
      applicationId: params.applicationId,
      insuranceTypeLabel: params.insuranceTypeLabel,
      fullName: params.fullName,
      email: params.email,
      mobile: params.mobile,
      formData: params.formData,
    }),
    attachments,
  });
}
