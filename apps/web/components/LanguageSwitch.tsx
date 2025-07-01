import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from '@cstn/ui/components/navigation-menu';
import { type FC } from 'react';
import config from '@/config';
import { PropsWithStyle } from '@/utils/props';

type Props = PropsWithStyle & {
  currentLocale: string,
};

const LanguageSwitch: FC<Props> = ({ className, currentLocale }) => {
  if (config.AVAILABLE_LOCALES.length < 2) {
    return null;
  }

  return (
    <NavigationMenuItem className={className}>
      <NavigationMenuTrigger className="uppercase">{currentLocale}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul>
          {config.AVAILABLE_LOCALES.map((locale: string) => (
            <li key={locale} className="m-1">
              <a
                className="antialiased uppercase block p-2"
                href={`/${locale}`}
                aria-current={locale === currentLocale}
              >
                {locale}
              </a>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default LanguageSwitch;
