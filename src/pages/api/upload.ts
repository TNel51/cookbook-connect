import { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp'; // Import sharp for image optimization
import { ReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable();
    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('Uploading file:', file.originalFilename);

    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    // Optimize the image using sharp
    const optimizedBuffer = await sharp(file.filepath)
      .resize(800) // Resize the image to a max width of 800px
      .jpeg({ quality: 85 }) // Convert to JPEG with 85% quality
      .toBuffer();

    const params = {
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: `${Date.now()}-${file.originalFilename}`,
      Body: optimizedBuffer,
      ContentType: 'image/jpeg',
    };

    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);
    console.log('Upload successful:', result);

    const fileUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    res.status(200).json({ url: fileUrl });

    // Clean up the temp file
    fs.unlink(file.filepath, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

  } catch (error) {
    console.error('Error in file upload:', error);
    res.status(500).json({ message: 'An error occurred during file upload' });
  }
}
