# Parduotuvė – dropship + diskretus pristatymas

Vieno puslapio demo: prekių katalogas (`data/products.js`), krepšelis (naršyklėje), **300 % antkainis** nuo didmeninės kainos (pardavimas = ×4), tekstai apie diskretų siuntimą.

Tiekėjo nuoroda: [ODECO Alibaba](https://odeco.en.alibaba.com/?spm=a2700.galleryofferlist.wending_right.1.56b113a0owwHpL).

## Paleidimas

```bash
npm install
npm run dev
```

Produkcinis statinis build:

```bash
npm run build
npm run preview
```

## Kas redaguoti

- `data/products.js` – prekės ir didmeninės EUR kainos.
- `config/supplier.js` – antkainio procentas ir tiekėjo URL.

## Vieša nuoroda (GitHub Pages)

Po push į `main` – deploy per Actions. Puslapis (kai įjungta Pages):

**https://violentasx.github.io/sexshiop/**

GitHub: „Settings“ → „Pages“ → **Build and deployment**: šaltinis **GitHub Actions**.

## GitHub

1. Sukurkite naują repository GitHub puslapyje (tuščias, be README, jei jau turite čia).
2. Lokalioje projekto šaknyje:

```bash
git remote add origin https://github.com/JUSU_VARTOTOJAS/REPO_PAVADINIMAS.git
git branch -M main
git push -u origin main
```

Jei naudojate [GitHub CLI](https://cli.github.com/):

```bash
gh repo create REPO_PAVADINIMAS --public --source=. --push
```

## Diegimas (Vercel / Netlify)

Nurodykite **build command**: `npm run build`, **publish directory**: `dist`.

## Teisinė pastaba

Diskretus siuntimas ir „blind“ dropship priklauso nuo tiekėjo sutarties ir vežėjo taisyklių. Tai demo sąsaja – nėra mokėjimų ar el. parduotuvės backend.
