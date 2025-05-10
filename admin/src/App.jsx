import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminContext } from './context/AdminContext.jsx';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Make sure this import exists
import SignIn from './pages/SignIn';
import Sidebar from './components/Sidebar';
import ListingsList from './pages/admin/ListingsList.jsx';
import UsersList from './pages/admin/UsersList.jsx';
import AdminListing from './pages/admin/AdminListing.jsx';
import UserProfile from './pages/admin/UserProfile.jsx';
import AdminSignUp from './pages/SignUp';

const App = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <>
      <ToastContainer autoClose={500} />
      <Routes>
        {/* Redirect from the root path to /admin/signin */}
        <Route path="/" element={<Navigate to="/admin/signin" />} />
        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/home" element={<Home/>} />

        {/* Protected routes for authenticated admins */}
        <Route
          path="/dashboard"
          element={aToken ? (
            <div className='bg-blue-50'>
              <Navbar />
              <div className='flex h-screen'>
                <Sidebar className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10" />
                <div className='flex-1 overflow-y-auto'>
                  <Home />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/admin/signin" />
          )}
        />
        <Route
          path="/listings"
          element={aToken ? (
            <div className='bg-blue-50'>
              <Navbar />
              <div className='flex h-screen'>
                <Sidebar className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10" />
                <div className='flex-1 overflow-y-auto'>
                  <ListingsList />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/admin/signin" />
          )}
        />
        <Route
          path="/listing/:id"
          element={aToken ? (
            <div className='bg-blue-50'>
              <Navbar />
              <div className='flex h-screen'>
                <Sidebar className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10" />
                <div className='flex-1 overflow-y-auto'>
                  <AdminListing />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/admin/signin" />
          )}
        />
        <Route
          path="/users"
          element={aToken ? (
            <div className='bg-blue-50'>
              <Navbar />
              <div className='flex h-screen'>
                <Sidebar className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10" />
                <div className='flex-1 overflow-y-auto'>
                  <UsersList />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/admin/signin" />
          )}
        />
        <Route
          path="/user/:id"
          element={aToken ? (
            <div className='bg-blue-50'>
              <Navbar />
              <div className='flex h-screen'>
                <Sidebar className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10" />
                <div className='flex-1 overflow-y-auto'>
                  <UserProfile />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/admin/signin" />
          )}
        />
      </Routes>
    </>
  );
};

export default App;