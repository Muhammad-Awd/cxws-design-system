# CloudX Design System

Presentational React components and CSS design tokens extracted from the CloudX customer portal. The customer portal remains the visual source of truth; code-level behavior is labeled `OBSERVED`, pattern-based conclusions `DERIVED`, and suggestions `PROPOSED` in the documentation.

## Package

The chosen package name is `@muhammad-awd/cxws-design-system` and the current version is `0.4.0`. Both choices are repository setup decisions, not portal conventions; change the package name in `package.json` and the examples if your publishing scope differs.

## Install

```sh
pnpm add @muhammad-awd/cxws-design-system react react-dom lucide-react
```

## Usage

```tsx
import { Button, Card, Field, Input } from '@muhammad-awd/cxws-design-system'
import '@muhammad-awd/cxws-design-system/styles.css'

export function Example() {
  return (
    <Card>
      <Field id="email" label="Email" hint="Use your work address.">
        <Input type="email" autoComplete="email" />
      </Field>
      <Button variant="primary">Continue</Button>
    </Card>
  )
}
```

The component stylesheet imports Tailwind CSS 4 and the portal-derived theme. If your app loads Tailwind itself, import `tailwind-theme.css` before `tailwindcss` and import `styles.css` for the shared components. This makes spacing utilities and responsive grid breakpoints resolve from shared CloudX values. Use `.cx-page-stack` and `.cx-content-container` for common content widths and rhythm. Components are typed, presentational, and use props/callbacks; applications own data, validation rules, authorization, and side effects.

### Brand and layout

`CloudXLogo` is exported by the package for application navigation and document headers. Tailwind responsive grid utilities such as `grid-cols-*`, `gap-*`, and `sm:*` consume the package's shared spacing and breakpoint theme.

```css
@import '@muhammad-awd/cxws-design-system/tailwind-theme.css';
@import 'tailwindcss';
@import '@muhammad-awd/cxws-design-system/styles.css';
```

Git-based installs run the package build from `prepare`, so consumers can install directly from the repository without relying on checked-in `dist` output.

For customer-facing screens, follow [design principles](docs/design-principles.md) and [UX writing](docs/ux-writing.md): keep at most two prominent task actions visible, put secondary actions in an accessible overflow menu, and reveal optional detail on demand. These portal-simplification rules are marked **PROPOSED (task-directed)** because they were requested as guidance and are not extracted brand policy.

## Theming

Dark is the default theme, matching the portal. Set `data-theme="light"` on the document or a subtree for the light palette. Override CSS custom properties on a wrapper to change a surface, text, or primary accent without changing components:

```css
.brand-theme {
  --cx-primary-bg: #ac322e;
  --cx-primary-fg: #ffffff;
  --cx-primary-hover: color-mix(in srgb, var(--cx-primary-bg), black 10%);
}
```

The override above is an example only (`PROPOSED`), not a customer-portal value. See [tokens](docs/tokens.md) and [principles](docs/design-principles.md).

## Development

```sh
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run lint
pnpm test
pnpm run build
```

Node and pnpm versions are not prescribed by the original empty repository. Use Node 22 and pnpm 10, matching the customer portal's checked-in `.mise.toml` (`DERIVED` setup choice).

## Documentation

- [Design principles and usage guidelines](docs/design-principles.md)
- [Token reference](docs/tokens.md)
- [Layout and responsive rules](docs/layout-and-responsive.md)
- [States and accessibility](docs/states-accessibility.md)
- [Arabic, RTL, and icons](docs/rtl-icons.md)
- [UX writing](docs/ux-writing.md)
- [Component examples](docs/components.md)
- [Changelog](CHANGELOG.md)

## Versioning

Use semantic versioning. `0.x` versions may change before the public component API is stabilized. Increment patch for compatible fixes and token corrections, minor for compatible components or options, and major for breaking exports or prop changes. Record each release in `CHANGELOG.md`.
