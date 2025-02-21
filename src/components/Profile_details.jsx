import React, { useState } from "react";

const Profile_details = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "abc",
    email: "abc@gmail.com",
    phone: "1234567980",
    address: "",
    gender: "Not Selected",
    birthday: "Not Selected",
    image: null,
  });
  const [addresses, setAddresses] = useState([
    "123 Street, City, Country",
    "456 Avenue, City, Country",
    "789 Boulevard, City, Country",
  ]);
  const [orders, setOrders] = useState([
    { id: "#1234", status: "Delivered" },
    { id: "#5678", status: "Pending" },
  ]);
  const [giftCards, setGiftCards] = useState([
    { code: "GIFT100", balance: "₹100" },
    { code: "GIFT500", balance: "₹500" },
  ]);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-10">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Profile</h2>
        <ul>
          <li
            className={`p-2 cursor-pointer ${
              activeTab === "profile" ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Information
          </li>
          <li
            className={`p-2 cursor-pointer ${
              activeTab === "addresses" ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("addresses")}
          >
            Manage Addresses
          </li>
          <li
            className={`p-2 cursor-pointer ${
              activeTab === "orders" ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            My Orders
          </li>
          <li
            className={`p-2 cursor-pointer ${
              activeTab === "payments" ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("payments")}
          >
            Payments
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-10 bg-white shadow-lg rounded-lg p-6">
        {activeTab === "profile" ? (
          <div>
            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
              <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
            </div>
            <hr className="border-blue-500 my-4" />

            {/* Contact Information */}
            <h3 className="text-md text-gray-600 border-b pb-1 font-semibold underline">
              CONTACT INFORMATION
            </h3>
            <form onSubmit={handleSubmit} className="mt-4">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="border p-2 w-full rounded mb-2"
                disabled={!editMode}
              />
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                className="border p-2 w-full rounded mb-2"
                disabled={!editMode}
              />
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                className="border p-2 w-full rounded mb-2"
                disabled={!editMode}
              />
            </form>

            {/* Basic Information */}
            <h3 className="text-md text-gray-600 border-b pb-1 font-semibold underline mt-4">
              BASIC INFORMATION
            </h3>
            <form onSubmit={handleSubmit} className="mt-4">
              <label>Gender:</label>
              <input
                type="text"
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                className="border p-2 w-full rounded mb-2"
                disabled={!editMode}
              />
              <label>Birthday:</label>
              <input
                type="date"
                name="birthday"
                value={profile.birthday}
                onChange={handleInputChange}
                className="border p-2 w-full rounded mb-2"
                disabled={!editMode}
              />
            </form>

            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Save" : "Edit"}
            </button>
          </div>
        ) : activeTab === "addresses" ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Addresses</h3>
            <ul className="list-disc pl-5">
              {addresses.map((address, index) => (
                <li key={index} className="text-gray-700 mb-2">{address}</li>
              ))}
            </ul>
          </div>
        ) : activeTab === "orders" ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h3>
            <ul>
              {orders.map((order, index) => (
                <li key={index} className="text-gray-700 mb-2">{order.id} - {order.status}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payments</h3>
            <ul>
              {giftCards.length > 0 ? (
                giftCards.map((card, index) => (
                  <li key={index} className="text-gray-700 mb-2">{card.code} - {card.balance}</li>
                ))
              ) : (
                <p>No gift cards available.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile_details;
