"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HERO_SLIDES, type HeroSlide } from "@/lib/homeContent";

function clampIndex(next: number, len: number) {
  if (len <= 0) return 0;
  return (next + len) % len;
}

function IconChevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12.5 4.5L7.5 10L12.5 15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroSlider({
  slides,
  autoMs = 7000,
}: {
  slides?: HeroSlide[];
  autoMs?: number;
}) {
  const data = useMemo(() => slides ?? HERO_SLIDES, [slides]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goPrev = () => {
    setDirection(-1);
    setIndex((i) => clampIndex(i - 1, data.length));
  };

  const goNext = () => {
    setDirection(1);
    setIndex((i) => clampIndex(i + 1, data.length));
  };

  useEffect(() => {
    if (data.length <= 1) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => clampIndex(i + 1, data.length));
    }, autoMs);
    return () => window.clearInterval(id);
  }, [autoMs, data.length]);

  const active = data[index] ?? data[0];
  if (!active) return null;

  const variants = {
    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -60, opacity: 0 }),
  };

  /*
    Legacy HeroSlider JSX (kept commented intentionally so it can be reused later).
    return (
      <section className="w-full pt-4">
        <div className="relative">
          <div className="pointer-events-none absolute" />

          {data.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={goPrev}
                className="absolute top-1/2 z-10 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-900"
              >
                <IconChevron className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-900"
              >
                <IconChevron className="h-5 w-5 rotate-180" />
              </button>
            </>
          ) : null}

          <div className="relative grid min-h-105 md:grid-cols-[1.1fr_0.9fr] md:min-h-110 px-8 md:px-12">
            <div className="flex flex-col justify-center gap-4 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col gap-4"
                >
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-700">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    {active.eyebrow}
                  </div>
                  <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
                    {active.title}
                  </h1>
                  <p className="max-w-xl text-pretty text-base leading-7 text-slate-600 md:text-lg">
                    {active.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href={active.ctaHref}
                      className="rounded-full bg-linear-to-r from-sky-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110"
                    >
                      {active.ctaLabel}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex-wrap flex-col justify-center gap-4">
              <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white/90 p-4">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 ">
                  <Image
                    src={active.image}
                    alt={active.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 38vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    priority
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Secure</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Fast approval</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Trusted partners</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-sky-100 bg-white/80 px-4 py-3">
                <div className="text-xs font-medium text-slate-500">
                  Slide {Math.min(index + 1, data.length)} of {data.length}
                </div>
                <div className="flex items-center gap-2">
                  {data.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      className={[
                        "h-2.5 w-2.5 rounded-full transition",
                        i === index ? "bg-sky-400" : "bg-slate-300 hover:bg-slate-400",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  */

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#f8fafc_40%,#ffffff_100%)] p-2">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-14 top-10 h-52 w-52 rounded-full bg-sky-200/30 blur-2xl" />
        <div className="absolute -right-14 bottom-8 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-sky-100">
        {data.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goPrev}
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 p-2 text-sky-700 "
            >
              <IconChevron className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={goNext}
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 p-2 text-sky-700 "
            >
              <IconChevron className="h-5 w-5 rotate-180" />
            </button>
          </>
        ) : null}

        <div className="grid min-h-115 md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col gap-5"
              >
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-700">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  {active.eyebrow}
                </div>

                <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  {active.title}
                </h1>

                <p className="max-w-xl text-pretty text-base leading-7 text-sky-800/80 md:text-lg">
                  {active.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href={active.ctaHref}
                    className="rounded-full bg-linear-to-r from-sky-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200 transition hover:brightness-110"
                  >
                    {active.ctaLabel}
                  </Link>
                  {/* <span className="rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sky-700">
                    Cashless Network Hospitals
                  </span> */}
                  {active.advantages && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {active.advantages.map((advantage, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700"
                        >
                          {advantage}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold uppercase tracking-wider text-sky-700/80">
                  <span className="rounded-full border border-sky-200 bg-white px-3 py-1">No hidden charges</span>
                  <span className="rounded-full border border-sky-200 bg-white px-3 py-1">Instant support</span>
                  <span className="rounded-full border border-sky-200 bg-white px-3 py-1">Trusted claims help</span>
                </div> */}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="overflow-hidden rounded-3xl ">
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-sky-100/40">
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                Slide {Math.min(index + 1, data.length)} of {data.length}
              </div>
              <div className="flex items-center gap-2">
                {data.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={[
                      "h-2.5 w-2.5 rounded-full transition",
                      i === index ? "bg-sky-500" : "bg-sky-200 hover:bg-sky-300",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
