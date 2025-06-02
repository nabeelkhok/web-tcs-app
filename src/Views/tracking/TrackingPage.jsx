import { useState } from "react";
import ShipmentCard from "../shipment/ShipmentCard";
import CustomerInfo from "../shipment/CustomerInfo";
import CardLayout from "../shipment/CardLayout";
import SectionContainer from "../shipment/SectionContainer";

const AdminTrackingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState(null);
  const [status, setStatus] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  // Mock login function - replace with actual authentication
  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, verify credentials with backend
    if (credentials.username === "admin" && credentials.password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  // Mock function to fetch shipment data
  const fetchShipment = () => {
    // In a real app, this would be an API call
    if (trackingId === "12345") {
      setShipment({
        trackingID: "12345",
        customerName: "John Doe",
        status: "Pending",
        estimatedDelivery: "2023-12-25",
        lastUpdated: new Date().toISOString()
      });
      setStatus("Pending");
    } else {
      alert("Shipment not found");
    }
  };

  // Mock function to update status
  const updateStatus = () => {
    // In a real app, this would be an API call
    setShipment(prev => ({
      ...prev,
      status: status,
      lastUpdated: new Date().toISOString()
    }));
    alert("Status updated successfully");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
        <SectionContainer>
          <CardLayout>
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Admin Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>
          </CardLayout>
        </SectionContainer>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <button
        onClick={() => setIsLoggedIn(false)}
        className="mb-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      <SectionContainer>
        <CardLayout>
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Admin Order Tracking</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={fetchShipment}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Track
            </button>
          </div>
        </CardLayout>
      </SectionContainer>

      {shipment && (
        <SectionContainer>
          <CardLayout>
            <CustomerInfo name={shipment.customerName} />
            <ShipmentCard
              trackingID={shipment.trackingID}
              status={shipment.status}
              estimatedDelivery={shipment.estimatedDelivery}
              lastUpdated={shipment.lastUpdated}
            />

            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Update Status</h2>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={updateStatus}
                className="w-full bg-green-500 text-white py-2 rounded mt-2 hover:bg-green-600 transition"
              >
                Update Status
              </button>
            </div>
          </CardLayout>
        </SectionContainer>
      )}
    </div>
  );
};

export default AdminTrackingPage;