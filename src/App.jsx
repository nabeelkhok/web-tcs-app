import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Context/Authcontext';

// Layout Components
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

// Views
import Dashboard from './Views/Dashboard/Dashboard';
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
import AdminTrackingPage from './Views/tracking/TrackingPage';
import ProductDetails from './Views/ProductDetails/ProductDetails';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

// Mock Data
import { mockShipments } from './Utils/Mockdata';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shipments, setShipments] = useState(mockShipments);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* Fixed Navbar */}
          <Navbar />
          
          {/* Main content */}
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              
              <Route
                path="/tracking"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <ShipmentTracker
                      title={<span className="text-3xl font-bold text-blue-600">📦 QuickShip Tracker</span>}
                      initialData={shipments}
                      setShipments={setShipments}
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
    </AuthProvider>
  );
}

export default App;