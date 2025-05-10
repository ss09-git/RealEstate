import { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaEnvelope } from 'react-icons/fa';
import '../styles/Home.css'; // Import the CSS file
import axios from 'axios';

const Home = () => {
  const { users: contextUsers, listings: contextListings, getUsers } = useContext(AdminContext);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_MONGO || 'http://localhost:3000'; // Ensure your backend URL
  const [userCount, setUserCount] = useState(contextUsers.length);
  const [listingCount, setListingCount] = useState(contextListings.length);
  const [recentusers, setRecentUsers] = useState([]);
  const [recentlistings, setRecentListings] = useState([]);

  useEffect(() => {
    
    const fetchCounts = async () => {
      try {
        const usersResponse = await axios.get(`${backendUrl}/api/users/count`);
        console.log('Users Count Response:', usersResponse.data);
        setUserCount(usersResponse.data);

        const listingsResponse = await axios.get(`${backendUrl}/api/listings/count`);
        console.log('Listings Count Response:', listingsResponse.data);
        setListingCount(listingsResponse.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
        // Optionally set error states and display error messages
      }
    };

    fetchCounts();
  }, [backendUrl]);

  useEffect(() => {
    const reversedUsers = [...contextUsers].reverse();
    setRecentUsers(reversedUsers.slice(0, 5));

    const reversedListings = [...contextListings].reverse();
    setRecentListings(reversedListings.slice(0, 5));
  }, [contextUsers, contextListings]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <h2 className="text-lg text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold users-count">{userCount}</p>
        </div>
        <div className="summary-card">
          <h2 className="text-lg text-gray-600">Total Listings</h2>
          <p className="text-3xl font-bold listings-count">{listingCount}</p>
        </div>
      </div>

      {/* Recently Added Section */}
      <div className="recent-grid">
        {/* Users Box */}
        <div className="users-box">
          <div className="users-box-header">
            <h2 className="users-box-title">Recently Added Users</h2>
          </div>
          <div>
            {recentusers.map(user => (
              <div
                key={user._id}
                className="user-item"
                onClick={() => navigate(`/user/${user._id}`)}
              >
                <div className="user-info">
                  <img
                    src={user.avatar || assets.upload_area}
                    alt="user"
                    className="user-avatar"
                  />
                  <div className="user-details">
                    <p>{user.username}</p>
                    <p className="user-email">
                      <FaEnvelope className="email-icon" />
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <hr />
          </div>
        </div>

        {/* Listings Box */}
        <div className="listings-box">
          <div className="listings-box-header">
            <h2 className="listings-box-title">Recently Added Listings</h2>
          </div>
          <div>
            {recentlistings.map(listing => (
              <div
                key={listing._id}
                className="listing-item"
                onClick={() => navigate(`/listing/${listing._id}`)}
              >
                <div className="listing-info">
                  <img
                    src={listing.imageUrls?.[0]}
                    alt="listing"
                    className="listing-image"
                  />
                  <div className="listing-details">
                    <p>{listing.LisName}</p>
                    <div
                      className={`listing-status ${
                        listing.status === 'available' ? 'available' : 'unavailable'
                      }`}
                    >
                      <span
                        className={`status-indicator ${
                          listing.status === 'available' ? 'available' : 'unavailable'
                        }`}
                      />
                      <span>{listing.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;