import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ExperienceSection } from '../components/profile/ExperienceSection';
import { EducationSection } from '../components/profile/EducationSection';
import { CertificationsSection } from '../components/profile/CertificationsSection';
import { PortfolioSection } from '../components/profile/PortfolioSection';
import { SocialSection } from '../components/profile/SocialSection';
import { useProfile } from '../hooks/useProfile';

export function InjectorProfilePage() {
  const { profile, isLoading, error, updateProfile } = useProfile();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error loading profile: {error}
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/injector/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="space-y-8">
        <ProfileHeader profile={profile} onUpdate={updateProfile} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ExperienceSection 
              experience={profile.experience} 
              onUpdate={updateProfile} 
            />
            <EducationSection 
              education={profile.education} 
              onUpdate={updateProfile} 
            />
            <CertificationsSection 
              certifications={profile.certifications} 
              onUpdate={updateProfile} 
            />
            <PortfolioSection 
              portfolio={profile.portfolio} 
              onUpdate={updateProfile} 
            />
          </div>
          
          <div>
            <SocialSection 
              social={profile.social} 
              onUpdate={updateProfile} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}