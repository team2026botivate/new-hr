import type { Announcement } from '@/types';

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN001',
    title: 'New WFH Guidelines for Summer 2025',
    content: 'All employees are eligible for 2 days of remote work per week starting next month. Please update your preferences in the settings.',
    category: 'policy',
    postedBy: 'Priya Mehta',
    postedOn: '2025-03-20',
    isImportant: true,
  },
  {
    id: 'ANN002',
    title: 'Upcoming Holi Celebration in Office',
    content: 'We are organizing a small Holi event at the Bengaluru and Mumbai offices on March 13th. Ethnic wear is encouraged!',
    category: 'event',
    postedBy: 'Suresh Reddy',
    postedOn: '2025-03-05',
    isImportant: false,
  },
  {
    id: 'ANN003',
    title: 'Annual Performance Review Cycle',
    content: 'The review cycle for FY 24-25 starts on April 1st. Please ensure your KRA sheets are updated by the end of this month.',
    category: 'general',
    postedBy: 'Rajesh Sharma',
    postedOn: '2025-03-10',
    isImportant: true,
  },
  {
    id: 'ANN004',
    title: 'Insurance Policy Update',
    content: 'Our group health insurance has been renewed. You can now add up to 2 extra dependents with a small premium adjustment.',
    category: 'policy',
    postedBy: 'Priya Mehta',
    postedOn: '2025-03-15',
    isImportant: false,
  },
  {
    id: 'ANN005',
    title: 'Independence Day Long Weekend',
    content: 'Since August 15th falls on a Friday, the office will remain closed for 3 days. Happy independence day in advance!',
    category: 'holiday',
    postedBy: 'Suresh Reddy',
    postedOn: '2025-08-01',
    isImportant: false,
  },
];
