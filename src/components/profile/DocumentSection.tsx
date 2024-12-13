import React, { useState, useEffect } from 'react';
import { FileText, Clock } from 'lucide-react';
import { DocumentUpload } from './DocumentUpload';
import { getDocumentUrl } from '../../services/documentService';

interface DocumentSectionProps {
  title: string;
  type: 'license' | 'certification' | 'insurance';
  description: string;
}

export function DocumentSection({ title, type, description }: DocumentSectionProps) {
  const [document, setDocument] = useState<{
    url: string;
    updatedAt: string;
  } | null>(null);

  useEffect(() => {
    loadDocument();
  }, [type]);

  const loadDocument = async () => {
    const data = await getDocumentUrl(type);
    if (data) {
      setDocument(data);
    }
  };

  const handleUploadComplete = (url: string) => {
    setDocument({
      url,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {document ? (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-rose-500" />
              <div>
                <h4 className="font-medium text-gray-900">Current Document</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>
                    Last updated: {new Date(document.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                View
              </a>
              <DocumentUpload
                type={type}
                onUploadComplete={handleUploadComplete}
              />
            </div>
          </div>
        </div>
      ) : (
        <DocumentUpload
          type={type}
          onUploadComplete={handleUploadComplete}
        />
      )}
    </div>
  );
}