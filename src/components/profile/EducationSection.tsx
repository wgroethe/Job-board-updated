import React, { useState } from 'react';
import { Plus, GraduationCap, Calendar, Pencil, Trash2 } from 'lucide-react';
import type { Education } from '../../types/profile';

interface EducationSectionProps {
  education: Education[];
  onUpdate: (data: { education: Education[] }) => Promise<void>;
}

export function EducationSection({ education, onUpdate }: EducationSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Education>({
    id: Date.now(),
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await onUpdate({
          education: education.map(edu => 
            edu.id === editingId ? formData : edu
          )
        });
        setEditingId(null);
      } else {
        await onUpdate({
          education: [...education, { ...formData, id: Date.now() }]
        });
        setIsAdding(false);
      }
      setFormData({
        id: Date.now(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    } catch (error) {
      console.error('Error updating education:', error);
      alert('Failed to update education. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this education?')) {
      try {
        await onUpdate({
          education: education.filter(edu => edu.id !== id)
        });
      } catch (error) {
        console.error('Error deleting education:', error);
        alert('Failed to delete education. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">School</label>
            <input
              type="text"
              required
              value={formData.school}
              onChange={e => setFormData(prev => ({ ...prev, school: e.target.value }))}
              className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                required
                value={formData.degree}
                onChange={e => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
              <input
                type="text"
                required
                value={formData.field}
                onChange={e => setFormData(prev => ({ ...prev, field: e.target.value }))}
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                required
                value={formData.startDate}
                onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="month"
                value={formData.endDate}
                onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                disabled={formData.current}
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.current}
                onChange={e => setFormData(prev => ({ ...prev, current: e.target.checked }))}
                className="rounded text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-700">I'm currently studying here</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({
                  id: Date.now(),
                  school: '',
                  degree: '',
                  field: '',
                  startDate: '',
                  endDate: '',
                  current: false,
                  description: ''
                });
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Save Changes' : 'Add Education'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="border-b last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-rose-50 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                  <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(edu.startDate).toLocaleDateString(undefined, { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                      {' - '}
                      {edu.current ? 'Present' : new Date(edu.endDate).toLocaleDateString(undefined, {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="mt-2 text-gray-600">{edu.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingId(edu.id);
                    setFormData(edu);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
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