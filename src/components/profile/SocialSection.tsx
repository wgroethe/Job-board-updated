import React, { useState } from 'react';
import { Instagram, Globe, Linkedin, Twitter } from 'lucide-react';
import type { Social } from '../../types/profile';

interface SocialSectionProps {
  social: Social;
  onUpdate: (data: { social: Social }) => Promise<void>;
}

export function SocialSection({ social, onUpdate }: SocialSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(social);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdate({ social: formData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating social links:', error);
      alert('Failed to update social links. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Social Links</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-secondary"
          >
            Edit Links
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <div className="mt-1 relative">
              <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={formData.website}
                onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram</label>
            <div className="mt-1 relative">
              <Instagram className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.instagram}
                onChange={e => setFormData(prev => ({ ...prev, instagram: e.target.value.replace('@', '') }))}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="@username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <div className="mt-1 relative">
              <Linkedin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={formData.linkedin}
                onChange={e => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter</label>
            <div className="mt-1 relative">
              <Twitter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.twitter}
                onChange={e => setFormData(prev => ({ ...prev, twitter: e.target.value.replace('@', '') }))}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="@username"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData(social);
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {social.website && (
            <a
              href={social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900"
            >
              <Globe className="w-5 h-5" />
              <span>Website</span>
            </a>
          )}
          {social.instagram && (
            <a
              href={`https://instagram.com/${social.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900"
            >
              <Instagram className="w-5 h-5" />
              <span>@{social.instagram.replace('@', '')}</span>
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          )}
          {social.twitter && (
            <a
              href={`https://twitter.com/${social.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900"
            >
              <Twitter className="w-5 h-5" />
              <span>@{social.twitter.replace('@', '')}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}