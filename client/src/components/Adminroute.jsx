import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function AdminRoute() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to='/sign-in' />; // If the user is not logged in, redirect to sign-in page
  }

  if (currentUser.role !== 'admin') {
    return <Navigate to='/' />; // If the user is not an admin, redirect to the home page
  }

  return <Outlet />; // If the user is an admin, allow access to the admin route
}
