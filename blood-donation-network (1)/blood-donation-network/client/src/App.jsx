// Assigned to: Victor — Day 1 (Set up React app + Router + index.html shell)
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import DonorProfile from './pages/DonorProfile'
import DonorMatches from './pages/DonorMatches'
import DonationHistory from './pages/DonationHistory'
import HospitalRequests from './pages/HospitalRequests'
import HospitalRequestNew from './pages/HospitalRequestNew'
import HospitalRequestDetail from './pages/HospitalRequestDetail'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route path="/donor/profile" element={<ProtectedRoute allowedRoles={['donor']}><DonorProfile /></ProtectedRoute>} />
          <Route path="/donor/matches" element={<ProtectedRoute allowedRoles={['donor']}><DonorMatches /></ProtectedRoute>} />
          <Route path="/donor/history" element={<ProtectedRoute allowedRoles={['donor']}><DonationHistory /></ProtectedRoute>} />

          <Route path="/hospital/requests" element={<ProtectedRoute allowedRoles={['hospital_staff']}><HospitalRequests /></ProtectedRoute>} />
          <Route path="/hospital/requests/new" element={<ProtectedRoute allowedRoles={['hospital_staff']}><HospitalRequestNew /></ProtectedRoute>} />
          <Route path="/hospital/requests/:id" element={<ProtectedRoute allowedRoles={['hospital_staff']}><HospitalRequestDetail /></ProtectedRoute>} />

          <Route path="/admin/hospitals" element={<ProtectedRoute allowedRoles={['admin']}><AdminPanel /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
