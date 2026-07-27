// Assigned to: Ian — Day 2 (Hospital requests list + create request form)
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function HospitalRequests() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    api.get('/requests').then((res) => setRequests(res.data))
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Our Requests</h1>
        <Link to="/hospital/requests/new"><button>+ New request</button></Link>
      </div>
      <ul className="request-list">
        {requests.map((r) => (
          <li key={r.id}>
            <Link to={`/hospital/requests/${r.id}`}>
              {r.blood_type} · {r.units_needed} units · {r.urgency_level} · {r.status}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
