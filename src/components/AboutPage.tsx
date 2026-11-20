import React, { useRef, useState } from "react";
import {
	ArrowRight,
	Award,
	Camera,
	Film,
	FolderGit2,
	GraduationCap,
	Maximize2,
	Pause,
	Play,
	Sparkles,
	Users,
} from "lucide-react";
import type { PageRoute, PortfolioData } from "../data/portfolioData";
import { parseVideoSource } from "../utils/portfolioHelpers";
import {
	TemplateMediaFrame,
	type TemplateVisualVariant,
} from "./TemplateVisuals";

interface AboutPageProps {
	data: PortfolioData;
	onNavigate: (route: PageRoute) => void;
}

interface HubCardConfig {
	route: PageRoute;
	key: "education" | "achievements" | "skills" | "projects" | "hobbies";
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	variant: TemplateVisualVariant;
	recommendedPath: string;
}

const HUB_CARDS: HubCardConfig[] = [
	{
		route: "education",
		key: "education",
		title: "Education",
		icon: GraduationCap,
		variant: "education",
		recommendedPath: "/media/covers/Education_Cover.jpg",
	},
	{
		route: "achievements",
		key: "achievements",
		title: "Achievements & Co-Curricular Activities",
		icon: Award,
		variant: "deans-earned",
		recommendedPath: "/media/covers/Achievements_Cover.jpg",
	},
	{
		route: "skills",
		key: "skills",
		title: "Key Skills",
		icon: Sparkles,
		variant: "skills",
		recommendedPath: "/media/covers/Skills_Cover.jpg",
	},
	{
		route: "projects",
		key: "projects",
		title: "Projects",
		icon: FolderGit2,
		variant: "project",
		recommendedPath: "/media/covers/Projects_Cover.jpg",
	},
	{
		route: "hobbies",
		key: "hobbies",
		title: "Interests",
		icon: Camera,
		variant: "hobby",
		recommendedPath: "/media/covers/Interests_Cover.webp",
	},
];

function formatSeconds(sec: number): string {
	if (!Number.isFinite(sec) || sec < 0) return "0:00";
	const mins = Math.floor(sec / 60);
	const secs = Math.floor(sec % 60);
	return `${mins}:${String(secs).padStart(2, "0")}`;
}

