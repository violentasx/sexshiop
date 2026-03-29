/**
 * Katalogas – kiekviena prekė gali turėti `image` (pilna HTTPS nuoroda).
 * Pakeiskite į Alibaba / savo CDN nuotraukas. Be `image` naudojamas „picsum“ pagal id.
 * Pardavimo kaina: didmena + 300 % antkainis (×4).
 */

const fallbackImage = (id) =>
  `https://picsum.photos/seed/${encodeURIComponent(id)}/640/480`;

export const PRODUCTS = [
  {
    id: 'odeco-01',
    title: 'Prekė 1',
    blurb: 'Aprašymą užpildykite pagal tiekėjo kortelę.',
    wholesaleEur: 8.5,
    image: fallbackImage('odeco-01'),
  },
  {
    id: 'odeco-02',
    title: 'Prekė 2',
    blurb: 'SKU ir specifikacijas pridėkite iš Alibaba.',
    wholesaleEur: 14.0,
    image: fallbackImage('odeco-02'),
  },
  {
    id: 'odeco-03',
    title: 'Prekė 3',
    blurb: 'Atsargas tikrina tiekėjas (dropship).',
    wholesaleEur: 22.5,
    image: fallbackImage('odeco-03'),
  },
  {
    id: 'odeco-04',
    title: 'Prekė 4',
    blurb: 'Diskretus siuntimas pagal susitarimą.',
    wholesaleEur: 31.0,
    image: fallbackImage('odeco-04'),
  },
  {
    id: 'odeco-05',
    title: 'Prekė 5',
    blurb: 'Neutrali pakuotė – kur leidžia vežėjas.',
    wholesaleEur: 11.2,
    image: fallbackImage('odeco-05'),
  },
  {
    id: 'odeco-06',
    title: 'Prekė 6',
    blurb: 'Užsakymas per tiekėjo platformą.',
    wholesaleEur: 18.9,
    image: fallbackImage('odeco-06'),
  },
  {
    id: 'odeco-07',
    title: 'Prekė 7',
    blurb: 'Pristatymo terminai – pagal tiekėją.',
    wholesaleEur: 26.0,
    image: fallbackImage('odeco-07'),
  },
  {
    id: 'odeco-08',
    title: 'Prekė 8',
    blurb: 'Grąžinimo politika – jūsų taisyklės + tiekėjas.',
    wholesaleEur: 9.75,
    image: fallbackImage('odeco-08'),
  },
  {
    id: 'odeco-09',
    title: 'Prekė 9',
    blurb: 'Kokybė – pagal tiekėjo deklaraciją.',
    wholesaleEur: 34.5,
    image: fallbackImage('odeco-09'),
  },
  {
    id: 'odeco-10',
    title: 'Prekė 10',
    blurb: 'Pakuotė be prekės ženklo etiketėje (jei įmanoma).',
    wholesaleEur: 12.0,
    image: fallbackImage('odeco-10'),
  },
  {
    id: 'odeco-11',
    title: 'Prekė 11',
    blurb: 'Didmeninė kaina atnaujinkite iš sąskaitos.',
    wholesaleEur: 41.0,
    image: fallbackImage('odeco-11'),
  },
  {
    id: 'odeco-12',
    title: 'Prekė 12',
    blurb: 'Paskutinė demo pozicija – pridėkite daugiau čia.',
    wholesaleEur: 19.99,
    image: fallbackImage('odeco-12'),
  },
];
