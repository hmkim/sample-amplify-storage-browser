import { uploadData } from 'aws-amplify/storage';

/**
 * S3에 파일을 업로드합니다. 
 * 업로드 완료 후 Lambda 함수가 자동으로 downloadCount: 0 태그를 추가합니다.
 * @param file - 업로드할 파일
 * @param key - S3 객체 키 (파일 경로)
 * @param options - 추가 옵션
 */
export const uploadFile = async (
  file: File,
  key: string,
  options?: {
    onProgress?: (progress: { transferredBytes: number; totalBytes?: number }) => void;
  }
) => {
  try {
    const result = await uploadData({
      key,
      data: file,
      options: {
        onProgress: options?.onProgress,
      },
    });

    console.log(`파일 업로드 완료: ${key}. Lambda 함수가 자동으로 태그를 추가합니다.`);
    return result;
  } catch (error) {
    console.error('파일 업로드 중 오류 발생:', error);
    throw error;
  }
};