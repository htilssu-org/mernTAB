import React, { useState, useEffect } from "react";
import ProfileDetail from "./ProfileDetail";
import axios from "axios";
import HotelOwner from "./HotelOwner";
const Dashboard = () => {
  // Sample data for profiles
  const profiles = [
    {
      id: 1,
      coverImage:
        "https://images.unsplash.com/photo-1441742917377-57f78ee0e582?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw4N3x8ZW58MHx8fHx8",
      hotelName: "Grand Hotel",
      creationDate: "2024-07-24T14:30:00Z",
      numberOfRooms: 20,
      status: "Processing",
    },
    {
      id: 2,
      coverImage:
        "https://images.unsplash.com/photo-1441742917377-57f78ee0e582?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw4N3x8ZW58MHx8fHx8",
      hotelName: "Novotel Hotel",
      creationDate: "2024-07-24T14:30:00Z",
      numberOfRooms: 10,
      status: "Rejected",
    },
    // Add more profiles as needed
  ];

  const [selectedProfile, setSelectedProfile] = useState(null);

  // Format creation date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [hotelListState, setHotelListState] = useState([])

  useEffect(()=>{
    const getHotelList = async () =>{
        try{
            const res =await axios.get(
                `${process.env.REACT_APP_BACKEND_BASEURL}/hotellist`
            )
            //console.log(res.data) 
            setHotelListState(res.data) 
        }catch(error){
            console.log(error.messege)
        }
    }   
    getHotelList()
},[])
  const handleBackToList = () => {
    setSelectedProfile(null);
  };

  if (selectedProfile) {
    return (
      <ProfileDetail profile={selectedProfile} onBack={handleBackToList} />
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Quản lý hồ sơ</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => setSelectedProfile(profile)}
            className="block p-4 no-underline bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200"
          >
            <div className="mb-4">
              <img
                src={profile.coverImage}
                alt="Cover"
                className="object-cover w-full h-64 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <div className="text-xl font-bold">{profile.hotelName}</div>
              <p className="text-gray-600">
                Ngày giờ tạo: {formatDate(profile.creationDate)}
              </p>
              <p className="text-gray-600">Số phòng: {profile.numberOfRooms}</p>
              <p
                className={`text-sm font-semibold ${
                  profile.status === "Processing"
                    ? "text-yellow-500"
                    : profile.status === "Completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Trạng thái hồ sơ: {profile.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
