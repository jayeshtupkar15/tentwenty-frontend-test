export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
      <div className="text-xl font-bold text-gray-800">ticktock</div>
      <div className="text-sm font-medium text-gray-600">Timesheets</div>
      <div className="text-sm text-gray-800 flex items-center gap-1">
        John Doe <span className="text-green-500">✔</span>
      </div>
    </nav>
  );
}