export const AboutPage: React.FC<AboutPageProps> = ({ data, onNavigate }) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const playerBoxRef = useRef<HTMLDivElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	const resolvedVideo = parseVideoSource(data.about.videoIntro.src);

	const togglePlayPause = () => {
		const vid = videoRef.current;
		if (!vid) return;
		if (vid.paused) {
			vid.play().catch(() => {});
		} else {
			vid.pause();
		}
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const vid = videoRef.current;
		const next = Number(e.target.value);
		if (!vid || !Number.isFinite(next)) return;
		vid.currentTime = next;
		setCurrentTime(next);
	};

	const handleMaximize = () => {
		const container = playerBoxRef.current;
		const vid = videoRef.current;
		if (container && container.requestFullscreen) {
			container.requestFullscreen().catch(() => {
				if (vid && vid.requestFullscreen) {
					vid.requestFullscreen().catch(() => {});
				}
			});
		} else if (vid && vid.requestFullscreen) {
			vid.requestFullscreen().catch(() => {});
		}
	};

	return (
		<div className="relative w-full min-h-screen bg-[#0D0F12] overflow-hidden">
			{/* Page Background Photo Visible Wherever No Card Covers It */}
			{data.about.bannerBackdropSrc.trim() && (
				<div
					aria-hidden="true"
					className="fixed inset-0 top-16 pointer-events-none z-0 opacity-60 bg-cover bg-[50%_24%]"
					style={{ backgroundImage: `url("${data.about.bannerBackdropSrc}")` }}
				/>
			)}
			<div
				aria-hidden="true"
				className="fixed inset-0 top-16 pointer-events-none z-0 bg-gradient-to-b from-[#0D0F12]/45 via-transparent to-[#0D0F12]/65"
			/>

			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
				{/* Heading Card */}
				<section className="rounded-2xl bg-[#12151A]/85 border border-white/15 py-10 px-6 text-center shadow-xl">
					<h1 className="font-display text-3xl sm:text-5xl text-[#F4F4F5]">
						{data.about.headingPrefix}{" "}
						<span className="font-cursive text-[#E5A93C] sm:text-6xl font-bold">
							{data.about.headingHighlight}
						</span>
					</h1>
				</section>

				{/* Centered Video Introduction Block */}
				<section className="max-w-3xl mx-auto rounded-2xl bg-[#12151A]/90 border border-white/15 p-5 sm:p-8 shadow-2xl space-y-4">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<h2 className="font-display text-xl sm:text-2xl text-[#F4F4F5] flex items-center gap-2.5">
							<Film className="w-5 h-5 text-[#E5A93C] shrink-0" />
							<span>{data.about.videoIntro.title}</span>
						</h2>
						<span className="font-rajdhani text-xs font-bold uppercase tracking-wider text-[#E5A93C] tabular-nums">
							{data.about.videoIntro.durationLabel}
						</span>
					</div>

					{resolvedVideo.kind === "native" ? (
						<div
							ref={playerBoxRef}
							className="rounded-xl overflow-hidden border border-white/15 bg-black shadow-xl flex flex-col"
						>
							<div className="aspect-video w-full bg-black relative">
								<video
									ref={videoRef}
									controls
									muted
									preload="metadata"
									src={resolvedVideo.src}
									onPlay={() => setIsPlaying(true)}
									onPause={() => setIsPlaying(false)}
									onEnded={() => setIsPlaying(false)}
									onLoadedMetadata={(e) =>
										setDuration(e.currentTarget.duration || 0)
									}
									onTimeUpdate={(e) =>
										setCurrentTime(e.currentTarget.currentTime || 0)
									}
									className="w-full h-full object-contain bg-black"
								>
									Your browser does not support embedded video playback.
								</video>
							</div>

							{/* Explicit Play/Pause, Scrollable Timeline, and Maximize Controls */}
							<div className="px-4 py-3 bg-[#171B22] border-t border-white/10 flex items-center gap-3">
								<button
									type="button"
									onClick={togglePlayPause}
									aria-label={isPlaying ? "Pause video" : "Play video"}
									className="w-9 h-9 rounded-lg bg-[#E5A93C] hover:bg-[#f0b950] text-[#0D0F12] flex items-center justify-center shrink-0 transition-colors"
								>
									{isPlaying ? (
										<Pause className="w-4 h-4" />
									) : (
										<Play className="w-4 h-4" />
									)}
								</button>

								<span className="font-mono text-xs text-zinc-300 tabular-nums shrink-0">
									{formatSeconds(currentTime)}
								</span>

								<input
									type="range"
									min={0}
									max={duration > 0 ? duration : 15}
									step={0.1}
									value={currentTime}
									onChange={handleSeek}
									aria-label="Video playback timeline"
									className="flex-1 accent-[#E5A93C] cursor-pointer h-1.5"
								/>

								<span className="font-mono text-xs text-zinc-400 tabular-nums shrink-0">
									{formatSeconds(duration)}
								</span>

								<button
									type="button"
									onClick={handleMaximize}
									aria-label="Maximize video fullscreen"
									className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#14323A] hover:bg-[#19404a] border border-white/15 text-xs font-rajdhani font-bold uppercase tracking-wider text-[#F4F4F5] inline-flex items-center gap-1.5 shrink-0 transition-colors"
								>
									<Maximize2 className="w-3.5 h-3.5 text-[#E5A93C]" />
									<span className="hidden sm:inline">Maximize</span>
								</button>
							</div>
						</div>
					) : resolvedVideo.kind === "iframe" ? (
						<div className="aspect-video rounded-xl overflow-hidden border border-white/15 bg-black shadow-xl">
							<iframe
								src={resolvedVideo.embedUrl}
								title={data.about.videoIntro.title}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="w-full h-full border-0"
							/>
						</div>
					) : (
						<div className="aspect-video rounded-xl border border-white/15 bg-[#12151A] p-6 flex flex-col items-center justify-center text-center">
							<Film className="w-9 h-9 text-[#E5A93C] mb-3" />
							<p className="font-lora text-sm text-zinc-300 max-w-md">
								Video source unavailable.
							</p>
						</div>
					)}
				</section>

				{/* Open Gap Here Reveals About_Me_Page_background.jpg Directly After Video Block */}

				{/* Text About Me + Extracurriculars Card */}
				<section className="rounded-2xl bg-[#171B22]/90 border border-white/15 p-6 sm:p-10 shadow-xl space-y-6">
					<div>
						<p className="font-rajdhani text-xs font-bold uppercase tracking-[0.18em] text-[#C96428] mb-1">
							Statement
						</p>
					</div>

					<div className="space-y-4 font-lora text-base text-zinc-200 leading-relaxed">
						{data.about.bioParagraphs.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
				</section>

				{/* Portfolio Directory (Clean Title + 5 Clickable Cards Without Card Subtexts) */}
				<section id="portfolio-directory" className="space-y-8 pb-6">
					<div className="rounded-xl bg-[#12151A]/85 border border-white/15 py-5 px-6 text-center max-w-xl mx-auto shadow-lg">
						<h2 className="font-display text-2xl sm:text-3xl text-[#F4F4F5]">
							Portfolio Directory
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{HUB_CARDS.slice(0, 2).map((card) => (
							<AboutHubCard
								key={card.route}
								card={card}
								imgSrc={data.about.hubCardImages[card.key]}
								onSelect={() => onNavigate(card.route)}
							/>
						))}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{HUB_CARDS.slice(2).map((card) => (
							<AboutHubCard
								key={card.route}
								card={card}
								imgSrc={data.about.hubCardImages[card.key]}
								onSelect={() => onNavigate(card.route)}
							/>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

function AboutHubCard({
	card,
	imgSrc,
	onSelect,
}: {
	card: HubCardConfig;
	imgSrc: string;
	onSelect: () => void;
}) {
	const Icon = card.icon;
	return (
		<button
			type="button"
			onClick={onSelect}
			className="group relative text-left rounded-xl overflow-hidden bg-[#171B22]/95 border border-white/15 hover:border-[#E5A93C] transition-colors shadow-xl focus-visible:outline-2 focus-visible:outline-[#E5A93C]"
		>
			<div className="relative aspect-[16/10] w-full overflow-hidden bg-[#12151A]">
				<TemplateMediaFrame
					src={imgSrc}
					alt={card.title}
					variant={card.variant}
					title={card.title}
					recommendedPath={card.recommendedPath}
					className="w-full h-full group-hover:scale-[1.03] transition-transform duration-200"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171B22]/60 via-transparent to-black/15"
				/>
			</div>
			<div className="p-5 flex items-center justify-between gap-4 border-t border-white/10 bg-[#171B22]">
				<div className="flex items-center gap-2.5 text-[#E5A93C] font-display text-lg sm:text-xl min-w-0">
					<Icon className="w-5 h-5 shrink-0" />
					<span className="truncate">{card.title}</span>
				</div>
				<ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-[#E5A93C] group-hover:translate-x-1 transition-all shrink-0" />
			</div>
		</button>
	);
}
