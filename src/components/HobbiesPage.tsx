import React from "react";
import { ArrowLeft, Compass, Film, Headphones, Puzzle } from "lucide-react";
import type { PageRoute, PortfolioData } from "../data/portfolioData";
import { TemplateMediaFrame } from "./TemplateVisuals";

interface HobbiesPageProps {
	data: PortfolioData;
	onNavigate: (route: PageRoute) => void;
}

const HOBBY_ICONS = [Puzzle, Headphones, Film, Compass];

export const HobbiesPage: React.FC<HobbiesPageProps> = ({
	data,
	onNavigate,
}) => {
	return (
		<div className="relative w-full min-h-screen bg-[#0D0F12] overflow-hidden">
			{/* Hobbies Cover Used as Page Background Visible Around Cards */}
			{data.hobbiesBackdropSrc.trim() && (
				<div
					aria-hidden="true"
					className="fixed inset-0 top-16 pointer-events-none z-0 opacity-45 bg-cover bg-center"
					style={{ backgroundImage: `url("${data.hobbiesBackdropSrc}")` }}
				/>
			)}
			<div
				aria-hidden="true"
				className="fixed inset-0 top-16 pointer-events-none z-0 bg-gradient-to-b from-[#0D0F12]/55 via-[#0D0F12]/45 to-[#0D0F12]/75"
			/>

			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-10">
				{/* Banner Card */}
				<section className="rounded-2xl bg-[#12151A]/88 border border-white/15 py-10 px-6 sm:px-10 shadow-xl">
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
							Interests
						</h1>
					</div>
				</section>

				{/* 4-Card Static Non-Zoomable Photo Showcase */}
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{data.hobbies.map((hobby, index) => {
						const Icon = HOBBY_ICONS[index % HOBBY_ICONS.length];
						return (
							<article
								key={hobby.id}
								className="rounded-xl overflow-hidden bg-[#12151A]/94 border border-white/15 flex flex-col shadow-xl"
							>
								<div className="aspect-[4/3] w-full overflow-hidden">
									<TemplateMediaFrame
										src={hobby.src}
										alt={hobby.title}
										variant="hobby"
										title={hobby.title}
										subtitle={hobby.description}
										recommendedPath={hobby.recommendedPath}
										nonInteractive
										className="w-full h-full"
									/>
								</div>
								<div className="p-5 border-t border-white/10 flex-1">
									<h2 className="font-display text-lg text-[#F4F4F5] flex items-center gap-2">
										<Icon className="w-4 h-4 text-[#E5A93C] shrink-0" />
										<span>{hobby.title}</span>
									</h2>
									<p className="mt-2 font-lora text-sm text-zinc-300 leading-relaxed">
										{hobby.description}
									</p>
								</div>
							</article>
						);
					})}
				</section>
			</div>
		</div>
	);
};
