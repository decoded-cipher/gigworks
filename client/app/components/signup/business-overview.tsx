import { handleAssetUpload } from '../../utils/assetUpload';

// ...existing code...

const handleInputChange = async (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const target = e.target as HTMLInputElement;
  const { name, files } = target;

  if (files && files[0]) {
    try {
      const category = name === 'profileImage' ? 'avatar' : 'banner';
      const assetPath = await handleAssetUpload(files[0], category);
      
      updateFormData({
        [name]: files[0],
        [name === 'profileImage' ? 'avatar' : 'banner']: assetPath
      });
    } catch (error) {
      console.error(`Error uploading ${name}:`, error);
      // Handle error (show toast, etc.)
    }
    return;
  }

  // ... rest of existing handleInputChange code ...
};

// ...existing code...
