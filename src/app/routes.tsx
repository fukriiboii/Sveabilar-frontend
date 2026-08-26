import { createBrowserRouter } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import AdminLayout from '././layouts/AdminLayout';
import PublicLayout from '././layouts/PublicLayout';

import HomePage from '../features/home/pages/HomePage';
import ServicesPage from '../features/services/pages/ServicesPage';
import AboutPage from '../features/about/pages/AboutPage';
import CarsPage from '../features/cars/pages/CarsPage';
import PolicyPage from '../features/policy/pages/PolicyPage';

import AdminDashboard from '../features/admin/pages/AdminDashboard';

import ProtectedRoute from '../app/ProtectedRoute';
import AdminBookingPage from '../features/booking/pages/AdminBookingsPage';
import BookingDetailsPage from '../features/booking/pages/BookingDetailsPage';
import AdminCreateBookingPage from '../features/booking/pages/AdminCreateBookingPage';
import CustomerBookingPage from '../features/booking/pages/CustomerBookingPage';
import AdminAvailabilityPage from '../features/availability/pages/AdminAvailabilityPage';
import LoginModal from '../features/auth/components/LoginModal';
import ContactPage from '../features/contact/pages/ContactPage';
import FaqPage from '../features/faq/pages/FaqPage';
import BookingTermsPage from '../features/policy/pages/BookingTermsPage';

function AdminLoginPage() {
  const navigate = useNavigate();

  return <LoginModal isOpen={true} onClose={() => navigate('/')} />;
}

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
      },

      {
        path: '/admin-login',
        element: <AdminLoginPage />,
      },

      {
        path: '/policy',
        element: <PolicyPage />,
      },

      {
        path: '/contact',
        element: <ContactPage />
      },

      {
        path: '/faq',
        element: <FaqPage />
      },

      {
        path: '/booking-terms',
        element: <BookingTermsPage />
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