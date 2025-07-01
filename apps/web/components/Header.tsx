'use client';

import { FC } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ModeToggle from '@cstn/ui/components/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@cstn/ui/components/navigation-menu';
import LanguageSwitch from '@/components/LanguageSwitch';

const Header: FC = () => {
  const currentLocale = useLocale();

  return (
    <header className="mb-4">
      <NavigationMenu
        className="z-1 container mx-auto "
        viewport={false}
      >
        <NavigationMenuList className="flex justify-between gap-8 w-full">
          <NavigationMenuItem className="grow-[2]">
            <NavigationMenuLink className="w-fit" asChild>
              <Link className="mr-2" href="/">
                  <p className="font-bold uppercase">Home</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <LanguageSwitch className="hidden sm:block" currentLocale={currentLocale}/>

          <NavigationMenuItem>
            <ModeToggle/>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
