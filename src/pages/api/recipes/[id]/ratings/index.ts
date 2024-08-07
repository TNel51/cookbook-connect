import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import AWS from 'aws-sdk';

import { ReadyDataSource } from "@/data-source";
import { Rating } from "@/entities/rating.entity";

import { authOptions } from "../../../auth/[...nextauth]";

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Function to generate pre-signed URL
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

const PostBodySchema = z.object({
  numStars: z.number().min(1).max(5).step(1),
  comment: z.string().optional(),
}).strict();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Rating[] | Rating | string>
): Promise<void> {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    res.status(500).send("Failed to find Id");
    return;
  }

  const ds = await ReadyDataSource();
  const ratingRepo = ds.getRepository(Rating);

  if (req.method === "GET") {
    const ratings = await ratingRepo.find({ where: { recipeId: parseInt(id) }, relations: ["user"] });

    // Generate pre-signed URLs for each user's avatar
    for (const rating of ratings) {
      if (rating.user.avatarUrl) {
        const key = rating.user.avatarUrl.split('/').pop();
        rating.user.avatarUrl = await getSignedUrl(key);
      }
    }

    res.status(200).json(ratings);
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      res.status(400).end("Unauthenticated");
      return;
    }

    const postInput = PostBodySchema.safeParse(req.body);

    if (!postInput.success) {
      res.status(400).send("Invalid Input Data");
      return;
    }

    const rating = ratingRepo.create({
      recipeId: parseInt(id),
      userId: session.user.id,
      numStars: postInput.data.numStars,
      comment: postInput.data.comment,
    });
    await ratingRepo.save(rating);

    res.status(200).json({} as Rating);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
