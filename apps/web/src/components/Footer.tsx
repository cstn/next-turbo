'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';

const Footer: FC = () => {
  const t = useTranslations('footer');

  return (
    <footer className="container mx-auto m-4 flex justify-center items-center text-sm">
      <p>{t('copyright', { year: new Date().getFullYear() })}</p>
    </footer>
  );
};

export default Footer;
