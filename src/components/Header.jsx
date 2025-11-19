import React from 'react'

function Header() {
  return (
    <div className="px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
        <div>
          <h1 className="text-xl font-semibold text-white">Clinic Manager</h1>
          <p className="text-xs text-blue-200/80">Appointments, billing, and analytics</p>
        </div>
      </div>
      <a href="/test" className="text-xs text-blue-200 hover:text-white underline">Check backend</a>
    </div>
  )
}

export default Header
