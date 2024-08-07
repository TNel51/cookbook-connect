import { compare } from "bcrypt";
import type { AuthOptions, User as NextAuthUser } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ReadyDataSource } from "@/data-source";
import { User as UserEntity } from "@/entities/user.entity";
import AWS from 'aws-sdk';

// Define our custom User type
interface User {
  id: number;
  name: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
}

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: User;
  }
}

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
      authorize: async function authorize(credentials): Promise<User | null> {
        if (!credentials?.email?.length || !credentials?.password?.length) return null;
        try {
          const ds = await ReadyDataSource();
          const userRepository = ds.getRepository(UserEntity);
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
          let avatarUrl: string | null = null;
          if (user.avatarUrl) {
            const key = user.avatarUrl.split('/').pop();
            if (key) {
              avatarUrl = await getSignedUrl(key);
            }
          }
          return {
            id: user.id,
            name: user.displayName,
            email: user.email,
            displayName: user.displayName,
            avatarUrl,
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
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
};

export default NextAuth(authOptions);