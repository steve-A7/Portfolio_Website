import { defaultPortfolioData, type PageRoute, type PortfolioData } from '../data/portfolioData';

export type VideoSourceKind =
  | { kind: 'empty' }
  | { kind: 'native'; src: string }
  | { kind: 'iframe'; embedUrl: string; provider: 'youtube' | 'drive' | 'vimeo' };

const VALID_ROUTES: ReadonlySet<PageRoute> = new Set([
  'home',
  'about',
  'education',
  'achievements',
  'skills',
  'projects',
  'hobbies',
  'contact',
]);

export function parseRouteFromHash(hash: string): PageRoute {
  const cleaned = hash.replace(/^#\/?/, '').trim().toLowerCase() as PageRoute;
  return VALID_ROUTES.has(cleaned) ? cleaned : 'home';
}

export function routeToHash(route: PageRoute): string {
  return route === 'home' ? '#/' : `#/${route}`;
}

export function parseVideoSource(rawUrl: string): VideoSourceKind {
  const url = rawUrl.trim();
  if (!url) {
    return { kind: 'empty' };
  }

  if (
    url.startsWith('blob:') ||
    url.startsWith('/') ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)
  ) {
    return { kind: 'native', src: url };
  }

  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      kind: 'iframe',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`,
      provider: 'youtube',
    };
  }

  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return {
      kind: 'iframe',
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
      provider: 'drive',
    };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      kind: 'iframe',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      provider: 'vimeo',
    };
  }

  return { kind: 'native', src: url };
}

export function formatFileSizeMb(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 MB';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(2)} GB`;
  }
  return `${mb.toFixed(1)} MB`;
}

export function isVideoWithinRecommendedLimit(bytes: number): {
  within1Gb: boolean;
  needsCompressionForStaticHost: boolean;
} {
  const oneGb = 1024 * 1024 * 1024;
  const hundredMb = 100 * 1024 * 1024;
  return {
    within1Gb: bytes <= oneGb,
    needsCompressionForStaticHost: bytes > hundredMb,
  };
}

export function wrapCarouselIndex(current: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return ((current + delta) % total + total) % total;
}

export function mergePortfolioData(
  base: PortfolioData,
  partial: Partial<PortfolioData> | null | undefined
): PortfolioData {
  if (!partial || typeof partial !== 'object') {
    return base;
  }

  return {
    brand: { ...base.brand, ...(partial.brand ?? {}) },
    photos: {
      heroPortrait: {
        ...base.photos.heroPortrait,
        ...(partial.photos?.heroPortrait ?? {}),
      },
    },
    about: {
      ...base.about,
      ...(partial.about ?? {}),
      videoIntro: {
        ...base.about.videoIntro,
        ...(partial.about?.videoIntro ?? {}),
      },
      hubCardImages: {
        ...base.about.hubCardImages,
        ...(partial.about?.hubCardImages ?? {}),
      },
      bioParagraphs: Array.isArray(partial.about?.bioParagraphs)
        ? partial.about.bioParagraphs
        : base.about.bioParagraphs,
      extracurriculars: Array.isArray(partial.about?.extracurriculars)
        ? partial.about.extracurriculars
        : base.about.extracurriculars,
      references: Array.isArray(partial.about?.references)
        ? partial.about.references
        : base.about.references,
    },
    educationBannerBackdropSrc:
      typeof partial.educationBannerBackdropSrc === 'string'
        ? partial.educationBannerBackdropSrc
        : base.educationBannerBackdropSrc,
    education: Array.isArray(partial.education) ? partial.education : base.education,
    achievements: {
      pageBackdropSrc:
        typeof partial.achievements?.pageBackdropSrc === 'string'
          ? partial.achievements.pageBackdropSrc
          : base.achievements.pageBackdropSrc,
      deansAwards: Array.isArray(partial.achievements?.deansAwards)
        ? partial.achievements.deansAwards
        : base.achievements.deansAwards,
      otherAwards: Array.isArray(partial.achievements?.otherAwards)
        ? partial.achievements.otherAwards
        : base.achievements.otherAwards,
    },
    skills: {
      ...base.skills,
      ...(partial.skills ?? {}),
      technicalList: Array.isArray(partial.skills?.technicalList)
        ? partial.skills.technicalList
        : base.skills.technicalList,
      technicalVisuals: Array.isArray(partial.skills?.technicalVisuals)
        ? partial.skills.technicalVisuals
        : base.skills.technicalVisuals,
      technicalSlides: Array.isArray(partial.skills?.technicalSlides)
        ? partial.skills.technicalSlides
        : base.skills.technicalSlides,
    },
    projectsBackdropSrc:
      typeof partial.projectsBackdropSrc === 'string'
        ? partial.projectsBackdropSrc
        : base.projectsBackdropSrc,
    projects: Array.isArray(partial.projects) ? partial.projects : base.projects,
    hobbiesBackdropSrc:
      typeof partial.hobbiesBackdropSrc === 'string'
        ? partial.hobbiesBackdropSrc
        : base.hobbiesBackdropSrc,
    hobbies: Array.isArray(partial.hobbies) ? partial.hobbies : base.hobbies,
    contact: {
      ...base.contact,
      ...(partial.contact ?? {}),
      addressLines: Array.isArray(partial.contact?.addressLines)
        ? partial.contact.addressLines
        : base.contact.addressLines,
    },
  };
}

export function generatePortfolioTsExport(data: PortfolioData): string {
  const sanitized = mergePortfolioData(defaultPortfolioData, data);
  return `import type { PortfolioData } from './portfolioData';\n\nexport const defaultPortfolioData: PortfolioData = ${JSON.stringify(
    sanitized,
    null,
    2
  )};\n`;
}
