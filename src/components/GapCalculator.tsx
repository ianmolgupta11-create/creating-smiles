import React, { useState } from 'react';
import { Calculator, CreditCard, ShieldCheck, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { SERVICES, HEALTH_FUNDS } from '../data/clinicData';

interface GapCalculatorProps {
  onSelectAndBook: (serviceId: string) => void;
}

export const GapCalculator: React.FC<GapCalculatorProps> = ({ onSelectAndBook }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [selectedFundId, setSelectedFundId] = useState<string>(HEALTH_FUNDS[0].id);

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const currentFund = HEALTH_FUNDS.find((f) => f.id === selectedFundId) || HEALTH_FUNDS[0];

  // Calculation
  const standardFee = currentService.guidePrice;
  const rebatePct = currentFund.averageRebatePct;
  const estimatedRebate = Math.round((standardFee * rebatePct) / 100);
  const estimatedGap = Math.max(0, standardFee - estimatedRebate);
  const afterpayFortnightly = (estimatedGap / 4).toFixed(2);

  return (
    <section id="calculator" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transparent Central West Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Treatment & Health Fund Gap Calculator
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Find out your estimated out-of-pocket expenses before you sit in the chair. We process instant HICAPS electronic claims on the spot in our Bathurst practice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: Left Column (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
            {/* Step 1: Treatment Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Select Dental or Orthodontic Treatment
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50 shadow-xs ring-1 ring-sky-500'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                          {service.name}
                        </div>
                        <span className="font-extrabold text-xs text-[#0f2b48] shrink-0 ml-2">
                          ${service.guidePrice}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {service.categoryLabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Health Fund Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Select Your Australian Health Fund / Program
              </label>
              <select
                value={selectedFundId}
                onChange={(e) => setSelectedFundId(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              >
                {HEALTH_FUNDS.map((fund) => (
                  <option key={fund.id} value={fund.id}>
                    {fund.name} — {fund.tier}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>{currentFund.note}</span>
              </p>
            </div>

            {/* Payment methods and badges */}
            <div className="pt-4 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Accepted Payment & Rebate Methods
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
                <span className="px-2.5 py-1 bg-white rounded border border-slate-300">HICAPS Instant</span>
                <span className="px-2.5 py-1 bg-white rounded border border-slate-300">Medicare CDBS</span>
                <span className="px-2.5 py-1 bg-white rounded border border-slate-300">DVA Veterans</span>
                <span className="px-2.5 py-1 bg-white rounded border border-slate-300 text-teal-800 bg-teal-50">Afterpay 4x</span>
                <span className="px-2.5 py-1 bg-white rounded border border-slate-300 text-indigo-800 bg-indigo-50">Zip Pay</span>
                <span className="px-2.5 py-1 bg-white rounded border border-slate-300">SuperCare Access</span>
              </div>
            </div>
          </div>

          {/* Results: Right Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0f2b48] to-sky-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-900/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-sky-800/80">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  Fee Breakdown Estimate
                </span>
                <span className="text-xs bg-sky-800/80 text-sky-200 px-2.5 py-0.5 rounded font-mono">
                  111 Bentinck St
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <span className="text-xs text-sky-300">Selected Treatment:</span>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {currentService.name}
                  </div>
                  <span className="text-xs text-sky-400">
                    Est. Duration: ~{currentService.durationMinutes} mins {currentService.itemCode ? `• ${currentService.itemCode}` : ''}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Standard Clinic Fee:</span>
                    <span className="font-bold text-white">${standardFee}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Estimated Rebate ({rebatePct}%):
                    </span>
                    <span className="font-bold">-${estimatedRebate}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                      Estimated Out-of-Pocket Gap:
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                      ${estimatedGap}
                    </span>
                  </div>
                </div>

                {/* Afterpay breakdown */}
                {estimatedGap > 0 ? (
                  <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-bold text-white">Afterpay Available:</span>
                        <div>4 interest-free fortnightly payments of <strong>${afterpayFortnightly}</strong></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-bold text-white">100% No-Gap / Fully Covered under this schedule!</span>
                  </div>
                )}

                <p className="text-[11px] text-sky-300/80 leading-relaxed">
                  * Rebates vary depending on individual policy extras, waiting periods, and annual limits. Exact gap is calculated in seconds via our in-clinic HICAPS terminal.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-sky-800/80">
              <button
                onClick={() => onSelectAndBook(currentService.id)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book This Treatment Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
