import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

import { env } from '@shared/config/config';
import { CreateSignedUploadUrlRespondType } from '@modules/signedUrlS3/types';

const EXPIRES_IN = 60 * 60; // When the signed URL should expire (seconds)

/**
 * Inspired by: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html#s3-create-presigendurl
 */
export class SignedUrlS3Service {
  static async createSignedUploadUrl(): Promise<CreateSignedUploadUrlRespondType> {
    const s3Client = new S3Client({ region: env.REGION });

    const uniqueId = uuidv4();
    const filePathKey = `deetoPhotoUploads-${uniqueId}`;

    const command = new PutObjectCommand({
      Bucket: env.S3_PHOTOS_BUCKET,
      Key: filePathKey,
      ACL: 'public-read',
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: EXPIRES_IN,
    });

    return {
      signedUrl,
      uniqueId,
    };
  }
}
