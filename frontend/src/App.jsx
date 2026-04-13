import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: '#1e1b4b',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '14px',
              },
              iconTheme: { primary: '#818cf8', secondary: '#fff' }
            },
            error: {
              style: {
                background: '#1e1b4b',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '14px',
              },
              iconTheme: { primary: '#f87171', secondary: '#fff' }
            }
          }}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

//cd backend
//node index.js
//cd frontend
//npm run dev