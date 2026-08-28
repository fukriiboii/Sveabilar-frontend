import Hero from '../components/Hero';
import PopularServices from '../components/PopularServices';
import WhyChooseUs from '../components/WhyChooseUs';
import SEO from '../../../shared/components/SEO';

export default function HomePage() {
  return (
    <main className="bg-brand-bg text-brand-text">
      
      <SEO
        title="Däckskifte och bilservice på plats"
        description="Sveabilar och Däck erbjuder däckskifte, strålkastarrenovering och bilservice direkt hos dig."
        path="/"
      />

      <Hero />
      <PopularServices />
      <WhyChooseUs />
    </main>
  );
}