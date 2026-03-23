import Link from "next/link";

const TITLES: Record<string, string> = {
  "my-profile": "My Profile",
  "payout-details": "Payout Details",
  "transaction-history": "Transaction History",
  marketing: "Marketing",
  "disbursement-confirmation": "Disbursement Confirmation",
  "digital-card": "Digital Card",
  "view-bill": "View Bill",
  "subpartner-onboarding": "SubPartner Onboarding",
  "utm-link": "UTM Link",
  "subpartners-list": "SubPartner's List",
};

export default async function PartnerDashboardSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = TITLES[slug] ?? slug.replace(/-/g, " ");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="mb-2 text-xl font-bold tracking-tight text-slate-900 capitalize dark:text-slate-100 md:text-2xl">
        {title}
      </h1>
      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        This section is coming soon.
      </p>
      <Link
        href="/partner-dashboard"
        className="text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
      >
        ← Back to DSA Dashboard
      </Link>
    </div>
  );
}
