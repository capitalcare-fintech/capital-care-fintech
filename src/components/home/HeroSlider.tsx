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
  autoMs = 5500,
}: {
  slides?: HeroSlide[];
  autoMs?: number;
}) {
  const data = useMemo(() => slides ?? HERO_SLIDES, [slides]);
  const [index, setIndex] = useState(0);
  const directionRef = useRef(1); // 1 = forward, -1 = backward

  const goPrev = () => {
    directionRef.current = -1;
    setIndex((i) => clampIndex(i - 1, data.length));
  };

  const goNext = () => {
    directionRef.current = 1;
    setIndex((i) => clampIndex(i + 1, data.length));
  };

  useEffect(() => {
    if (data.length <= 1) return;

    const id = window.setInterval(() => {
      directionRef.current = 1;
      setIndex((i) => clampIndex(i + 1, data.length));
    }, autoMs);

    return () => window.clearInterval(id);
  }, [autoMs, data.length]);

  const active = data[index] ?? data[0];
  if (!active) return null;

  const direction = directionRef.current;

  const variants = {
    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -60, opacity: 0 }),
  };

  return (
    <section className="w-full px-4 pt-10 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-sky-200/70 bg-linear-to-br from-white via-sky-50 to-cyan-50 shadow-[0_16px_45px_-28px_rgba(14,165,233,0.45)]">
        <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(900px_circle_at_20%_20%,rgba(56,189,248,0.18),transparent_45%),radial-gradient(800px_circle_at_80%_40%,rgba(99,102,241,0.12),transparent_55%),radial-gradient(700px_circle_at_40%_90%,rgba(14,165,233,0.10),transparent_55%)]" />

        {data.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goPrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-900"
            >
              <IconChevron className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={goNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-900"
            >
              <IconChevron className="h-5 w-5 rotate-180" />
            </button>
          </>
        ) : null}

        <div className="relative grid min-h-105 gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:min-h-110 md:p-12">
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
                  <Link
                    href="/credit-score"
                    className="rounded-full border border-sky-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-sky-50"
                  >
                    Check credit score
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white/90 p-4">
              <div className="relative h-52 overflow-hidden rounded-2xl bg-slate-100 md:h-72">
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 38vw"
                  className="object-cover"
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
                      directionRef.current = i > index ? 1 : -1;
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
}
