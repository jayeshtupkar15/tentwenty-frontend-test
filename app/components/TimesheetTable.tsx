'use client';

import { useEffect, useState } from 'react';

interface TimesheetEntry {
  week: number;
  date: string;
  status: 'COMPLETED' | 'INCOMPLETE' | 'MISSING';
  action: 'View' | 'Update' | 'Create';
}

// Utility for status colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-600';
    case 'INCOMPLETE':
      return 'bg-yellow-100 text-yellow-600';
    case 'MISSING':
      return 'bg-pink-100 text-pink-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function TimesheetTable() {
  const [data, setData] = useState<TimesheetEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/timesheets')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => setData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-black">Your Timesheets</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-500 text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Week #</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  Loading timesheets...
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-red-500">
                  Failed to load timesheets.
                </td>
              </tr>
            )}

            {!loading && !error && data.map((entry) => (
              <tr key={entry.week} className="border-b">
                <td className="py-3 px-4 text-black">{entry.week}</td>
                <td className="py-3 px-4 text-black">{entry.date}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(entry.status)}`}>
                    {entry.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <a
                    href={`/timesheet/${entry.week}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {entry.action}
                  </a>
                </td>
              </tr>
            ))}

            {!loading && !error && data.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  No timesheet entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
