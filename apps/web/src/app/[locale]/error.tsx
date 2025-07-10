'use client';

import { Button } from '@cstn/ui/components/button';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const Error = ({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [ error ]);

  return (
    <div className="container mx-auto my-4 p-2">
      <h1>{t('headline')}</h1>
      <h2>{t('subline')}</h2>
      <div className="flex mt-4 gap-4">
        <Button onClick={() => reset()}>{t('retry')}</Button>
        <Link href="/">
          <Button variant="outline">{t('home')}</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
