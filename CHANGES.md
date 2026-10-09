# Crimson site — changes

**Before launch: replace `https://YOUR-DOMAIN.com`** (canonical, Open Graph, sitemap.xml, robots.txt) with your real domain:
`grep -rl "YOUR-DOMAIN.com" . | xargs sed -i 's#https://YOUR-DOMAIN.com#https://yourdomain.com#g'`

## A. Performance
- 45 portfolio images, 13 T-shirt images and the About image converted to WebP (max 1600px).
- 640px thumbnails in `thumbs/` folders; galleries and portfolio cards load thumbnails, full size only in the viewer/lightbox.
- Clean filenames, e.g. `food-catering-01.webp` (numbered in gallery order).

## B. SEO & polish
- Canonical, Open Graph, Twitter tags and theme-color on every page; favicon, apple-touch-icon and `images/og-image.png` generated from the logo.
- `sitemap.xml`, `robots.txt`, `404.html` (noindex).
- Descriptive alt text on all portfolio images.

## D. Code cleanup
- `js/common.js` now holds header scroll state, mobile menu and particles; removed from page scripts. `home.js` and `site-bg.js` deleted.
- Footer social icons link to the real Instagram, Facebook, TikTok and WhatsApp URLs from the contact page.
- Inner pages now get the same "scrolled" header background as Home.
