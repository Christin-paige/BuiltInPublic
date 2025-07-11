import { useState } from "react";
import CalendarStreak from "./CalendarStreak";
import GitHubCalendar from "react-github-calendar";

type Contribution = {
  date: string;
  count: number;
  level: number;
};

const StreakSection = (): JSX.Element => {
  const [view, setView] = useState<"calendar" | "github">("calendar");

  const selectLastHalfYear = (
    contributions: Contribution[],
  ): Contribution[] => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    return contributions.filter((activity) => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();

      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - 6 &&
        monthOfDay <= currentMonth
      );
    });
  };

  return (
    <section className="flex flex-col gap-4 w-1/4">
      <div className="flex gap-2">
        <button
          className={`p-2 rounded-lg border text-center w-fit cursor-pointer hover:bg-slate-800 transition-all 
            duration-100 active:scale-95 flex items-center gap-2 ${
              view === "calendar"
                ? "bg-slate-700 border-cyan-800"
                : "bg-slate-950"
            }`}
          onClick={() => setView("calendar")}
        >
          <p>Calendar View</p>
        </button>
        <button
          className={`p-2 rounded-lg border text-center w-fit cursor-pointer hover:bg-slate-800 transition-all 
            duration-100 active:scale-95 flex items-center gap-2 ${
              view === "github"
                ? "bg-slate-700 border-cyan-800"
                : "bg-slate-950"
            }`}
          onClick={() => setView("github")}
        >
          <p>GitHub View</p>
        </button>
      </div>

      <div className="relative min-h-[300px]">
        <div className={`${view === "calendar" ? "block" : "hidden"}`}>
          <CalendarStreak />
        </div>
        <div
          className={`bg-slate-950 p-4 rounded-lg border ${
            view === "github" ? "block" : "hidden"
          }`}
        >
          <GitHubCalendar
            username="G-Hensley"
            transformData={selectLastHalfYear}
          />
        </div>
      </div>
    </section>
  );
};

export default StreakSection;
