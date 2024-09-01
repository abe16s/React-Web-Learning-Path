import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        console.log("Profile Github: ", profile);
        // Map the profile information to the User object expected by NextAuth
        let userRole = "GitHub User"
        if (profile?.email === "abenezerseifu123@gmail.com") {
          userRole = "admin"
        }
        return {
          ...profile,
          role: userRole
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        console.log("Profile Google: ", profile);
        return {
          ...profile,
          id: profile.sub,
          role: "Google User"
        };
      }
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) token.role = user.role;
      return token; 
    },

    async session({session, token}) {
      if (session?.user) session.user.role = token.role;
      return session;
    }
  }
};
