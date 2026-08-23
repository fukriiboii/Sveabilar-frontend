import { createBrowserRouter } from 'react-router-dom';

import AdminLayout from '././layouts/AdminLayout';
import PublicLayout from '././layouts/PublicLayout';

import HomePage from '../features/home/pages/HomePage';
import ServicesPage from '../features/services/pages/ServicesPage';
import AboutPage from '../features/about/pages/AboutPage';
import CarsPage from '../features/cars/pages/CarsPage';

import AdminDashboard from '../features/admin/pages/AdminDashboard';

import ProtectedRoute from '../app/ProtectedRoute';
import AdminBookingPage from '../features/booking/pages/AdminBookingsPage';
import BookingDetailsPage from '../features/booking/pages/BookingDetailsPage';
import AdminCreateBookingPage from '../features/booking/pages/AdminCreateBookingPage';
import CustomerBookingPage from '../features/booking/pages/CustomerBookingPage';
import AdminAvailabilityPage from '../features/availability/pages/AdminAvailabilityPage';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/services',
        element: <ServicesPage />,
      },

      {
        path: '/about',
        element: <AboutPage />,
      },

      {
        path: '/booking',
        element: <CustomerBookingPage />,
      },

      {
        path: '/cars',
        element: <CarsPage />
      }
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [

          {
            path: '/adminDashboard',
            element: <AdminDashboard />,
          },

          {
            path: '/admin/bookings',
            element: <AdminBookingPage />,
          },

          {
            path: '/admin/bookings/:id',
            element: <BookingDetailsPage />
          },

          {
            path: '/admin/bookings/new',
            element: <AdminCreateBookingPage />,
          },

          {
            path: '/admin/availability', 
            element: <AdminAvailabilityPage />
          }

        ],
      },
    ],
  },
]);