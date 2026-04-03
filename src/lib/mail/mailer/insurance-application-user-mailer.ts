import nodemailer from "nodemailer";
import { buildUserInsuranceApplicationConfirmationEmail } from "@/lib/mail/template/insurance-application-user-email-template";

type SendUserInsuranceApplicationConfirmationEmailParams = {
  applicationId: string;
  insuranceTypeLabel: string;
  fullName: string;
  email: string;
  mobile: string;
};

export async function sendUserInsuranceApplicationConfirmationEmail(
  params: SendUserInsuranceApplicationConfirmationEmailParams,
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

  await transporter.sendMail({
    from: `"Capital Care Insurance" <${process.env.EMAIL_USER}>`,
    to: params.email,
    subject: `Application Confirmed: ${params.applicationId}`,
    html: buildUserInsuranceApplicationConfirmationEmail({
      applicationId: params.applicationId,
      insuranceTypeLabel: params.insuranceTypeLabel,
      fullName: params.fullName,
      email: params.email,
      mobile: params.mobile,
    }),
  });
}
