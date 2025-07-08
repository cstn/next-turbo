'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import {Link} from '@/i18n/navigation';

const Footer: FC = () => {
  const t = useTranslations('footer');

  return (
    <footer className="container mx-auto m-4 flex justify-center items-center text-sm gap-4">
      <p>{t('copyright', { year: new Date().getFullYear() })}</p>
      <Link href="#">{t('imprint')}</Link>
      <Link href="#">{t('termsOfService')}</Link>
      <Link href="#">{t('privacyPolicy')}</Link>
    </footer>
  );
};

export default Footer;
