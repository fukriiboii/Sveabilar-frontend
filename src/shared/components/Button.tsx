import type { ReactNode } from 'react';

type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export default function Button({
  label,
  variant = 'primary',
  onClick,
  className = '',
  icon,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-200';

  const variants = {
    primary:
      'bg-brand-gold text-slate-900 hover:bg-brand-gold-strong',
    secondary:
      'bg-brand-blue text-white hover:bg-brand-blue-strong',
    ghost:
      'border border-brand-border bg-transparent text-brand-text hover:bg-white/5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}