import React from 'react';
import { GraduationCap } from 'lucide-react';
import type { PortfolioData } from '../data/portfolioData';
import {
  BotanicalLeafCluster,
  HorizontalStripeAccent,
  TemplateMediaFrame,
} from './TemplateVisuals';

interface HomePageProps {
  data: PortfolioData;
}

export const HomePage: React.FC<HomePageProps> = ({ data }) => {
  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Hero Section: 6518625.jpg asymmetric dark-shaded blocks + full-page campus backdrop */}
      <section className="relative flex-1 flex flex-col bg-[#0D0F12] border-b border-white/10 overflow-hidden">
        {data.brand.heroBackdropSrc.trim() && (
          <img
            src={data.brand.heroBackdropSrc}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0D0F12]/70 via-[#0D0F12]/35 to-[#0D0F12]/55 bg-dark-grid"
        />

        <div className="relative z-10 flex-1 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[calc(100vh-12rem)]">
          {/* Left Column: Hello, Name, Current Status */}
          <div className="lg:col-span-7 flex flex-col justify-center py-12 sm:py-16">
            <div className="mx-4 sm:mx-10 lg:ml-14 lg:mr-8 p-6 sm:p-8 rounded-2xl bg-[#12151A]/85 border border-white/10 shadow-xl">
              <div className="hidden sm:block mb-6">
                <HorizontalStripeAccent />
              </div>
              <p className="font-garamond text-2xl sm:text-3xl text-[#E5A93C] mb-2">
                {data.brand.greeting}
              </p>
              <h1
                className="font-display text-[#F4F4F5] tracking-tight leading-[1.08] max-w-2xl"
                style={{
                  fontSize: 'clamp(2.35rem, 4.4vw, 4rem)',
                  textWrap: 'balance',
                }}
              >
                I’m <span className="text-[#E5A93C]">{data.brand.fullName}</span>
              </h1>
            </div>

            {/* Different-Shade Horizontal Band (6518625.jpg band + Sketch 2 Current Status) */}
            <div className="mt-6 bg-[#171B22]/92 border-y border-white/15 px-6 sm:px-12 lg:px-16 py-7 shadow-lg">
              <p className="font-rajdhani text-sm sm:text-base font-bold uppercase tracking-[0.14em] text-[#E5A93C] mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 shrink-0 text-[#C96428]" />
                <span>{data.brand.currentStatus}</span>
              </p>
              <p className="font-garamond text-lg sm:text-xl font-semibold text-zinc-100">
                {data.brand.statusInstitution}
              </p>
              <p className="mt-2.5 font-lora text-sm sm:text-base text-zinc-200 max-w-xl leading-relaxed">
                {data.brand.heroSummary}
              </p>
            </div>
          </div>

          {/* Right Column: Teal-Slate Block + Signature Top-Left-Rounded Portrait Frame */}
          <div className="lg:col-span-5 relative flex items-center justify-center px-8 sm:px-12 py-12 lg:py-16">
            {/* Vertical Dark Teal-Slate Structural Panel (6518625.jpg right block) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-0 right-0 bottom-0 w-[68%] bg-[#14323A]/92 border-l border-white/10"
            >
              <div className="absolute right-0 top-1/3">
                <HorizontalStripeAccent />
              </div>
            </div>

            {/* Framed Portrait Container */}
            <div className="relative z-10 w-full max-w-[360px] sm:max-w-[380px] aspect-[4/4.3]">
              <div
                aria-hidden="true"
                className="shape-hero-frame absolute inset-0 translate-x-2.5 translate-y-2.5 sm:translate-x-3 sm:translate-y-3 border border-[#E5A93C]/55 pointer-events-none"
              />
              <BotanicalLeafCluster position="top-left" />
              <BotanicalLeafCluster position="bottom-right" />

              <div className="shape-hero-frame relative w-full h-full overflow-hidden border border-white/15 shadow-2xl bg-[#171B22]">
                <TemplateMediaFrame
                  src={data.photos.heroPortrait.src}
                  alt={`${data.brand.fullName} portrait`}
                  variant="portrait"
                  title={data.brand.fullName}
                  subtitle={data.photos.heroPortrait.caption}
                  recommendedPath={data.photos.heroPortrait.recommendedPath}
                  className="w-full h-full"
                  imgClassName="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
