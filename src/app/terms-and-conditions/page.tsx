export default function TermsAndConditionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Terms &amp; Conditions</h1>
      <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">Last updated: April 2026</p>

      <div className="prose prose-slate max-w-none dark:prose-invert space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>By accessing or using CapitalCare services, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our platform.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">2. Use of Services</h2>
          <p>You agree to use CapitalCare services only for lawful purposes and in accordance with these terms. You must not misuse, disrupt, or attempt to gain unauthorised access to any part of our platform.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">3. Account Responsibility</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility. Notify us immediately of any unauthorised use.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">4. Privacy Policy</h2>
          <p>Your use of CapitalCare is also governed by our Privacy Policy. We collect and process personal data in accordance with applicable data protection laws.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">5. Financial Information</h2>
          <p>Information provided on this platform is for general informational purposes only and does not constitute financial advice. Always consult a qualified financial advisor before making decisions.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">6. Limitation of Liability</h2>
          <p>CapitalCare shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">7. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">8. Contact</h2>
          <p>For questions about these terms, contact us at <a href="/contact-us" className="text-sky-600 hover:underline">our contact page</a>.</p>
        </section>
      </div>
    </div>
  );
}
