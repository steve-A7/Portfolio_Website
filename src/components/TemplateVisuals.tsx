import React, { useState } from 'react';
import {
  Award,
  Camera,
  Clock,
  Code2,
  FileCheck2,
  FolderGit2,
  GraduationCap,
  Image as ImageIcon,
  Sparkles,
  User,
} from 'lucide-react';

export type TemplateVisualVariant =
  | 'portrait'
  | 'education'
  | 'deans-earned'
  | 'deans-pending'
  | 'award'
  | 'project'
  | 'hobby'
  | 'skills'
  | 'backdrop';

interface TemplateMediaFrameProps {
  src?: string;
  alt: string;
  variant: TemplateVisualVariant;
  title?: string;
  subtitle?: string;
  recommendedPath?: string;
  badgeText?: string;
  className?: string;
  imgClassName?: string;
  nonInteractive?: boolean;
}

export function BotanicalLeafCluster({
  position,
}: {
  position: 'top-left' | 'bottom-right';
}) {
  const isTopLeft = position === 'top-left';
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 110 110"
      className={`pointer-events-none absolute z-20 w-16 h-16 sm:w-20 sm:h-20 ${
        isTopLeft ? '-top-3 -left-6 rotate-[-12deg]' : '-bottom-4 -right-5 rotate-[158deg]'
      }`}
    >
      {/* Largest amber leaf */}
      <path
        d="M52 14 C72 22, 84 44, 78 68 C54 64, 38 46, 52 14 Z"
        fill="#E5A93C"
        opacity="0.92"
      />
      {/* Medium burnt copper leaf */}
      <path
        d="M20 42 C42 36, 62 48, 66 70 C44 74, 26 62, 20 42 Z"
        fill="#C96428"
        opacity="0.92"
      />
      {/* Deep teal-charcoal accent leaf */}
      <path
        d="M36 68 C52 62, 66 70, 68 88 C52 90, 38 82, 36 68 Z"
        fill="#14323A"
        stroke="#E5A93C"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function HorizontalStripeAccent({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex flex-col gap-2 ${className}`}>
      <span className="block h-[2px] w-10 bg-[#E5A93C]/80" />
      <span className="block h-[2px] w-10 bg-[#E5A93C]/65" />
      <span className="block h-[2px] w-10 bg-[#E5A93C]/50" />
      <span className="block h-[2px] w-10 bg-[#E5A93C]/35" />
    </div>
  );
}

export const TemplateMediaFrame: React.FC<TemplateMediaFrameProps> = ({
  src,
  alt,
  variant,
  title,
  subtitle,
  recommendedPath,
  badgeText,
  className = '',
  imgClassName = '',
  nonInteractive = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(src && src.trim() && !hasError);

  if (showImage) {
    const hasObjectFit = /\bobject-(contain|cover|fill|none|scale-down)\b/.test(imgClassName);
    return (
      <div className={`relative overflow-hidden bg-[#12151A] ${className}`}>
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          draggable={!nonInteractive}
          className={`w-full h-full ${hasObjectFit ? '' : 'object-cover'} ${
            nonInteractive ? 'select-none pointer-events-none' : ''
          } ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#151921] text-[#F4F4F5] flex flex-col justify-between ${className}`}
    >
      {/* Subtle architectural dark-shaded background geometry */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,50,58,0.45),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(229,169,60,0.10),transparent_50%),linear-gradient(135deg,#1B222C_0%,#12161D_55%,#0D1015_100%)]"
      />

      {variant === 'deans-earned' || variant === 'deans-pending' || variant === 'education' || variant === 'award' ? (
        <CertificateTemplateArt
          variant={variant}
          title={title}
          subtitle={subtitle}
          badgeText={badgeText}
          recommendedPath={recommendedPath}
        />
      ) : variant === 'project' ? (
        <ProjectTemplateArt
          title={title}
          subtitle={subtitle}
          recommendedPath={recommendedPath}
        />
      ) : variant === 'portrait' ? (
        <PortraitTemplateArt
          title={title}
          subtitle={subtitle}
          recommendedPath={recommendedPath}
        />
      ) : (
        <GeneralMediaTemplateArt
          variant={variant}
          title={title}
          subtitle={subtitle}
          recommendedPath={recommendedPath}
        />
      )}
    </div>
  );
};

function CertificateTemplateArt({
  variant,
  title,
  subtitle,
  badgeText,
  recommendedPath,
}: {
  variant: 'deans-earned' | 'deans-pending' | 'education' | 'award';
  title?: string;
  subtitle?: string;
  badgeText?: string;
  recommendedPath?: string;
}) {
  const isPending = variant === 'deans-pending';
  const isDeans = variant === 'deans-earned' || variant === 'deans-pending';

  return (
    <div className="relative z-10 h-full w-full p-5 sm:p-6 flex flex-col justify-between border border-white/10">
      {/* Ornate double inner frame evoking academic certificates */}
      <div
        aria-hidden="true"
        className={`absolute inset-2.5 border pointer-events-none ${
          isPending ? 'border-dashed border-zinc-600/70' : 'border-[#E5A93C]/35'
        }`}
      />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E5A93C]">
          {isPending ? (
            <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
          ) : isDeans ? (
            <Award className="w-4 h-4 text-[#E5A93C] shrink-0" />
          ) : variant === 'education' ? (
            <GraduationCap className="w-4 h-4 text-[#E5A93C] shrink-0" />
          ) : (
            <FileCheck2 className="w-4 h-4 text-[#E5A93C] shrink-0" />
          )}
          <span className={isPending ? 'text-zinc-400' : 'text-[#E5A93C]'}>
            {badgeText || (isPending ? 'Awaiting Issuance' : 'Official Certificate Slot')}
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
          {isPending ? 'PENDING' : 'TEMPLATE'}
        </span>
      </div>

      <div className="relative z-10 my-auto py-4 text-center px-2">
        <p className="text-[11px] tracking-[0.18em] uppercase text-zinc-400 mb-1.5">
          {isDeans ? 'Dean’s List Honors' : 'Academic Credential'}
        </p>
        <h4 className="font-display text-lg sm:text-xl text-[#F4F4F5] leading-snug">
          {title || 'Certificate Title'}
        </h4>
        {subtitle && (
          <p className="mt-1.5 text-sm text-zinc-300 max-w-xs mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div
          aria-hidden="true"
          className={`mx-auto mt-4 h-px w-24 ${
            isPending ? 'bg-zinc-700' : 'bg-gradient-to-r from-transparent via-[#E5A93C]/70 to-transparent'
          }`}
        />
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/10">
        <span>{isPending ? 'Upload scan when issued' : 'Click to inspect preview'}</span>
        {recommendedPath && (
          <span className="font-mono text-zinc-500 truncate max-w-[165px]">
            {recommendedPath}
          </span>
        )}
      </div>
    </div>
  );
}

function ProjectTemplateArt({
  title,
  subtitle,
  recommendedPath,
}: {
  title?: string;
  subtitle?: string;
  recommendedPath?: string;
}) {
  return (
    <div className="relative z-10 h-full w-full p-6 flex flex-col justify-between border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-xs text-[#E5A93C] font-semibold">
          <FolderGit2 className="w-4 h-4 shrink-0" />
          <span>Project Screenshot Template</span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">16:10 UI Preview</span>
      </div>

      {/* Stylized dark-mode interface wireframe */}
      <div className="my-auto py-4">
        <div className="rounded-lg border border-white/10 bg-[#0D0F12]/90 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-28 rounded bg-[#E5A93C]/70" />
            <div className="h-2.5 w-14 rounded bg-[#14323A]" />
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="h-14 rounded bg-[#1B212A] border border-white/5" />
            <div className="h-14 rounded bg-[#1B212A] border border-white/5" />
            <div className="h-14 rounded bg-[#1B212A] border border-white/5" />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Code2 className="w-4 h-4 text-[#C96428] shrink-0" />
            <span className="text-xs text-zinc-300 truncate">
              {title || 'Replace with your application screenshot'}
            </span>
          </div>
        </div>
        {subtitle && <p className="mt-3 text-xs text-zinc-400">{subtitle}</p>}
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/10">
        <span>Static showcase image</span>
        {recommendedPath && <span className="font-mono text-zinc-500">{recommendedPath}</span>}
      </div>
    </div>
  );
}

function PortraitTemplateArt({
  title,
  subtitle,
  recommendedPath,
}: {
  title?: string;
  subtitle?: string;
  recommendedPath?: string;
}) {
  return (
    <div className="relative z-10 h-full w-full px-7 py-8 flex flex-col justify-between border border-white/10">
      <div className="flex items-center justify-between text-xs text-[#E5A93C]">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Camera className="w-4 h-4 shrink-0" />
          Personal Photo Slot
        </span>
        <span className="font-mono text-[11px] text-zinc-400">PORTRAIT</span>
      </div>

      <div className="my-auto flex flex-col items-center text-center py-4">
        <div className="w-24 h-24 rounded-full bg-[#14323A]/80 border border-[#E5A93C]/40 flex items-center justify-center mb-4">
          <User className="w-11 h-11 text-[#E5A93C]" />
        </div>
        <h4 className="font-display text-lg text-[#F4F4F5]">{title || 'Your Photograph'}</h4>
        {subtitle && (
          <p className="mt-1 text-sm text-zinc-400 max-w-[240px] leading-snug">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/10">
        <span>Replace in public/media</span>
        {recommendedPath && <span className="font-mono text-zinc-500">{recommendedPath}</span>}
      </div>
    </div>
  );
}

function GeneralMediaTemplateArt({
  variant,
  title,
  subtitle,
  recommendedPath,
}: {
  variant: TemplateVisualVariant;
  title?: string;
  subtitle?: string;
  recommendedPath?: string;
}) {
  const Icon = variant === 'hobby' ? Camera : variant === 'skills' ? Sparkles : ImageIcon;
  return (
    <div className="relative z-10 h-full w-full p-5 flex flex-col justify-between border border-white/10">
      <div className="flex items-center justify-between text-xs text-[#E5A93C]">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Icon className="w-4 h-4 shrink-0" />
          {variant === 'hobby'
            ? 'Hobby Photo Slot'
            : variant === 'skills'
            ? 'Skills Visual Slot'
            : 'Media Backdrop'}
        </span>
      </div>

      <div className="my-auto py-4 text-center">
        <div className="w-12 h-12 mx-auto rounded-xl bg-[#14323A]/70 border border-white/10 flex items-center justify-center mb-3">
          <Icon className="w-6 h-6 text-[#E5A93C]" />
        </div>
        <h4 className="font-display text-base text-[#F4F4F5]">{title || 'Media Template'}</h4>
        {subtitle && <p className="mt-1 text-xs text-zinc-400 max-w-xs mx-auto">{subtitle}</p>}
      </div>

      {recommendedPath && (
        <div className="text-[11px] font-mono text-zinc-500 text-center border-t border-white/10 pt-2 truncate">
          {recommendedPath}
        </div>
      )}
    </div>
  );
}
