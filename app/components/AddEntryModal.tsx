'use client';

import { useState } from 'react';

interface Props {
  onClose: () => void;
  onSubmit: (entry: any) => void;
}

export default function AddEntryModal({ onClose, onSubmit }: Props) {
  const [project, setProject] = useState('');
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');
  const [hours, setHours] = useState(1);

  const handleSubmit = () => {
    if (!project || !type || !desc || !hours) return;
    onSubmit({ project, type, desc, hours });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-black">Add New Entry</h2>

        <label className="block text-sm mb-2 text-black">Select Project</label>
        <select
          className="w-full border rounded p-2 mb-4 text-black"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          <option value="">Project Name</option>
          <option value="Homepage">Homepage</option>
          <option value="Dashboard">Dashboard</option>
        </select>

        <label className="block text-sm mb-2 text-black">Type of Work</label>
        <select
          className="w-full border rounded p-2 mb-4 text-black"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Bug fixes</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
        </select>

        <label className="block text-sm mb-2 text-black">Task Description</label>
        <textarea
          className="w-full border rounded p-2 mb-4 text-black"
          placeholder="Write task here..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <label className="block text-sm mb-2 text-black">Hours</label>
        <input
          type="number"
          min="1"
          max="12"
          className="w-20 border rounded p-2 mb-4 text-black"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Entry
          </button>
        </div>
      </div>
    </div>
  );
}
