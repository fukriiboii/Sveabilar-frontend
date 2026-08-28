// ContactPage.tsx
import { ContactHero } from '../components/ContactHero';
import { ContactInfoSection } from '../components/ContactInfoSection';
import { BusinessHours } from '../components/BusinessHours';
import SEO from '../../../shared/components/SEO';

export default function ContactPage() {
  return (
    <main className="bg-brand-bg-primary text-brand-bg">
      <SEO
        title="Kontakta oss"
        description="Kontakta Sveabilar och Däck för bokning, frågor och offert på våra biltjänster."
        path="/contact"
      />

      <ContactHero />
      <ContactInfoSection />
      <BusinessHours />
    </main>
  );
}