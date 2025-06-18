'use client';

import { FC } from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import themes from '../config/themes';

type Props = {
  ariaLabel?: string;
}

const ModeToggle: FC<Props> = ({ ariaLabel }) => {
  const { setTheme } = useTheme();

  const handleClick = (mode: string) => () => setTheme(mode);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="y" size="icon" variant="ghost">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <Palette className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all neutral:scale-100 neutral:rotate-0" />
          <span className="sr-only">{ariaLabel || 'Toggle mode'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme: string) => (
          <DropdownMenuItem key={theme} onClick={handleClick(theme)}>
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
