import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    pages:{
        signIn: '/login',
    },
    providers:[
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
}


export const handler = NextAuth(authOptions as NextAuthOptions);
export { handler as GET, handler as POST };