// All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.

import NextAuth from "next-auth";
// import dotenv from "dotenv";
// dotenv.config();

// import the providers you want to use
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
