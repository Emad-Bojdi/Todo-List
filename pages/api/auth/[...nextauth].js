import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";
import { verifyPassword } from "../../../utils/auth";

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const { email, password } = credentials;
                try {
                    await connectDB();
                } catch (error) {
                    throw new Error("Failed to connect to database");
                }
                const user = await User.findOne({ email });
                if (!user) throw new Error("Invalid credentials");
                const isValid = await verifyPassword(password, user.password);
                if (!isValid) throw new Error("Invalid credentials");
                return {email};
            }
        })
    ]
}

export default NextAuth(authOptions);
