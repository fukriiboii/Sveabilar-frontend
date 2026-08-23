import Hero from '../components/Hero';
import PopularServices from '../components/PopularServices';
import WhyChooseUs from '../components/WhyChooseUs';

export default function HomePage() {
  return (
    <main className="bg-brand-bg text-brand-text">
      <Hero />
      <PopularServices />
      <WhyChooseUs />
    </main>
  );
}