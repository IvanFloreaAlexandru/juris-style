import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const RootRedirect = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(language === 'ro' ? '/despre' : '/about', { replace: true });
  }, [language, navigate]);

  return null;
};
