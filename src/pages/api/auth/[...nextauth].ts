import {compare} from "bcrypt";
import type {
    AuthOptions, Session, TokenSet,
} from "next-auth";
import NextAuth from "next-auth";
import type {AdapterUser} from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

import {ReadyDataSource} from "@/data-source";
import {User} from "@/entities/user.entity";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email", type: "text", placeholder: "jsmith@example.com",
                },
                password: {label: "Password", type: "password"},
            },
            authorize: async function authorize(credentials) {
                if (!credentials?.email?.length || !credentials?.password?.length) return null;

                try {
                    const ds = await ReadyDataSource();
                    const userRepository = ds.getRepository(User);
                    const user = await userRepository.findOne({
                        where: {email: credentials.email.toLowerCase()},
                        select: {
                            id: true,
                            displayName: true,
                            email: true,
                            avatarUrl: true,
                            password: true,
                        },
                    });

                    if (!user) return null;
                    if (!await compare(credentials.password, user.password)) return null;

                    return {
                        id: user.id,
                        displayName: user.displayName,
                        email: user.email,
                        image: user.avatarUrl,
                    };
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error(e);
                    throw new Error("Internal Server Error");
                }
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
        newUser: "/sign-up",
    },
    callbacks: {
        async jwt({
            token, user,
        }: {token: TokenSet; user: Session["user"] | AdapterUser;}): Promise<TokenSet> {
            user && (token.user = user);
            return token;
        },
        async session({
            session, token,
        }: {session: Session; token: TokenSet;}): Promise<Session> {
            session.user = token.user as Session["user"];
            return session;
        },
    },
};

export default NextAuth(authOptions);
