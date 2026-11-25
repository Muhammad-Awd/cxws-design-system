# Layout and responsive rules

Values are tagged `OBSERVED` when specified in portal source and `DERIVED` when they come from a used Tailwind class/default. Portal paths are relative to `cxws-user-web-portal/`.

## Page composition

- **OBSERVED** Public auth layout has a top header, centered main region, and footer. Its common inner width is `max-w-6xl` with 1rem mobile gutters and 1.5rem at `sm`. Source: `src/components/layout/AppLayouts.tsx`.
- **OBSERVED** Account content uses a `max-w-6xl` container. The overview page uses a 12-column desktop grid, with primary content spanning 7 columns and the secondary area 5 columns at `lg`. Source: `src/components/layout/AppLayouts.tsx`, `src/pages/dashboard/DashboardPage.tsx`.
- **OBSERVED** Account app shell has a 4rem top bar, a 15rem side rail on large screens, and a fixed five-item mobile bottom navigation. Main content reserves bottom space for that mobile bar. Source: `src/components/layout/AppLayouts.tsx`.
- **OBSERVED** Dashboard summary tiles use two columns on narrow screens and four at `sm`; the overview content changes to a 7/5 split at `lg`. Source: `src/pages/dashboard/DashboardPage.tsx`.

## Breakpoints and behavior

- **DERIVED** `sm` is 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, and `2xl` 96rem based on Tailwind CSS 4.2.2 defaults. Portal classes show responsive changes at `sm`, `md`, `lg`, and `xl`; exact browser rendering still depends on the consuming CSS and viewport.
- **OBSERVED** Sidebar is hidden until `lg`; fixed bottom navigation is hidden at `lg`. Source: `src/components/layout/AppLayouts.tsx`.
- **OBSERVED** Header items become visible at `sm`, `md`, or `xl` depending on their content. Source: `src/components/layout/AppLayouts.tsx`.
- **DERIVED** Keep primary navigation compact on small viewports and place wider information in the content region; this follows the sidebar/bottom-nav switch. No standalone written responsive philosophy was found.
- **UNKNOWN** A single canonical page grid for every route; the portal uses multiple page-specific layouts.
- **UNKNOWN** Minimum supported viewport width, container behavior beyond inspected pages, and exact overflow/scroll behavior for every route.

## Shared application layout

- **OBSERVED** `--cx-content-max` (72rem), `--cx-page-gutter` (1rem, then 1.5rem at `sm`), spacing tokens, and `sm` through `2xl` breakpoints are exported by `src/tokens.css`.
- **DERIVED** Tailwind consumers that import the package stylesheet use the same spacing utility base (`--spacing: var(--cx-space-1)`) and responsive breakpoints (`--breakpoint-*` values). Thus `gap-3`, `p-4`, `sm:*`, and `lg:*` resolve from the shared system.
- **OBSERVED** `.cx-content-container` and `.cx-page-stack` provide shared max-width, centered layout, and vertical stack spacing. Source: `src/styles.css`.
- **UNKNOWN** A single canonical column count for every page. Use responsive grid columns that follow each page's content while keeping gaps and breakpoints on shared tokens.
