import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, MessageSquare, Briefcase, Calendar, Star } from 'lucide-react';

interface Notification {
  id: number;
  type: 'application' | 'message' | 'interview' | 'job';
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  link: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'application',
    title: "Application Reviewed",
    description: "Elite Medical Spa has reviewed your application for Lead Aesthetic Nurse",
    date: "2024-03-15T10:30:00Z",
    isRead: false,
    link: "/injector/applications"
  },
  {
    id: 2,
    type: 'interview',
    title: "Interview Scheduled",
    description: "Your interview with Luxury Aesthetics has been confirmed for March 20",
    date: "2024-03-15T09:15:00Z",
    isRead: false,
    link: "/injector/interviews"
  },
  {
    id: 3,
    type: 'job',
    title: "New Job Match",
    description: "A new Senior Injector position matching your preferences is available",
    date: "2024-03-14T16:45:00Z",
    isRead: true,
    link: "/jobs/3"
  }
];

const typeIcons = {
  application: <Briefcase className="w-5 h-5" />,
  message: <MessageSquare className="w-5 h-5" />,
  interview: <Calendar className="w-5 h-5" />,
  job: <Star className="w-5 h-5" />
};

export function NotificationsPage() {
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

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-rose-500" />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {mockNotifications.map((notification) => (
            <Link
              key={notification.id}
              to={notification.link}
              className={`block p-6 hover:bg-gray-50 transition-colors ${
                !notification.isRead ? 'bg-rose-50/50' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  !notification.isRead ? 'bg-rose-100 text-rose-500' : 'bg-gray-100 text-gray-500'
                }`}>
                  {typeIcons[notification.type]}
                </div>
                <div className="flex-1">
                  <h2 className={`text-lg ${!notification.isRead ? 'font-semibold' : ''} text-gray-900`}>
                    {notification.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{notification.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(notification.date).toLocaleString()}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}