import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { TemplateMediaFrame, type TemplateVisualVariant } from './TemplateVisuals';
import { wrapCarouselIndex } from '../utils/portfolioHelpers';

export interface LightboxSlide {
  src: string;
  caption?: string;
}

export interface LightboxItem {
  title: string;
  subtitle?: string;
  meta?: string;
  src?: string;
  variant: TemplateVisualVariant;
  recommendedPath?: string;
  badgeText?: string;
  pdfUrl?: string;
  slides?: LightboxSlide[];
  initialIndex?: number;
}

interface LightboxModalProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!item) return;
    setActiveIndex(item.initialIndex ?? 0);
  }, [item]);

  const slides = item?.slides && item.slides.length > 0 ? item.slides : null;
  const totalSlides = slides ? slides.length : 0;

  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (slides && totalSlides > 1) {
        if (e.key === 'ArrowLeft') {
          setActiveIndex((prev) => wrapCarouselIndex(prev, -1, totalSlides));
        } else if (e.key === 'ArrowRight') {
          setActiveIndex((prev) => wrapCarouselIndex(prev, 1, totalSlides));
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [item, onClose, slides, totalSlides]);

  if (!item) return null;

  const activeSlide = slides ? slides[activeIndex] ?? slides[0] : null;
  const displaySrc = activeSlide ? activeSlide.src : item.src;
  const displaySubtitle = activeSlide?.caption || item.subtitle;

  const goPrev = () => {
    if (!slides) return;
    setActiveIndex((prev) => wrapCarouselIndex(prev, -1, slides.length));
  };

  const goNext = () => {
    if (!slides) return;
    setActiveIndex((prev) => wrapCarouselIndex(prev, 1, slides.length));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !slides || slides.length <= 1) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 40) {
      if (delta < 0) goNext();
      else goPrev();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-2 sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl rounded-xl border border-white/15 bg-[#12151A] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#171B22]">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-base sm:text-xl text-[#F4F4F5] truncate">
                {item.title}
              </h3>
              {slides && (
                <span className="text-xs font-mono text-[#E5A93C] tabular-nums shrink-0">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
              )}
            </div>
            {(displaySubtitle || item.meta) && (
              <p className="text-xs sm:text-sm text-zinc-300 truncate">
                {[displaySubtitle, item.meta].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {item.pdfUrl && (
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg border border-[#E5A93C]/50 bg-[#0D0F12] text-xs font-semibold text-[#E5A93C] hover:bg-[#E5A93C] hover:text-[#0D0F12] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <span>Open PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close fullscreen preview"
              className="w-10 h-10 rounded-lg border border-white/15 bg-[#0D0F12] text-zinc-200 hover:text-[#E5A93C] hover:border-[#E5A93C]/50 flex items-center justify-center transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#E5A93C]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className="relative p-3 sm:p-5 bg-[#0D0F12]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full h-[65vh] sm:h-[76vh] rounded-lg overflow-hidden border border-white/10 bg-[#0A0C0F]">
            <TemplateMediaFrame
              src={displaySrc}
              alt={displaySubtitle || item.title}
              variant={item.variant}
              title={item.title}
              subtitle={displaySubtitle}
              badgeText={item.badgeText}
              recommendedPath={item.recommendedPath}
              className="w-full h-full"
              imgClassName="object-contain bg-[#0A0C0F]"
            />
          </div>

          {slides && slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous screenshot"
                className="absolute left-5 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 hover:bg-[#E5A93C] text-white hover:text-[#0D0F12] border border-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next screenshot"
                className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 hover:bg-[#E5A93C] text-white hover:text-[#0D0F12] border border-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
