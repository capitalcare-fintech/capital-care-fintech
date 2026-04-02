import termsAndConditons from "@/context/termsAndConditions";

export default function TermsAndConditionsPage() {
  return (
    <main className="w-full overflow-hidden bg-slate-50 text-slate-900">
      <section className="w-full bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_48%,#ffffff_100%)] px-4 py-12 md:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <p className="inline-flex w-fit rounded-full border border-sky-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700 sm:text-xs">
              Legal
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
              {termsAndConditons.title}
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base lg:text-lg">
              Please review these terms before using our website, forms, and service channels.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-12 w-full max-w-6xl  px-5 py-6 md:px-8 md:py-10">
          {termsAndConditons.sections.map((section, index) => (
            <article
              key={section.heading}
              className="border-b border-slate-200 py-7 last:border-b-0 last:pb-0 first:pt-0"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-sky-800 md:text-2xl">{section.heading}</h2>
                  <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">{section.content}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
