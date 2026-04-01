import Image from "next/image";
import Link from "next/link";
import { homePartners } from "@/app/partners/partners";

export function Partners() {
  return (
      <div className="p-8 md:p-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Our Partners
          </h2>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Partnering with top financial providers to bring you reliable loan and insurance solutions, all in one place.
          </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {homePartners.map((p) => (
            <div
              key={p.name}
              className="flex flex-col items-center"
            >
              <div className="relative mb-3 h-24 w-full max-w-55 overflow-hidden">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <p className="text-center text-sm font-semibold text-slate-700">
                {p.name}
              </p>
            </div>
          ))}
        </div>
         <div className="flex justify-center pt-12">
          <Link
            href="/partners"
            className="inline-flex rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            View More
          </Link>
         </div>
      </div>
    
  );
}

