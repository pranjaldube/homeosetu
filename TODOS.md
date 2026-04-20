# Homeosetu Design TODOs

From design review on 2026-04-20.

## Priority Order

### 1. Loading states and error boundaries
Add `loading.tsx` and `error.tsx` to all route segments. Currently zero loading
states exist. Users on slow connections see blank screens. Skeleton components
should match the loaded layout dimensions. Approximately 15 files to create.
Depends on: DESIGN.md (for skeleton styling).

### 2. Migrate hardcoded colors to CSS variables
Replace 73 hardcoded `purple-*` Tailwind classes across 15 files with CSS
variable-based design tokens. Update `globals.css` with the green/gold palette
from DESIGN.md and extend `tailwind.config.ts` to reference them.
Depends on: DESIGN.md + updated globals.css + tailwind.config.ts.

### 3. Homepage redesign
Replace carousel with single hero composition. Kill the 4-column icon-grid
features section. New section order: hero > social proof > value proposition >
course categories > Kent Repertory callout > testimonials > CTA. Remove all
decorative blobs/circles. Break the centered-everything pattern with
left-aligned editorial layouts.
Depends on: DESIGN.md + color migration (TODOs 1+2).

### 4. Fix FAQ page
Fix heading hierarchy (currently all `<h1>`). Fix typos ("How do I create an
view the courses?"). Remove duplicate content (faqData array + hardcoded HTML
render the same content twice). Use proper `<h2>` for categories and `<h3>` for
questions. Standalone fix, no dependencies.

### 5. Add page landmarks and skip-to-content
Add `<main>` landmark to every page layout. Add `aria-label` to all `<nav>`
elements. Add skip-to-content link as first focusable element. Standalone fix.

### 6. Dashboard reorder
Move "Continue Learning" (course list) above "User Details" (disabled form
fields). Add empty state for new users with no courses. Add welcome message
with user's name.
Depends on: DESIGN.md for empty state styling.

### 7. Replace Inter with Lora + DM Sans
Update `app/layout.tsx` font imports and `tailwind.config.ts` font family
config. Lora for headings, DM Sans for body text. May need minor spacing
adjustments due to width differences.
Depends on: DESIGN.md.

### 8. Responsive mobile navigation
Replace basic hamburger dropdown with full-screen overlay menu (public pages)
and bottom tab bar (dashboard). Add focus trap, Escape key handling,
aria-expanded attributes. Ensure 44px minimum touch targets.
Depends on: Homepage redesign (TODO 3).

## Deferred Decisions

- **Kent Repertory embedded vs standalone:** Needs product strategy input.
- **Course preview/trailer before purchase:** Needs content strategy.
- **Dark mode:** Removed for now. Ship polished light theme first. Revisit
  when design system is stable.
