# Changelog

Changes to this project are recorded here. Versioning follows SemVer; package name and version are repository choices.

## [0.7.0] - 2026-11-26

### Added

- Added a brand accent (`--cx-accent`, `-hover`, `-fg`, `-text`). Primary buttons, the selected tab underline, the current page and the focus ring use it. Neutral `--cx-primary-*` tokens stay for selected chips and filters.
- Added `Drawer`, `DetailRow`, `DetailList`, `ProgressBar`, `Dropzone` and `Pagination`.
- `Modal` accepts `size` (`sm`, `md`, `lg`, `xl`).
- Buttons press down slightly while active.
- `Input` accepts `suffix`; `Alert` accepts `action`.
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
