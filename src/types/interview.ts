export interface Interview {
  id: number;
  jobId: number;
  candidateId: string;
  employerId: string;
  scheduledAt: string;
  type: 'video' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  meetingLink?: string;
  notes?: string;
  job: {
    title: string;
    company: string;
  };
  candidate: {
    name: string;
    email: string;
    avatar?: string;
  };
}