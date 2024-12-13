import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { uploadDocument } from '../../services/documentService';

interface DocumentUploadProps {
  type: 'license' | 'certification' | 'insurance';
  onUploadComplete: (url: string) => void;
  acceptedTypes?: string[];
  maxSizeMB?: number;
}

export function DocumentUpload({ 
  type, 
  onUploadComplete, 
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png'],
  maxSizeMB = 5 
}: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      const url = await uploadDocument(file, type);
      onUploadComplete(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-rose-300 transition-colors">
        <div className="text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload {type.charAt(0).toUpperCase() + type.slice(1)}
          </h3>
          <p className="text-gray-500 mb-4">
            {acceptedTypes.join(', ')} files, max {maxSizeMB}MB
          </p>
          <label className="btn btn-primary cursor-pointer inline-flex items-center gap-2">
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              'Select File'
            )}
            <input
              type="file"
              accept={acceptedTypes.join(',')}
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}