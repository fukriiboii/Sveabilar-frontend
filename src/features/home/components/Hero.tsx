import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import heroImage from '../../../assets/heroImage.png';
import HeroFeatures from './HeroFeatures';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-72px)] flex-col overflow-hidden bg-brand-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 z-0 bg-brand-bg/75" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-12 sm:px-6 md:py-20">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Professionell bilservice
          </p>

          <h1 className="max-w-[680px] font-serif text-4xl leading-[0.95] text-brand-text sm:text-5xl md:text-6xl">
            Vi tar hand om din bil <span className="whitespace-nowrap">hos dig</span>
          </h1>

          <p className="mt-5 max-w-xl font-serif text-base leading-7 text-brand-text-muted sm:text-xl">
            Smidig bokning, professionell service och noggrant utfört arbete.
            Oavsett om det gäller däck, bilvård eller enklare underhåll ser vi
            till att din bil är i goda händer.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <Button 
              label="Boka tid" 
              onClick={() => navigate('/services')} 
            />

            <Button 
              label="Kontakta oss" 
              variant="ghost"
              onClick={() => navigate('/contact')} 
            /
            >
          </div>
        </div>
      </div>

      <div className="relative z-10 hidden w-full md:block">
        <HeroFeatures />
      </div>
    </section>
  );
}