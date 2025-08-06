import { useState } from 'react';
import CalendarStreak from './CalendarStreak';
import GitHubCalendar, { Activity } from 'react-github-calendar';

type Contribution = {
  date: string;
  count: number;
  level: number;
};

const StreakSection = () => {
  const [view, setView] = useState<'calendar' | 'github'>('calendar');

  const selectLastHalfYear = (contributions: Contribution[]): Activity[] => {
    const now = new Date();
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));

    return contributions.filter((activity) => {
      const date = new Date(activity.date);
      return date >= sixMonthsAgo;
    }) as Activity[];
  };

  return (
    <section className='flex flex-col gap-4 w-1/4'>

    </section>
  );
};

export default StreakSection;
