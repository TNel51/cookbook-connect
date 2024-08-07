import type {DefaultSession} from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User extends DefaultSession.User {
        id: number;
        email: string;
        displayName: string;
        avatarUrl: string | null;
    }

    interface Session {
        user: User;
    }
}
