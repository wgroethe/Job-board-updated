import React, { useState } from 'react';
import { Camera, MapPin, Mail, Phone } from 'lucide-react';
import type { Profile } from '../../types/profile';

interface ProfileHeaderProps {
  profile: Profile;
  onUpdate: (data: Partial<Profile>) => Promise<void>;
}

export function ProfileHeader({ profile, onUpdate }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    title: profile.title,
    location: profile.location,
    email: profile.email,
    phone: profile.phone,
    bio: profile.bio
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="relative h-48">
        <img
          src={profile.coverImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=400&fit=crop'}
          alt="Cover"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Change Cover
        </button>
      </div>

      <div className="px-8 pb-8">
        <div className="flex flex-col md:flex-row gap-6 -mt-12">
          <div className="relative">
            <img
              src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}&size=128`}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-32 h-32 rounded-lg object-cover border-4 border-white shadow-md"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
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
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {profile.firstName} {profile.lastName}
                    </h1>
                    <p className="text-gray-600">{profile.title}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-secondary"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {profile.phone}
                  </div>
                </div>

                <p className="text-gray-600">{profile.bio}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}