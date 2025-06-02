const ShipmentCard = ({ trackingID, status, estimatedDelivery, lastUpdated }) => (
    <div className="border rounded p-4 shadow bg-white mb-4">
      <p><strong>Tracking ID:</strong> {trackingID}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Estimated Delivery:</strong> {estimatedDelivery}</p>
      <p><strong>Last Updated:</strong> {lastUpdated}</p>
    </div>
  );
  
  export default ShipmentCard;
  