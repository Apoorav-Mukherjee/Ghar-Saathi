import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (
          account?.provider !== "google" ||
          !account.providerAccountId ||
          !profile?.email ||
          profile.email_verified !== true
        ) {
          return false;
        }

        await connectDB();

        await User.findOneAndUpdate(
          { googleId: account.providerAccountId },
          {
            $set: {
              name: profile.name || "Customer",
              email: profile.email.toLowerCase(),
              image: profile.picture || "",
            },
            $setOnInsert: {
              googleId: account.providerAccountId,
            },
          },
          {
            upsert: true,
            new: true,
            runValidators: true,
          }
        );

        return true;
      } catch (error) {
        console.error("Google sign-in database error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // Look up the database user on initial sign-in.
      if (user?.email) {
        await connectDB();

        const dbUser = await User.findOne({
          email: user.email.toLowerCase(),
        }).select("_id");

        if (dbUser) {
          token.userId = dbUser._id.toString();
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }

      return session;
    },
  },
});