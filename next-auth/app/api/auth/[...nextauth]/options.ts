import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Awaitable, NextAuthOptions, RequestInternal } from "next-auth";
import User from "@/app/models/user";
import { compare } from "bcrypt";
import NextAuth, { User as NextAuthUser } from "next-auth";

interface CustomUser extends NextAuthUser {
  role: string; // Add any other custom fields here
}

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email: ",
          type: "text",
          placeholder: "your-email"
        },
        password: {
          label: "password: ",
          type: "password",
          placeholder: "your-password"
        },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        try {
          if (credentials) {
            const foundUser = await User.findOne({email: credentials.email}).lean().exec();
            if (foundUser) {
              console.log("User Exists")
              const match = await compare(foundUser.password, credentials.password)
              if (match) {
                console.log("Good pass")
                const user: CustomUser = {
                  id: foundUser._id.toString(), // assuming _id is an ObjectId
                  name: foundUser.name,
                  email: foundUser.email,
                  role: "Unverified Email", // custom field
                };

                return user;
              }
            }
          }
        } catch (error) {
          console.log(error)
        }
        return null
      }
    })
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
