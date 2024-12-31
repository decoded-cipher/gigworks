import { GetURL, uploadToPresignedUrl } from '../api';

// Define valid category types to match the API
type AssetCategory = 'identity' | 'avatar' | 'banner' | 'license';

// Create a mapping for API categories
const categoryMapping = {
  avatar: 'avatar' as const,
  banner: 'avatar' as const,  // Map banner to avatar category for API
  license: 'identity' as const,  // Map license to identity category for API
  identity: 'identity' as const,
} as const;

export const handleAssetUpload = async (
  file: File,
  category: AssetCategory
): Promise<string> => {
  try {
    console.log('Starting asset upload process:', {
      category,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size
    });

    // Map the category to API expected value
    const apiCategory = categoryMapping[category];

    // Get presigned URL
    const response = await GetURL({
      type: file.type,
      category: apiCategory
    });

    console.log('Received presigned URL:', {
      url: response.presignedUrl,
      assetpath: response.assetpath
    });

    if (!response?.presignedUrl) {
      throw new Error('Invalid presigned URL received');
    }

    // Upload file
    const uploaded = await uploadToPresignedUrl(response.presignedUrl, file);
    
    console.log('Upload result:', {
      success: uploaded,
      assetpath: response.assetpath
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