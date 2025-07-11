"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarStreak = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const generateStreakDays = (): Date[] => {
    const today = new Date();
    const streakDays: Date[] = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const random = Math.random();

      if (isWeekend) {
        if (random < 0.3) streakDays.push(date);
      } else {
        if (random < 0.8) streakDays.push(date);
      }
    }

    return streakDays;
  };

  const streakDays = generateStreakDays();

  const daysInMonth: number = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth: number = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const isStreakDay = (day: number): boolean => {
    return streakDays.some(
      (streakDay) =>
        streakDay.getDate() === day &&
        streakDay.getMonth() === currentDate.getMonth() &&
        streakDay.getFullYear() === currentDate.getFullYear(),
    );
  };

  const calculateCurrentStreak = (): number => {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < streakDays.length; i++) {
      const date = new Date(streakDays[i]);
      date.setHours(0, 0, 0, 0);

      if (date.getTime() === today.getTime() - i * 24 * 60 * 60 * 1000) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateCurrentStreak();

  return (
    <div className="bg-slate-950 p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl text-center">Streak Calendar</h1>
          <p className="text-sm text-slate-400 text-center mt-1">
            Current Streak: {currentStreak} days 🔥
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-lg font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm text-slate-400 py-1">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isStreak = isStreakDay(day);

          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center rounded-lg transition-colors ${
                isStreak
                  ? "bg-pink-700 hover:bg-pink-800"
                  : "hover:bg-slate-800"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarStreak;