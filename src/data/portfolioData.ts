export type PageRoute =
	| "home"
	| "about"
	| "education"
	| "achievements"
	| "skills"
	| "projects"
	| "hobbies"
	| "contact";

export interface PersonalPhoto {
	id: string;
	title: string;
	caption: string;
	src: string;
	recommendedPath: string;
	aspectHint: string;
}

export interface EducationItem {
	id: string;
	degree: string;
	field: string;
	institution: string;
	year: string;
	result: string;
	details: string;
	status: "Completed" | "In Progress";
	certificateSrc: string;
	rowBackdropSrc?: string;
	pdfUrl?: string;
	recommendedPath: string;
}

export interface DeansAwardItem {
	id: string;
	semester: string;
	faculty: string;
	gpa: string;
	issueDate: string;
	status: "earned" | "pending";
	serialNumber?: string;
	studentId?: string;
	note: string;
	certificateSrc: string;
	secondarySrc?: string;
	secondaryLabel?: string;
	pdfUrl?: string;
	noticePdfUrl?: string;
	recommendedPath: string;
}

export interface OtherAchievementItem {
	id: string;
	title: string;
	issuer: string;
	year: string;
	certificateSrc: string;
	pdfUrl?: string;
	recommendedPath: string;
}

export interface TechnicalSkillVisual {
	id: string;
	label: string;
	category: string;
	src: string;
}

export interface TechnicalShowcaseSlide {
	id: string;
	label: string;
	caption: string;
	src: string;
	recommendedPath: string;
}

export interface ProjectScreenshot {
	src: string;
	caption: string;
}

export interface ProjectRepository {
	label: string;
	url: string;
}

export interface ProjectItem {
	id: string;
	name: string;
	summary: string;
	stack: string;
	screenshots: ProjectScreenshot[];
	repositories: ProjectRepository[];
}

export interface HobbyItem {
	id: string;
	title: string;
	description: string;
	src: string;
	recommendedPath: string;
}

export interface AcademicReference {
	name: string;
	title: string;
	institution: string;
	email: string;
}

export interface PortfolioData {
	brand: {
		siteNameCursive: string;
		logoBadgeText: string;
		fullName: string;
		greeting: string;
		currentStatus: string;
		statusInstitution: string;
		heroSummary: string;
		cvPdfUrl: string;
		cvDownloadFilename: string;
		heroBackdropSrc: string;
		heroBackdropPath: string;
	};
	photos: {
		heroPortrait: PersonalPhoto;
	};
	about: {
		headingPrefix: string;
		headingHighlight: string;
		bannerBackdropSrc: string;
		videoIntro: {
			title: string;
			durationLabel: string;
			fileSizeNote: string;
			src: string;
			recommendedPath: string;
		};
		bioParagraphs: string[];
		extracurriculars: string[];
		references: AcademicReference[];
		hubCardImages: Record<
			"education" | "achievements" | "skills" | "projects" | "hobbies",
			string
		>;
	};
	educationBannerBackdropSrc: string;
	education: EducationItem[];
	achievements: {
		pageBackdropSrc: string;
		deansAwards: DeansAwardItem[];
		otherAwards: OtherAchievementItem[];
	};
	skills: {
		pageBackdropSrc: string;
		speakingBackdropSrc: string;
		speakingTitle: string;
		speakingLanguages: string;
		speakingDetails: string;
		speakingPhotoSrc: string;
		technicalTitle: string;
		technicalList: string[];
		technicalVisuals: TechnicalSkillVisual[];
		technicalSlides: TechnicalShowcaseSlide[];
		softTitle: string;
		softTraits: string;
		softDetails: string;
		softPhotoSrc: string;
	};
	projectsBackdropSrc: string;
	projects: ProjectItem[];
	hobbiesBackdropSrc: string;
	hobbies: HobbyItem[];
	contact: {
		bannerBackdropSrc: string;
		personalEmail: string;
		academicEmail: string;
		phone: string;
		addressLines: string[];
		addressNote: string;
		mapsUrl: string;
		githubUrl: string;
		githubRepoLabel: string;
	};
}

const crisisConnectScreenshots: ProjectScreenshot[] = Array.from(
	{ length: 10 },
	(_, idx) => {
		const num = String(idx + 1).padStart(2, "0");
		const captions = [
			"Sign In portal for Admins, NGOs, Volunteers, and Donors",
			"Two-factor authentication verification view for secure login",
			"Admin and relief operations control interface",
			"Admin profile editing and account management view",
			"All crisis view showing all active and resolved crises",
			"Create a new crisis view",
			"Showcasing all active users of the platform",
			"Filtering all users by NGO role and active account status",
			"All announcement view showcasing all announcements",
			"Individual announcement view showing assigned recipients",
		];
		return {
			src: `/media/projects/crisisconnect/CrisiscConnect_Ss_${num}.png`,
			caption: `CrisisConnect — Screen ${num}: ${captions[idx] ?? "Application View"}`,
		};
	},
);

const skillSwapScreenshots: ProjectScreenshot[] = Array.from(
	{ length: 11 },
	(_, idx) => {
		const num = String(idx + 1).padStart(2, "0");
		const captions = [
			"SkillSwap landing page connecting learners and mentors",
			"Mentor's Dashboard with profile management, manage skills and statistics view",
			"Mentor profile view with view-only and edit mode ",
			"Review for mentors previous sessions and feedback view",
			"Learner's Dashboard with profile management, browse skills and view my skills options",
			"View my skills tab with pending, ongoing and completed sessions",
			"Browse skill tab with only learner's selected skills category offerings",
			"Browse skill tab with all available skills category offerings",
			"Demonstration of search option for skills browsing",
			"Detailed view of a specific skills offering",
			"Detailed view of a specific skills offering with booking details and session scheduling options",
		];
		return {
			src: `/media/projects/skillswap/SkillSwap_Ss_${num}.png`,
			caption: `SkillSwap — Screen ${num}: ${captions[idx] ?? "Application View"}`,
		};
	},
);

