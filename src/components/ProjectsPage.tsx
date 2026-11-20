import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderGit2,
  Github,
  Maximize2,
} from 'lucide-react';
import type { PageRoute, PortfolioData, ProjectItem } from '../data/portfolioData';
import type { LightboxItem } from './LightboxModal';
import { wrapCarouselIndex } from '../utils/portfolioHelpers';

interface ProjectsPageProps {
  data: PortfolioData;
  onNavigate: (route: PageRoute) => void;
  onOpenLightbox: (item: LightboxItem) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  data,
  onNavigate,
  onOpenLightbox,
}) => {
  return (
    <div className="relative w-full min-h-screen bg-[#0D0F12] overflow-hidden">
      {/* Projects Cover Used as Page Background Visible Around Project Cards */}
      {data.projectsBackdropSrc.trim() && (
        <div
          aria-hidden="true"
          className="fixed inset-0 top-16 pointer-events-none z-0 opacity-35 bg-cover bg-center"
          style={{ backgroundImage: `url("${data.projectsBackdropSrc}")` }}
        />
      )}
      <div
        aria-hidden="true"
        className="fixed inset-0 top-16 pointer-events-none z-0 bg-gradient-to-b from-[#0D0F12]/60 via-[#0D0F12]/50 to-[#0D0F12]/80"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-10">
        {/* Banner Card */}
        <section className="rounded-2xl bg-[#12151A]/90 border border-white/15 py-10 px-6 sm:px-10 shadow-xl">
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="inline-flex items-center gap-2 font-rajdhani text-sm font-semibold text-zinc-200 hover:text-[#E5A93C] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to About Me</span>
          </button>
          <div className="text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl font-bold text-[#F4F4F5]">
              Projects
            </h1>
            <p className="mt-2 font-lora text-sm text-zinc-300">
              Swipe left or right through application screenshots · Click any screenshot or expand icon for fullscreen view
            </p>
          </div>
        </section>

        {/* Project Showcases with Swipeable Galleries */}
        <div className="space-y-10">
          {data.projects.map((project, index) => (
            <ProjectShowcaseRow
              key={project.id}
              project={project}
              alternateBg={index % 2 === 1}
              onOpenLightbox={onOpenLightbox}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function ProjectShowcaseRow({
  project,
  alternateBg,
  onOpenLightbox,
}: {
  project: ProjectItem;
  alternateBg: boolean;
  onOpenLightbox: (item: LightboxItem) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = project.screenshots.length;
  const activeShot = project.screenshots[activeIndex] ?? project.screenshots[0];

  const scrollToSlide = (nextIdx: number) => {
    const wrapped = wrapCarouselIndex(nextIdx, 0, total);
    setActiveIndex(wrapped);
    const track = trackRef.current;
    if (track) {
      const child = track.children[wrapped] as HTMLElement | undefined;
      if (child) {
        track.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => scrollToSlide(wrapCarouselIndex(activeIndex, -1, total));
  const handleNext = () => scrollToSlide(wrapCarouselIndex(activeIndex, 1, total));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || total <= 1) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 40) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
  };

  const handleScrollSync = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth <= 0) return;
    const approxIndex = Math.round(track.scrollLeft / track.clientWidth);
    if (approxIndex >= 0 && approxIndex < total && approxIndex !== activeIndex) {
      setActiveIndex(approxIndex);
    }
  };

  const openFullscreen = (indexToOpen: number) => {
    onOpenLightbox({
      title: project.name,
      meta: project.stack,
      variant: 'project',
      slides: project.screenshots,
      initialIndex: indexToOpen,
    });
  };

  return (
    <section
      data-testid={`project-card-${project.id}`}
      className={`rounded-2xl border border-white/15 p-6 sm:p-10 shadow-2xl ${
        alternateBg ? 'bg-[#111419]/94' : 'bg-[#171B22]/94'
      }`}
    >
      <div className="space-y-6">
        {/* Header & Tech Stack */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-rajdhani text-xs font-bold uppercase tracking-[0.16em] text-[#E5A93C] mb-1.5">
              <FolderGit2 className="w-4 h-4 shrink-0" />
              <span>{project.stack}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#F4F4F5]">
              {project.name}
            </h2>
            <p className="mt-2 font-lora text-sm sm:text-base text-zinc-200 max-w-3xl leading-relaxed">
              {project.summary}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-[#E5A93C] tabular-nums px-3 py-1.5 rounded-lg bg-[#0D0F12] border border-white/10">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => openFullscreen(activeIndex)}
              aria-label={`View ${project.name} screenshot ${activeIndex + 1} in fullscreen`}
              className="px-3.5 py-2 rounded-lg bg-[#14323A] hover:bg-[#19404a] border border-white/15 font-rajdhani text-xs sm:text-sm font-semibold text-[#F4F4F5] inline-flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Maximize2 className="w-4 h-4 text-[#E5A93C]" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Left-to-Right Swipeable Screenshot Carousel */}
        <div
          className="relative rounded-xl overflow-hidden border border-white/15 bg-[#0D0F12]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            onScroll={handleScrollSync}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {project.screenshots.map((shot, idx) => (
              <div
                key={shot.src}
                className="w-full shrink-0 snap-center aspect-[16/9] bg-[#0A0C0F] relative"
              >
                <button
                  type="button"
                  onClick={() => openFullscreen(idx)}
                  aria-label={`Open ${project.name} screen ${idx + 1} in fullscreen`}
                  className="w-full h-full block group focus-visible:outline-2 focus-visible:outline-[#E5A93C]"
                >
                  <img
                    src={shot.src}
                    alt={shot.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain bg-[#0A0C0F] group-hover:scale-[1.01] transition-transform duration-200"
                  />
                </button>
              </div>
            ))}
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label={`Previous ${project.name} screenshot`}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-[#E5A93C] text-white hover:text-[#0D0F12] border border-white/20 flex items-center justify-center transition-colors shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={`Next ${project.name} screenshot`}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-[#E5A93C] text-white hover:text-[#0D0F12] border border-white/20 flex items-center justify-center transition-colors shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {activeShot && (
            <div className="px-4 py-3 bg-[#12151A] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <p className="font-lora text-xs sm:text-sm text-zinc-200 truncate">
                {activeShot.caption}
              </p>
              <span className="font-rajdhani text-xs text-zinc-400">
                Swipe or use arrows · Click image for fullscreen
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        <div
          aria-label={`${project.name} screenshot thumbnails`}
          className="flex items-center gap-2.5 overflow-x-auto pb-1"
        >
          {project.screenshots.map((shot, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={shot.src}
                type="button"
                onClick={() => scrollToSlide(idx)}
                aria-label={`Jump to ${project.name} screenshot ${idx + 1}`}
                className={`relative shrink-0 w-24 sm:w-28 aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                  isActive
                    ? 'border-[#E5A93C] ring-2 ring-[#E5A93C]/40 opacity-100'
                    : 'border-white/10 opacity-60 hover:opacity-95'
                }`}
              >
                <img
                  src={shot.src}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Repository Links Underneath */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
          {project.repositories.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#0D0F12] border border-white/15 hover:border-[#E5A93C] font-rajdhani text-sm font-bold text-[#E5A93C] hover:text-[#f5c462] transition-colors"
            >
              <Github className="w-4 h-4 shrink-0" />
              <span>{repo.label}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
