import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photo: "",
    role: "",
    orderHistory: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    photo: "",
  });

  const userId = localStorage.getItem("userId"); // Replace this with dynamic userId if needed

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://shoping-txma.onrender.com/api/user/${userId}`);
        setProfileData(response.data);
        setUpdatedData({
          name: response.data.name,
          photo: response.data.photo,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://shoping-txma.onrender.com/api/update/${userId}`, updatedData);
      toast.success("Profile updated successfully!");
      setProfileData((prev) => ({
        ...prev,
        ...updatedData,
      }));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Profile</h1>

        <div className="flex flex-col items-center">
          {/* Profile Photo */}
          <img
            src={profileData.photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 border-2 border-blue-500"
          />

          {/* Edit Form */}
          {editMode ? (
            <form className="w-full" onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  value={updatedData.photo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Profile Details */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.email}</p>
                <p className="text-gray-500 mt-2">Role: {profileData.role}</p>
              </div>

              {/* Edit Button */}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Order History */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Order History</h3>
          {profileData.orderHistory.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {profileData.orderHistory.map((order, index) => (
                <li key={index}>{order}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
