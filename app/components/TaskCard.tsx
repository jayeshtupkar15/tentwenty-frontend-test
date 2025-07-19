interface Task {
  project: string;
  hours: number;
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="flex justify-between items-center p-3 bg-white rounded shadow text-sm mb-2">
      <span className="text-gray-800">{task.project}</span>
      <span className="text-gray-600">{task.hours} hrs</span>
      <span className="text-xs text-blue-600 border border-blue-300 px-2 py-1 rounded">
        {task.project}
      </span>
    </div>
  );
}
