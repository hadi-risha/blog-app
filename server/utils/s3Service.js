// S3 upload function
import AWS from 'aws-sdk';
import express from "express";
import dotenv from "dotenv";


const router = express.Router();
dotenv.config();


console.log("envvvvv 1", process.env.AWS_ACCESS_KEY);
console.log("envvvvv 2", process.env.AWS_SECRET_KEY);
console.log("envvvvv 3", process.env.AWS_REGION);
export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY, 
  secretAccessKey: process.env.AWS_SECRET_KEY, 
  region: process.env.AWS_REGION, 
});

export async function uploadImageToS3(file) {
  try {
    const key = `profile-pics/${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const { Location } = await s3.upload(params).promise();
    // return Location;
    return { url: Location, key };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload image');
  }
}

export const deleteImageFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  await s3.deleteObject(params).promise();
};
