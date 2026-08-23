import type { LucideIcon } from 'lucide-react';
import {
  CarFront,
  CircleDot,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

type Feature = {
  title: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    title: 'Kvalitet & Trygghet',
    icon: ShieldCheck,
  },
  {
    title: 'Professionell Service',
    icon: Wrench,
  },
  {
    title: 'Däck för alla behov',
    icon: CircleDot,
  },
  {
    title: 'Mobil Verkstad',
    icon: CarFront,
  },
];

export default function HeroFeatures() {
  return (
    <div className="grid w-full grid-cols-4 border-y border-brand-border">
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className={[
              'flex min-h-28 flex-col items-center justify-center px-4 py-6 text-center',
              index % 2 !== 0 ? 'border-l border-brand-border' : '',
              index >= 2 ? 'border-t border-brand-border md:border-t-0' : '',
              index > 0 ? 'md:border-l' : '',
            ].join(' ')}
          >
            <Icon
              size={28}
              strokeWidth={1.8}
              className="mb-3 text-brand-gold"
            />

            <h3 className="text-sm font-semibold leading-5 text-brand-text sm:text-base">
              {feature.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
}