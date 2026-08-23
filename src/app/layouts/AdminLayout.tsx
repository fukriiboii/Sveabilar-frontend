import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../../features/admin/components/AdminSidebar';
import AdminHeader from '../../features/admin/components/AdminHeader';

export default function AdminLayout() {

  // Skapa egen komponent sedan för att använda
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [location.pathname]);

  //

  return (
    <div className="flex min-h-screen bg-brand-bg">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}