import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default handleI18nRouting;
export const config = {
  matcher: ['/((?!api|_next|_vercel|internal|assets|monitoring|.*\\..*).*)'],
};
