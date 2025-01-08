import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

interface EditableSectionProps {
  title: string;
  content: string;
  sectionId: string;
  businessId: string;
  isAuthorized: boolean;
  onUpdate: (newContent: string) => void;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  title,
  content,
  sectionId,
  businessId,
  isAuthorized,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = async () => {
    try {
      // TODO: Implement API call to save changes
      onUpdate(editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="relative p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {isAuthorized && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Pencil size={20} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded-lg min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="prose max-w-none">
          {content}
        </div>
      )}
    </div>
  );
};

export default EditableSection;