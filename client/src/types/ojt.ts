// Defines the exact structure of a Student record
export interface Student {
  id: number | string;
  initials: string;
  name: string;
  type: 'OJT' | 'SPES' | 'Work Immersion';
  school: string;
  required: number;
  remaining: number;
  status: 'ACTIVE' | 'COMPLETED' | 'INACTIVE';
}

// Defines the exact structure of an Activity Log
export interface ActivityLog {
  id: number | string;
  date: string;
  day: string;
  initials: string;
  name: string;
  studentId: string;
  timeIn: string;
  timeOut: string;
  duration: string;
  status: 'Verified' | 'Active' | 'Flagged';
  isDurationAlert?: boolean;
}