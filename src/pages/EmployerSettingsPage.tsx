import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Bell, 
  CreditCard,
  Building2
} from 'lucide-react';
import { BillingSection } from '../components/BillingSection';
import { getCurrentPlan } from '../services/billingService';

type TabType = 'profile' | 'email' | 'password' | 'notifications' | 'billing';

export function EmployerSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('billing');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      applicationUpdates: true,
      messages: true,
      marketingEmails: false
    }
  });

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Add your save logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/employers/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'profile'
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Building2 className="w-5 h-5" />
              Company Profile
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'email'
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Mail className="w-5 h-5" />
              Email Settings
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'password'
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Lock className="w-5 h-5" />
              Password
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'billing'
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              Billing & Plan
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Company Profile</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                    className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Email Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.notifications.applicationUpdates}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          applicationUpdates: e.target.checked
                        }
                      }))}
                      className="rounded text-rose-500 focus:ring-rose-500"
                    />
                    <span className="text-gray-700">Application Updates</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.notifications.messages}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          messages: e.target.checked
                        }
                      }))}
                      className="rounded text-rose-500 focus:ring-rose-500"
                    />
                    <span className="text-gray-700">Messages</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.notifications.marketingEmails}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          marketingEmails: e.target.checked
                        }
                      }))}
                      className="rounded text-rose-500 focus:ring-rose-500"
                    />
                    <span className="text-gray-700">Marketing Emails</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <BillingSection />
            )}

            {activeTab !== 'billing' && (
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn btn-primary w-full md:w-auto"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}