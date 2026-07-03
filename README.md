# Blessed Hearts Homecare — Website

A Next.js 14 (App Router) site for **Blessed Hearts Homecare**, built from `project.md`'s brand
guide (colors, typography, business info, accessibility, SEO) and laid out to match the
reference screenshots (rounded "blob" hero, split contact panel, service/testimonial cards,
newsletter + multi-column footer).

## Run it locally

This sandbox has no network access, so the project could not be `npm install`-ed or built here.
On your machine, from this folder:

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm start         # serve the production build
```

Requires Node.js 18.18+.

## What's included

- **7 pages** per the sitemap: Home, About Us, Services, Areas We Serve, Privacy Policy,
  Contact Us, Blog (+ dynamic `/blog/[slug]` post pages, 6 sample posts).
- **Brand system** in `app/globals.css`: the pink → coral → orange gradient, Deep Plum, Charcoal,
  Light Gray tokens from `project.md`, plus Poppins/Open Sans/Montserrat via `next/font/google`.
- **Accessibility**: skip link, visible focus rings (never suppressed), keyboard-operable mobile
  menu (`Escape`-closeable via native blur/click patterns, `aria-expanded`), semantic one-`<h1>`
  per page, `aria-live` form status, alt text/`aria-hidden` on all icons and image placeholders.
- **SEO**: per-page metadata, canonical URLs, Organization + LocalBusiness JSON-LD, auto-generated
  `sitemap.xml` and `robots.txt`.
- **Responsive layout**: fluid type (`clamp()`), CSS Grid that collapses 3→2→1 columns, a mobile
  slide-in nav under ~992px.

## Photography

Real photos weren't provided, so a soft gradient "Placeholder" component (`components/Placeholder.js`)
stands in for every photo slot, each with a descriptive `aria-label`. Swap these for real images:

1. Drop files into `public/images/`.
2. Replace `<Placeholder label="..." />` with `<Image src="/images/your-photo.jpg" alt="..." fill />`
   (using `next/image`) wherever a placeholder appears.

## Logo

`components/Logo.js` is an inline SVG gradient wordmark generated from the SVG markup in
`project.md`. Swap in the real logo files (e.g. `logo_fullcolor.png`, `heartcircle.png`) by
replacing this component with an `<Image>` once the asset files are added to `public/`.

## Editing business info

Phone, email, address, service-area counties, services, and nav links are centralized in
`lib/site.js` — update once and it propagates across header, footer, JSON-LD, sitemap, and every
page.
