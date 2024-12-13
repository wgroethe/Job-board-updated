import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Instagram, 
  Users, 
  Edit, 
  Image as ImageIcon,
  Plus,
  Trash2
} from 'lucide-react';

interface Image {
  id: number;
  url: string;
  caption: string;
}

export function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: 'Elite Medical Spa',
    logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=128&h=128&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=400&fit=crop',
    description: 'Elite Medical Spa is a premier aesthetic medicine provider in Beverly Hills. We specialize in advanced injectable treatments, laser procedures, and cutting-edge aesthetic solutions.',
    location: 'Beverly Hills, CA',
    website: 'www.elitemedicalspa.com',
    instagram: '@elitemedicalspa',
    employeeCount: '10-50',
    founded: '2015',
    specialties: ['Botox', 'Dermal Fillers', 'PDO Threads', 'Laser Treatments'],
    benefits: [
      'Competitive Compensation',
      'Medical Benefits',
      'Continuing Education',
      'Flexible Schedule'
    ],
    culture: 'We foster a collaborative environment where aesthetic professionals can thrive and grow. Our team is passionate about delivering exceptional patient care and staying at the forefront of aesthetic medicine.',
    images: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
        caption: 'Our modern treatment rooms'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
        caption: 'State-of-the-art equipment'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1576091160291-bb5a93d37429?w=600&h=400&fit=crop',
        caption: 'Our welcoming reception area'
      }
    ] as Image[]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to your backend
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Cover Image */}
      <div className="relative h-[300px] rounded-xl overflow-hidden mb-8">
        <img
          src={companyData.coverImage}
          alt={companyData.name}
          className="w-full h-full object-cover"
        />
        {isEditing && (
          <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Change Cover
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={companyData.logo}
                  alt={companyData.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{companyData.location}</span>
                  </div>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              )}
            </div>

            <div className="prose max-w-none">
              {isEditing ? (
                <textarea
                  value={companyData.description}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-600">{companyData.description}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href={`https://${companyData.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Globe className="w-4 h-4" />
                {companyData.website}
              </a>
              <a
                href={`https://instagram.com/${companyData.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Instagram className="w-4 h-4" />
                {companyData.instagram}
              </a>
              <span className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                {companyData.employeeCount} employees
              </span>
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Facility Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companyData.images.map((image) => (
                <div key={image.id} className="group relative">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {isEditing && (
                    <button
                      className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        setCompanyData(prev => ({
                          ...prev,
                          images: prev.images.filter(img => img.id !== image.id)
                        }));
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                  <p className="text-sm text-gray-600 mt-2">{image.caption}</p>
                </div>
              ))}
              {isEditing && (
                <button className="h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
                  <Plus className="w-8 h-8" />
                  <span>Add Image</span>
                </button>
              )}
            </div>
          </div>

          {/* Culture & Benefits */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Culture & Benefits</h2>
            
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Company Culture</h3>
              {isEditing ? (
                <textarea
                  value={companyData.culture}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, culture: e.target.value }))}
                  className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-600">{companyData.culture}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">Benefits & Perks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companyData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                    <span>{benefit}</span>
                  </div>
                ))}
                {isEditing && (
                  <button className="flex items-center gap-2 text-rose-500 hover:text-rose-600">
                    <Plus className="w-4 h-4" />
                    Add Benefit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Founded</p>
                <p className="font-medium text-gray-900">{companyData.founded}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Team Size</p>
                <p className="font-medium text-gray-900">{companyData.employeeCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Specialties</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {companyData.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Open Positions</h2>
            <div className="space-y-4">
              <Link
                to="/jobs/1"
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900">Lead Aesthetic Nurse</h3>
                <p className="text-sm text-gray-600">Full-time • Beverly Hills, CA</p>
              </Link>
              <Link
                to="/jobs/2"
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900">Aesthetic Nurse Injector</h3>
                <p className="text-sm text-gray-600">Part-time • Beverly Hills, CA</p>
              </Link>
              <Link
                to="/employers/post-job"
                className="flex items-center justify-center gap-2 text-rose-500 hover:text-rose-600 mt-4"
              >
                <Plus className="w-4 h-4" />
                Post New Position
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}