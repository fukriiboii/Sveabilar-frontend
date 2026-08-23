import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/Button';
import { removeAccessToken } from '../../auth/utils/authStorage';

export default function AdminHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    removeAccessToken();
    navigate('/', {replace: true});
  }

  return (
    <header className="border-b border-brand-border bg-brand-surface px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-brand-text">
            Adminportal
          </h1>

          <p className="text-sm text-brand-text-muted">
            Hantera Sveabilar
          </p>
        </div>

        <Button
          label="Logga ut"
          variant="ghost"
          icon={<LogOut size={18} />}
          onClick={handleLogout}
          className="px-3 py-2"
        />
      </div>
    </header>
  );
}