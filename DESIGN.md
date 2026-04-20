# Homeosetu Design System

Homeosetu = Homeopathy + Setu (bridge). The visual identity communicates
clinical credibility, educational warmth, and tradition meeting modern practice.

## Color Palette

### Primary
- `--brand-primary`: hsl(153, 40%, 18%) — Deep forest green `#1B4332`
- `--brand-primary-hover`: hsl(153, 35%, 24%) — `#245A3B`
- `--brand-primary-light`: hsl(153, 35%, 28%) — `#2D6A4F`
- `--brand-primary-surface`: hsl(153, 25%, 95%) — Light green tint for backgrounds

### Secondary
- `--brand-secondary`: hsl(27, 25%, 55%) — Warm gold/amber `#B08968`
- `--brand-secondary-light`: hsl(27, 30%, 85%) — Light amber for backgrounds
- `--brand-secondary-surface`: hsl(27, 25%, 96%) — Subtle warm tint

### Neutrals
- `--surface`: hsl(45, 20%, 98%) — Off-white `#FAFAF7`
- `--surface-muted`: hsl(40, 15%, 95%) — `#F5F0EB`
- `--border`: hsl(30, 10%, 88%)
- `--text`: hsl(0, 0%, 10%) — `#1A1A1A`
- `--text-muted`: hsl(220, 9%, 46%) — `#6B7280`
- `--text-light`: hsl(220, 9%, 64%) — `#9CA3AF`

### Semantic
- `--success`: hsl(142, 71%, 45%)
- `--error`: hsl(0, 84%, 60%)
- `--warning`: hsl(38, 92%, 50%)

### Usage Rules
- Never use hardcoded Tailwind colors (no `text-purple-900`, `bg-blue-500`)
- Always reference CSS variables through Tailwind config extensions
- One accent color per section maximum
- Background: off-white `--surface`, not pure white

## Typography

### Fonts
- **Headings:** Lora (serif) — 700 weight. Signals authority, tradition, editorial quality.
- **Body:** DM Sans (sans-serif) — 400/500/600 weights. Clean, warm, readable.
- **Monospace:** JetBrains Mono — for code or technical content only.

### Scale (1.25 ratio)
| Token     | Size         | Font        | Weight | Use                        |
|-----------|-------------|-------------|--------|----------------------------|
| `hero`    | 3rem / 48px | Lora        | 700    | Homepage hero headline     |
| `h1`      | 2.25rem / 36px | Lora     | 700    | Page titles                |
| `h2`      | 1.75rem / 28px | Lora     | 700    | Section headings           |
| `h3`      | 1.25rem / 20px | DM Sans  | 600    | Subsection headings        |
| `body`    | 1rem / 16px | DM Sans     | 400    | Body text                  |
| `body-sm` | 0.875rem / 14px | DM Sans | 400    | Secondary text, captions   |
| `caption` | 0.75rem / 12px | DM Sans  | 500    | Labels, badges             |

### Rules
- One `<h1>` per page
- Never skip heading levels
- Headings are left-aligned by default (centered only in final CTA section)

## Spacing

Base unit: 4px

| Token | Value | Use |
|-------|-------|-----|
| `xs`  | 4px   | Inline spacing, icon gaps |
| `sm`  | 8px   | Tight element spacing |
| `md`  | 16px  | Default element spacing |
| `lg`  | 24px  | Card padding, section gaps |
| `xl`  | 32px  | Section padding between elements |
| `2xl` | 48px  | Major section separation |
| `3xl` | 64px  | Page section top/bottom padding |
| `4xl` | 96px  | Hero/CTA section padding |

Container max-width: 1200px

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 4px | Badges, chips, small buttons |
| `--radius-md` | 8px | Cards, inputs, content blocks |
| `--radius-lg` | 12px | Modals, hero images, large cards |
| `--radius-full` | 9999px | Avatars, pill buttons |

## Component Patterns

### Buttons
- **Primary:** `bg-brand-primary text-white rounded-full px-6 py-3`
- **Secondary:** `border border-brand-primary text-brand-primary bg-transparent`
- **Ghost:** `text-brand-primary bg-transparent hover:bg-brand-primary/5`
- Minimum touch target: 44x44px
- No icon-only buttons without aria-label

### Cards
- Default: no shadow, subtle border (`1px solid var(--border)`)
- Hover: `shadow-sm` transition (200ms ease)
- No decorative borders (no colored left-border)
- No icon-in-circle decorations
- Padding: 24px (`p-6`)

### Section Layout
- Left-aligned heading (Lora serif)
- One supporting paragraph (DM Sans, --text-muted)
- Content area below
- NO centered-everything pattern
- NO decorative blobs, floating circles, or ornamental elements
- Each section has ONE visual job

### Images
- Real product screenshots and practitioner photos only
- No stock photos, no AI-generated images
- Border-radius: `--radius-lg` (12px)
- Subtle border: `1px solid var(--border)`
- Alt text: descriptive (not "image" or "logo")

### Empty States
- Warm, specific message (never "No items found")
- Primary CTA that moves user forward
- Optional illustration (line art, medical/education themed)

### Loading States
- Skeleton placeholders matching loaded layout dimensions
- Pulse animation (Tailwind `animate-pulse`)
- No spinners except for destructive actions (payment, delete)

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile    | 375px | Single column, full-width |
| Tablet    | 768px | 2-column where appropriate |
| Desktop   | 1280px | Full layout, max-width container |

### Mobile-Specific
- Public pages: full-screen overlay navigation (slide from right)
- Dashboard: bottom tab bar (Home/Courses/Software/Profile)
- Touch targets: minimum 44x44px
- No hidden content (`hidden md:block` is not responsive design)

## Accessibility

- Skip-to-content link on every page
- `<main>` landmark on every page
- `aria-label` on all `<nav>` elements
- Focus-visible rings on all interactive elements
- Color contrast: WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- No auto-playing content without pause controls
- Form errors linked via `aria-describedby`

## Anti-Patterns (Do Not Use)

- Purple/violet gradient backgrounds
- Icon-in-colored-circle feature grids
- Centered-everything layouts
- Decorative floating circles or blobs
- Emoji as design elements
- Auto-sliding carousels without pause controls
- Inter, Roboto, or Arial as primary font
- Pure white (#FFFFFF) backgrounds
- Cookie-cutter section rhythm (hero > features > stats > testimonials > CTA)
