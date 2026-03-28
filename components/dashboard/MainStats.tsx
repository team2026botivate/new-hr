'use client';

import { Users, UserMinus, UserPlus, Search } from 'lucide-react';
import StatCard from '@/components/shared/StatCard';
import { ATTENDANCE_SUMMARY } from '@/lib/data/attendance';

/**
 * Main dashboard stats bar
 */
export default function MainStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Present Today"
        value={`${ATTENDANCE_SUMMARY.present}/247`}
        change="+12% from yesterday"
        changeType="up"
        icon={Users}
        iconColor="bg-[--success-light] text-[--success]"
      />
      <StatCard
        title="On Leave"
        value={ATTENDANCE_SUMMARY.onLeave}
        change="-2 from yesterday"
        changeType="down"
        icon={UserMinus}
        iconColor="bg-[--danger-light] text-[--danger]"
      />
      <StatCard
        title="New Hires (Month)"
        value="3"
        change="+1 more than Feb"
        changeType="up"
        icon={UserPlus}
        iconColor="bg-[--brand-light] text-[--brand]"
      />
      <StatCard
        title="Open Positions"
        value="7"
        change="2 active hunts"
        changeType="neutral"
        icon={Search}
        iconColor="bg-[--info-light] text-[--info]"
      />
    </div>
  );
}
