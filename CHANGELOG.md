# Changelog

Changes to this project are recorded here. Versioning follows SemVer; package name and version are repository choices.

## [0.14.0] - 2026-11-28

### Changed

- `Card` is now an open section with a hairline above it, with no box, fill or rounded corners. `Card tone="raised"` keeps the boxed panel for things that should stand off the page. Screens that stacked many boxed cards now read as one page.

## [0.13.0] - 2026-11-28

### Changed

- Brand pass. `Badge` is now a small status dot and a word, with no border or fill, so state stays readable without turning screens into rows of coloured pills. Ping dots, the heartbeat line, the radar sweep and the shimmer no longer animate. Only a build in progress still breathes, more slowly.

## [0.12.0] - 2026-11-28

### Added

- Ledger parts: `Ledger` and `LedgerRow` (hairline rows), `Figure` (large tabular number), `Spine` and `SpineStep` (vertical timeline with queued, building, done and failed states), and the `cx-motion-breathe` and `cx-motion-settle` utilities, with a design principle for when to use them.

## [0.11.0] - 2026-11-27

### Added

- `Radio`, `Chip` and `ChipGroup`, `Stepper`, `SegmentedControl`, `TextButton`, `SectionTitle` and `CardTitle`, and `Card tone="raised"`. `Card` accepts `id`, `role` and `aria-*`. They replace controls that screens were building by hand.
- Design principles for headings, minimum text size and which control to pick.

### Changed

- `docs/ux-writing.md` uses a colon instead of an em dash in its evidence column.

## [0.10.0] - 2026-11-27

### Added

- Hero visual parts: `GhostCursor`, `ClickRipple` and `AnnotationPin`, with documentation and a design principle for flagship example screens. They use theme and status tokens only and have reduced-motion fallbacks.

## [0.9.0] - 2026-11-27

### Added

- Motion utilities that show state: `cx-motion-sweep`, `cx-motion-scan`, `cx-motion-shimmer`, `cx-motion-reveal`, `cx-motion-caret`, `cx-motion-travel`, with tone modifiers. They use status tokens, follow the theme and stop for reduced motion.

## [0.8.0] - 2026-11-27

### Added

- `PulseDot` and `Heartbeat`: live status marks in the four status tones. They animate only while `live`, follow the theme, and stop for reduced motion.
- Design principles for live status: no glows, gradients, grids or theme-ignoring dark panels.

## [0.7.0] - 2026-11-26

### Added

- Added a brand accent (`--cx-accent`, `-hover`, `-fg`, `-text`). Primary buttons, the selected tab underline, the current page and the focus ring use it. Neutral `--cx-primary-*` tokens stay for selected chips and filters.
- Added `Drawer`, `DetailRow`, `DetailList`, `ProgressBar`, `Dropzone` and `Pagination`.
- `Modal` accepts `size` (`sm`, `md`, `lg`, `xl`).
- Buttons press down slightly while active.
- Tailwind theme colors for status tones (`text-cx-status-ok-fg`, `bg-cx-status-danger-bg`, `border-cx-status-warn-border`, and so on) and `cx-accent`.
- `Input` accepts `suffix`; `Alert` accepts `action`; new `SearchField`.
- New entry `@muhammad-awd/cxws-design-system/tailwind.css` for Tailwind v4 apps. It brings tokens, the Tailwind theme values, fonts, base styles and every component class through one import, so apps no longer copy the theme. `styles.css` stays the pre-compiled bundle.

## [0.6.1] - 2026-11-25

### Fixed

- Grouped sidebar destinations render as links. Ordinary clicks can use the caller's client-side navigation; modified clicks retain native new-tab behavior.

## [0.6.0] - 2026-11-25

### Changed

- Use the CloudX mark alone in application and document branding. Remove Dipdux logo components and assets.

## [0.5.0] - 2026-11-25

### Added

- Shared Tailwind spacing and responsive breakpoint values derived from the CloudX tokens.
- Shared content container and page stack layout classes for consuming applications.
- The CloudX vector logo and Dipdux wordmark remain exported from the shared package for app reuse.

## [0.4.0] - 2026-11-25

### Added

- Controlled `Toggle` switch with a visible thumb, semantic state, and callback.

## [0.3.1] - 2026-11-25

### Fixed

- Preserve generated TypeScript declarations during package builds so consumers can typecheck against the exported API.

## [0.3.0] - 2026-11-25

### Added

- `GroupedSidebar` for keyboard accessible, sectioned application navigation.

## [0.2.0] - 2026-11-25

### Added

- `MetricCard`, a typed summary card for labeled values, details, icons, and optional status.
- A `prepare` build for Git-based package installs.

## [0.1.0] - 2026-11-24

### Added

- Initial React 19 / TypeScript component library using Vite and Tailwind CSS 4.
- Portal-derived CSS tokens, dark default and light theme overrides.
- Atoms, molecules, organisms, component examples, and source-qualified design documentation.
- Build, typecheck, lint, and Vitest configuration.
