// Assigned to: Ian — Day 2 (Request detail page + matched donors view)
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import { connectSocket } from '../services/socket'

export default function HospitalRequestDetail() {
  const { id } = useParams()
  const [req, setReq] = useState(null)
  const [matchResult, setMatchResult] = useState(null)
  const [liveUpdate, setLiveUpdate] = useState(null)

  useEffect(() => {
    api.get(`/requests/${id}`).then((res) => setReq(res.data))

    const socket = connectSocket()
    if (socket) {
      socket.on('match_response', (match) => {
        setLiveUpdate(`${match.donor_name} ${match.response_status} the request`)
        setTimeout(() => setLiveUpdate(null), 6000)
      })
    }
    return () => socket && socket.off('match_response')
  }, [id])

  const runMatching = async () => {
    const res = await api.post(`/requests/${id}/match`)
    setMatchResult(res.data)
  }

  if (!req) return <p>Loading...</p>

  return (
    <div className="page">
      <h1>Request #{req.id}</h1>
      <p>{req.blood_type} · {req.units_needed} units · {req.urgency_level} · {req.status}</p>

      {liveUpdate && <div className="live-banner">{liveUpdate}</div>}

      <button onClick={runMatching}>Find matching donors</button>

      {matchResult && (
        <div>
          <p>{matchResult.matches_created} donor(s) matched and notified in real time.</p>
          <ul>
            {matchResult.matches.map((m) => (
              <li key={m.id}>Donor #{m.donor_id} — {m.response_status}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
