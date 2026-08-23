type ServiceCardProps = {
  title: string;
  text: string;
};

export default function ServiceCard({ title, text }: ServiceCardProps) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-surface p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 text-lg text-brand-gold">
        ✓
      </div>

      <h3 className="mb-2 text-xl font-semibold text-brand-text">{title}</h3>
      <p className="text-sm leading-7 text-brand-text-muted">{text}</p>
    </div>
  );
}