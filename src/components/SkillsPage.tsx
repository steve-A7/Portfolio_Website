import React, { useState } from "react";
import {
	ArrowLeft,
	ChevronLeft,
	ChevronRight,
	Code2,
	Mic,
	Sparkles,
} from "lucide-react";
import type { PageRoute, PortfolioData } from "../data/portfolioData";
import { wrapCarouselIndex } from "../utils/portfolioHelpers";
import { TemplateMediaFrame } from "./TemplateVisuals";

interface SkillsPageProps {
	data: PortfolioData;
	onNavigate: (route: PageRoute) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ data, onNavigate }) => {
	const visuals = data.skills.technicalVisuals;
	const [techIndex, setTechIndex] = useState(0);
	const activeTech = visuals[techIndex] ?? visuals[0];

	const handlePrevTech = () => {
		setTechIndex((prev) => wrapCarouselIndex(prev, -1, visuals.length));
	};

	const handleNextTech = () => {
		setTechIndex((prev) => wrapCarouselIndex(prev, 1, visuals.length));
	};

	return (
		<div className="relative w-full min-h-screen bg-[#0D0F12] overflow-hidden">
			{/* Skills Cover Used as Page Background Visible Around Floating Content Cards */}
			{data.skills.pageBackdropSrc.trim() && (
				<div
					aria-hidden="true"
					className="fixed inset-0 top-16 pointer-events-none z-0 opacity-35 bg-cover bg-center"
					style={{ backgroundImage: `url("${data.skills.pageBackdropSrc}")` }}
				/>
			)}
			<div
				aria-hidden="true"
				className="fixed inset-0 top-16 pointer-events-none z-0 bg-gradient-to-b from-[#0D0F12]/60 via-[#0D0F12]/50 to-[#0D0F12]/80"
			/>

			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-12">
				{/* Banner Card */}
				<section className="rounded-2xl bg-[#12151A]/90 border border-white/15 py-10 px-6 sm:px-10 shadow-xl">
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
							Key Skills
						</h1>
					</div>
				</section>

				{/* Row 1: Communication & Presentation (with Communication_background.png backdrop) */}
				<section className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#12151A]/92 shadow-2xl">
					{data.skills.speakingBackdropSrc && (
						<img
							src={data.skills.speakingBackdropSrc}
							alt=""
							aria-hidden="true"
							referrerPolicy="no-referrer"
							className="absolute inset-0 w-full h-full object-cover opacity-20"
						/>
					)}
					<div
						aria-hidden="true"
						className="absolute inset-0 bg-gradient-to-r from-[#0D0F12]/85 via-[#12151A]/88 to-[#0D0F12]/92"
					/>

					<div className="relative z-10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
						<div className="lg:col-span-5">
							<div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-white p-3 shadow-lg">
								<TemplateMediaFrame
									src={data.skills.speakingPhotoSrc}
									alt={data.skills.speakingTitle}
									variant="skills"
									title={data.skills.speakingTitle}
									className="w-full h-full bg-white"
									imgClassName="object-contain bg-white"
								/>
							</div>
						</div>

						<div className="lg:col-span-7 lg:text-right space-y-3">
							<div className="inline-flex items-center gap-2 font-rajdhani text-xs font-bold uppercase tracking-[0.16em] text-[#E5A93C]">
								<Mic className="w-4 h-4" />
								<span>Communication</span>
							</div>
							<h2 className="font-display text-2xl sm:text-3xl text-[#F4F4F5]">
								{data.skills.speakingTitle}
							</h2>
							<p className="font-garamond text-xl font-semibold text-[#E5A93C]">
								{data.skills.speakingLanguages}
							</p>
							<p className="font-lora text-base text-zinc-200 leading-relaxed max-w-2xl lg:ml-auto">
								{data.skills.speakingDetails}
							</p>
						</div>
					</div>
				</section>

				{/* Row 2: Technical Skills — Flippable Card View Matching Communication & Personal Skills Layout */}
				<section className="rounded-2xl bg-[#111419]/92 border border-white/15 p-6 sm:p-10 shadow-2xl">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
						{/* Left: Tools & Stack List */}
						<div className="lg:col-span-6 space-y-4">
							<div className="inline-flex items-center gap-2 font-rajdhani text-xs font-bold uppercase tracking-[0.16em] text-[#E5A93C]">
								<Code2 className="w-4 h-4" />
								<span>Tools &amp; Stack</span>
							</div>
							<h2 className="font-display text-2xl sm:text-3xl text-[#F4F4F5]">
								{data.skills.technicalTitle}
							</h2>
							<ol className="space-y-3 text-base text-zinc-200">
								{data.skills.technicalList.map((skill, idx) => (
									<li
										key={idx}
										className="flex items-start gap-3 p-3.5 rounded-xl bg-[#171B22] border border-white/10"
									>
										<span className="font-mono text-sm font-bold text-[#E5A93C] tabular-nums shrink-0 mt-0.5">
											0{idx + 1}.
										</span>
										<span className="font-lora text-sm sm:text-base">
											{skill}
										</span>
									</li>
								))}
							</ol>
						</div>

						{/* Right: Flippable Card Viewer with Label Underneath Each Picture */}
						<div className="lg:col-span-6">
							{activeTech && (
								<div className="rounded-xl overflow-hidden border border-white/15 bg-[#171B22] shadow-xl">
									<div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0C0F]">
										<img
											src={activeTech.src}
											alt={activeTech.label}
											referrerPolicy="no-referrer"
											className="w-full h-full object-contain bg-[#0A0C0F]"
										/>

										{visuals.length > 1 && (
											<>
												<button
													type="button"
													onClick={handlePrevTech}
													aria-label="Previous technical skill image"
													className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#E5A93C] text-white hover:text-[#0D0F12] border border-white/20 flex items-center justify-center transition-colors shadow-lg"
												>
													<ChevronLeft className="w-5 h-5" />
												</button>
												<button
													type="button"
													onClick={handleNextTech}
													aria-label="Next technical skill image"
													className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#E5A93C] text-white hover:text-[#0D0F12] border border-white/20 flex items-center justify-center transition-colors shadow-lg"
												>
													<ChevronRight className="w-5 h-5" />
												</button>
											</>
										)}
									</div>

									{/* Label Underneath Picture + Dot Selectors */}
									<div className="px-5 py-4 bg-[#12151A] border-t border-white/10 flex items-center justify-between gap-4">
										<div className="min-w-0">
											<p className="font-display text-lg font-semibold text-[#F4F4F5] truncate">
												{activeTech.label}
											</p>
											<p className="font-rajdhani text-xs font-semibold uppercase tracking-wider text-[#E5A93C] truncate">
												{activeTech.category}
											</p>
										</div>

										<div className="flex items-center gap-2 shrink-0">
											<span className="font-mono text-xs text-zinc-400 tabular-nums mr-1">
												{String(techIndex + 1).padStart(2, "0")} /{" "}
												{String(visuals.length).padStart(2, "0")}
											</span>
											{visuals.map((v, idx) => (
												<button
													key={v.id}
													type="button"
													onClick={() => setTechIndex(idx)}
													aria-label={`Show technical skill ${v.label}`}
													className={`w-2.5 h-2.5 rounded-full transition-colors ${
														idx === techIndex
															? "bg-[#E5A93C]"
															: "bg-zinc-600 hover:bg-zinc-400"
													}`}
												/>
											))}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>

				{/* Row 3: Personal & Soft Skills */}
				<section className="rounded-2xl bg-[#171B22]/92 border border-white/15 p-6 sm:p-10 shadow-2xl">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
						<div className="lg:col-span-5">
							<div className="aspect-[4/4.2] max-w-[380px] mx-auto rounded-xl overflow-hidden border border-white/15 bg-[#0D0F12] shadow-lg">
								<TemplateMediaFrame
									src={data.skills.softPhotoSrc}
									alt={data.skills.softTitle}
									variant="portrait"
									title={data.skills.softTitle}
									className="w-full h-full"
									imgClassName="object-cover object-[50%_20%]"
								/>
							</div>
						</div>

						<div className="lg:col-span-7 lg:text-right space-y-3">
							<div className="inline-flex items-center gap-2 font-rajdhani text-xs font-bold uppercase tracking-[0.16em] text-[#E5A93C]">
								<Sparkles className="w-4 h-4" />
								<span>Interpersonal &amp; Work Ethic</span>
							</div>
							<h2 className="font-display text-2xl sm:text-3xl text-[#F4F4F5]">
								{data.skills.softTitle}
							</h2>
							<p className="font-garamond text-xl font-semibold text-[#E5A93C]">
								{data.skills.softTraits}
							</p>
							<p className="font-lora text-base text-zinc-200 leading-relaxed max-w-2xl lg:ml-auto">
								{data.skills.softDetails}
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};
