import type { S3Event } from 'aws-lambda';
import { S3Client, PutObjectTaggingCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({});

export const handler = async (event: S3Event) => {
  console.log('S3 이벤트 수신:', JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    // S3 이벤트가 ObjectCreated인 경우에만 처리
    if (record.eventName.startsWith('ObjectCreated')) {
      const bucketName = record.s3.bucket.name;
      const objectKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

      console.log(`버킷: ${bucketName}, 객체: ${objectKey}에 태그 추가 시작`);

      try {
        // downloadCount: 0 태그 추가
        const tagCommand = new PutObjectTaggingCommand({
          Bucket: bucketName,
          Key: objectKey,
          Tagging: {
            TagSet: [
              {
                Key: 'downloadCount',
                Value: '0'
              }
            ]
          }
        });

        await s3Client.send(tagCommand);
        console.log(`${objectKey}에 downloadCount 태그 추가 완료`);
      } catch (error) {
        console.error(`태그 추가 실패 - 버킷: ${bucketName}, 객체: ${objectKey}`, error);
      }
    }
  }
};