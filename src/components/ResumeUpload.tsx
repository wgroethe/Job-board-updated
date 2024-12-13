import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trash2 } from 'lucide-react';
import { uploadResume, getResumeUrl } from '../services/resumeService';

export function ResumeUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [currentResume, setCurrentResume] = useState<{
    url: string;
    updatedAt: string;
  } | null>(null);

  useEffect(() => {
    loadCurrentResume();
  }, []);

  const loadCurrentResume = async () => {
    const data = await getResumeUrl();
    if (data?.resume_url) {
      setCurrentResume({
        url: data.resume_url,
        updatedAt: data.resume_updated_at
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadResume(file);
      setCurrentResume({
        url,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {currentResume ? (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-rose-500" />
              <div>
                <h3 className="font-medium text-gray-900">Current Resume</h3>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(currentResume.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={currentResume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                View
              </a>
              <label className="btn btn-primary cursor-pointer">
                Update
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Resume</h3>
            <p className="text-gray-500 mb-4">PDF files only, max 5MB</p>
            <label className="btn btn-primary cursor-pointer">
              {isUploading ? 'Uploading...' : 'Select PDF'}
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}