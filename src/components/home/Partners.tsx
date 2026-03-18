import { PARTNERS } from "@/lib/homeContent";

export function Partners() {
  return (
      <div className="rounded-3xl p-8 md:p-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Partners
          </h2>
          <div className="text-sm font-medium text-slate-500">
            Placeholder list — swap with real partner logos later.
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm font-semibold text-slate-700"
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>
    
  );
}

