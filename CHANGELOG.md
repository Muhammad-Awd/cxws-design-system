# Changelog

Changes to this project are recorded here. Versioning follows SemVer; package name and version are repository choices.

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
