import React from 'react'

function QuickActions({ onCreateAppointment }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <button onClick={onCreateAppointment} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg p-3 text-sm font-medium">
        New Appointment
      </button>
      <a href="#" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg p-3 text-sm text-center font-medium">
        Register Patient
      </a>
      <a href="#" className="bg-purple-600 hover:bg-purple-500 text-white rounded-lg p-3 text-sm text-center font-medium">
        Add Invoice
      </a>
      <a href="#" className="bg-amber-600 hover:bg-amber-500 text-white rounded-lg p-3 text-sm text-center font-medium">
        View Reports
      </a>
    </div>
  )
}

export default QuickActions
