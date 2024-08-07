// lib/s3Helper.ts
import s3 from './aws-config'; // This imports the configured S3 instance from the aws-config.ts file

export const getSignedUrl = (key: string): Promise<string> => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: encodeURIComponent(key), // Ensure the key is URL-encoded
    Expires: 60 * 5, // URL expires in 5 minutes
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        console.log("Generated Pre-signed URL:", url); // Log the URL to verify
        resolve(url);
      }
    });
  });
};
