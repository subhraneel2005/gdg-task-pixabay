import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter"; // Correct import for Prisma Adapter
import prisma from "@/prisma"; // Ensure your Prisma client is correctly imported

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // Correct Prisma Adapter setup
  pages: {
    signIn: '/login', // Custom sign-in page
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
