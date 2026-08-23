import { NavLink } from 'react-router-dom';

const navigation = [
  {
    label: 'Dashboard',
    href: '/adminDashboard',
  },

  {
    label: 'Bokningar',
    href: '/admin/bookings',
  },
  
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r border-brand-border bg-brand-surface">
      <div className="p-6">
        <h2 className="font-serif text-xl text-brand-text">
          Sveabilar
        </h2>

        <p className="mt-1 text-sm text-brand-text-muted">
          Adminportal
        </p>
      </div>

      <nav className="px-4">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 transition ${
                isActive
                  ? 'bg-brand-gold font-semibold text-brand-bg'
                  : 'text-brand-text hover:bg-brand-surface-2'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}