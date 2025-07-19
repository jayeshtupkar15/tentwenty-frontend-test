'use client';

import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import AddEntryModal from './AddEntryModal';

interface Task {
  id: number;
  project: string;
  hours: number;
}

interface WeekData {
  startDate: string;
  endDate: string;
  tasks: Record<string, Task[]>;
}

export default function TimesheetList({ week }: { week: string }) {
  const [weekData, setWeekData] = useState<WeekData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch data for the selected week
  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`/api/timesheets/${week}`)
      .then((res) => {
        if (!res.ok) throw new Error('Timesheet not found');
        return res.json();
      })
      .then((data) => setWeekData(data))
      .catch((err) => {
        console.error('Failed to fetch timesheet data:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [week]);

  // Add new task entry
  const handleAddEntry = (entry: { project: string; hours: number }) => {
    setWeekData((prev) => {
      if (!prev) return prev;

      const updatedTasks = {
        ...prev.tasks,
        [selectedDate]: [
          ...(prev.tasks[selectedDate] || []),
          {
            id: Date.now(),
            project: entry.project,
            hours: entry.hours,
          },
        ],
      };

      return { ...prev, tasks: updatedTasks };
    });
  };

  // ⏳ Show loading spinner
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading timesheet...
      </div>
    );
  }

  // ❌ Show error if fetch failed
  if (error || !weekData || !weekData.tasks) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load timesheet or data not available.
      </div>
    );
  }

  // ✅ Calculate total hours
  const totalHours = Object.values(weekData.tasks)
    .flat()
    .reduce((sum, task) => sum + task.hours, 0);

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-black">This week’s timesheet</h2>
        <span className="text-xs text-gray-500">
          {weekData.startDate} - {weekData.endDate}
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded mb-4">
        <div
          className="bg-orange-500 h-2 rounded"
          style={{ width: `${(totalHours / 40) * 100}%` }}
        />
      </div>
      <p className="text-right text-xs mb-6 text-gray-600">{totalHours}/40 hrs</p>

      {Object.entries(weekData.tasks).map(([date, tasks]) => (
        <div key={date} className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">{date}</h4>
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <p
              className="text-sm text-blue-600 cursor-pointer hover:underline"
              onClick={() => {
                setSelectedDate(date);
                setShowModal(true);
              }}
            >
              + Add new task
            </p>
          )}
        </div>
      ))}

      {showModal && (
        <AddEntryModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddEntry}
        />
      )}
    </div>
  );
}
