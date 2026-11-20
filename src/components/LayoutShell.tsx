import React, { useState } from 'react';
import {
  Check,
  FileText,
  Github,
  Mail,
} from 'lucide-react';
import type { PageRoute, PortfolioData } from '../data/portfolioData';

interface LayoutShellProps {
  data: PortfolioData;
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  children: React.ReactNode;
}

const PRIMARY_NAV: { route: PageRoute; label: string }[] = [
  { route: 'home', label: 'Home' },
  { route: 'about', label: 'About Me' },
  { route: 'contact', label: 'Contact' },
];

export const LayoutShell: React.FC<LayoutShellProps> = ({
  data,
  currentRoute,
  onNavigate,
  children,
}) => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
  };

  const handleCopyEmail = () => {
    const email = data.contact.personalEmail.trim();
    if (!email) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0F12] text-[#F4F4F5]">
      {/* Top Bar: Cursive Name Left, 3-Item Nav Center (Home, About Me, Contact), Copper CV Download Block Right */}
      <header className="sticky top-0 z-40 w-full bg-[#12151A] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto flex items-stretch justify-between gap-2 sm:gap-8 h-16 pl-3 sm:pl-8">
          {/* Left: Cursive Website Name */}
          <div className="flex items-center shrink-0">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
              className="font-cursive text-[17px] sm:text-3xl font-bold text-[#F4F4F5] hover:text-[#E5A93C] transition-colors whitespace-nowrap tracking-wide"
            >
              {data.brand.siteNameCursive}
            </a>
          </div>

          {/* Center: 3-item Navigation (Home, About Me, Contact) visible on all viewports */}
          <nav
            aria-label="Primary Navigation"
            className="flex items-center gap-2.5 sm:gap-8 text-[12px] sm:text-base font-semibold tracking-wide shrink-0"
          >
            {PRIMARY_NAV.map((item) => {
              const isActive =
                currentRoute === item.route ||
                (item.route === 'about' &&
                  ['education', 'achievements', 'skills', 'projects', 'hobbies'].includes(
                    currentRoute
                  ));
              return (
                <a
                  key={item.route}
                  href={`#/${item.route === 'home' ? '' : item.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.route);
                  }}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#E5A93C]'
                      : 'text-zinc-300 hover:text-[#F4F4F5]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#E5A93C]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Burnt Copper CV Link (Opens PDF in New Tab) */}
          <div className="flex items-stretch shrink-0">
            <a
              href={data.brand.cvPdfUrl || '/media/CV_Final.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open CV PDF in new tab"
              className="h-16 px-2.5 sm:px-8 bg-[#C96428] hover:bg-[#d87032] transition-colors flex items-center justify-center shrink-0 focus-visible:outline-2 focus-visible:outline-white"
            >
              <span className="border border-white/80 px-2 sm:px-4 py-1 text-[11px] sm:text-sm font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white whitespace-nowrap shrink-0 inline-flex items-center gap-1 sm:gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>{data.brand.logoBadgeText || 'CV'}</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col">{children}</main>

      {/* Footer matching Sketch 1: GitHub Repository + Mail Copy Personal Email */}
      <footer className="relative z-20 bg-[#0A0C0F] border-t border-white/15 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-5 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={data.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub Repository"
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[#171B22] border border-white/20 hover:border-[#E5A93C] text-[#F4F4F5] hover:text-[#E5A93C] transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide">
                {data.contact.githubRepoLabel || 'GitHub Repository'}
              </span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={`Copy personal email ${data.contact.personalEmail}`}
              title={`Copy ${data.contact.personalEmail}`}
              className="h-11 px-4 rounded-xl bg-[#171B22] border border-white/20 hover:border-[#E5A93C] text-zinc-200 hover:text-[#E5A93C] inline-flex items-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#E5A93C]"
            >
              {emailCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-emerald-300 whitespace-nowrap">
                    Copied {data.contact.personalEmail}
                  </span>
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-semibold hidden sm:inline whitespace-nowrap">
                    Copy Email
                  </span>
                </>
              )}
            </button>
          </div>

          <div className="text-xs text-zinc-400">
            <span>© {new Date().getFullYear()} {data.brand.fullName}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
