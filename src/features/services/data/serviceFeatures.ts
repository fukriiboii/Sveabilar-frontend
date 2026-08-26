const defaultFeatures = [
  'Vi kommer till dig',
  'Trygg bokning',
  'Smidig och snabb service',
  'Tydlig kommunikation',
];

const featuresByServiceType: Record<string, string[]> = {
  TIRE_CHANGE: [
    'Vi kommer till dig',
    'Montering och byte på plats',
    'Kontroll av däckmönster & broms',
    'Trygg bokning med fasta tider',
  ],
  HEADLIGHT_REPAIR: [
    'Vi kommer till dig',
    'Polering av matta strålkastare',
    'Förbättrad ljusbild och sikt',
    'Snabb behandling på plats',
  ],
  CAR_SERVICE: [
    'Grundlig genomgång av bilen',
    'Service enligt behov',
    'Tydlig offert innan arbete',
    'Flexibel planering',
  ],
  CAR_TRANSPORT: [
    'Säker transport av fordon',
    'Planering efter dina tider',
    'Tydlig status under uppdraget',
    'Offert utifrån sträcka och biltyp',
  ],
  MINOR_REPAIRS: [
    'Felsökning av mindre problem',
    'Snabb åtgärd när det är möjligt',
    'Tydlig offert innan start',
    'Fokus på kostnadseffektiv lösning',
  ],
};

export function getServiceFeatures(serviceType: string): string[] {
  return featuresByServiceType[serviceType] ?? defaultFeatures;
}
