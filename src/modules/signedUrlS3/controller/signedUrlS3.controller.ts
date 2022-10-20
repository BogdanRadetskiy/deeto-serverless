import { SignedUrlS3Service } from '@modules/signedUrlS3/service/signedUrlS3.service';
import { MessageUtil } from '@shared/utils';

export async function getSignedUploadUrlHandler() {
  try {
    const signedUploadUrl = await SignedUrlS3Service.createSignedUploadUrl();
    return MessageUtil.success({ signedUploadUrl });
  } catch (e) {
    return MessageUtil.error(500, e);
  }
}
