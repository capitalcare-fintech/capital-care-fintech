import nodemailer from "nodemailer";
import { buildUserApplicationConfirmationEmail } from "@/lib/mail/template/loan-application-user-email-template";

type SendUserApplicationConfirmationEmailParams = {
  applicationId: string;
  loanTypeLabel: string;
  fullName: string;
  email: string;
  mobile: string;
  panNumber: string;
};

export async function sendUserApplicationConfirmationEmail(
  params: SendUserApplicationConfirmationEmailParams,
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
    from: `"Capital Care Loans" <${process.env.EMAIL_USER}>`,
    to: params.email,
    subject: `Application Confirmed: ${params.applicationId}`,
    html: buildUserApplicationConfirmationEmail({
      applicationId: params.applicationId,
      loanTypeLabel: params.loanTypeLabel,
      fullName: params.fullName,
      email: params.email,
      mobile: params.mobile,
      panNumber: params.panNumber,
    }),
  });
}
