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
                    try {
                        await connectDB();
                    } catch (error) {
                        throw new Error("Failed to connect to database");
                    }
                    const user = await User.findOne({ email });
                    if (!user) throw new Error("Invalid credentials");
                    const isValid = await verifyPassword(password, user.password);
                    if (!isValid) throw new Error("Invalid credentials");
                    return { id:user._id, email: user.email };
                } catch (error) {
                    console.error("Auth error:", error);
                    throw new Error(error.message || "Authentication failed");
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        }
    }
}

export default NextAuth(authOptions);
