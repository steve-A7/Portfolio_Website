import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import type { PortfolioData } from '../data/portfolioData';

interface ContactPageProps {
  data: PortfolioData;
}

export const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (label: string, value: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1800);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0D0F12] overflow-hidden">
      {/* Visible Page Backdrop Around Floating Content Cards */}
      {data.contact.bannerBackdropSrc.trim() && (
        <div
          aria-hidden="true"
          className="fixed inset-0 top-16 pointer-events-none z-0 opacity-45 bg-cover bg-center"
          style={{ backgroundImage: `url("${data.contact.bannerBackdropSrc}")` }}
        />
      )}
      <div
        aria-hidden="true"
        className="fixed inset-0 top-16 pointer-events-none z-0 bg-gradient-to-b from-[#0D0F12]/50 via-[#0D0F12]/40 to-[#0D0F12]/70"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-8">
        {/* Banner Card */}
        <section className="rounded-2xl bg-[#12151A]/88 border border-white/15 py-10 px-6 text-center shadow-xl">
          <p className="font-rajdhani text-xs font-bold uppercase tracking-[0.2em] text-[#E5A93C] mb-2">
            Get In Touch
          </p>
          <h1 className="font-display text-3xl sm:text-5xl text-[#F4F4F5]">Contact</h1>
        </section>

        {/* Row 1 (Different Shade Card): Mail Icon Left, Personal & Academic Email Right */}
        <section className="rounded-2xl bg-[#171B22]/92 border border-white/15 py-10 px-6 sm:px-10 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#14323A] border border-[#E5A93C]/40 flex items-center justify-center shrink-0">
              <Mail className="w-8 h-8 text-[#E5A93C]" />
            </div>

            <div className="flex-1 space-y-4 sm:text-right">
              <div>
                <p className="font-rajdhani text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">
                  Personal Email
                </p>
                <div className="mt-1 flex flex-wrap items-center sm:justify-end gap-3">
                  <a
                    href={`mailto:${data.contact.personalEmail}`}
                    className="font-garamond text-xl sm:text-2xl font-semibold text-[#F4F4F5] hover:text-[#E5A93C] transition-colors"
                  >
                    {data.contact.personalEmail}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('personal', data.contact.personalEmail)}
                    aria-label="Copy personal email"
                    className="px-2.5 py-1 rounded border border-white/15 bg-[#12151A] text-xs font-rajdhani font-semibold text-zinc-300 hover:text-[#E5A93C] hover:border-[#E5A93C]/50 inline-flex items-center gap-1 transition-colors"
                  >
                    {copiedField === 'personal' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="font-rajdhani text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">
                  Academic Email
                </p>
                <div className="mt-1 flex flex-wrap items-center sm:justify-end gap-3">
                  <a
                    href={`mailto:${data.contact.academicEmail}`}
                    className="font-garamond text-xl sm:text-2xl font-semibold text-[#F4F4F5] hover:text-[#E5A93C] transition-colors"
                  >
                    {data.contact.academicEmail}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('academic', data.contact.academicEmail)}
                    aria-label="Copy academic email"
                    className="px-2.5 py-1 rounded border border-white/15 bg-[#12151A] text-xs font-rajdhani font-semibold text-zinc-300 hover:text-[#E5A93C] hover:border-[#E5A93C]/50 inline-flex items-center gap-1 transition-colors"
                  >
                    {copiedField === 'academic' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Row 2 (Alternating Shade Card): Phone Left, Phone Icon Right */}
        <section className="rounded-2xl bg-[#111419]/92 border border-white/15 py-10 px-6 sm:px-10 shadow-xl">
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="font-rajdhani text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">
                Phone Number
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${data.contact.phone.replace(/\s+/g, '')}`}
                  className="text-xl sm:text-2xl font-mono font-semibold text-[#F4F4F5] hover:text-[#E5A93C] tabular-nums transition-colors"
                >
                  {data.contact.phone}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('phone', data.contact.phone)}
                  aria-label="Copy phone number"
                  className="px-2.5 py-1 rounded border border-white/15 bg-[#171B22] text-xs font-rajdhani font-semibold text-zinc-300 hover:text-[#E5A93C] hover:border-[#E5A93C]/50 inline-flex items-center gap-1 transition-colors"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#C96428]/25 border border-[#C96428]/55 flex items-center justify-center shrink-0">
              <Phone className="w-8 h-8 text-[#E5A93C]" />
            </div>
          </div>
        </section>

        {/* Row 3: Google Maps Area Pin Left, Clean Address Info Right (no duplicate small button) */}
        <section className="rounded-2xl bg-[#171B22]/92 border border-white/15 py-10 px-6 sm:px-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <a
                href={data.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-white/15 hover:border-[#E5A93C] bg-[#0D0F12] aspect-[16/9] transition-colors focus-visible:outline-2 focus-visible:outline-[#E5A93C]"
              >
                <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#14323A]/45 via-[#111419] to-[#0D0F12] bg-dark-grid">
                  <div className="flex items-center justify-between text-xs text-[#E5A93C] font-rajdhani">
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <MapPin className="w-4 h-4" />
                      Google Maps Area Pin
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold group-hover:underline">
                      <span>Open Map</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="my-auto text-center space-y-2 py-4">
                    <div className="w-14 h-14 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/50 group-hover:bg-[#E5A93C]/25 flex items-center justify-center mx-auto transition-colors">
                      <MapPin className="w-7 h-7 text-[#E5A93C]" />
                    </div>
                    <p className="font-display text-lg sm:text-xl text-[#F4F4F5]">
                      {data.contact.addressLines[0]}
                    </p>
                    <p className="font-lora text-sm text-zinc-300">
                      {data.contact.addressLines[1]}
                    </p>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400 text-center border-t border-white/10 pt-2.5">
                    {data.contact.addressNote}
                  </div>
                </div>
              </a>
            </div>

            <div className="lg:col-span-5 lg:text-right space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#14323A] border border-white/15 text-[#E5A93C] lg:ml-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl text-[#F4F4F5]">Address</h2>
              <div className="space-y-1 font-lora text-base text-zinc-200">
                {data.contact.addressLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <p className="font-rajdhani text-xs text-zinc-400">{data.contact.addressNote}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
