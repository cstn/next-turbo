import config from '@/config';
import { NextAuthOptions, type User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const DemoAccount = {
  username: 'demo',
  password: 'Test123',
  name: 'Next Test',
  email: 'carsten.stein@cast-it.de',
  image: 'https://www.gravatar.com/avatar/d4567be396c8ac85f05840340acebc37.png',
};

// Fake credentials provider, not for production use
export const credentialsProviders = CredentialsProvider({
  id: 'credentials',
  name: 'Demo',
  credentials: {
    username: { label: 'Username', type: 'text', placeholder: DemoAccount.username },
    password: { label: 'Password', type: 'password', placeholder: DemoAccount.password },
  },
  authorize: (credentials: Record<'username' | 'password', string> | undefined) => {
    if (!credentials?.username || !credentials?.password) {
      return null;
    }

    if (credentials.username !== DemoAccount.username || credentials.password !== DemoAccount.password) {
      return null;
    }

    return {
      id: '1',
      name: DemoAccount.name,
      email: DemoAccount.email,
      image: DemoAccount.image,
    } as User;
  },
});

export const authOptions: NextAuthOptions = {
  providers: [credentialsProviders],
  debug: config.DEBUG,
  pages: {
    error: '/error',
    signIn: '/login',
    signOut: '/logout',
    verifyRequest: '/verify',
    newUser: '/new-user',
  },
  session: {
    maxAge: 30 * 60 * 1000,
    strategy: 'jwt',
  },
};
