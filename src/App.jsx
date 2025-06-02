import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { FiHome, FiTruck, FiUsers, FiInfo, FiMail, FiUser, FiLock } from 'react-icons/fi';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import AboutCallToAction from './Views/about/AboutCallToAction';
import AboutHeroSection from './Views/about/AboutHeroSection';
import AboutMissionVision from './Views/about/AboutMissionVision';
import AboutOverview from './Views/about/AboutOverview';
import AboutPartners from './Views/about/AboutPartners';
import AboutStatsCounter from './Views/about/AboutStatsCounter';
import AboutTeam from './Views/about/AboutTeam';
import AboutTestimonials from './Views/about/AboutTestimonials';
import ContactForm from './Views/contact/ContactForm';
import ShipmentTracker from './Views/shipment/ShipmentTracker';
import Dashboard from './Views/Dashboard/Dashboard';
import AdminTrackingPage from './Views/tracking/TrackingPage';

const mockShipments = [
  { trackingID: "10001", customerName: "Ahmed Khan", status: "Pending", estimatedDelivery: "2025-06-10", lastUpdated: "2025-06-01" },
  { trackingID: "10002", customerName: "Fatima Ali", status: "In Transit", estimatedDelivery: "2025-06-08", lastUpdated: "2025-06-02" },
  { trackingID: "10003", customerName: "Omar Siddiqui", status: "Delivered", estimatedDelivery: "2025-06-05", lastUpdated: "2025-06-05" },
  { trackingID: "10004", customerName: "Aisha Malik", status: "Pending", estimatedDelivery: "2025-06-12", lastUpdated: "2025-06-03" },
  { trackingID: "10005", customerName: "Hassan Raza", status: "In Transit", estimatedDelivery: "2025-06-09", lastUpdated: "2025-06-04" },
  { trackingID: "10006", customerName: "Zainab Noor", status: "Delivered", estimatedDelivery: "2025-06-06", lastUpdated: "2025-06-06" },
  { trackingID: "10007", customerName: "Yusuf Iqbal", status: "Pending", estimatedDelivery: "2025-06-11", lastUpdated: "2025-06-02" },
  { trackingID: "10008", customerName: "Maryam Khan", status: "In Transit", estimatedDelivery: "2025-06-07", lastUpdated: "2025-06-04" },
  { trackingID: "10009", customerName: "Bilal Sheikh", status: "Delivered", estimatedDelivery: "2025-06-05", lastUpdated: "2025-06-05" },
  { trackingID: "10010", customerName: "Sana Tariq", status: "Pending", estimatedDelivery: "2025-06-13", lastUpdated: "2025-06-03" },
];

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Shipment state lifted here to persist changes globally
  const [shipments, setShipments] = useState(mockShipments);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Fixed Navbar */}
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <FiHome className="mr-2" /> Home
          </Link>
          <Link to="/tracking" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <FiTruck className="mr-2" /> Track Shipment
          </Link>
          <Link to="/about" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <FiInfo className="mr-2" /> About Us
          </Link>
          <Link to="/team" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <FiUsers className="mr-2" /> Our Team
          </Link>
          <Link to="/contact" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <FiMail className="mr-2" /> Contact
          </Link>

          {isAdmin ? (
            <Link to="/admin" className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <FiUser className="mr-2" /> Admin Panel
            </Link>
          ) : (
            <Link to="/admin/login" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
              <FiLock className="mr-2" /> Admin Login
            </Link>
          )}
        </Navbar>

        {/* Main content */}
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            {/* Pass shipments and setShipments for state sharing */}
            <Route
              path="/tracking"
              element={
                <div className="container mx-auto px-4 py-8">
                  <ShipmentTracker
                    title={<span className="text-3xl font-bold text-blue-600">📦 QuickShip Tracker</span>}
                    initialData={shipments}
                    setShipments={setShipments} // Pass setter to update global shipments
                  >
                    <p className="text-gray-600 text-lg text-center mb-6 max-w-2xl mx-auto">
                      Enter your Tracking ID to check real-time shipment status and get instant updates.
                    </p>
                  </ShipmentTracker>
                </div>
              }
            />

            <Route
              path="/about"
              element={
                <div className="space-y-16">
                  <AboutHeroSection />
                  <AboutOverview />
                  <AboutMissionVision />
                  <AboutStatsCounter />
                  <AboutPartners />
                  <AboutTestimonials />
                  <AboutCallToAction />
                </div>
              }
            />
            <Route
              path="/team"
              element={
                <div className="container mx-auto px-4 py-12">
                  <AboutTeam />
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                    <ContactForm />
                  </div>
                </div>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/login"
              element={
                <AdminTrackingPage
                  onLoginSuccess={() => setIsAdmin(true)}
                  isLoginPage={true}
                  shipments={shipments}
                  setShipments={setShipments}
                />
              }
            />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <AdminTrackingPage
                    onLogout={() => setIsAdmin(false)}
                    isLoginPage={false}
                    shipments={shipments}
                    setShipments={setShipments}
                  />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
