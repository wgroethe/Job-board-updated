export type NotificationType = 
  | 'application_update'
  | 'new_message' 
  | 'interview_scheduled'
  | 'job_alert'
  | 'profile_view';

export interface Notification {
  id: number;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  link?: string;
}