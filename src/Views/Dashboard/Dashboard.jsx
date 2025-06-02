import React, { useState } from 'react';
import { FiPackage, FiTruck, FiClock, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

const Dashboard = () => {
  // State for managing which section to show
  const [activeSection, setActiveSection] = useState('dashboard');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  
  // Pickup request form state
  const [pickupForm, setPickupForm] = useState({
    name: '',
    address: '',
    phone: '',
    pickupDate: '',
    packageDescription: '',
    specialInstructions: ''
  });

  // Stats data
  const stats = [
    { title: "Total Shipments", value: "1,248", icon: <FiPackage className="text-blue-500" size={24} />, change: "+12% from last month" },
    { title: "In Transit", value: "342", icon: <FiTruck className="text-yellow-500" size={24} />, change: "+5% from last week" },
    { title: "Pending", value: "89", icon: <FiClock className="text-orange-500" size={24} />, change: "-3% from yesterday" },
    { title: "Delivered", value: "817", icon: <FiCheckCircle className="text-green-500" size={24} />, change: "+18% from last month" },
  ];

  // Recent shipments data
  const recentShipments = [
    { id: "10045", customer: "Sarah Johnson", status: "In Transit", date: "2025-05-10" },
    { id: "10044", customer: "Michael Brown", status: "Delivered", date: "2025-05-09" },
    { id: "10043", customer: "Emily Davis", status: "Pending", date: "2025-05-08" },
    { id: "10042", customer: "Robert Wilson", status: "In Transit", date: "2025-05-07" },
  ];

  // Handle track order
  const handleTrackOrder = () => {
    // Simulate tracking result
    if (trackingNumber) {
      setTrackingResult({
        id: trackingNumber,
        status: "In Transit",
        history: [
          { status: "Order Received", date: "2025-05-10 10:30 AM", location: "Warehouse A" },
          { status: "Processed", date: "2025-05-11 02:15 PM", location: "Sorting Facility" },
          { status: "In Transit", date: "2025-05-12 09:45 AM", location: "On route to delivery" }
        ]
      });
    }
  };

  // Handle pickup form change
  const handlePickupFormChange = (e) => {
    const { name, value } = e.target;
    setPickupForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle pickup form submit
  const handlePickupSubmit = (e) => {
    e.preventDefault();
    alert('Pickup request submitted successfully!');
    setActiveSection('dashboard');
    // Reset form
    setPickupForm({
      name: '',
      address: '',
      phone: '',
      pickupDate: '',
      packageDescription: '',
      specialInstructions: ''
    });
  };

  // Render dashboard main view
  const renderDashboard = () => (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-start">
            <div className="mr-4 p-3 bg-blue-50 rounded-lg">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Shipments */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Recent Shipments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentShipments.map((shipment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{shipment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                         shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                         'bg-orange-100 text-orange-800'}`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Track a Shipment</h3>
          <p className="text-blue-600 mb-4">Enter your tracking number to get real-time updates</p>
          <button 
            onClick={() => setActiveSection('track')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Go to Tracker
          </button>
        </div>
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Schedule Pickup</h3>
          <p className="text-green-600 mb-4">Arrange for a package pickup at your location</p>
          <button 
            onClick={() => setActiveSection('pickup')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Request Pickup
          </button>
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">Contact Support</h3>
          <p className="text-purple-600 mb-4">Our team is available 24/7 to assist you</p>
          <button 
            onClick={() => setActiveSection('contact')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Get Help
          </button>
        </div>
      </div>
    </>
  );

  // Render track order section
  const renderTrackOrder = () => (
    <div>
      <button 
        onClick={() => setActiveSection('dashboard')}
        className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
      >
        <FiArrowLeft className="mr-2" /> Back to Dashboard
      </button>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Track Your Order</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Tracking Number
          </label>
          <div className="flex">
            <input
              type="text"
              id="trackingNumber"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. ABC123456789"
            />
            <button 
              onClick={handleTrackOrder}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg"
            >
              Track
            </button>
          </div>
        </div>
        
        {trackingResult && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tracking Information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                  <p className="text-lg font-bold">{trackingResult.id}</p>
                </div>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${trackingResult.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                     trackingResult.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                     'bg-orange-100 text-orange-800'}`}>
                  {trackingResult.status}
                </span>
              </div>
              
              <div className="space-y-4 mt-6">
                <h3 className="font-medium text-gray-800">Shipment History</h3>
                {trackingResult.history.map((item, index) => (
                  <div key={index} className="flex items-start pl-4 border-l-2 border-blue-200">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center -ml-3.5 mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{item.status}</p>
                      <p className="text-sm text-gray-500">{item.date} • {item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render pickup request section
  const renderPickupRequest = () => (
    <div>
      <button 
        onClick={() => setActiveSection('dashboard')}
        className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
      >
        <FiArrowLeft className="mr-2" /> Back to Dashboard
      </button>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Schedule a Pickup</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
        <form onSubmit={handlePickupSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={pickupForm.name}
                onChange={handlePickupFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={pickupForm.phone}
                onChange={handlePickupFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Address
            </label>
            <textarea
              id="address"
              name="address"
              value={pickupForm.address}
              onChange={handlePickupFormChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Pickup Date
              </label>
              <input
                type="date"
                id="pickupDate"
                name="pickupDate"
                value={pickupForm.pickupDate}
                onChange={handlePickupFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="packageDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Package Description
              </label>
              <input
                type="text"
                id="packageDescription"
                name="packageDescription"
                value={pickupForm.packageDescription}
                onChange={handlePickupFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={pickupForm.specialInstructions}
              onChange={handlePickupFormChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium"
          >
            Submit Pickup Request
          </button>
        </form>
      </div>
    </div>
  );

  // Render contact support section
  const renderContactSupport = () => (
    <div>
      <button 
        onClick={() => setActiveSection('dashboard')}
        className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
      >
        <FiArrowLeft className="mr-2" /> Back to Dashboard
      </button>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Support</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer Support</h3>
                <p className="text-lg text-gray-800">+1 (800) 123-4567</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-lg text-gray-800">support@shipmentcompany.com</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Hours</h3>
                <p className="text-lg text-gray-800">24/7 Support Available</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="contactMessage"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {activeSection === 'dashboard' && renderDashboard()}
      {activeSection === 'track' && renderTrackOrder()}
      {activeSection === 'pickup' && renderPickupRequest()}
      {activeSection === 'contact' && renderContactSupport()}
    </div>
  );
};

export default Dashboard;