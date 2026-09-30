import React from 'react';
import { Star, CheckCircle, Quote, ThumbsUp } from 'lucide-react';
import { CLINIC_REVIEWS, CLINIC_INFO } from '../data/clinicData';

export const PatientReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Real Patient Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Loved by Bathurst & Central West Families
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Read what our patients say about Dr. Emma Bowman, Dr. Mark Cordato, Dr. Gabii Starr, Dr. Emily Linn, and our caring dental team.
          </p>

          {/* Rating Summary Card */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-3xl font-black text-slate-900">{CLINIC_INFO.googleRating}</span>
              <div className="flex text-amber-400">
                {'★★★★★'.split('').map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              Based on {CLINIC_INFO.reviewCount}+ Verified Local Reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    {review.treatment}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    <span>{review.author}</span>
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                    )}
                  </div>
                  <span className="text-slate-500">{review.location}</span>
                </div>
                <span className="text-slate-400 text-[11px]">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
