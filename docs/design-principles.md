# Design principles and usage guidelines

Each rule is labeled by evidence: **OBSERVED** means present in customer-portal code; **DERIVED** means a conclusion from repeated code patterns; **PROPOSED** means a suggestion for review, not an existing brand rule. Portal paths below are relative to `cxws-user-web-portal/`.

## Visual principles

- **OBSERVED** The default UI uses a near-black canvas, dark layered surfaces, white primary text, muted grays, and thin gray borders. The light theme reverses the neutral surface/text relationship. Source: `src/index.css`.
- **OBSERVED** Primary and secondary controls stay neutral in both themes. Success, warning, danger, and neutral states use separate semantic color pairs. Source: `src/index.css`, `src/components/ui/Primitives.tsx`.
- **OBSERVED** Status labels combine an icon with text; the icon is decorative to assistive technology. Source: `src/components/ui/Primitives.tsx` (`StatusBadge`).
- **DERIVED** The visual system puts most emphasis on readable content and uses color to distinguish status. This follows from the neutral base palette and the dedicated semantic status variables; no written product-design philosophy was found in the portal source.
- **OBSERVED** Fields show labels above inputs, helper text below, and validation errors below with an icon. Source: `src/components/ui/Primitives.tsx` (`TextField`, `SelectField`, `TextAreaField`).
- **DERIVED** Keep form feedback close to the field it describes. The portal associates helper/error text through `aria-describedby` and renders it adjacent to the control. Source: `src/components/ui/Primitives.tsx`.
- **OBSERVED** Cards use a border and a surface fill; the portal defines control, card, and sheet radii separately. Source: `src/index.css`, `src/components/ui/Primitives.tsx`.
- **OBSERVED** Current application and document branding uses the CloudX logo alone. Source: `src/components/brand/CloudXLogo.tsx`, `src/components/layout/AppLayouts.tsx`, `src/pages/billing/BillingPages.tsx`, and `src/pages/reports/ReportsPage.tsx`.

## Use / avoid

| Guidance | Status | Evidence |
| --- | --- | --- |
| Use the semantic status tone that matches the meaning (`ok`, `warn`, `danger`, `neutral`). | OBSERVED | `src/components/ui/Primitives.tsx` |
| Keep the focus indicator visible for keyboard users. | OBSERVED | `src/index.css` defines `:focus-visible` outline. |
| Associate every field with a visible label; connect helper or error text with `aria-describedby`. | OBSERVED | `src/components/ui/Primitives.tsx` |
| Use logical inline properties such as start/end for layouts intended to support Arabic RTL. | DERIVED | Logical Tailwind utilities appear throughout `src/components/layout/AppLayouts.tsx` and `src/components/ui/Primitives.tsx`; global direction comes from `src/i18n/I18nContext.tsx`. |
| Keep application decisions such as eligibility, pricing, auth, data fetching, or validation rules outside these components. | PROPOSED | Library boundary chosen for this repository. |
| Override tokens at the theme boundary instead of forking a component. | PROPOSED | Package usage recommendation; portal code uses CSS variables but does not document a consumer theming contract. |
| Do not add a decorative accent or shadow unless the extracted token set calls for it. | DERIVED | The component palette is neutral and only one explicit floating shadow is defined in `src/index.css`. |
| Keep no more than two prominent task actions visible on a screen at once; place less common actions in an accessible overflow menu. | PROPOSED (task-directed) | Requested for the customer portal polish; not an existing portal rule. |
| Show the essential summary first and put optional technical detail behind a disclosure such as “See more”. | PROPOSED (task-directed) | Requested progressive disclosure; existing `TechnicalDetails` is an observed portal pattern, but this usage rule is new. |
| Use a small relationship diagram when it makes infrastructure connections easier to understand; pair icons with clear labels. | PROPOSED (task-directed) | Requested visual explanation; do not add decorative or misleading diagrams. |
| Keep team administration and other occasional destinations under a “More” navigation group when they are not core daily tasks. | PROPOSED (task-directed) | Requested while simplifying the customer portal; not an existing brand rule. |
| Preserve all existing capabilities when reducing visible controls; make secondary actions discoverable through menus or disclosures. | PROPOSED (task-directed) | User requested simplification without feature loss. |

## Live status

- **PROPOSED** A screen may show work that is happening now with a `PulseDot` or `Heartbeat`. The surface around it is an ordinary card in the current theme. Do not add glows, gradients, background grids, vignettes or a dark panel that ignores the theme.
- **PROPOSED** Status words stay plain and sentence case ("Working now", "Waiting for its next window"). Colour never carries the meaning alone.
- **PROPOSED** Motion is allowed when it shows state: a sweep on a live status circle, a caret on the newest log line, a dot travelling along a link. It uses status tokens, follows the theme and stops for reduced motion. It never becomes a glow, gradient background, grid or vignette.
- **PROPOSED** Use at most one live panel per screen, and only where the state really changes over time.

## Headings and text size

- **PROPOSED** A page section uses `SectionTitle`. A card or panel uses `CardTitle`. Do not mix bold and muted styles for headings at the same level.
- **PROPOSED** The smallest text is 12 px. Use `text-micro` or larger.
- **PROPOSED** Pick from `Chip`, `Stepper`, `SegmentedControl` and `TextButton` before building a new control. Use `Checkbox`, `Toggle` and `Select` for form choices.

## Hero visuals

- **PROPOSED** One flagship screen per feature may show the feature working on a simulated example: a browser frame, a gliding cursor, click ripples and annotation pins. It is a simulation of the real product, not abstract decoration.
- **PROPOSED** The example is built from the system's surfaces, borders and status tokens, so it follows the theme. No glows, gradients or invented colours. Label it "Example" when the data is not the customer's.
- **PROPOSED** Reduced-motion users get the finished state, not a blank frame.

## Source reconciliation

The attached Dipdux brand-guidelines DOCX was consulted as a separate reference document. It is not treated as an instruction that supersedes the requested portal-source extraction. Some statements differ from the portal implementation: the document names SF Arabic while the portal loads IBM Plex Sans Arabic; it describes Bennu Red for primary calls to action while the portal's core primary button uses white/near-black values. This package follows the portal's current code values. The product owner's later instruction to use CloudX branding alone supersedes the document's co-branding examples.

## Unknowns

- **UNKNOWN** No explicit written design philosophy or component governance policy was found in the portal source.
- **UNKNOWN** Whether consumers may alter semantic status colors or typography while preserving CloudX brand approval.
- **UNKNOWN** Any requirement to use the attached brand-guidelines values other than its superseded co-branding examples where they differ from the running portal source.


## Ledger direction

Where a screen would repeat the same card many times, set it as rows divided by hairlines (`Ledger`). Use a `Spine` for anything that happens in order, such as a build or a set-up. Figures are large and tabular. The accent colour marks the one thing that needs attention now; status tones mark state only. No gradients, glows or shadows. Motion is slow and shows that something is happening: a building node breathes on a 2 s cycle, a finished step settles in, a failed step holds still.


## Brand pass

CloudX uses the Dipdux brand rules: dark first, white text, MainGray for quiet text, one accent, one shadow, ease-out at about 250 ms, and no motion for its own sake. State is a small dot and a word. Use `Badge` for it, and do not stack coloured pills on every row. A pulse or breathing node is reserved for something that is really in progress, such as a build.
