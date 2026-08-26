export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  key: 'services' | 'business';
  label: string;
  description: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    key: 'services',
    label: 'Frågor om tjänster',
    description: 'Vanliga frågor om våra tjänster, pris och bokning.',
    items: [
      {
        question: 'Vilka tjänster erbjuder ni?',
        answer:
          'Vi erbjuder just nu däckbyte på plats. Vi arbetar även med fler tjänster som kommer att lanseras framöver.',
      },
      {
        question: 'Hur bokar jag en tid?',
        answer:
          'Du väljer tjänst, datum och tid och fyller i dina uppgifter. Efter det får du bekräftelse på mejl.',
      },
    ],
  },
  {
    key: 'business',
    label: 'Frågor om verksamheten',
    description: 'Allt du behöver veta om hur vi arbetar och hur kontakt fungerar.',
    items: [
      {
        question: 'Var jobbar ni?',
        answer:
          'Vi erbjuder tjänster på plats hos kunden, vilket gör det enkelt att boka däckbyte utan att lämna bilen.',
      },
      {
        question: 'Hur kontaktar jag er?',
        answer:
          'Du kan kontakta oss via kontakt-sidan eller genom att boka direkt i vår tjänstguide.',
      },
    ],
  },
];