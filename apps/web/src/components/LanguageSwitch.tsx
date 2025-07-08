import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from '@cstn/ui/components/navigation-menu';
import { type FC } from 'react';
import config from '@/config';
import { PropsWithStyle } from '@/utils/props';
import { Link } from '@/i18n/navigation';

type Props = PropsWithStyle & {
  currentLocale: string,
};

const LanguageSwitch: FC<Props> = ({ className, currentLocale }) => {
  if (config.AVAILABLE_LOCALES.length < 2) {
    return null;
  }

  return (
    <NavigationMenuItem className={className}>
      <NavigationMenuTrigger className="uppercase font-bold">{currentLocale}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul>
          {config.AVAILABLE_LOCALES.map((locale: string) => (
            <li key={locale} className="m-1">
              <Link
                className="antialiased uppercase block p-2"
                href="/"
                aria-current={locale === currentLocale}
                locale={locale}
              >
                {locale}
              </Link>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default LanguageSwitch;
