// ContactPage.tsx
import { ContactHero } from '../components/ContactHero';
import { ContactInfoSection } from '../components/ContactInfoSection';
import { BusinessHours } from '../components/BusinessHours';

export default function ContactPage() {
  return (
    <main className="bg-brand-bg-primary text-brand-bg">
      <ContactHero />
      <ContactInfoSection />
      <BusinessHours />
    </main>
  );
}