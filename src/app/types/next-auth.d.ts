import NextAuth, { Session as NextAuthSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends NextAuthSession {
    accessToken: string;
    user: {
      name: string;
      email: string;
      image: string;
    };
  }
}
