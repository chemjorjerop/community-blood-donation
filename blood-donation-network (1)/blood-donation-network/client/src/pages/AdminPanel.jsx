// Assigned to: Ian — Day 3 (Admin panel: donor management + hospital verification queue)
import { useEffect, useState } from 'react'
import api from '../services/api'

export default function AdminPanel() {
  const [hospitals, setHospitals] = useState([])

  const loadPending = async () => {
    const res = await api.get('/hospitals', { params: { verified: false } })
    setHospitals(res.data)
  }

  useEffect(() => { loadPending() }, [])

  const verify = async (id) => {
    await api.put(`/hospitals/${id}/verify`)
    loadPending()
  }

  const recheckAuto = async (id) => {
    const res = await api.post(`/hospitals/${id}/auto-verify`)
    if (res.data.verified) loadPending()
    else alert(res.data.message)
  }

  return (
    <div className="page">
      <h1>Hospital Verification Queue</h1>
      {hospitals.length === 0 ? (
        <p>No hospitals pending verification.</p>
      ) : (
        <ul>
          {hospitals.map((h) => (
            <li key={h.id}>
              {h.name} — {h.city}
              <button onClick={() => recheckAuto(h.id)}>Re-check KMHFR</button>
              <button onClick={() => verify(h.id)}>Approve manually</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
