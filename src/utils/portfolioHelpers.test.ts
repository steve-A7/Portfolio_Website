import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatFileSizeMb,
  generatePortfolioTsExport,
  isVideoWithinRecommendedLimit,
  mergePortfolioData,
  parseRouteFromHash,
  parseVideoSource,
  routeToHash,
  wrapCarouselIndex,
} from './portfolioHelpers';
import { defaultPortfolioData } from '../data/portfolioData';

test('parseRouteFromHash resolves valid routes and falls back to home', () => {
  assert.equal(parseRouteFromHash(''), 'home');
  assert.equal(parseRouteFromHash('#/'), 'home');
  assert.equal(parseRouteFromHash('#/about'), 'about');
  assert.equal(parseRouteFromHash('#/PROJECTS'), 'projects');
  assert.equal(parseRouteFromHash('#/unknown-page'), 'home');
  assert.equal(routeToHash('home'), '#/');
  assert.equal(routeToHash('achievements'), '#/achievements');
});

test('parseVideoSource detects local MP4, YouTube, Google Drive, Vimeo, and empty values', () => {
  assert.deepEqual(parseVideoSource('  '), { kind: 'empty' });
  assert.deepEqual(parseVideoSource('/media/intro-video.mp4'), {
    kind: 'native',
    src: '/media/intro-video.mp4',
  });
  assert.deepEqual(parseVideoSource('https://youtu.be/dQw4w9WgXcQ'), {
    kind: 'iframe',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0',
    provider: 'youtube',
  });
  assert.deepEqual(
    parseVideoSource('https://drive.google.com/file/d/1AbC_DeFgHiJkLmN/view?usp=sharing'),
    {
      kind: 'iframe',
      embedUrl: 'https://drive.google.com/file/d/1AbC_DeFgHiJkLmN/preview',
      provider: 'drive',
    }
  );
  assert.deepEqual(parseVideoSource('https://vimeo.com/123456789'), {
    kind: 'iframe',
    embedUrl: 'https://player.vimeo.com/video/123456789',
    provider: 'vimeo',
  });
});

test('file size helpers evaluate 97MB and 1GB boundaries accurately', () => {
  assert.equal(formatFileSizeMb(97 * 1024 * 1024), '97.0 MB');
  assert.equal(formatFileSizeMb(1024 * 1024 * 1024), '1.00 GB');
  assert.deepEqual(isVideoWithinRecommendedLimit(97 * 1024 * 1024), {
    within1Gb: true,
    needsCompressionForStaticHost: false,
  });
  assert.deepEqual(isVideoWithinRecommendedLimit(1.2 * 1024 * 1024 * 1024), {
    within1Gb: false,
    needsCompressionForStaticHost: true,
  });
});

test('wrapCarouselIndex wraps cleanly in both directions', () => {
  assert.equal(wrapCarouselIndex(0, -1, 10), 9);
  assert.equal(wrapCarouselIndex(9, 1, 10), 0);
  assert.equal(wrapCarouselIndex(4, 1, 11), 5);
  assert.equal(wrapCarouselIndex(0, 1, 0), 0);
});

test('defaultPortfolioData includes Stephen Argho Das real assets and repositories', () => {
  assert.equal(defaultPortfolioData.brand.fullName, 'Stephen Argho Das');
  assert.equal(defaultPortfolioData.brand.logoBadgeText, 'CV');
  assert.equal(defaultPortfolioData.brand.cvPdfUrl, '/media/CV_Final.pdf');
  assert.equal(defaultPortfolioData.about.videoIntro.src, '/media/demo-intro.mp4');
  assert.equal(defaultPortfolioData.education.length, 3);
  assert.equal(defaultPortfolioData.education[0].rowBackdropSrc, '/media/backgrounds/AIUB_Degree_Background.jpg');
  assert.equal(defaultPortfolioData.achievements.pageBackdropSrc, '/media/covers/Achievements_Cover.jpg');
  assert.equal(defaultPortfolioData.skills.pageBackdropSrc, '/media/covers/Skills_Cover.jpg');
  assert.equal(defaultPortfolioData.skills.softPhotoSrc, '/media/skills/Communication_background.png');
  assert.equal(defaultPortfolioData.skills.technicalVisuals.length, 6);
  assert.equal(defaultPortfolioData.projectsBackdropSrc, '/media/covers/Projects_Cover.jpg');
  assert.equal(defaultPortfolioData.hobbiesBackdropSrc, '/media/covers/Interests_Cover.webp');
  assert.equal(defaultPortfolioData.contact.personalEmail, 'steve900032@gmail.com');
  assert.equal(defaultPortfolioData.contact.academicEmail, '23-54439-3@student.aiub.edu');
  assert.equal(defaultPortfolioData.contact.githubUrl, 'https://github.com/steve-A7');
  assert.equal(defaultPortfolioData.projects.length, 2);
  assert.equal(defaultPortfolioData.projects[0].screenshots.length, 10);
  assert.equal(defaultPortfolioData.projects[0].repositories.length, 2);
  assert.equal(defaultPortfolioData.projects[1].screenshots.length, 11);
  assert.equal(defaultPortfolioData.projects[1].repositories.length, 1);
  assert.equal(defaultPortfolioData.hobbies.length, 4);
});

test('mergePortfolioData preserves defaults when partial fields are provided', () => {
  const merged = mergePortfolioData(defaultPortfolioData, {
    brand: {
      ...defaultPortfolioData.brand,
      siteNameCursive: 'Stephen A. Das',
    },
  });
  assert.equal(merged.brand.siteNameCursive, 'Stephen A. Das');
  assert.equal(merged.projects[0].screenshots.length, 10);
  assert.equal(merged.achievements.deansAwards.length, 3);
});

test('generatePortfolioTsExport outputs valid TypeScript export snippet', () => {
  const code = generatePortfolioTsExport(defaultPortfolioData);
  assert.ok(code.includes('export const defaultPortfolioData: PortfolioData ='));
  assert.ok(code.includes('Stephen Argho Das'));
});
