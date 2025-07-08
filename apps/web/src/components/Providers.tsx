'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import themes from '@cstn/ui/config/themes';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { Session } from 'next-auth';

type Props = PropsWithChildren & {
  session: Session | null,
}

export const Providers = ({ children, session }: Props) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    enableColorScheme
    themes={themes}
  >
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  </NextThemesProvider>
);

