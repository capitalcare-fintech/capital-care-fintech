import Image from "next/image";
import Link from "next/link";
import teamMemberA from "@/assets/reviews/manIcon.png";
import teamMemberB from "@/assets/reviews/womanIcon.png";
import { aboutUs, mission, whyCapitalCare } from "./content";

const team = [
  {
    name: "Aarav Malhotra",
    role: "Founder & CEO",
    image: teamMemberA,
  },
  {
    name: "Naina Sethi",
    role: "Chief Marketing Officer",
    image: teamMemberB,
  },
  {
    name: "Rajat Khanna",
    role: "Chief Financial Officer",
    image: teamMemberA,
  },
];

export default function AboutUsPage() {
  return (
    <section className="w-full">
      <div className="relative bg-white px-4 py-12 md:px-6 md:py-14">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(900px_circle_at_88%_8%,rgba(56,189,248,0.14),transparent_45%)]" />
        <div className="relative mx-auto w-full max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">About</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-sky-900 md:text-4xl">
            {aboutUs.title}
          </h1>
          <div className="mt-6 max-w-5xl space-y-4 text-[15px] leading-7 text-slate-700">
            {aboutUs.description
              .split("\n\n")
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>
        </div>
      </div>

      {/* <div className="bg-linear-to-r from-cyan-500 to-blue-800 px-4 py-12 text-white md:px-6 md:py-14">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Our Vision</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-cyan-50 md:text-base">
              Capital Care has been built with the vision of creating a financially stable and
              aware society where loans are understood as planned decisions. We are reshaping
              how people view money growth and helping customers take the right step at the
              right time with confidence.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-3xl border border-white/25 bg-white/10 p-3 backdrop-blur-sm">
            <div className="relative h-56 overflow-hidden rounded-2xl md:h-60">
              <Image
                src={visionImage}
                alt="Capital Care vision"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-linear-to-r from-cyan-500 to-blue-800 px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white/95 px-5 py-5 text-center shadow-sm md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-sky-900">
              Faces of <span className="text-cyan-500">Capital Care</span>
            </h2>
            <p className="mt-1 text-sm text-slate-600">Meet the minds behind our success</p>
          </div>

          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(260px,320px))] justify-center gap-6">
            {team.map((member) => (
              <article key={member.name} className="text-center text-white">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <div className="relative h-64 overflow-hidden rounded-xl bg-white/90">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight">{member.name}</h3>
                <p className="text-sm font-medium text-cyan-100">{member.role}</p>

                <div className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white text-blue-900">
                  <span className="text-sm font-bold">in</span>
                </div>

                <div className="mt-5">
                  <Link
                    href="/contact-us"
                    className="inline-flex rounded-full border border-cyan-200 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-12 md:px-6 md:py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-6">
            <h3 className="text-xl font-bold text-sky-900">Our Mission</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {mission.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-6">
            <h3 className="text-xl font-bold text-sky-900">Why Choose Capital Care</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {whyCapitalCare.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
