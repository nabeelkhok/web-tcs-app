import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Dummy Analytics component
const Analytics = ({ shipments }) => {
  const total = shipments.length;
  const pending = shipments.filter(s => s.status === 'Pending').length;
  const transit = shipments.filter(s => s.status === 'In Transit').length;
  const delivered = shipments.filter(s => s.status === 'Delivered').length;

  return (
    <div style={{
      padding: 15,
      borderRadius: 8,
      backgroundColor: 'var(--card-bg)',
      color: 'var(--text-primary)',
      marginBottom: 20,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginBottom: 10 }}>📊 Shipment Stats</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li>Total Shipments: <b>{total}</b></li>
        <li>Pending: <b>{pending}</b></li>
        <li>In Transit: <b>{transit}</b></li>
        <li>Delivered: <b>{delivered}</b></li>
      </ul>
    </div>
  );
};

const ShipmentTracker = ({ title = "Admin Shipment Dashboard", initialData = [] }) => {
  const [shipments, setShipments] = useState(initialData);
  const [trackingID, setTrackingID] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');
  const [filter, setFilter] = useState('All');
  const [currentShipment, setCurrentShipment] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const trackingInputRef = useRef(null);

  // Auto focus input
  useEffect(() => {
    trackingInputRef.current?.focus();
  }, []);

  // Apply dark or light theme by setting CSS variables on body
  useEffect(() => {
    if (darkMode) {
      document.body.style.setProperty('--bg-color', '#121212');
      document.body.style.setProperty('--text-primary', '#eee');
      document.body.style.setProperty('--card-bg', '#1e1e1e');
      document.body.style.setProperty('--btn-bg', '#333');
      document.body.style.setProperty('--btn-hover-bg', '#555');
      document.body.style.setProperty('--input-bg', '#222');
      document.body.style.setProperty('--input-text', '#eee');
    } else {
      document.body.style.setProperty('--bg-color', '#f0f4f8');
      document.body.style.setProperty('--text-primary', '#222');
      document.body.style.setProperty('--card-bg', '#fff');
      document.body.style.setProperty('--btn-bg', '#007bff');
      document.body.style.setProperty('--btn-hover-bg', '#0056b3');
      document.body.style.setProperty('--input-bg', '#fff');
      document.body.style.setProperty('--input-text', '#222');
    }
  }, [darkMode]);

  // Track shipment by tracking ID
  const handleTrack = () => {
    if (!trackingID.trim()) {
      alert("Please enter a tracking ID");
      return;
    }
    const shipment = shipments.find(s => s.trackingID === trackingID.trim());
    if (shipment) {
      setCurrentShipment(shipment);
      setStatusUpdate(shipment.status);
    } else {
      alert("Tracking ID not found!");
      setCurrentShipment(null);
    }
  };

  // Update shipment status
  const handleUpdateStatus = () => {
    if (!statusUpdate) {
      alert("Please select a status");
      return;
    }
    if (!currentShipment) {
      alert("No shipment selected");
      return;
    }
    const updatedShipments = shipments.map(s =>
      s.trackingID === currentShipment.trackingID
        ? { ...s, status: statusUpdate, lastUpdated: new Date().toISOString().split('T')[0] }
        : s
    );
    setShipments(updatedShipments);
    setCurrentShipment(prev => ({ ...prev, status: statusUpdate }));
    alert("Status Updated Successfully!");
  };

  // Filter shipments by status
  const filteredShipments = shipments.filter(s => filter === 'All' || s.status === filter);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-primary)',
        padding: 20,
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        maxWidth: 450,
        margin: 'auto',
      }}
    >
      {/* Header + Dark Mode Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 22,
            color: 'var(--text-primary)',
          }}
          title="Toggle Dark Mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Analytics */}
      <Analytics shipments={shipments} />

      {/* Tracking input */}
      <div style={{ marginBottom: 15 }}>
        <input
          ref={trackingInputRef}
          value={trackingID}
          onChange={e => setTrackingID(e.target.value)}
          placeholder="Enter Tracking ID"
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: 16,
            borderRadius: 6,
            border: '1.5px solid #ccc',
            backgroundColor: 'var(--input-bg)',
            color: 'var(--input-text)',
            marginBottom: 8,
          }}
        />
        <button
          onClick={handleTrack}
          style={{
            width: '100%',
            padding: 10,
            fontSize: 16,
            borderRadius: 6,
            border: 'none',
            backgroundColor: 'var(--btn-bg)',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--btn-hover-bg)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--btn-bg)'}
        >
          Track Order
        </button>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: 20 }}>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: 16,
            borderRadius: 6,
            border: '1.5px solid #ccc',
            backgroundColor: 'var(--input-bg)',
            color: 'var(--input-text)',
            marginBottom: 8,
            cursor: 'pointer',
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
        <div style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 10 }}>
          Showing {filteredShipments.length} shipment(s) with status "{filter}"
        </div>

        {/* Customer details list */}
        <div style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: 8,
          padding: 10,
          maxHeight: 150,
          overflowY: 'auto',
          boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
          marginBottom: 20,
          color: 'var(--text-primary)',
        }}>
          <h4 style={{ marginBottom: 10 }}>Customers with "{filter}" shipments:</h4>
          {filteredShipments.length === 0 ? (
            <p>No shipments found.</p>
          ) : (
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {filteredShipments.map(({ trackingID, customerName }) => (
                <li key={trackingID} style={{ marginBottom: 6 }}>
                  <b>{customerName}</b> (Tracking ID: {trackingID})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Shipment display and status update */}
      <AnimatePresence>
        {currentShipment && (
          <motion.div
            key={currentShipment.trackingID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: 'var(--card-bg)',
              padding: 15,
              borderRadius: 10,
              boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
              marginBottom: 25,
              color: 'var(--text-primary)',
            }}
          >
            <h2 style={{ marginBottom: 10 }}>
              Shipment: <span style={{ fontWeight: 'bold' }}>{currentShipment.trackingID}</span>
            </h2>
            <p><b>Customer:</b> {currentShipment.customerName}</p>
            <p><b>Status:</b> <motion.span
              key={currentShipment.status}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{ fontWeight: 'bold' }}
            >
              {currentShipment.status}
            </motion.span></p>
            <p><b>Last Updated:</b> {currentShipment.lastUpdated || 'N/A'}</p>

            {/* Status update */}
            <div style={{ marginTop: 15 }}>
              <select
                value={statusUpdate}
                onChange={e => setStatusUpdate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  fontSize: 16,
                  borderRadius: 6,
                  border: '1.5px solid #ccc',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--input-text)',
                  marginBottom: 8,
                  cursor: 'pointer',
                }}
              >
                <option value="">Select New Status</option>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                style={{
                  width: '100%',
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 6,
                  border: 'none',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#218838'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#28a745'}
              >
                Update Status
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShipmentTracker;
