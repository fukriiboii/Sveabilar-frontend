import Button from '../../../shared/components/Button';

import tireChangeImage from '../../../assets/tire-change.jpg';
import headlightRepairImage from '../../../assets/headlight-repair.jpg';
import carServiceImage from '../../../assets/car-service.jpg';

const services = [
  {
    title: 'Däckbyte',
    image: tireChangeImage,
  },
  {
    title: 'Strålkastare',
    image: headlightRepairImage,
  },
  {
    title: 'Övriga tjänster',
    image: carServiceImage,
  },
];

export default function PopularServices() {
  return (
    <section
      id="services"
      className="bg-brand-bg-primary px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Våra tjänster
          </p>

          <h2 className="mt-3 font-serif text-3xl text-brand-bg sm:text-4xl md:text-5xl">
            Populära tjänster just nu
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative min-h-[420px] overflow-hidden"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/45 transition duration-300 group-hover:bg-black/55" />

              <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
                <h3 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                  {service.title}
                </h3>

                <Button
                  label="Boka tjänst"
                  className="mt-6 cursor-pointer"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}