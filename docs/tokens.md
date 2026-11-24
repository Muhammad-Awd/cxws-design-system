# Token reference

`OBSERVED` values are explicitly defined in portal code. `DERIVED` values follow the resolved Tailwind CSS 4.2.2 default scale and classes actually used by the portal. `UNKNOWN` values have no source definition. Portal source paths are relative to `cxws-user-web-portal/`.

## Themes and colors

Dark is the default (`:root` and `[data-theme='dark']`). Light is selected by `[data-theme='light']`; the portal does not use `prefers-color-scheme` for theme selection. Values below are copied from `src/index.css`.

| Token | Dark | Light | Status |
| --- | --- | --- | --- |
| `--cx-bg` | `#0d0d0d` | `#f6f6f6` | OBSERVED |
| `--cx-surface` | `#141414` | `#ffffff` | OBSERVED |
| `--cx-surface-raised` | `#1c1c1c` | `#f0f0f0` | OBSERVED |
| `--cx-surface-subtle` | `#111111` | `#fafafa` | OBSERVED |
| `--cx-border` | `#262626` | `#e2e2e2` | OBSERVED |
| `--cx-border-strong` | `#3a3a3a` | `#8f8f8f` | OBSERVED |
| `--cx-text` | `#ffffff` | `#0d0d0d` | OBSERVED |
| `--cx-text-muted` | `#b3b3b3` | `#454545` | OBSERVED |
| `--cx-text-subtle` | `#949494` | `#595959` | OBSERVED |
| `--cx-primary-bg` | `#ffffff` | `#0d0d0d` | OBSERVED |
| `--cx-primary-fg` | `#0d0d0d` | `#ffffff` | OBSERVED |
| `--cx-primary-hover` | `#e5e5e5` | `#262626` | OBSERVED |
| `--cx-secondary-bg` | `#1a1a1a` | `#f3f3f3` | OBSERVED |
| `--cx-secondary-hover` | `#262626` | `#e7e7e7` | OBSERVED |
| `--cx-focus-ring` | `#ffffff` | `#0d0d0d` | OBSERVED |

Semantic foreground/background/border tokens use `--cx-status-{ok,warn,danger,neutral}-{fg,bg,border}`. Their exact alpha and color values are in `src/tokens.css` and the corresponding theme blocks. The portal source is `src/index.css`.

Document/print values (`--doc-bg`, `--doc-subtle`, `--doc-border`, `--doc-text`, `--doc-muted`, `--doc-quiet`, `--doc-brand-red`) are OBSERVED in `src/index.css`; they serve print/document surfaces and are not the core application accent palette.

## Typography

- **OBSERVED** English stack: SF Pro Display, Apple system fonts, Inter, IBM Plex Sans Arabic, sans-serif. Local SF Pro face declarations provide weights 400, 500, 600, 700. Google Fonts import loads Inter 400–700 and IBM Plex Sans Arabic 300–700. Source: `src/index.css`.
- **OBSERVED** Arabic document direction selects IBM Plex Sans Arabic first. Source: `src/index.css`.
- **DERIVED** Used Tailwind CSS 4.2.2 size steps include `text-xs` 0.75rem, `text-sm` 0.875rem, `text-base` 1rem, `text-lg` 1.125rem, `text-xl` 1.25rem, `text-2xl` 1.5rem, and `text-3xl` 1.875rem. These classes are used in portal pages/components; values are Tailwind defaults, not individually declared design tokens.
- **DERIVED** Font weights used in common component/page classes are 400, 500, 600, and 700. Other imported font weights do not by themselves prove UI usage.
- **UNKNOWN** A complete role-based typography scale, tracking values for every role, or a fixed line-height for all text. Unset values inherit Tailwind/browser defaults.

## Spacing and layout values

- **OBSERVED** Named special values in `src/index.css`: `tap` 2.75rem; `tap-lg` 3rem; mobile bar 3.5rem; logo min 1.625rem; logo large 1.75rem; co-brand width 0.15625rem and height 1.25rem; pool bar 0.875rem; clock bar 1.25rem; step dot 1.5rem; micro text 0.75rem.
- **DERIVED** Tailwind's spacing utility scale is based on 0.25rem increments. The portal uses steps including 1 (0.25rem), 2 (0.5rem), 3 (0.75rem), 4 (1rem), 5 (1.25rem), 6 (1.5rem), 8 (2rem), 10 (2.5rem), and 12 (3rem); see utility classes in `src/components/ui/Primitives.tsx`, `src/components/layout/AppLayouts.tsx`, and `src/pages/dashboard/DashboardPage.tsx`.
- **OBSERVED** Common account shell uses `max-w-6xl`, 1rem mobile gutters, 1.5rem `sm` gutters, and 2rem `lg` gutters. Header height is 4rem; sidebar width 15rem; mobile navigation bar height 3.5rem. Source: `src/components/layout/AppLayouts.tsx`, `src/index.css`.
- **DERIVED** Tailwind CSS 4.2.2 default breakpoints are `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem. Portal usage includes `sm`, `md`, `lg`, and `xl`; `2xl` is not observed in the inspected source.
- **UNKNOWN** A separately documented spacing base or one fixed grid specification beyond the page-specific layouts recorded in [layout and responsive rules](layout-and-responsive.md).

## Radius, borders, shadows, layers, motion

- **OBSERVED** Radius: control 0.25rem, card 0.5rem, sheet 0.75rem (`src/index.css`). Full circles are utility classes, not a named radius token.
- **DERIVED** Standard `border` utilities render a 1px border in the resolved Tailwind version; the portal uses those classes. No separate global border-width token exists in the portal.
- **OBSERVED** The explicit floating shadow is `0px 104px 520px rgba(0, 0, 0, 0.55), 0px 12px 32px rgba(0, 0, 0, 0.45)` in dark and `0px 104px 520px rgba(0, 0, 0, 0.15)` in light (`src/index.css`).
- **OBSERVED** Numeric z-index utility classes used are 10, 30, 40, and 50. Exact semantic ownership is **UNKNOWN**; these values are exposed as numeric tokens only.
- **OBSERVED** Control transition 150ms ease-out; surface transition 250ms ease-out; sheet animation 400ms ease-out; motion reduces under `prefers-reduced-motion` to 0.01ms (`src/index.css`).
- **UNKNOWN** Other named shadow levels, z-index roles, spring/gesture rules, and component-specific easing beyond these definitions.

## Override

Tokens are custom properties and can be scoped by consumers. For example, overriding `--cx-primary-bg`, `--cx-primary-fg`, and `--cx-primary-hover` changes primary button accents without forking the component. This extension point is **DERIVED** from the CSS-variable implementation; consumer approval policy is **UNKNOWN**.
