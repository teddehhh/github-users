import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    redirect: async ({ baseUrl }) => {
      return baseUrl;
    },
    session: async ({ session, token }) => {
      return { ...session, accessToken: token.accessToken };
    },
  },
  pages: {
    signIn: '/signin',
  },
});
