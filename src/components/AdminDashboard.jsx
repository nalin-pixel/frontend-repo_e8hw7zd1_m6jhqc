import React, { useEffect, useMemo, useState } from 'react'

const fmt = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' })
const dfmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })

function AdminDashboard() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [clinicId, setClinicId] = useState('demo-clinic')
  const [data, setData] = useState({ appointments: [], invoices: [], payments: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/analytics/summary?clinic_id=${clinicId}`)
      if (!res.ok) throw new Error('Failed to load')
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const totals = useMemo(() => {
    const invoiceTotals = data.invoices.map(inv => (inv.items || []).reduce((s, it) => s + (it.qty || 1) * (it.unit_price || 0), 0))
    const gross = invoiceTotals.reduce((a, b) => a + b, 0)
    const discounts = (data.invoices || []).reduce((s, inv) => s + (inv.discount || 0), 0)
    const tax = (data.invoices || []).reduce((s, inv) => s + ((inv.tax_rate || 0) / 100) * (invoiceTotals.shift() || 0), 0)
    const paid = (data.payments || []).reduce((s, p) => s + (p.amount || 0), 0)
    return { gross, discounts, tax, paid }
  }, [data])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Appointments" value={data.appointments.length} />
        <StatCard title="Invoices" value={data.invoices.length} />
        <StatCard title="Collected" value={fmt.format(totals.paid)} />
        <StatCard title="Gross" value={fmt.format(totals.gross)} />
      </div>

      <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Recent Appointments</h3>
          <button onClick={load} className="text-xs px-2 py-1 rounded bg-blue-600 text-white">Refresh</button>
        </div>
        {loading ? (
          <p className="text-blue-200 text-sm">Loading...</p>
        ) : error ? (
          <p className="text-red-300 text-sm">{error}</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-auto pr-1">
            {data.appointments.slice(0, 8).map((a, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-900/40 rounded-lg px-3 py-2">
                <div className="text-blue-100 text-sm">
                  <p className="font-medium">Doctor: {a.doctor_id} • Patient: {a.patient_id}</p>
                  <p className="text-blue-300/80 text-xs">{dfmt.format(new Date(a.starts_at))}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-slate-700 text-blue-200">{a.status}</span>
              </div>
            ))}
            {data.appointments.length === 0 && (
              <p className="text-blue-200 text-sm">No appointments yet.</p>
            )}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2">Recent Invoices</h3>
          <div className="space-y-2 max-h-64 overflow-auto pr-1">
            {data.invoices.slice(0, 8).map((inv, i) => {
              const total = (inv.items || []).reduce((s, it) => s + (it.qty || 1) * (it.unit_price || 0), 0) - (inv.discount || 0)
              return (
                <div key={i} className="flex items-center justify-between bg-slate-900/40 rounded-lg px-3 py-2">
                  <div className="text-blue-100 text-sm">
                    <p className="font-medium">Invoice for {inv.patient_id}</p>
                    <p className="text-blue-300/80 text-xs">{inv.items?.length || 0} items</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-slate-700 text-blue-200">{fmt.format(total)}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2">Recent Payments</h3>
          <div className="space-y-2 max-h-64 overflow-auto pr-1">
            {data.payments.slice(0, 8).map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-900/40 rounded-lg px-3 py-2">
                <div className="text-blue-100 text-sm">
                  <p className="font-medium">Invoice: {p.invoice_id}</p>
                  <p className="text-blue-300/80 text-xs">Method: {p.method}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-slate-700 text-blue-200">{fmt.format(p.amount || 0)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
      <p className="text-blue-200 text-sm">{title}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}

export default AdminDashboard
