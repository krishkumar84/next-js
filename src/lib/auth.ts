import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "./utils";
import { User } from "./models";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
  ],callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }else if(account.provider === "google"){
        if (profile.email_verified && profile.email.endsWith("@gmail.com")) {
            connectToDb();
            try {
              const user = await User.findOne({ email: profile.email });
      
              if (!user) {
                const newUser = new User({
                  username: profile.name,
                  email: profile.email,
                  image: profile?.picture,
                });
      
                await newUser.save();
                console.log("New user created:", newUser);
              }
            } catch (err) {
              console.error("Error during Google sign-in:", err);
              return false;
            }
          } else {
            console.log("Google sign-in failed: Email verification or domain check failed");
            return false;
          }
      }
      return true;
    },
    // ...authConfig.callbacks,
  },

});