export const defaultPortfolioData: PortfolioData = {
	brand: {
		siteNameCursive: "Stephen Argho Das",
		logoBadgeText: "CV",
		fullName: "Stephen Argho Das",
		greeting: "Hello,",
		currentStatus:
			"Undergraduate Student at American International University-Bangladesh (AIUB) ",
		statusInstitution: "B.Sc. in Computer Science & Engineering",
		heroSummary: "",
		cvPdfUrl: "/media/Stephen_Argho_Das_CV.pdf",
		cvDownloadFilename: "Stephen_Argho_Das_CV.pdf",
		heroBackdropSrc: "/media/backgrounds/Home_Page_background.jpg",
		heroBackdropPath: "/media/backgrounds/Home_Page_background.jpg",
	},
	photos: {
		heroPortrait: {
			id: "hero-portrait",
			title: "Stephen Argho Das",
			caption: "B.Sc. CSE Undergraduate · AIUB",
			src: "/media/portrait/Personal_Photo_Home_Page.jpg",
			recommendedPath: "/media/portrait/Personal_Photo_Home_Page.jpg",
			aspectHint: "Formal Headshot",
		},
	},
	about: {
		headingPrefix: "About",
		headingHighlight: "Stephen Argho Das",
		bannerBackdropSrc: "/media/backgrounds/About_Me_Page_background.jpg",
		videoIntro: {
			title: "Self-Introduction Video",
			durationLabel: "1:00 – 1:30 min",
			fileSizeNote: "",
			src: "/media/Intro_Video.mp4",
			recommendedPath: "/media/intro-video.mp4",
		},
		bioParagraphs: [
			"Stephen Argho Das is an undergraduate student pursuing a Bachelor of Science in Computer Science & Engineering at American International University-Bangladesh (AIUB), currently holding a 3.99 / 4.00 CGPA across 133 completed credits out of 148 credits. His academic objective is to build a strong career in web development and software engineering by applying technical rigor, enthusiasm, hard work, and integrity in collaborative engineering teams. He has been recognized three times on the AIUB Faculty of Science & Technology Dean’s List Honors (Fall 2024–2025, Spring 2024–2025, and Fall 2025–2026), and outside coursework he stays active in the AIUB Robotics Crew and works on full-stack software projects.",
		],
		extracurriculars: [""],
		references: [
			{
				name: "Prof. Dr. Dip Nandi",
				title: "Dean, Faculty of Science & Technology (FST)",
				institution: "American International University-Bangladesh (AIUB)",
				email: "dip.nandi@aiub.edu",
			},
			{
				name: "Dr. Muhammad Firoz Mridha",
				title: "Head, Department of Computer Science [Undergraduate Program]",
				institution: "American International University-Bangladesh (AIUB)",
				email: "firoz.mridha@aiub.edu",
			},
			{
				name: "Dr. Firoz Ahmed",
				title: "Professor, Department of Computer Science",
				institution: "American International University-Bangladesh (AIUB)",
				email: "fahmed@aiub.edu",
			},
		],
		hubCardImages: {
			education: "/media/covers/Education_Cover.jpg",
			achievements: "/media/covers/Achievements_Cover.jpg",
			skills: "/media/covers/Skills_Cover.jpg",
			projects: "/media/covers/Projects_Cover.jpg",
			hobbies: "/media/covers/Interests_Cover.webp",
		},
	},
	educationBannerBackdropSrc:
		"/media/backgrounds/Education_Page_Background.jpg",
	education: [
		{
			id: "edu-bsc",
			degree:
				"Bachelor of Science in Computer Science & Engineering (B.Sc. CSE)",
			field: "",
			institution: "American International University-Bangladesh (AIUB)",
			year: "Fall 2023–24 – Present (9 Semesters)",
			result:
				"CGPA: 3.99 / 4.00 (after 9 semesters), Credits Completed: 133/148",
			details: "Faculty of Science & Technology",
			status: "In Progress",
			certificateSrc: "/media/certificates/Undergraduate_Status.png",
			rowBackdropSrc: "/media/backgrounds/AIUB_Degree_Background.jpg",
			recommendedPath: "/media/certificates/Undergraduate_Status.png",
		},
		{
			id: "edu-hsc",
			degree: "Higher Secondary Certificate (HSC)",
			field: "Science Group · Board: Dhaka",
			institution: "Notre Dame College",
			year: "2022 (Published 8 February 2023)",
			result: "GPA: 5.00 / 5.00  ",
			details: "",
			status: "Completed",
			certificateSrc: "/media/certificates/HSC_2022.png",
			rowBackdropSrc: "/media/backgrounds/Notre_Dame_Background.jpg",
			pdfUrl: "/media/certificates/HSC_2022.pdf",
			recommendedPath: "/media/certificates/HSC_2022.png",
		},
		{
			id: "edu-ssc",
			degree: "Secondary School Certificate (SSC)",
			field: "Science Group · Board: Dhaka",
			institution: "St. Joseph Higher Secondary School",
			year: "2020 (Published 31 May 2020)",
			result: "GPA: 5.00 / 5.00",
			details: "",
			status: "Completed",
			certificateSrc: "/media/certificates/SSC_2020.png",
			rowBackdropSrc: "/media/backgrounds/St.Joseph_Background.jpg",
			pdfUrl: "/media/certificates/SSC_2020.pdf",
			recommendedPath: "/media/certificates/SSC_2020.png",
		},
	],
	achievements: {
		pageBackdropSrc: "/media/covers/Achievements_Cover.jpg",
		deansAwards: [
			{
				id: "deans-fall-24-25",
				semester: "Fall 2024–2025",
				faculty: "Faculty of Science & Technology, AIUB",
				gpa: "GPA: 4.00 (Official Certificate Issued)",
				issueDate: "Issued 26 June 2025",
				status: "earned",
				studentId: "23-54439-3",
				note: "Official Dean’s List Honors certificate awarded for earning a 4.00 GPA in Fall 2024–2025.",
				certificateSrc: "/media/certificates/Deans_List_Fall_2024-25.png",
				pdfUrl: "/media/certificates/Deans_List_Fall_2024-25.pdf",
				recommendedPath: "/media/certificates/Deans_List_Fall_2024-25.png",
			},
			{
				id: "deans-spring-24-25",
				semester: "Spring 2024–2025",
				faculty: "Faculty of Science & Technology, AIUB",
				gpa: "Serial No. 182 (Student ID: 23-54439-3)",
				issueDate:
					"FST Official Dean’s List Notice, Page: 5 (Certificate Awaited)",
				status: "earned",
				serialNumber: "182",
				studentId: "23-54439-3",
				note: "Listed at Serial Number 182 on Page 5 of the official FST Dean’s List Honors notice (Spring 2024–2025); physical certificate awaiting faculty distribution.",
				certificateSrc:
					"/media/certificates/Deans_List_Notice_Spring24-25_p5.png",
				noticePdfUrl:
					"/media/certificates/deans-list_award_fst_spring-24-25-to-fall-25-26.pdf#page=5",
				recommendedPath:
					"/media/certificates/Deans_List_Notice_Spring24-25_p5.png",
			},
			{
				id: "deans-fall-25-26",
				semester: "Fall 2025–2026",
				faculty: "Faculty of Science & Technology, AIUB",
				gpa: "Serial No. 115 (Student ID: 23-54439-3)",
				issueDate:
					"FST Official Dean’s List Notice, Page: 16 (Certificate Awaited)",
				status: "pending",
				serialNumber: "115",
				studentId: "23-54439-3",
				note: "Listed at Serial Number 115 on Page 16 of the official FST Dean’s List Honors notice (Fall 2025–2026); physical certificate yet to be distributed.",
				certificateSrc:
					"/media/certificates/Deans_List_Notice_Fall25-26_p16.png",
				noticePdfUrl:
					"/media/certificates/deans-list_award_fst_spring-24-25-to-fall-25-26.pdf#page=16",
				recommendedPath:
					"/media/certificates/Deans_List_Notice_Fall25-26_p16.png",
			},
		],
		otherAwards: [
			{
				id: "award-fest-59",
				title: "59th Annual Science Festival — Scrap Book Fair",
				issuer: "Scintilla Science Club, St. Joseph Higher Secondary School",
				year: "2015",
				certificateSrc: "/media/certificates/Co_Curricular_Science_Fest_59.png",
				pdfUrl: "/media/certificates/Co_Curricular_Science_Fest_59.pdf",
				recommendedPath:
					"/media/certificates/Co_Curricular_Science_Fest_59.png",
			},
			{
				id: "award-fest-57",
				title: "57th Annual Science Festival — Science Fair",
				issuer: "Scintilla Science Club, St. Joseph Higher Secondary School",
				year: "2013",
				certificateSrc: "/media/certificates/Co_Curricular_Science_Fest_57.png",
				pdfUrl: "/media/certificates/Co_Curricular_Science_Fest_57.pdf",
				recommendedPath:
					"/media/certificates/Co_Curricular_Science_Fest_57.png",
			},
			{
				id: "award-fest-56",
				title: "56th Annual Science Festival — Scrap Book Fair",
				issuer: "Scintilla Science Club, St. Joseph Higher Secondary School",
				year: "2012",
				certificateSrc: "/media/certificates/Co_Curricular_Science_Fest_56.png",
				pdfUrl: "/media/certificates/Co_Curricular_Science_Fest_56.pdf",
				recommendedPath:
					"/media/certificates/Co_Curricular_Science_Fest_56.png",
			},
		],
	},
	skills: {
		pageBackdropSrc: "/media/covers/Skills_Cover.jpg",
		speakingBackdropSrc: "/media/skills/Communication_background.png",
		speakingTitle: "Communication and Presentation",
		speakingLanguages:
			"Fluent in  English and Bengali, Intermediate understanding of Hindi and Urdu",
		speakingDetails: "",
		speakingPhotoSrc: "/media/skills/Communication_background.png",
		technicalTitle: "Technical Skills",
		technicalList: [
			"Programming Languages: Python, JavaScript, TypeScript, C#, C++, PHP, Java",
			"Web Technologies: HTML, CSS, Bootstrap, Tailwind CSS, React, Next.js, NestJS, Node.js",
			"Databases: MySQL, PostgreSQL (with TypeORM)",
			"Tools & Software: Git, GitHub, Visual Studio Code, Visual Studio 2026, Microsoft Office Suite, Adobe Photoshop, Illustrator, SolidWorks, AutoCAD",
		],
		technicalVisuals: [
			{
				id: "tech-js",
				label: "JavaScript",
				category: "Programming & Web Logic",
				src: "/media/skills/Technical_skill_background_01.png",
			},
			{
				id: "tech-cpp",
				label: "C++",
				category: "Core Systems & Algorithms",
				src: "/media/skills/Technical_skill_background_02.webp",
			},
			{
				id: "tech-react",
				label: "React JS",
				category: "Component UI Engineering",
				src: "/media/skills/Technical_skill_background_03.png",
			},
			{
				id: "tech-next",
				label: "Next.js",
				category: "Full-Stack React Framework",
				src: "/media/skills/Technical_skill_background_04.png",
			},
			{
				id: "tech-vscode",
				label: "Visual Studio Code",
				category: "Primary Development IDE",
				src: "/media/skills/Technical_skill_background_05.png",
			},
			{
				id: "tech-office",
				label: "Microsoft Office Suite",
				category: "Documentation & Reporting",
				src: "/media/skills/Technical_skill_background_06.jpg",
			},
		],
		technicalSlides: [
			{
				id: "slide-crisisconnect",
				label: "Next.js, NestJS & PostgreSQL (CrisisConnect)",
				caption:
					"Full-stack crisis-relief web architecture built with TypeORM and Tailwind CSS",
				src: "/media/projects/crisisconnect/CrisiscConnect_Ss_01.png",
				recommendedPath:
					"/media/projects/crisisconnect/CrisiscConnect_Ss_01.png",
			},
			{
				id: "slide-skillswap",
				label: "JavaScript MVC & PHP Backend (SkillSwap)",
				caption:
					"Peer learning and mentorship application with MVC frontend and PHP/SQL server",
				src: "/media/projects/skillswap/SkillSwap_Ss_01.png",
				recommendedPath: "/media/projects/skillswap/SkillSwap_Ss_01.png",
			},
			{
				id: "slide-problem",
				label: "Analytical Problem Solving & Design",
				caption:
					"Algorithms, system modeling, CAD (SolidWorks / AutoCAD), and visual design tools",
				src: "/media/hobbies/Problem_Photo.jpg",
				recommendedPath: "/media/hobbies/Problem_Photo.jpg",
			},
		],
		softTitle: "Personal Skills",
		softTraits:
			"Energetic, analytical, punctual, hardworking, diligent, critical thinker, highly adaptable & efficient in resource management",
		softDetails: "",
		softPhotoSrc: "/media/skills/Personal_Skill_background.jpg",
	},
	projectsBackdropSrc: "/media/covers/Projects_Cover.jpg",
	projects: [
		{
			id: "crisisconnect",
			name: "CrisisConnect",
			summary:
				"A crisis-relief coordination website platform connecting Admins, NGOs, Volunteers, and Donors on one platform. Frontend built with Next.js and TailwindCSS, Backend on NestJS, Database powered by PostgreSQL with TypeORM, running on Node.js.",
			stack: "Next.js, TailwindCSS, NestJS, PostgreSQL, TypeORM, Node.js",
			screenshots: crisisConnectScreenshots,
			repositories: [
				{
					label: "Frontend Repository",
					url: "https://github.com/Rezwoan/CrisisConnect-Frontend",
				},
				{
					label: "Backend Repository",
					url: "https://github.com/Rezwoan/CrisisConnect-Backend",
				},
			],
		},
		{
			id: "skillswap",
			name: "SkillSwap",
			summary:
				"A peer learning and mentorship website platform connecting enthusiastic learners with passionate teachers. Built with a JavaScript MVC frontend and CSS styling, paired with a PHP backend, database, and server.",
			stack: "JavaScript (MVC), CSS, PHP, Relational Database",
			screenshots: skillSwapScreenshots,
			repositories: [
				{
					label: "Project Repository",
					url: "https://github.com/steve-A7/skillswap",
				},
			],
		},
	],
	hobbiesBackdropSrc: "/media/covers/Interests_Cover.webp",
	hobbies: [
		{
			id: "hobby-problem-solving",
			title: "Problem-Solving",
			description: "",
			src: "/media/hobbies/Problem_Photo.jpg",
			recommendedPath: "/media/hobbies/Problem_Photo.jpg",
		},
		{
			id: "hobby-music",
			title: "Music Streaming",
			description: "",
			src: "/media/hobbies/Music_Photo.jpg",
			recommendedPath: "/media/hobbies/Music_Photo.jpg",
		},
		{
			id: "hobby-movies",
			title: "Watching Movies & Series",
			description: "",
			src: "/media/hobbies/Movies_Photo.png",
			recommendedPath: "/media/hobbies/Movies_Photo.png",
		},
		{
			id: "hobby-travelling",
			title: "Travelling",
			description: "",
			src: "/media/hobbies/Travelling_Photo.jpg",
			recommendedPath: "/media/hobbies/Travelling_Photo.jpg",
		},
	],
	contact: {
		bannerBackdropSrc: "/media/backgrounds/Contact_Page_background.jpg",
		personalEmail: "steve900032@gmail.com",
		academicEmail: "23-54439-3@student.aiub.edu",
		phone: "+880 1784327504",
		addressLines: ["Townhall, Mohammadpur", "Dhaka-1207, Bangladesh"],
		addressNote:
			"General area given for privacy; exact location not disclosed.",
		mapsUrl: "https://maps.app.goo.gl/4oxo1KTCiHiAB5HZA",
		githubUrl: "https://github.com/steve-A7",
		githubRepoLabel: "GitHub · steve-A7",
	},
};
