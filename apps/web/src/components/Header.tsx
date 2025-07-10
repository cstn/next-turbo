'use client';

import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ModeToggle from '@cstn/ui/components/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@cstn/ui/components/navigation-menu';
import LanguageSwitch from '@/components/LanguageSwitch';
import { signOut, useSession } from 'next-auth/react';

const Header: FC = () => {
  const currentLocale = useLocale();
  const t = useTranslations('navigation');
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session);

  const handleLogoutClick = () => signOut({
    callbackUrl: '/',
    redirect: true,
  });


  return (
    <header className="mb-4">
      <NavigationMenu
        className="z-1 container mx-auto "
        viewport={false}
      >
        <NavigationMenuList className="flex justify-between gap-8 w-full">
          <NavigationMenuItem className="grow-[2]">
            <NavigationMenuLink className="w-fit" asChild>
              <Link className="mr-2 font-bold uppercase" href="/">
                {t('home')}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {!isAuthenticated && (
            <NavigationMenuItem>
              <NavigationMenuLink className="w-fit" asChild>
                <Link className="mr-2 font-bold uppercase" href="/login">
                  {t('login')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          {!isAuthenticated && (
            <NavigationMenuItem>
              <NavigationMenuLink className="w-fit" asChild>
                <Link className="mr-2 font-bold uppercase" href="/register">
                  {t('register')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          {isAuthenticated && (
            <NavigationMenuItem>
              <NavigationMenuLink className="w-fit mr-2 font-bold uppercase" onClick={handleLogoutClick}>
                {t('logout')}
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          <LanguageSwitch currentLocale={currentLocale}/>

          <NavigationMenuItem>
            <ModeToggle/>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
