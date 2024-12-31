import { GetURL, uploadToPresignedUrl } from '../api';

export const handleAssetUpload = async (
  file: File,
  category: 'avatar' | 'banner' | 'license' | 'identity'
): Promise<string> => {
  try {
    console.log('Starting asset upload process:', {
      category,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size
    });

    // Get presigned URL
    const response = await GetURL({
      type: file.type,
      category: category
    });

    console.log('Received presigned URL:', {
      url: response.presignedUrl,
      assetPath: response.assetpath
    });

    if (!response?.presignedUrl) {
      throw new Error('Invalid presigned URL received');
    }

    // Upload file
    const uploaded = await uploadToPresignedUrl(response.presignedUrl, file);
    
    console.log('Upload result:', {
      success: uploaded,
      assetPath: response.assetpath
    });

    if (!uploaded) {
      throw new Error('Upload failed');
    }

    return response.assetpath;
  } catch (error) {
    console.error('Error in asset upload:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      category,
      fileName: file.name
    });
    throw error;
  }
};