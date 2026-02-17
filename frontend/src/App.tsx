import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Public Sections
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Partners from './sections/Partners';
import Staff from './sections/Staff';
import Booking from './sections/Booking';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Admin Pages
import AdminLogin from './admin/Login';
import AdminLayout from './admin/Layout';
import AdminDashboard from './admin/Dashboard';
import AdminBookings from './admin/Bookings';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#f9dc4a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

// Public Layout
function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Staff /> 
        <Partners />        
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="events" element={<div className="p-8 text-center text-gray-500">Events management coming soon</div>} />
            <Route path="cars" element={<div className="p-8 text-center text-gray-500">Cars management coming soon</div>} />
            <Route path="tours" element={<div className="p-8 text-center text-gray-500">Tours management coming soon</div>} />
            <Route path="messages" element={<div className="p-8 text-center text-gray-500">Messages management coming soon</div>} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
