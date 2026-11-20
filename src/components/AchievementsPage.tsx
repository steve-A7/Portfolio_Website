import React from "react";
import {
	ArrowLeft,
	Award,
	Clock,
	ExternalLink,
	FileText,
	Hash,
	ZoomIn,
} from "lucide-react";
import type { PageRoute, PortfolioData } from "../data/portfolioData";
import type { LightboxItem } from "./LightboxModal";
import { TemplateMediaFrame } from "./TemplateVisuals";

interface AchievementsPageProps {
	data: PortfolioData;
	onNavigate: (route: PageRoute) => void;
	onOpenLightbox: (item: LightboxItem) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({
	data,
	onNavigate,
	onOpenLightbox,
}) => {
	return (
		<div className="relative w-full min-h-screen bg-[#0D0F12] overflow-hidden">
			{/* Achievements Cover Used as Full-Page Background Visible Around Content Cards */}
			{data.achievements.pageBackdropSrc.trim() && (
				<div
					aria-hidden="true"
					className="fixed inset-0 top-16 pointer-events-none z-0 opacity-35 bg-cover bg-center"
					style={{
						backgroundImage: `url("${data.achievements.pageBackdropSrc}")`,
					}}
				/>
			)}
			<div
				aria-hidden="true"
				className="fixed inset-0 top-16 pointer-events-none z-0 bg-gradient-to-b from-[#0D0F12]/65 via-[#0D0F12]/55 to-[#0D0F12]/80"
			/>

			<div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-10">
				{/* Full-Width Banner Card */}
				<section className="rounded-2xl bg-[#12151A]/90 border border-white/15 py-10 px-6 sm:px-10 shadow-2xl">
					<button
						type="button"
						onClick={() => onNavigate("about")}
						className="inline-flex items-center gap-2 font-rajdhani text-sm font-semibold text-zinc-200 hover:text-[#E5A93C] mb-6 transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						<span>Back to About Me</span>
					</button>
					<div className="text-center">
						<h1 className="font-cursive text-4xl sm:text-5xl font-bold text-[#F4F4F5]">
							Achievements & Co-Curricular Activities
						</h1>
					</div>
				</section>

				{/* Full-Page Spacious Dean's List Honors Rows */}
				<section className="space-y-6">
					<div className="rounded-2xl bg-[#171B22]/90 border border-white/15 px-6 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
						<div>
							<h2 className="font-display text-2xl sm:text-3xl text-[#F4F4F5] flex items-center gap-2.5">
								<Award className="w-6 h-6 text-[#E5A93C] shrink-0" />
								<span>Dean’s List Honors (3 Semesters)</span>
							</h2>
							<p className="mt-1.5 font-lora text-sm text-zinc-300">
								Official certificate issued for Fall 2024–2025 plus official FST
								Dean’s List notice PDFs serial numbers for Spring 2024–2025 and
								Fall 2025–2026.
							</p>
						</div>
						<span className="font-mono text-xs text-[#E5A93C] tabular-nums">
							Fall 2024–25 , Spring 2024–25 , Fall 2025–26
						</span>
					</div>

					<div className="space-y-6">
						{data.achievements.deansAwards.map((award) => {
							const isEarned = award.status === "earned";
							const targetPdf = award.pdfUrl || award.noticePdfUrl;

							return (
								<article
									key={award.id}
									className={`rounded-2xl overflow-hidden border bg-[#12151A]/94 shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch ${
										isEarned ? "border-[#E5A93C]/45" : "border-zinc-700"
									}`}
								>
									{/* Visual Column: High-Res Certificate or Official Notice PDF Page Preview */}
									<div className="lg:col-span-6 bg-[#0A0C0F] p-5 sm:p-8 flex flex-col justify-center gap-4 border-b lg:border-b-0 lg:border-r border-white/10">
										<button
											type="button"
											onClick={() =>
												onOpenLightbox({
													title: `Dean’s List Honors — ${award.semester}`,
													subtitle: `${award.faculty} · ${award.gpa}`,
													meta: award.issueDate,
													src: award.certificateSrc,
													pdfUrl: targetPdf,
													variant: isEarned ? "deans-earned" : "deans-pending",
													recommendedPath: award.recommendedPath,
												})
											}
											className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/15 hover:border-[#E5A93C] transition-colors focus-visible:outline-2 focus-visible:outline-[#E5A93C]"
										>
											<TemplateMediaFrame
												src={award.certificateSrc}
												alt={`Dean's Award ${award.semester}`}
												variant={isEarned ? "deans-earned" : "deans-pending"}
												title={award.semester}
												subtitle={award.gpa}
												recommendedPath={award.recommendedPath}
												className="w-full h-full group-hover:scale-[1.015] transition-transform duration-200"
												imgClassName="object-contain bg-white"
											/>
											<span className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/85 border border-white/15 text-[#E5A93C] font-rajdhani text-xs font-bold inline-flex items-center gap-1.5">
												<ZoomIn className="w-3.5 h-3.5" />
												<span>Inspect Fullscreen</span>
											</span>
										</button>

										{award.serialNumber && (
											<div className="rounded-xl border border-[#E5A93C]/35 bg-[#12151A] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
												<div className="inline-flex items-center gap-2 font-rajdhani text-xs font-bold uppercase tracking-wider text-[#E5A93C]">
													<FileText className="w-4 h-4 shrink-0" />
													<span>Official FST Notice Record</span>
												</div>
												<div className="inline-flex items-center gap-3">
													<span className="inline-flex items-center gap-1 font-display text-lg font-bold text-[#E5A93C] tabular-nums">
														<Hash className="w-4 h-4 text-[#C96428]" />
														<span>Serial {award.serialNumber}</span>
													</span>
													<span className="font-mono text-xs text-zinc-300">
														ID: {award.studentId || "23-54439-3"}
													</span>
												</div>
											</div>
										)}
									</div>

									{/* Right Details Column */}
									<div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-5">
										<div className="space-y-3">
											<div className="flex items-center justify-between gap-3">
												<span className="font-rajdhani text-xs font-bold uppercase tracking-[0.16em] text-[#E5A93C]">
													{award.faculty}
												</span>
												{!isEarned && (
													<span className="inline-flex items-center gap-1.5 font-rajdhani text-xs font-bold uppercase tracking-wider text-zinc-300">
														<Clock className="w-4 h-4 text-[#E5A93C]" />
														<span>Pending Issuance</span>
													</span>
												)}
											</div>

											<h3 className="font-display text-2xl sm:text-3xl text-[#F4F4F5]">
												{award.semester}
											</h3>

											<p className="font-garamond text-xl font-semibold text-[#E5A93C]">
												{award.gpa}
											</p>

											<p className="font-lora text-sm sm:text-base text-zinc-200 leading-relaxed">
												{award.note}
											</p>
										</div>

										<div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-zinc-400">
											<span>{award.issueDate}</span>
											{targetPdf && (
												<a
													href={targetPdf}
													target="_blank"
													rel="noopener noreferrer"
													className="font-rajdhani text-sm font-bold text-[#E5A93C] hover:underline inline-flex items-center gap-1.5"
												>
													<span>
														{award.pdfUrl
															? "Open Official Certificate PDF"
															: "Open Official Notice PDF"}
													</span>
													<ExternalLink className="w-3.5 h-3.5" />
												</a>
											)}
										</div>
									</div>
								</article>
							);
						})}
					</div>
				</section>

				{/* Co-curricular Science Festival Certificates */}
				<section className="rounded-2xl bg-[#12151A]/90 border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
					<div>
						<h2 className="font-display text-2xl sm:text-3xl text-[#F4F4F5]">
							Co-Curricular Activities
						</h2>
						<p className="mt-1.5 font-lora text-sm text-zinc-300">
							Scintilla Science Club, St. Joseph Higher Secondary School (Click
							any certificate to inspect fullscreen or open PDF)
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{data.achievements.otherAwards.map((item) => (
							<button
								key={item.id}
								type="button"
								onClick={() =>
									onOpenLightbox({
										title: item.title,
										subtitle: item.issuer,
										meta: item.year,
										src: item.certificateSrc,
										pdfUrl: item.pdfUrl,
										variant: "award",
										recommendedPath: item.recommendedPath,
									})
								}
								className="group text-left rounded-xl overflow-hidden bg-[#171B22] border border-white/15 hover:border-[#E5A93C] transition-colors focus-visible:outline-2 focus-visible:outline-[#E5A93C]"
							>
								<div className="aspect-[4/3] w-full overflow-hidden bg-[#0A0C0F]">
									<TemplateMediaFrame
										src={item.certificateSrc}
										alt={item.title}
										variant="award"
										title={item.title}
										subtitle={`${item.issuer}, ${item.year}`}
										recommendedPath={item.recommendedPath}
										className="w-full h-full group-hover:scale-[1.02] transition-transform duration-200"
										imgClassName="object-contain bg-[#0A0C0F]"
									/>
								</div>
								<div className="p-4 border-t border-white/10 flex items-center justify-between gap-3">
									<div className="min-w-0">
										<h3 className="font-display text-base font-bold text-[#F4F4F5] truncate group-hover:text-[#E5A93C] transition-colors">
											{item.title}
										</h3>
										<p className="font-rajdhani text-xs text-zinc-400 truncate">
											{item.issuer}, {item.year}
										</p>
									</div>
									<ZoomIn className="w-4 h-4 text-zinc-400 group-hover:text-[#E5A93C] shrink-0" />
								</div>
							</button>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};
