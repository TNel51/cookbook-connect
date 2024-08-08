import { compare } from "bcrypt";
import type { AuthOptions, User as NextAuthUser } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ReadyDataSource } from "@/data-source";
import { User as UserEntity } from "@/entities/user.entity";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

console.log('Initializing S3 client');
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
console.log('S3 client initialized');

export const getSignedS3Url = async (key: string): Promise<string> => {
  console.log(`getSignedS3Url called with key: ${key}`);
  
  // If it's a full URL, extract just the filename
  const fileName = key.includes('://') ? key.split('/').pop()?.split('?')[0] : key;
  
  if (!fileName) {
    console.error('Unable to extract file name from key');
    throw new Error('Invalid key');
  }

  console.log(`Using fileName: ${fileName}`);

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: decodeURIComponent(fileName),
  });

  try {
    console.log('Generating signed URL');
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    console.log(`Generated signed URL: ${signedUrl}`);
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async function authorize(credentials): Promise<User | null> {
        console.log('Authorize function called');
        if (!credentials?.email?.length || !credentials?.password?.length) {
          console.log('Invalid credentials');
          return null;
        }
        
        try {
          console.log('Connecting to database');
          const ds = await ReadyDataSource();
          const userRepository = ds.getRepository(UserEntity);
          console.log(`Searching for user with email: ${credentials.email.toLowerCase()}`);
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

          if (!user) {
            console.log('User not found');
            return null;
          }
          console.log('User found, comparing password');
          if (!await compare(credentials.password, user.password)) {
            console.log('Password mismatch');
            return null;
          }
          console.log('Password match');

          // Generate a pre-signed URL for the avatar if available
          let avatarUrl: string | null = null;
          if (user.avatarUrl) {
            console.log(`Generating pre-signed URL for avatar: ${user.avatarUrl}`);
            try {
              avatarUrl = await getSignedS3Url(user.avatarUrl);
              console.log(`Generated avatar URL: ${avatarUrl}`);
            } catch (error) {
              console.error('Error generating signed URL for avatar:', error);
            }
          } else {
            console.log('No avatar URL found for user');
          }

          const authorizedUser: User = {
            id: user.id,
            name: user.displayName,
            email: user.email,
            displayName: user.displayName,
            avatarUrl: avatarUrl || null, // Ensure avatarUrl is either string or null
          };
          console.log('Authorized user:', authorizedUser);
          return authorizedUser;
        } catch (e) {
          console.error('Error in authorize function:', e);
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
      console.log('JWT callback called');
      if (user) {
        console.log('User found in JWT callback, updating token');
        token.user = user as User;
      }
      return token;
    },
    async session({ session, token }) {
        console.log('Session callback called');
        if (session.user && token.user) {
          console.log('Updating session user');
          session.user = token.user as User;
    
          // Always regenerate a new pre-signed URL for the avatar if it exists
          if (session.user.avatarUrl) {
            console.log(`Regenerating pre-signed URL for avatar: ${session.user.avatarUrl}`);
            try {
              session.user.avatarUrl = await getSignedS3Url(session.user.avatarUrl);
              console.log(`Updated avatarUrl: ${session.user.avatarUrl}`);
            } catch (error) {
              console.error('Error regenerating signed URL for avatar:', error);
              // Optionally set a default avatar or leave it as is
              // session.user.avatarUrl = '/path/to/default/avatar.png';
            }
          } else {
            console.log('No avatar URL found in session user');
          }
        } else {
          console.log('No user found in session or token');
        }
        return session;
      },
  },
};

export default NextAuth(authOptions);
