// pages/api/auth/[...nextauth].ts
import { compare } from "bcrypt";
import type { AuthOptions, Session, TokenSet } from "next-auth";
import NextAuth from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

import { ReadyDataSource } from "@/data-source";
import { User } from "@/entities/user.entity";
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const getSignedUrl = (key: string): Promise<string> => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: key,
    Expires: 60 * 5, // URL expires in 5 minutes
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};
export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email", type: "text", placeholder: "jsmith@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        authorize: async function authorize(credentials) {
          if (!credentials?.email?.length || !credentials?.password?.length) return null;
  
          try {
            const ds = await ReadyDataSource();
            const userRepository = ds.getRepository(User);
            const user = await userRepository.findOne({
              where: { email: credentials.email.toLowerCase() },
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
  
            // Generate a pre-signed URL for the avatar if available
            let avatarUrl = null;
            if (user.avatarUrl) {
              const key = user.avatarUrl.split('/').pop();
              avatarUrl = await getSignedUrl(key);
            }
  
            return {
              id: user.id,
              displayName: user.displayName,
              email: user.email,
              image: avatarUrl,
            };
          } catch (e) {
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
      async jwt({ token, user }: { token: TokenSet; user: Session["user"] | AdapterUser; }): Promise<TokenSet> {
        user && (token.user = user);
        return token;
      },
      async session({ session, token }: { session: Session; token: TokenSet; }): Promise<Session> {
        session.user = token.user as Session["user"];
        return session;
      },
    },
  };
  
  export default NextAuth(authOptions);
  