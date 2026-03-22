import Link from "next/link";
import Image from "next/image";
import { IN_DEMAND_LOANS } from "@/lib/homeContent";

const CARD_TONES = [
  {
    shell: "border-emerald-200/40 bg-emerald-50/80",
    title: "text-emerald-800",
    chip: "border-emerald-400/40 text-emerald-700",
  },
  {
    shell: "border-rose-200/40 bg-rose-50/80",
    title: "text-rose-800",
    chip: "border-rose-400/40 text-rose-700",
  },
  {
    shell: "border-indigo-200/40 bg-indigo-50/80",
    title: "text-indigo-800",
    chip: "border-indigo-400/40 text-indigo-700",
  },
  {
    shell: "border-amber-200/40 bg-amber-50/80",
    title: "text-amber-800",
    chip: "border-amber-400/40 text-amber-700",
  },
] as const;

export function InDemandLoans() {
  return (
    <section id="in-demand-loans" className="w-full px-4 pt-14 md:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-sky-700">
            In-demand loans
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Popular picks right now
          </h2>
        </div>
        <Link href="/loans" className="text-sm font-semibold text-sky-700 hover:text-sky-900">
          View all
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {IN_DEMAND_LOANS.map((card, index) => {
          const tone = CARD_TONES[index % CARD_TONES.length];

          return (
          <Link
            key={card.title}
            href={card.href}
            className={[
              "group relative overflow-hidden rounded-3xl border p-4 shadow-sm transition hover:-translate-y-0.5",
              tone.shell,
            ].join(" ")}
          >
            <div className="relative overflow-hidden rounded-2xl bg-white/90 p-2">
            {/* <div className="relative h-40 w-full rounded-xl bg-gray-100 flex items-center justify-center"> */}
              <div className="relative h-40 w-full overflow-hidden rounded-xl">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="relative mt-3">
              <div className="flex items-center justify-between gap-3">
                <div className={["text-2xl font-semibold", tone.title].join(" ")}>{card.title}</div>
                <div className={["rounded-full border bg-white px-2.5 py-1 text-[11px] font-semibold", tone.chip].join(" ")}>
                  Apply now
                </div>
              </div>
              <div className="mt-2 text-sm text-slate-700">{card.subtitle}</div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-600">
                Explore →
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}

