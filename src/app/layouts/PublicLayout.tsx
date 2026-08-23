import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { CookieBanner } from '../../features/policy/components/CookieBanner';
import Footer from '../../shared/components/Footer';
import Header from '../../shared/components/Header';

export default function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}