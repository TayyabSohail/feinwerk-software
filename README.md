# Feinwerks Software

Company website for **Feinwerks Software**, a software engineering studio with
an Asian office in Islamabad, Pakistan and a European office in Fellbach, Germany.

Built on Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui,
Framer Motion, Lenis and cobe (globe). Single light theme with a WebGL silk
backdrop, English and German UI (flag switch in the header, cookie-based), works
with zero environment variables; email, database storage, analytics and booking
light up as keys are added.

---

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in what you have
pnpm dev                      # http://localhost:3000
```

Other scripts:

| Script           | What it does                        |
| ---------------- | ----------------------------------- |
| `pnpm build`     | Production build (also typechecks)  |
| `pnpm start`     | Serve the production build          |
| `pnpm typecheck` | `tsc --noEmit`                      |
| `pnpm lint`      | ESLint with auto-fix                |
| `pnpm format`    | Prettier                            |

---

## Environment variables

All optional except `NEXT_PUBLIC_APP_URL`. See [`.env.example`](./.env.example).

| Variable                                             | Enables                                               |
| ---------------------------------------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`                                | Canonical URLs, sitemap, Open Graph, structured data  |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery by email via Resend        |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Contact form storage in `contact_messages` (see `supabase/migrations`) |
| `NEXT_PUBLIC_CAL_LINK`                               | "Book a call" link on the contact page (`user/event`) |
| `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | Analytics, loaded only after cookie consent          |

Without Resend or Supabase, contact submissions are validated and logged on
the server so nothing is lost during development.

---

## Where the content lives

Everything visible on the site is data-driven from a handful of typed files.
Edit these; the pages update themselves.

| File                          | Controls                                                                 |
| ----------------------------- | ------------------------------------------------------------------------ |
| `src/config/site.ts`          | Company name, tagline, email, **phone numbers and offices**, socials, founder, nav, stats |
| `src/data/projects.ts`        | Every case study: copy, cover image, metrics, stack. Drives `/work`, `/work/[slug]`, the homepage showcase, outcomes and sitemap |
| `src/data/services.ts`        | The six services. Drives `/services`, `/services/[slug]`, the homepage grid, footer and contact form select |
| `src/data/process.ts`         | Engagement steps and company values                                      |
| `src/data/faqs.ts`            | Questions on the homepage, services and contact pages                    |
| `src/data/testimonials.ts`    | Client quotes attributed by role and company, linked to their case studies    |
| `src/app/legal/*/page.tsx`    | Privacy, Terms, Cookie policy, Imprint                                   |
| `src/i18n/dictionaries/*.ts` | UI and marketing copy in English and German (nav, hero, sections, footer) |

### Adding a case study

1. Drop the cover into `public/work/` (keep it under ~1800px wide).
2. Append a `Project` to `src/data/projects.ts`. Set `visual` to
   `render` (3D device render), `screenshot` (gets a browser-frame mockup),
   `mark` (logo on a plate) or `poster` (wide art).
3. Give it a `featured` number to place it in the homepage stack.

### Brand

- Logo mark and wordmark: `src/components/brand/logo.tsx`
- Favicon frames (rotate every 5 s, theme-aware): `src/components/brand/favicon-frames.ts`
- Static icons and Open Graph image: `public/icon.*`, `src/app/opengraph-image.tsx`
- Colour tokens, clipped-corner panels and fill-animation buttons: `src/app/globals.css`
- Effects: `src/components/effects/` (silk shader, circuit backdrop, globe, cursor spotlight), scroll text highlight: `src/components/motion/scroll-highlight.tsx`, intro: `src/components/layout/preloader.tsx`
- Device mockups: `src/components/mockups/` (laptop, phone, browser)

---

## Pages

| Route                         | Notes                                              |
| ----------------------------- | -------------------------------------------------- |
| `/`                           | Hero, services, sticky work showcase, outcomes, process, values, stack, FAQ, CTA |
| `/services`, `/services/[slug]` | Six services, statically generated                |
| `/work`, `/work/[slug]`       | Filterable grid, twelve case studies               |
| `/about`                      | Story, founder, principles, process, locations     |
| `/contact`                    | Form (server action, rate limited, honeypot), offices with live clocks |
| `/careers`                    | Speculative applications                           |
| `/legal` plus `/legal/privacy`, `/legal/terms`, `/legal/cookies`, `/legal/imprint` | Legal hub and policies |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image` | Generated |

---

## Before launch

- Add the full postal address of the Fellbach office plus any register or VAT
  number to `src/app/legal/imprint/page.tsx` once they exist; German law
  requires them for a business site.
- Replace the testimonial `author` roles in `src/data/testimonials.ts` with
  the real names once each client has approved their quote.
- Replace `hello@feinwerks.software` in `src/config/site.ts` with the real
  inbox once it exists, and set `CONTACT_TO_EMAIL`.
- Have the Terms of Service and Privacy Policy reviewed by counsel; they are
  written as a solid starting point, not legal advice.
- Set `NEXT_PUBLIC_APP_URL` to the production domain, `https://feinwerks.software`.
