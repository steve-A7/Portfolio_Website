import { useEffect, useState } from 'react';
import {
  defaultPortfolioData,
  type PageRoute,
  type PortfolioData,
} from './data/portfolioData';
import {
  mergePortfolioData,
  parseRouteFromHash,
  routeToHash,
} from './utils/portfolioHelpers';
import { LayoutShell } from './components/LayoutShell';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { EducationPage } from './components/EducationPage';
import { AchievementsPage } from './components/AchievementsPage';
import { SkillsPage } from './components/SkillsPage';
import { ProjectsPage } from './components/ProjectsPage';
import { HobbiesPage } from './components/HobbiesPage';
import { ContactPage } from './components/ContactPage';
import { LightboxModal, type LightboxItem } from './components/LightboxModal';

const STORAGE_KEY = 'stephen-portfolio-v4';

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() =>
    parseRouteFromHash(window.location.hash)
  );
  const [portfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return mergePortfolioData(defaultPortfolioData, JSON.parse(saved));
      }
    } catch {
      // Ignore malformed localStorage entries
    }
    return defaultPortfolioData;
  });
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRouteFromHash(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (nextRoute: PageRoute) => {
    setRoute(nextRoute);
    const nextHash = routeToHash(nextRoute);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LayoutShell
      data={portfolioData}
      currentRoute={route}
      onNavigate={handleNavigate}
    >
      {route === 'home' && <HomePage data={portfolioData} />}
      {route === 'about' && (
        <AboutPage data={portfolioData} onNavigate={handleNavigate} />
      )}
      {route === 'education' && (
        <EducationPage
          data={portfolioData}
          onNavigate={handleNavigate}
          onOpenLightbox={setLightboxItem}
        />
      )}
      {route === 'achievements' && (
        <AchievementsPage
          data={portfolioData}
          onNavigate={handleNavigate}
          onOpenLightbox={setLightboxItem}
        />
      )}
      {route === 'skills' && (
        <SkillsPage data={portfolioData} onNavigate={handleNavigate} />
      )}
      {route === 'projects' && (
        <ProjectsPage
          data={portfolioData}
          onNavigate={handleNavigate}
          onOpenLightbox={setLightboxItem}
        />
      )}
      {route === 'hobbies' && (
        <HobbiesPage data={portfolioData} onNavigate={handleNavigate} />
      )}
      {route === 'contact' && <ContactPage data={portfolioData} />}

      <LightboxModal item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </LayoutShell>
  );
}
