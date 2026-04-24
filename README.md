# NestQuest — Luxury Real Estate Landing Page

A high-fidelity, conversion-optimised landing page for a luxury real estate brand.

## Project Structure

```
nestquest/
├── index.html                  # HTML skeleton — all 7 sections + nav + footer
├── assets/
│   ├── css/
│   │   └── main.css            # All styles, variables, animations, responsive
│   ├── js/
│   │   └── main.js             # All interactivity (slider, counters, parallax…)
│   ├── images/                 # Drop your images here (see naming guide below)
│   └── fonts/                  # Self-hosted fonts (optional — see note below)
└── README.md
```

## Sections

| # | ID | Description |
|---|-----|-------------|
| 1 | `#hero` | Full-screen hero with parallax, search bar, and pill filters |
| 2 | `#trust` | Animated stat counters + press logo bar |
| 3 | `#process` | Problem → 3-step process with scroll-reveal |
| 4 | `#properties` | Filterable property card grid |
| 5 | `#services` | 3 service cards + financing banner |
| 6 | `#testimonials` | Auto-advancing testimonial slider |
| 7 | `#cta` | Lead capture form with success state |

---

## Images

Place all images inside `assets/images/`. The following filenames are expected:

### Hero Background
| File | Recommended size | Notes |
|------|-----------------|-------|
| `hero-bg.jpg` | 1920 × 1080 px | Full-screen parallax background |

### Property Cards
| File | Recommended size | Property |
|------|-----------------|----------|
| `prop-villa-serena.jpg` | 900 × 650 px | Villa Serena — hero card (wide) |
| `prop-the-meridian.jpg` | 600 × 450 px | The Meridian |
| `prop-sky-residences.jpg` | 600 × 450 px | Sky Residences |
| `prop-garden-estate.jpg` | 600 × 450 px | Garden Estate |
| `prop-copperleaf.jpg` | 600 × 450 px | The Copperleaf |

### Service Cards (full bleed with overlay)
| File | Recommended size | Service |
|------|-----------------|---------|
| `svc-buy.jpg` | 700 × 800 px | Buy a Home |
| `svc-sell.jpg` | 700 × 800 px | Sell Your Home |
| `svc-invest.jpg` | 700 × 800 px | Invest in Property |

> **Tip:** All images are displayed with `object-fit: cover`, so exact dimensions are
> flexible — just keep the aspect ratios roughly consistent.

---

## Fonts

The page loads **DM Serif Display** and **DM Sans** from Google Fonts via CDN.
To self-host instead (for privacy / performance):

1. Download the font files from [Google Fonts](https://fonts.google.com)
2. Place `.woff2` files in `assets/fonts/`
3. Replace the `<link>` tag in `index.html` with `@font-face` declarations in `main.css`

---

## Customisation

### Design tokens (CSS variables)
All colours and borders are defined at the top of `main.css` under `:root`:

```css
:root {
  --cream:      #F5F0E8;
  --ink:        #1A1916;
  --olive:      #3A4A2C;
  --sage:       #8A9E75;
  --amber:      #C4893A;
  /* … */
}
```

Change these to rebrand the whole page instantly.

### Content
All copy lives in `index.html`. Stats (trust bar) use `data-target` attributes on `.stat-num`
elements — update the numbers there and the counter animation will pick them up automatically.

### Property cards
Add or remove `.prop-card` blocks inside `#propsGrid`. Set `data-type` to one of:
`buy` | `rent` | `invest` | `new` — the filter buttons use this to show/hide cards.

---

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). IE not supported.
