import { GetURL, uploadToPresignedUrl } from '../api';
export const handleAssetUpload = async (
    file: File,
    category: 'avatar' | 'banner' | 'license' | 'identity'
  ): Promise<string> => {
    try {
      console.log('Starting upload for:', {
        category,
        fileName: file.name,
        fileType: file.type
      });
  
      // Get presigned URL
      const response = await GetURL(category, file.type);
      console.log('GetURL response:', response);
  
      if (!response?.data?.presignedUrl) {
        throw new Error('Invalid presigned URL received');
      }
  
      // Upload using proxy
      const uploaded = await uploadToPresignedUrl(response.data.presignedUrl, file);
      
      if (!uploaded) {
        throw new Error('Upload failed');
      }
  
      return response.data.assetPath;
    } catch (error) {
      console.error('Error in asset upload:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  };