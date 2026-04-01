import Image from "next/image";
import type { StaticImageData } from "next/image";
import { insurancePartners, loanPartners } from "./partners";

type PartnerItem = {
	name: string;
	logo: StaticImageData;
};

function PartnerGrid({ items }: { items: PartnerItem[] }) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{items.map((partner) => (
				<article
					key={partner.name}
					className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
					<h2 className="text-sm font-semibold text-slate-800 md:text-base">{partner.name}</h2>
				</article>
			))}
		</div>
	);
}

export default function PartnersPage() {
	return (
		<section className="w-full px-4 py-10 md:px-8 lg:px-12">
			<div className="mx-auto w-full max-w-7xl">
				<div className="mb-10 text-center">
					<h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Our Partners</h1>
					<p className="mt-2 text-sm text-slate-600 md:text-base">
						Trusted financial institutions and insurance providers we work with.
					</p>
				</div>

				<div className="space-y-12">
					<div>
						<div className="mb-5 flex items-center justify-between gap-3">
							<h2 className="text-2xl font-semibold text-slate-900">Loan Partners</h2>
							<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 md:text-sm">
								{loanPartners.length} Partners
							</span>
						</div>
						<PartnerGrid items={loanPartners} />
					</div>

					<div>
						<div className="mb-5 flex items-center justify-between gap-3">
							<h2 className="text-2xl font-semibold text-slate-900">Insurance Partners</h2>
							<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 md:text-sm">
								{insurancePartners.length} Partners
							</span>
						</div>
						<PartnerGrid items={insurancePartners} />
					</div>
				</div>
			</div>
		</section>
	);
}
