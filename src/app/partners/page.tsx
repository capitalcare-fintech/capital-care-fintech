import Image from "next/image";
import { partners } from "./partners";

export default function PartnersPage() {
	return (
		<section className="w-full px-4 py-10 md:px-8 lg:px-12">
			<div className="mx-auto w-full max-w-7xl">
				<div className="mb-8 flex items-end justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
							Our Partners
						</h1>
						<p className="mt-2 text-sm text-slate-600 md:text-base">
							Trusted banks and insurance partners we work with.
						</p>
					</div>
					<span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
						{partners.length} partners
					</span>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{partners.map((partner) => (
						<article
							key={partner.name}
							className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md text-center"
						>
							<div className="relative mb-4 h-20 w-full overflow-hidden rounded-lg bg-slate-50">
								<Image
									src={partner.logo}
									alt={partner.name}
									fill
									className="object-contain p-2"
									sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
								/>
							</div>
							<h2 className="text-sm font-semibold text-slate-800 md:text-base">
								{partner.name}
							</h2>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
