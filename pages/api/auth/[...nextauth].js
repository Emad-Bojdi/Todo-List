import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials", // Add a name for the provider
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log("Credentials received:", credentials);
        try {
          await connectDB();
        } catch (error) {
          console.log(error);
          throw new Error("Error in connecting to DB!");
        }

        if (!email || !password) {
          throw new Error("Invalid Data!");
        }

        const user = await User.findOne({ email });
        console.log("User found:", user);
        if (!user) throw new Error("User doesn't exist!");

        const isValid = await verifyPassword(password, user.password);
        console.log("Password valid:", isValid)
        if (!isValid) throw new Error("Username or password is incorrect!");

        return { email : user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
