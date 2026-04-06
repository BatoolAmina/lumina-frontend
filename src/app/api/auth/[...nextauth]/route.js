import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data.data?.user || res.data.user;
          const token = res.data.token || res.data.data?.token;

          if (user && token) {
            return { 
              ...user, 
              id: user._id || user.id, 
              accessToken: token 
            };
          }
          return null;
        } catch (error) {
          const message = error.response?.data?.message || error.response?.data?.error || "Neural Protocol Denied";
          throw new Error(message);
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google" || account.provider === "github") {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/external-login`, {
            email: user.email,
            name: user.name,
            avatar: user.image,
            providerId: user.id
          });

          user.accessToken = res.data.token;
          user.id = res.data.data?.user?._id || res.data.data?.user?.id;
          user.role = res.data.data?.user?.role;
          return true;
        } catch (error) {
          console.error("External Sync Failed:", error.response?.data);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.role = user.role;
      }
      
      if (account) {
        token.provider = account.provider;
      }
      
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.role = token.role;
        session.provider = token.provider;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});

export { handler as GET, handler as POST };