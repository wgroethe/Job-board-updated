import React, { useState } from 'react';
import { Plus, Award, Calendar, Pencil, Trash2 } from 'lucide-react';
import type { Certification } from '../../types/profile';

interface CertificationsSectionProps {
  certifications: Certification[];
  onUpdate: (data: { certifications: Certification[] }) => Promise<void>;
}

export function CertificationsSection({ certifications, onUpdate }: CertificationsSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Certification>({
    id: Date.now(),
    name: '',
    issuer: '',
    issueDate: '',
    expirationDate: '',
    credentialId: '',
    credentialUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await onUpdate({
          certifications: certifications.map(cert => 
            cert.id === editingId ? formData : cert
          )
        });
        setEditingId(null);
      } else {
        await onUpdate({
          certifications: [...certifications, { ...formData, id: Date.now() }]
        });
        setIsAdding(false);
      }
      setFormData({
        id: Date.now(),
        name: '',
        issuer: '',
        issueDate: '',
        expirationDate: '',
        credentialId: '',
        credentialUrl: ''
      });
    } catch (error) {
      console.error('Error updating certification:', error);
      alert('Failed to update certification. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this certification?')) {
      try {
        await onUpdate({
          certifications: certifications.filter(cert => cert.id !== id)
        });
      } catch (error) {
        console.error('Error deleting certification:', error);
        alert('Failed to delete certification. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Plus className="w-4  h-4" />
            Add Certification
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Certification Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
              <input
                type="text"
                required
                value={formData.issuer}
                onChange={e => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Issue Date</label>
              <input
                type="month"
                required
                value={formData.issueDate}
                onChange={e => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
              <input
                type="month"
                value={formData.expirationDate}
                onChange={e => setFormData(prev => ({ ...prev, expirationDate: e.target.value }))}
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Credential ID</label>
              <input
                type="text"
                value={formData.credentialId}
                onChange={e => setFormData(prev => ({ ...prev, credentialId: e.target.value }))}
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Credential URL</label>
              <input
                type="url"
                value={formData.credentialUrl}
                onChange={e => setFormData(prev => ({ ...prev, credentialUrl: e.target.value }))}
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({
                  id: Date.now(),
                  name: '',
                  issuer: '',
                  issueDate: '',
                  expirationDate: '',
                  credentialId: '',
                  credentialUrl: ''
                });
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Save Changes' : 'Add Certification'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="border-b last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-rose-50 rounded-lg">
                  <Award className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Issued: {new Date(cert.issueDate).toLocaleDateString(undefined, { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                      {cert.expirationDate && (
                        <>
                          {' • Expires: '}
                          {new Date(cert.expirationDate).toLocaleDateString(undefined, {
                            month: 'long',
                            year: 'numeric'
                          })}
                        </>
                      )}
                    </span>
                  </div>
                  {cert.credentialId && (
                    <p className="text-sm text-gray-500">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-rose-500 hover:text-rose-600 mt-1 inline-block"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingId(cert.id);
                    setFormData(cert);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}