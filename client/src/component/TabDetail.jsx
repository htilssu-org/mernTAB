import React, { useState, useEffect } from "react";
import axios from "axios";

const TabDetail = ({ hotelId, tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.type);
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        setLoading(true);
        console.log("Fetching rooms data for hotel ID:", hotelId);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/hotellist/rooms`, {
          params: {
            hotelID: hotelId,
          },
        });
        console.log("Rooms data fetched:", response.data);
        setRoomsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchRoomsData();
    }
  }, [hotelId]);

  const getToken = () => {
    const token = localStorage.getItem('authToken');
    console.log("Fetched auth token:", token);
    return token;
  };

  const handleBooking = async (roomID) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please log in");
        return;
      }

      console.log("Booking room with ID:", roomID);
      const response = await axios.post(
        'https://mern-tab-be.vercel.app/book/bookRoom',
        {
          paymentMethod: 'Visa',
          roomID,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Booking response:", response.data);

      if (response.data.status === "OK") {
        window.location.href = `https://checkout-page-54281a5e23aa.herokuapp.com/?OrderID=${response.data.orderID}`;
      } else {
        alert(response.data.message || "An error occurred while booking the room");
      }
    } catch (error) {
      console.error("Error booking room:", error);
      alert("An error occurred while connecting to the server");
    }
  };

  const activeTabData = tabs.find((tab) => tab.type === activeTab);

  return (
    <div className="container p-4 mx-auto">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.type}
            onClick={() => setActiveTab(tab.type)}
            className={`px-4 py-2 font-semibold text-gray-800 focus:outline-none transition-opacity duration-300 ${
              activeTab === tab.type ? "border-b-2 border-blue-500" : ""
            }`}
          >
            {tab.type}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {activeTabData && (
          <div className="p-4 bg-blue-100 rounded">
            {roomsData.map((room) => (
              <div key={room._id} className="mb-6">
                <div className="grid grid-cols-5 gap-4 p-4 bg-white shadow-md rounded-xl">
                  <div className="col-span-2">
                    <h2 className="text-2xl font-bold text-blue-500">
                      {room.name}
                    </h2>
                    <img
                      src={room.imgSrc}
                      className="object-cover w-full h-32 mb-4 rounded"
                    />
                    <div className="grid grid-cols-3 gap-1">
                      {/* {room.details.images.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Room detail ${index + 1}`}
                          className="object-cover w-full h-16 rounded"
                        />
                      ))} */}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <h2 className="my-2 text-lg font-bold text-gray-600">
                      Room Type:
                    </h2>
                    <ul className="mb-4 list-none">
                      {room.typeOfRoom}
                    </ul>
                  </div>
                  <div className="col-span-1">
                    <h2 className="my-2 text-lg font-bold text-gray-600">
                      Capacity:
                    </h2>
                    <p className="mb-2">{room.capacity}</p>
                  </div>
                  <div className="col-span-1">
                    <h2 className="my-2 text-lg font-bold text-gray-600">
                      Number of Beds:
                    </h2>
                    <p className="mb-2">{room.numberOfBeds}</p>
                  </div>
                  <div className="flex flex-col items-end float-right">
                    <div>
                      <span className="inline-block px-2 py-1 mb-2 text-green-500 bg-green-200 rounded float-right">
                        Total Price: {room.money}
                      </span>
                    </div>
                    <div>
                      <button
                        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded float-right"
                        onClick={() => handleBooking(room._id)}
                      >
                        Book Room
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabDetail;
