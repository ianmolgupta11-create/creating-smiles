import React, { useState, useRef } from 'react';
import { Sparkles, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  treatment: string;
  duration: string;
  clinician: string;
  patientAge: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  keyOutcomes: string[];
}

const CASES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Severe Upper & Lower Crowding with Narrow Arch',
    treatment: 'Invisalign® Clear Aligners',
    duration: '14 Months (28 Trays)',
    clinician: 'Dr. Emma Bowman (Specialist Orthodontist)',
    patientAge: '22-year-old Adult',
    description: 'Patient presented with severe rotational overlap of lower incisors and high upper canine teeth. Using 3D intraoral ClinCheck mapping, dental arches were gently expanded without extracting permanent teeth.',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'Initial Crowded Alignment',
    afterLabel: 'Completed 14-Month Smile',
    keyOutcomes: ['Zero permanent tooth extractions', 'Harmonious broad arch smile curve', 'Fixed lingual retainer bonded for stability']
  },
  {
    id: 'case-2',
    title: 'Class II Deep Overbite & Front Tooth Spacing',
    treatment: 'Clear Ceramic Braces',
    duration: '18 Months',
    clinician: 'Dr. Mark Cordato & Dr. Emma Bowman',
    patientAge: '15-year-old Teenager',
    description: 'Severe 100% deep bite where lower teeth were biting into the palate tissue behind upper incisors. Ceramic aesthetic brackets with nickel-titanium archwires corrected the bite depth and closed anterior diastemas.',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'Initial Deep Overbite',
    afterLabel: 'Balanced Overjet & Bite Fit',
    keyOutcomes: ['Protected palate from traumatic bite', 'Discreet aesthetic ceramic brackets', 'Enhanced lip support and facial symmetry']
  },
  {
    id: 'case-3',
    title: 'Adult Minor Relapse & Professional Whitening',
    treatment: 'Essix Retainer Series & In-Chair Whitening',
    duration: '6 Months',
    clinician: 'Dr. Gabii Starr & Angelina Bodycote',
    patientAge: '34-year-old Adult',
    description: 'Patient wore braces as a teenager but suffered slight lower relapse after misplacing retainers. We re-scanned with our 3D digital scanner, corrected the relapse with a short aligner series, and finished with professional whitening.',
    beforeImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'Relapsed Anterior Enamel',
    afterLabel: 'Brightened & Realigned Smile',
    keyOutcomes: ['Re-aligned within 6 months', '8 shades lighter enamel brightening', 'New custom Vivera-grade retainers provided']
  }
];

export const SmileTransformation: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const activeCase = CASES[activeCaseIndex];

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pct);
  };

  return (
    <section id="cases" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Clinical Results & Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Interactive Smile Transformation Showcase
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Drag the interactive slider to examine real clinical outcomes achieved right here at Creating Great Smiles in Bathurst.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CASES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCaseIndex === idx
                  ? 'bg-[#0f2b48] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              Case {idx + 1}: {item.treatment.split('&')[0]}
            </button>
          ))}
        </div>

        {/* Main Interactive Showcase */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Draggable Slider Container (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center bg-slate-900 select-none">
            <div className="text-center text-xs text-slate-400 mb-3 flex items-center justify-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-sky-400" />
              <span>Drag slider left or right to compare Before & After</span>
            </div>

            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
              className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden cursor-ew-resize touch-none shadow-2xl border border-slate-700"
            >
              {/* After Image (Background) */}
              <img
                src={activeCase.afterImage}
                alt="After Treatment Smile"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-emerald-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm">
                AFTER: {activeCase.afterLabel}
              </div>

              {/* Before Image (Clipped Overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeCase.beforeImage}
                  alt="Before Treatment Smile"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                />
                <div className="absolute bottom-3 left-3 bg-[#0f2b48]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm">
                  BEFORE: {activeCase.beforeLabel}
                </div>
              </div>

              {/* Splitter Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center border-2 border-sky-600">
                  <ArrowLeftRight className="w-4 h-4 text-sky-600" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 mt-3 px-1">
              <span>← Before</span>
              <span className="text-sky-400 font-semibold">{Math.round(sliderPosition)}% View</span>
              <span>After →</span>
            </div>
          </div>

          {/* Case Details: Right Column (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                  {activeCase.treatment}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {activeCase.duration}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#0f2b48]">
                {activeCase.title}
              </h3>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-800">Lead Clinician:</span> {activeCase.clinician}
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Patient Profile:</span> {activeCase.patientAge}
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {activeCase.description}
              </p>

              <div className="mt-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Key Treatment Highlights:
                </span>
                {activeCase.keyOutcomes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href="#booking"
                className="w-full py-3 px-4 rounded-xl bg-[#0f2b48] hover:bg-[#153a60] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>Book Your Smile Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
