import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const romanianRoutes = ['/despre', '/avocati', '/domenii-de-practica', '/noutati'];
    const englishRoutes = ['/about', '/lawyers', '/legal-services', '/news'];
    
    const isRomanianRoute = romanianRoutes.some(route => location.pathname.startsWith(route));
    const isEnglishRoute = englishRoutes.some(route => location.pathname.startsWith(route));
    
    // Dacă suntem pe limba română dar accesăm rută engleză, redirectăm la echivalent român
    if (language === 'ro' && isEnglishRoute) {
      const routeMap: Record<string, string> = {
        '/about': '/despre',
        '/lawyers': '/avocati',
        '/legal-services': '/domenii-de-practica',
        '/news': '/noutati',
      };
      
      let newPath = location.pathname;
      for (const [eng, ro] of Object.entries(routeMap)) {
        if (location.pathname.startsWith(eng)) {
          newPath = location.pathname.replace(eng, ro);
          break;
        }
      }
      navigate(newPath, { replace: true });
    }
    
    // Dacă suntem pe limba engleză dar accesăm rută română, redirectăm la echivalent englez
    if (language === 'en' && isRomanianRoute) {
      const routeMap: Record<string, string> = {
        '/despre': '/about',
        '/avocati': '/lawyers',
        '/domenii-de-practica': '/legal-services',
        '/noutati': '/news',
      };
      
      let newPath = location.pathname;
      for (const [ro, eng] of Object.entries(routeMap)) {
        if (location.pathname.startsWith(ro)) {
          newPath = location.pathname.replace(ro, eng);
          break;
        }
      }
      navigate(newPath, { replace: true });
    }
  }, [language, location.pathname, navigate]);

  return <>{children}</>;
};
