import Header from './components/Header'
import QuickActions from './components/QuickActions'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const handleCreateAppointment = () => {
    window.alert('This demo focuses on dashboard and data flow. We can add full appointment creation UI next!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]"></div>

      <div className="relative min-h-screen max-w-6xl mx-auto p-4 md:p-8">
        <Header />

        <div className="bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-5 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white text-2xl font-semibold">Admin Panel</h2>
              <p className="text-blue-200/80 text-sm">Overview of appointments, invoices and payments</p>
            </div>
          </div>

          <QuickActions onCreateAppointment={handleCreateAppointment} />

          <div className="h-6" />

          <AdminDashboard />
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-blue-300/60">Tip: Use the backend test page to confirm database connection.</p>
        </div>
      </div>
    </div>
  )
}

export default App
