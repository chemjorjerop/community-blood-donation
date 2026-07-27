// Assigned to: Ian — Day 2 (Hospital requests list + create request form)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function HospitalRequestNew() {
  const [form, setForm] = useState({ blood_type: 'O+', units_needed: 1, urgency_level: 'medium' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const update = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/requests', form)
      navigate(`/hospital/requests/${res.data.id}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Could not create request')
    }
  }

  return (
    <div className="page">
      <h1>New Emergency Request</h1>
      <form onSubmit={handleSubmit}>
        <select name="blood_type" value={form.blood_type} onChange={update}>
          {['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'].map((bt) => <option key={bt} value={bt}>{bt}</option>)}
        </select>
        <input name="units_needed" type="number" min="1" value={form.units_needed} onChange={update} />
        <select name="urgency_level" value={form.urgency_level} onChange={update}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="critical">Critical</option>
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create request</button>
      </form>
    </div>
  )
}
