import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  FileCode2,
  FolderOpen,
  RotateCcw,
  Rocket,
  Video,
  X,
} from 'lucide-react';
import type { PortfolioData } from '../data/portfolioData';
import { generatePortfolioTsExport } from '../utils/portfolioHelpers';

interface TemplateCustomizerModalProps {
  isOpen: boolean;
  data: PortfolioData;
  onUpdateData: (next: PortfolioData) => void;
  onReset: () => void;
  onClose: () => void;
}

type ModalTab = 'media' | 'fields' | 'deploy';

export const TemplateCustomizerModal: React.FC<TemplateCustomizerModalProps> = ({
  isOpen,
  data,
  onUpdateData,
  onReset,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('media');
  const [exportedBanner, setExportedBanner] = useState(false);

  if (!isOpen) return null;

  const handleDownloadTs = () => {
    const content = generatePortfolioTsExport(data);
    const blob = new Blob([content], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolioData.ts';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setExportedBanner(true);
    setTimeout(() => setExportedBanner(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video and Deployment Setup"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[88vh] flex flex-col rounded-xl border border-white/15 bg-[#12151A] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#171B22] border-b border-white/10">
          <div>
            <h2 className="font-display text-xl text-[#F4F4F5]">
              Video &amp; Deployment Setup
            </h2>
            <p className="text-xs text-zinc-400">
              Add your 97 MB intro video, tweak details, or export <code className="font-mono text-[#E5A93C]">src/data/portfolioData.ts</code>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close setup modal"
            className="w-9 h-9 rounded-lg border border-white/15 bg-[#0D0F12] text-zinc-200 hover:text-[#E5A93C] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 px-6 py-3 bg-[#111419] border-b border-white/10 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 inline-flex items-center gap-2 transition-colors ${
              activeTab === 'media'
                ? 'bg-[#E5A93C] text-[#0D0F12]'
                : 'bg-[#171B22] text-zinc-300 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>1. Add Your 97 MB Video</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fields')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 inline-flex items-center gap-2 transition-colors ${
              activeTab === 'fields'
                ? 'bg-[#E5A93C] text-[#0D0F12]'
                : 'bg-[#171B22] text-zinc-300 hover:text-white'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>2. Edit Text / Video URL</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('deploy')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 inline-flex items-center gap-2 transition-colors ${
              activeTab === 'deploy'
                ? 'bg-[#E5A93C] text-[#0D0F12]'
                : 'bg-[#171B22] text-zinc-300 hover:text-white'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>3. Deploy for Faculty (5 Marks)</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'media' && (
            <div className="space-y-5 text-sm text-zinc-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-[#14323A]/45 border border-[#E5A93C]/35 space-y-3">
                <h3 className="font-display text-lg text-[#F4F4F5]">
                  How to Include Your 97 MB Introduction Video
                </h3>
                <p>
                  Because AI Studio chat uploads are capped at <strong>30 MB</strong>, you have three easy ways to add your 97 MB video:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-zinc-200">
                  <li>
                    <strong>Direct Local File (After Exporting Project):</strong> Download/export this project folder, copy your 97 MB file into <code className="font-mono text-[#E5A93C]">public/media/intro-video.mp4</code>, and set <code className="font-mono text-[#E5A93C]">about.videoIntro.src</code> to <code className="font-mono text-white">"/media/intro-video.mp4"</code>. (97 MB is under GitHub&apos;s 100 MB per-file limit!)
                  </li>
                  <li>
                    <strong>YouTube Unlisted / Google Drive (Fastest Loading):</strong> Upload the video to YouTube (Unlisted) or Google Drive (Share: Anyone with link), paste the URL in Tab 2 (or <code className="font-mono text-[#E5A93C]">about.videoIntro.src</code>), and it embeds cleanly with zero size limit.
                  </li>
                  <li>
                    <strong>Compress Below 30 MB (To Upload Here):</strong> Run FFmpeg on a 1–1.5 min clip to bring 97 MB down to ~18–25 MB at 720p/1080p:
                    <pre className="mt-1.5 p-2.5 rounded bg-[#0D0F12] font-mono text-xs text-[#E5A93C] overflow-x-auto">
                      ffmpeg -i intro.mp4 -vcodec libx264 -crf 26 -preset medium -vf scale=1280:-2 -acodec aac -b:a 128k intro-video.mp4
                    </pre>
                  </li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-[#171B22] border border-white/10 space-y-2">
                <h3 className="font-display text-base text-[#E5A93C] flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  <span>Already Organized in public/media/</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  CV_Final.pdf, portrait &amp; page backgrounds, 5 About section covers, Undergraduate Status + HSC/SSC PDFs &amp; previews, Fall 24-25 Dean&apos;s certificate, Spring 24-25 &amp; Fall 25-26 notices/serials, 3 Science Fest certificates, 10 CrisisConnect screenshots, 11 SkillSwap screenshots, and 4 Hobby photos are all wired and ready.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'fields' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldInput
                  label="Cursive Website Name"
                  value={data.brand.siteNameCursive}
                  onChange={(v) =>
                    onUpdateData({
                      ...data,
                      brand: { ...data.brand, siteNameCursive: v },
                    })
                  }
                />
                <FieldInput
                  label="Full Name"
                  value={data.brand.fullName}
                  onChange={(v) =>
                    onUpdateData({
                      ...data,
                      brand: { ...data.brand, fullName: v },
                      about: { ...data.about, headingHighlight: v },
                    })
                  }
                />
              </div>

              <FieldInput
                label="Intro Video URL (YouTube Unlisted, Google Drive share link, or /media/intro-video.mp4)"
                value={data.about.videoIntro.src}
                placeholder="https://youtu.be/... or /media/intro-video.mp4"
                onChange={(v) =>
                  onUpdateData({
                    ...data,
                    about: {
                      ...data.about,
                      videoIntro: { ...data.about.videoIntro, src: v },
                    },
                  })
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldInput
                  label="Personal Email"
                  value={data.contact.personalEmail}
                  onChange={(v) =>
                    onUpdateData({
                      ...data,
                      contact: { ...data.contact, personalEmail: v },
                    })
                  }
                />
                <FieldInput
                  label="Academic Email"
                  value={data.contact.academicEmail}
                  onChange={(v) =>
                    onUpdateData({
                      ...data,
                      contact: { ...data.contact, academicEmail: v },
                    })
                  }
                />
                <FieldInput
                  label="Phone Number"
                  value={data.contact.phone}
                  onChange={(v) =>
                    onUpdateData({
                      ...data,
                      contact: { ...data.contact, phone: v },
                    })
                  }
                />
                <FieldInput
                  label="GitHub Profile URL"
                  value={data.contact.githubUrl}
                  onChange={(v) =>
                    onUpdateData({
                      ...data,
                      contact: { ...data.contact, githubUrl: v },
                    })
                  }
                />
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-[#171B22] border border-white/10 space-y-2">
                <h3 className="font-display text-lg text-[#E5A93C]">
                  Deploy Online for Faculty Review
                </h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Add Intro Video:</strong> Copy your 97 MB MP4 to <code className="font-mono text-white">public/media/intro-video.mp4</code> (and update <code className="font-mono text-white">src</code> in <code className="font-mono text-white">src/data/portfolioData.ts</code>) or paste a YouTube Unlisted / Google Drive link.
                  </li>
                  <li>
                    <strong>Verify Build:</strong> Run <code className="font-mono text-white">npm install</code> and <code className="font-mono text-white">npm run build</code>.
                  </li>
                  <li>
                    <strong>Host Free on Vercel or Netlify:</strong> Push the folder to GitHub (e.g. <code className="font-mono text-white">github.com/steve-A7</code>), import into <strong>vercel.com</strong> or <strong>app.netlify.com</strong>, and submit your live URL to faculty.
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#171B22] border-t border-white/10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2 rounded-lg border border-white/15 bg-[#12151A] text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Defaults</span>
            </button>
            {exportedBanner && (
              <span className="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Downloaded portfolioData.ts
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleDownloadTs}
            className="px-5 py-2.5 rounded-lg bg-[#E5A93C] hover:bg-[#f0b950] text-[#0D0F12] text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download portfolioData.ts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

function FieldInput({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-1">
      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2 rounded-lg bg-[#0D0F12] border border-white/15 text-sm text-[#F4F4F5] placeholder:text-zinc-600 focus:outline-none focus:border-[#E5A93C]"
      />
    </label>
  );
}
