import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      
      await login(email, password);
      onClose();

      navigate('/adminDashboard', {replace: true}); 

    } catch (error) {

      console.error(error);
      
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md rounded-[28px] border border-brand-border bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Stäng"
          className="absolute right-4 top-4 text-2xl leading-none text-slate-500 transition hover:text-brand-bg"
        >
          ×
        </button>

        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Adminportal
          </p>
          <h2 className="mt-3 font-serif text-4xl text-brand-bg">Logga in</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="modal-email"
              className="mb-2 block text-sm font-medium text-brand-bg"
            >
              E-post
            </label>

            <input
              id="modal-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sveabilar.se"
              className="w-full rounded-xl border border-brand-border bg-brand-bg-primary px-4 py-3 text-brand-bg outline-none transition focus:border-brand-blue"
            />
          </div>

          <div>
            <label
              htmlFor="modal-password"
              className="mb-2 block text-sm font-medium text-brand-bg"
            >
              Lösenord
            </label>

            <input
              id="modal-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-brand-border bg-brand-bg-primary px-4 py-3 text-brand-bg outline-none transition focus:border-brand-blue"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-bg transition hover:bg-brand-gold-strong"
          >
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}