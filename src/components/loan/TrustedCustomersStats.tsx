"use client";

import { FaStar, FaUniversity, FaUsers } from "react-icons/fa";

export function TrustedCustomersStats() {
	return (
		<div className="px-4 py-5 sm:px-5">
			<div className="grid gap-3 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
				<div className=" flex px-4 py-4 sm:col-span-2 lg:col-span-1 items-center">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 md:text-sm">Trusted by our customers</p>
				</div>
				<div className="rounded-xl bg-slate-50 px-4 py-4">
					<p className="inline-flex items-center justify-center gap-2 text-lg font-bold text-slate-900 md:text-2xl">
						<FaStar className="text-sky-700" />4.8
					</p>
					<p className="text-sm text-slate-600 md:text-base">5 Rating</p>
				</div>
				<div className="rounded-xl bg-slate-50 px-4 py-4">
					<p className="inline-flex items-center justify-center gap-2 text-lg font-bold text-slate-900 md:text-2xl">
						<FaUsers className="text-sky-700" />2K+
					</p>
					<p className="text-sm text-slate-600 md:text-base">Happy Customers</p>
				</div>
				<div className="rounded-xl bg-slate-50 px-4 py-4">
					<p className="inline-flex items-center justify-center gap-2 text-lg font-bold text-slate-900 md:text-2xl">
						<FaUniversity className="text-sky-700" />120+
					</p>
					<p className="text-sm text-slate-600 md:text-base">Banks & NBFCs</p>
				</div>
			</div>
		</div>
	);
}