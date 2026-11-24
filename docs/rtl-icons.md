# Arabic, RTL, and icons

## Arabic and direction

- **OBSERVED** Portal-supported languages are English and Arabic. Language switching updates the root `lang` and `dir` attributes; Arabic maps to RTL and English to LTR. Source: `src/types/portal.ts`, `src/i18n/I18nContext.tsx`.
- **OBSERVED** Arabic uses IBM Plex Sans Arabic in the loaded CSS font stack. Source: `src/index.css`.
- **OBSERVED** Several layouts use logical start/end padding, borders, and placement utilities. Mixed-direction email addresses, identifiers, and numeric text use `<bdi dir="ltr">`. Source: `src/components/layout/AppLayouts.tsx`, `src/components/ui/Primitives.tsx`, and page files.
- **DERIVED** Consumers should set the document's `lang` and `dir` when switching language and prefer logical CSS properties to physical left/right values. This follows from the portal's global direction handling and logical layout utilities.
- **UNKNOWN** A full translation catalog, Arabic punctuation/numbering manual, and tested bidi behavior for every component.

## Icons

- **OBSERVED** The portal imports icons from Lucide React. Most UI icons are 16px with `strokeWidth={1.5}`; some larger status illustrations use 20px or 24px. Source: `src/components/ui/Primitives.tsx`, `src/components/layout/AppLayouts.tsx`, `src/components/visuals/OperationalVisuals.tsx`.
- **OBSERVED** Icons next to a text label are decorative; icon-only controls carry an accessible label. Source: `src/components/ui/Primitives.tsx`, `src/components/layout/AppLayouts.tsx`.
- **DERIVED** Keep Lucide icons outlined and subordinate to nearby text; this matches the source library and stroke settings.
- **UNKNOWN** A formally documented allowed icon inventory, cap/join override policy, or maximum rendered size. The attached brand-guide recommendations are external document content and do not establish what the portal currently enforces.
