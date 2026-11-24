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

## Source reconciliation

The attached Dipdux brand-guidelines DOCX was consulted as a separate reference document. It is not treated as an instruction that supersedes the requested portal-source extraction. Some statements differ from the portal implementation: the document names SF Arabic while the portal loads IBM Plex Sans Arabic; it describes Bennu Red for primary calls to action while the portal's core primary button uses white/near-black values. This package follows the portal's current code values. The attached document's intended authority over this customer portal is **UNKNOWN**.

## Unknowns

- **UNKNOWN** No explicit written design philosophy or component governance policy was found in the portal source.
- **UNKNOWN** Whether consumers may alter semantic status colors or typography while preserving CloudX brand approval.
- **UNKNOWN** Any requirement to use the attached brand-guidelines values where they differ from the running portal source.
