export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  key: 'services' | 'business' | 'booking';
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
        question: 'Kommer ni hem till kunden?',
        answer: 'Ja, våra tjänster utförs normalt på plats hos kunden, exempelvis hemma eller på arbetsplatsen.',
      },

      {
        question: 'Vilka tjänster erbjuder ni?',
        answer: 'Vi erbjuder just nu däckbyte, strålkastarrenovering, biltransport mindre reparationer  på plats. Vi arbetar även med fler tjänster som kommer att lanseras framöver.',
      },

      {
        question: 'Hur bokar jag en tid?',
        answer: 'Du väljer tjänst, datum och tid och fyller i dina uppgifter. Efter det får du bekräftelse på mejl.',
      },

      {
        question: 'Vad innebär däckskifte?',
        answer: 'Vi byter dina hjul på plats hos dig. Vi kontrollerar även bromsarna samt däckens skick.',
      },

      {
        question: 'Behöver jag välja däckstorlek vid bokning?',
        answer: 'Nej. Det visar endast priset på däckstorleken.',
      },

      {
        question: 'Kan jag boka bilservice?',
        answer: 'Bilservice bokas efter offert. Kontakta oss med information om bilen och vad den behöver hjälp med, så återkommer vi med ett förslag.',
      },

      {
        question: 'Erbjuder ni biltransport?',
        answer: 'Ja, vi erbjuder biltransport från en plats till en annan. Priset beror bland annat på sträcka och fordonets typ.',
      },

      {
        question: 'Vilka mindre reparationer utför ni?',
        answer: 'Vi hjälper till med mindre reparationer bland annat byte av bromsbelägg, skivbromsar mm. Kontakta oss med information om problemet så bedömer vi om arbetet kan utföras på plats.',
      },

      {
        question: 'Vilka områden arbetar ni i?',
        answer: 'Vi utgår från Bålsta och tar emot förfrågningar från hela stockholm. Kontakta oss om du är osäker på om vi kan komma till dig.',
      },


    ],
  },
  {
    key: 'business',
    label: 'Frågor om verksamheten',
    description: 'Allt du behöver veta om hur vi arbetar och hur kontakt fungerar.',
    items: [
      {
        question: 'Vilka är Sveabilar och Däck?',
        answer:
          'Sveabilar och Däck erbjuder smidiga biltjänster direkt hos kunden, med fokus på trygghet, tydlig kommunikation och enkel service.',
      },

      {
        question: 'Hur kontaktar jag er?',
        answer: 'Du kan kontakta oss på e-post eller telefon. Våra kontaktuppgifter finns på kontaktsidan.',
      },

      {
        question: 'Vilka betalningsalternativ erbjuder ni?',
        answer: 'Just nu erbjuder vi Faktura, Swish eller kontant. Fler betalningsalternativ kommer.',
      },

      {
        question: 'Kan företag boka era tjänster?',
        answer: 'Ja, företag är välkomna att kontakta oss för bokningar och offertförfrågningar.',
      },

      {
        question: 'Hur behandlar ni mina personuppgifter?',
        answer: 'Vi behandlar dina uppgifter för att kunna hantera bokningar och ge kundservice. Mer information finns i vår integritets- och cookiepolicy.',
      },

      {
        question: 'Varför får jag ett bekräftelsemejl?',
        answer: 'Bekräftelsemejlet innehåller information om din bokning och skickas till e-postadressen du angav vid bokningen.',
      },
    ],
  },

  {
    key: 'booking',
    label: 'Frågor om din bokning',
    description: 'Allt du behöver veta om din bokning',
    items: [
      {
        question: 'Hur bokar jag en tid?',
        answer:
          'Välj en tjänst, välj ett ledigt datum och välj därefter en ledig tid. Fyll sedan i dina kontaktuppgifter och skicka bokningen.',
      },
      {
        question: 'När är min bokning bekräftad?',
        answer:
          'Bokningen registreras när du har skickat in formuläret. Du får sedan en bekräftelse via e-post med information om tjänsten, datum, tid och adress.',
      },
      {
        question: 'Vad händer om ingen tid passar?',
        answer:
          'Kontakta oss så försöker vi hitta en annan tid som passar bättre.',
      },
      {
        question: 'Kan jag boka åt någon annan?',
        answer:
          'Ja, du kan boka åt någon annan. Ange kundens korrekta namn, telefonnummer, e-postadress och adress.',
      },
      {
        question: 'Kan jag avboka min tid?',
        answer:
          'Ja, kontakta oss så snart som möjligt om du behöver avboka eller ändra din bokning.',
      },
      {
        question: 'Vad kostar en sen avbokning?',
        answer:
          'Vid avbokning mindre än 24 timmar före bokad tid kan en avgift på 100 kr tillkomma.',
      },
    ]
  }
];