"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { REVIEWS } from "@/lib/homeContent";
import manIcon from "@/assets/reviews/manIcon.png";
import womanIcon from "@/assets/reviews/womanIcon.png";

// Star Rating Component with decimal support
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const fillPercentage = Math.min(Math.max(rating - i, 0), 1);
          return (
            <div key={i} className="relative h-4 w-4">
              <span className="absolute inset-0 text-base leading-4 text-white">★</span>
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${fillPercentage * 100}%` }}
              >
                <span className="text-base leading-4 text-yellow-400">★</span>
              </div>
            </div>
          );
        })}
      </div>
      <span className="text-xs text-slate-500">(Rating: {rating.toFixed(1)})</span>
    </div>
  );
}

export function Reviews() {
  const [showMore, setShowMore] = useState(false);

  // Sort reviews by rating and select top 6-7 for initial display
  const sortedReviews = useMemo(() => {
    return [...REVIEWS].sort((a, b) => b.rating - a.rating);
  }, []);

  const bestReviews = useMemo(() => sortedReviews.slice(0, 6), [sortedReviews]);
  const additionalReviews = useMemo(() => sortedReviews.slice(6), [sortedReviews]);
  const displayReviews = showMore ? sortedReviews : bestReviews;
  const rotatingReviews = useMemo(
    () => [...displayReviews, ...displayReviews],
    [displayReviews],
  );

  return (
    <section className="relative w-full">
      {/* Top border line */}
      <div className="mt-20 border-t border-slate-200" />

      <div className="w-full px-4 py-8 md:px-6">
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            Reviews
          </h3>
        </div>

        {/* Right-to-left rotating reviews */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="review-track flex w-max gap-6 pb-4">
              {rotatingReviews.map((r, index) => (
                <div
                  key={`${r.name}-${index}`}
                  className="shrink-0 w-80"
                >
                  <figure className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:bg-slate-50">
                    {/* Star Rating */}
                    <StarRating rating={r.rating} />

                    {/* Quote */}
                    <blockquote className="mb-6 min-h-20 text-sm leading-6 text-slate-600">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>

                    {/* Divider */}
                    <div className="mb-4 border-t border-slate-200" />

                    {/* Author with Avatar */}
                    <figcaption className="flex items-center gap-3">
                      <div className="shrink-0 text-slate-500">
                        <Image
                          src={r.gender === "male" ? manIcon : womanIcon}
                          alt={`${r.name} profile icon`}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full border border-slate-200 bg-white object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {r.name}
                        </div>
                        <div className="text-xs text-slate-500">{r.role}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient fade effect on right */}
          <div 
            className="absolute top-0 right-0 w-12 h-full pointer-events-none"
            style={{
              background: "linear-gradient(to left, rgb(244, 249, 255), transparent)",
            }}
          />
        </div>

        {/* See More Button */}
        {!showMore && additionalReviews.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowMore(true)}
              className="rounded-md px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-500/40"
              style={{
                background: "linear-gradient(to right, rgb(37, 99, 235), rgb(34, 211, 238))",
              }}
            >
              See More Reviews
            </button>
          </div>
        )}

        {/* Show Less Button */}
        {showMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowMore(false)}
              className="rounded-md px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-blue-500/40"
              style={{
                background: "linear-gradient(to right, rgb(37, 99, 235), rgb(34, 211, 238))",
              }}
            >
              Show Less
            </button>
          </div>
        )}
      </div>

      {/* Bottom border line */}
      <div className="border-b border-slate-200" />

      {/* CSS for animations */}
      <style>{`
        @keyframes reviewMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .review-track {
          animation: reviewMarquee 45s linear infinite;
        }

        .review-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
