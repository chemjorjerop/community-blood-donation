// Assigned to: Victor — Day 1 (Protected route wrapper + role-based dashboard shell)
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="page">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <button onClick={logout}>Log out</button>
      </div>

      {user.role === 'donor' && (
        <ul className="dashboard-links">
          <li><Link to="/donor/profile">My profile</Link></li>
          <li><Link to="/donor/matches">My matches</Link></li>
          <li><Link to="/donor/history">Donation history</Link></li>
        </ul>
      )}

      {user.role === 'hospital_staff' && (
        <ul className="dashboard-links">
          <li><Link to="/hospital/requests">Our requests</Link></li>
          <li><Link to="/hospital/requests/new">Create emergency request</Link></li>
        </ul>
      )}

      {user.role === 'admin' && (
        <ul className="dashboard-links">
          <li><Link to="/admin/donors">Manage donors</Link></li>
          <li><Link to="/admin/hospitals">Hospital verification queue</Link></li>
        </ul>
      )}
    </div>
  )
}
