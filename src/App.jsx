import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import HomePage from './pages/HomePage.jsx'
import PhysicianPage from './pages/PhysicianPage.jsx'
import SoftwareEngineerPage from './pages/SoftwareEngineerPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import PortalPage from './pages/PortalPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import RequestPage from './pages/RequestPage.jsx'
import FloatingAssistant from './components/FloatingAssistant.jsx'
import { AuthProvider } from './lib/auth.jsx'
import { profile } from './data.js'

// On route change: jump to top, or to the #hash target if there is one.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <AuthProvider>
      <div className="page">
        <ScrollManager />
        <Nav />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/physician" element={<PhysicianPage />} />
            <Route path="/human" element={<Navigate to="/physician" replace />} />
            <Route path="/software-engineer" element={<SoftwareEngineerPage />} />
            <Route path="/vibe" element={<Navigate to="/software-engineer" replace />} />
            <Route path="/idea" element={<Navigate to="/software-engineer" replace />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:tab" element={<ProjectsPage />} />
            <Route path="/portal" element={<PortalPage />} />
            <Route path="/portal/dashboard" element={<DashboardPage />} />
            <Route path="/portal/requests/:id" element={<RequestPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <FloatingAssistant />
        <footer className="footer">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </AuthProvider>
  )
}
