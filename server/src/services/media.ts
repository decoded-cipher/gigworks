
import { count, eq, sql } from "drizzle-orm";
import { db } from '../config/database/connection';
import { profileMedia } from "../config/database/schema";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";



// Get signed URL for media upload
export const generatePreSignedUrl = async (name: string, type: string, env: Env) => {
    return new Promise((resolve, reject) => {

        const s3Client = new S3Client({
            region: env.CLOUDFLARE_R2_REGION,
            endpoint: env.CLOUDFLARE_R2_ENDPOINT,
            credentials: {
                accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
                secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
            }
        });

        const command = new PutObjectCommand({
            Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
            Key: name,
            ContentType: type
        });

        const url = getSignedUrl(s3Client, command, { expiresIn: 60 });

        resolve(url);
    });
};



// Save profile media
export const saveProfileMedia = async (data: ProfileMedia) => {
    return new Promise(async (resolve, reject) => {
        try {

            // SQL Query : INSERT INTO profile_media (profile_id, media_id, type) VALUES (profile_id, media_id, type)

            let result = await db.insert(profileMedia).values(data).returning();
            result = result[0];

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

