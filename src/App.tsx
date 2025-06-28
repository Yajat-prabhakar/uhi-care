import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom';
import { Menu, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Cart from './components/Cart';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorSearch from './components/DoctorSearch';
import DoctorRegistration from './components/DoctorRegistration';
import Telemedicine from './components/Telemedicine';
import MedicalRecords from './components/MedicalRecords';
import HealthInsights from './components/HealthInsights';
import AppointmentBooking from './components/AppointmentBooking';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import VideoCall from './components/VideoCall';
import Feedback from './components/Feedback';
import LabTests from './components/LabTests';
import Medicines from './components/Medicines';
import Insurance from './components/Insurance';
import Ambulance from './components/Ambulance';
import EmergencyContacts from './components/EmergencyContacts';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminDashboard from './components/admin/AdminDashboard';
import CartIcon from './components/shared/CartIcon';
import EmergencyButton from './components/shared/EmergencyButton';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Checkout from './components/Checkout';
import BookingConfirmation from './components/BookingConfirmation';
import MedNest from './components/MedNest'; // ✅ NEW IMPORT

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return user ? children : <Navigate to="/signin" />;
  };

  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    return user?.role === 'admin' ? children : <Navigate to="/" />;
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <ToastContainer position="top-right" autoClose={3000} />
        <header className="bg-white shadow-md">
          <div className="mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              UHI Open Healthcare
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu />
            </button>
            <nav className="md:flex md:items-center md:space-x-6 space-y-2 md:space-y-0">
              {/* Standalone Links */}
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <a href="https://uhi-medibot.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">HealthBot</a>
              <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Find Doctor</Link>
              <Link to="/mednest" className="text-gray-700 hover:text-blue-600 transition-colors">MedNest</Link>
              {user && (
                <Link to={user.role === 'doctor' ? "/doctor-dashboard" : "/dashboard"} className="text-gray-700 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
              )} 

              {/* Logged-in User Profile + Menu */}
              {user && (
                <div className="relative group flex items-center space-x-2">
                  <img
                    src={"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" || defaultAvatar}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <span className="text-gray-700">{user.name}</span>

                  <button className="text-gray-700 hover:text-blue-600">
                    <Menu className="w-6 h-6" />
                  </button>

                  {/* Dropdown Menu */}
                  <ul className="absolute right-0 top-full mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 transform -translate-y-2 z-50">
                    <li><Link to="/medicines" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Medicines</Link></li>
                    <li><Link to="/lab-tests" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Lab Tests</Link></li>
                    <li><Link to="/insurance" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Insurance</Link></li>
                    <li><Link to="/doctor-registration" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Doctor Registration</Link></li>
                    <li><Link to="/blog" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Blog</Link></li>
                    <li><Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">About</Link></li>
                    <li><button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100">Logout</button></li>
                  </ul>
                </div>
              )}

              {!user && (
                <Link to="/signin" className="text-gray-700 hover:text-blue-600 transition-colors">Sign In / Sign Up</Link>
              )}
            </nav>
          </div>
        </header>

        <main className="mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog/*" element={<Blog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/doctor-registration" element={<DoctorRegistration />} />
            <Route path="/dashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>} />
            <Route path="/doctor-dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
            <Route path="/doctors" element={<PrivateRoute><DoctorSearch /></PrivateRoute>} />
            <Route path="/telemedicine" element={<PrivateRoute><Telemedicine /></PrivateRoute>} />
            <Route path="/records" element={<PrivateRoute><MedicalRecords /></PrivateRoute>} />
            <Route path="/insights" element={<PrivateRoute><HealthInsights /></PrivateRoute>} />
            <Route path="/book-appointment/:doctorId" element={<PrivateRoute><AppointmentBooking /></PrivateRoute>} />
            <Route path="/appointment-confirmation" element={<PrivateRoute><AppointmentConfirmation /></PrivateRoute>} />
            <Route path="/video-call/:appointmentId" element={<PrivateRoute><VideoCall /></PrivateRoute>} />
            <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
            <Route path="/lab-tests" element={<PrivateRoute><LabTests /></PrivateRoute>} />
            <Route path="/medicines" element={<PrivateRoute><Medicines /></PrivateRoute>} />
            <Route path="/insurance" element={<PrivateRoute><Insurance /></PrivateRoute>} />
            <Route path="/ambulance" element={<PrivateRoute><Ambulance /></PrivateRoute>} />
            <Route path="/emergency-contacts" element={<PrivateRoute><EmergencyContacts /></PrivateRoute>} />
            <Route path="/mednest" element={<MedNest />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 UHI Open Healthcare Platform. All rights reserved.</p>
          </div>
        </footer>

        {user && (
          <>
            <CartIcon />
            <EmergencyButton />
          </>
        )}

       
      </div>
    </CartProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;

