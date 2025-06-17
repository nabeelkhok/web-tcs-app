export const mockShipments = [
  {
    trackingID: "TCS10001",
    customerName: "Ali Khan",
    status: "In Transit",
    origin: "Karachi",
    destination: "Lahore",
    estimatedDelivery: "2023-12-15",
    lastUpdated: "2023-12-05T10:30:00",
    items: [
      { name: "Documents", quantity: 1, weight: 0.5 }
    ]
  },
  {
    trackingID: "TCS10002",
    customerName: "Fatima Ahmed",
    status: "Delivered",
    origin: "Islamabad",
    destination: "Peshawar",
    estimatedDelivery: "2023-12-10",
    lastUpdated: "2023-12-10T14:15:00",
    items: [
      { name: "Electronics", quantity: 2, weight: 3.2 }
    ]
  },
  {
    trackingID: "TCS10003",
    customerName: "Usman Malik",
    status: "Pending Pickup",
    origin: "Lahore",
    destination: "Multan",
    estimatedDelivery: "2023-12-18",
    lastUpdated: "2023-12-05T09:45:00",
    items: [
      { name: "Clothing", quantity: 5, weight: 2.1 }
    ]
  },
  {
    trackingID: "TCS10004",
    customerName: "Ayesha Riaz",
    status: "In Transit",
    origin: "Faisalabad",
    destination: "Rawalpindi",
    estimatedDelivery: "2023-12-12",
    lastUpdated: "2023-12-08T16:20:00",
    items: [
      { name: "Books", quantity: 3, weight: 4.5 }
    ]
  },
  {
    trackingID: "TCS10005",
    customerName: "Bilal Hassan",
    status: "At Warehouse",
    origin: "Multan",
    destination: "Karachi",
    estimatedDelivery: "2023-12-20",
    lastUpdated: "2023-12-06T11:10:00",
    items: [
      { name: "Medical Supplies", quantity: 1, weight: 1.8 }
    ]
  }
];