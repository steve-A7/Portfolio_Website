import React from 'react';
import { ArrowLeft, ExternalLink, GraduationCap, ZoomIn } from 'lucide-react';
import type { PageRoute, PortfolioData } from '../data/portfolioData';
import type { LightboxItem } from './LightboxModal';
import { TemplateMediaFrame } from './TemplateVisuals';

interface EducationPageProps {
  data: PortfolioData;
  onNavigate: (route: PageRoute) => void;
  onOpenLightbox: (item: LightboxItem) => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({
  data,
  onNavigate,
  onOpenLightbox,
}) => {
  return (
    <div className="w-full bg-[#0D0F12]">
      {/* Banner Header with Education Backdrop */}
      <section className="relative bg-[#0D0F12] border-b border-white/10 py-14 sm:py-18 px-6 overflow-hidden">
        {data.educationBannerBackdropSrc.trim() && (
          <img
            src={data.educationBannerBackdropSrc}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0D0F12]/50 via-[#0D0F12]/55 to-[#0D0F12]/80"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="inline-block rounded-xl bg-[#12151A]/85 border border-white/15 px-4 py-2 mb-6">
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 font-rajdhani text-sm font-semibold text-zinc-200 hover:text-[#E5A93C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to About Me</span>
            </button>
          </div>
          <div className="text-center rounded-2xl bg-[#12151A]/85 border border-white/15 py-6 px-6 max-w-3xl mx-auto shadow-xl">
            <h1 className="font-cursive text-4xl sm:text-5xl font-bold text-[#F4F4F5]">
              Education
            </h1>
          </div>
        </div>
      </section>

      {/* Institution-Specific Campus Backgrounds Visible Around Floating Dark Content Cards */}
      <div>
        {data.education.map((edu, index) => {
          const isEven = index % 2 === 0;
          return (
            <section
              key={edu.id}
              className="relative border-b border-white/10 py-14 sm:py-20 px-4 sm:px-10 overflow-hidden bg-[#111419]"
            >
              {edu.rowBackdropSrc && (
                <img
                  src={edu.rowBackdropSrc}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-[#0D0F12]/45 via-[#0D0F12]/35 to-[#0D0F12]/60"
              />

              <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                <div
                  className={`lg:col-span-6 rounded-2xl bg-[#12151A]/90 border border-white/15 p-6 sm:p-8 shadow-2xl space-y-3 ${
                    isEven ? 'lg:order-1' : 'lg:order-2 lg:text-right'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 font-rajdhani text-xs font-bold uppercase tracking-[0.16em] text-[#E5A93C] ${
                      isEven ? '' : 'lg:justify-end'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>{edu.status}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{edu.year}</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl text-[#F4F4F5]">
                    {edu.degree}
                  </h2>

                  <p className="font-garamond text-xl font-semibold text-[#E5A93C]">{edu.field}</p>

                  <p className="font-lora text-base text-zinc-200">{edu.institution}</p>

                  <p className="text-sm font-mono text-[#E5A93C] tabular-nums pt-1">
                    {edu.result}
                  </p>
                  <p className="font-rajdhani text-xs text-zinc-400">{edu.details}</p>

                  {edu.pdfUrl && (
                    <div className={`pt-2 ${isEven ? '' : 'lg:flex lg:justify-end'}`}>
                      <a
                        href={edu.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-rajdhani text-xs font-bold uppercase tracking-wider text-[#E5A93C] hover:underline"
                      >
                        <span>Open Official PDF</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLightbox({
                        title: `${edu.degree} — ${edu.institution}`,
                        subtitle: `${edu.field} · ${edu.result}`,
                        meta: edu.year,
                        src: edu.certificateSrc,
                        variant: 'education',
                        recommendedPath: edu.recommendedPath,
                        badgeText: edu.status,
                        pdfUrl: edu.pdfUrl,
                      })
                    }
                    className="group relative w-full text-left rounded-2xl overflow-hidden border border-white/20 hover:border-[#E5A93C] bg-[#0D0F12]/95 shadow-2xl transition-colors focus-visible:outline-2 focus-visible:outline-[#E5A93C]"
                  >
                    <div className="aspect-[16/11] w-full overflow-hidden bg-[#0A0C0F]">
                      <TemplateMediaFrame
                        src={edu.certificateSrc}
                        alt={`${edu.degree} certificate`}
                        variant="education"
                        title={edu.degree}
                        subtitle={`${edu.institution} · ${edu.result}`}
                        badgeText={edu.status}
                        recommendedPath={edu.recommendedPath}
                        className="w-full h-full group-hover:scale-[1.015] transition-transform duration-200"
                        imgClassName="object-contain bg-[#0A0C0F]"
                      />
                    </div>
                    <div className="px-4 py-2.5 bg-[#0D0F12] border-t border-white/10 flex items-center justify-between font-rajdhani text-xs text-zinc-300 group-hover:text-[#E5A93C] transition-colors">
                      <span>Click to view in fullscreen </span>
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
