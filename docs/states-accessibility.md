# States and accessibility patterns

This records patterns present in portal source, not an independent WCAG audit. Status tags: **OBSERVED**, **DERIVED**, **PROPOSED**, or **UNKNOWN**. Source paths are relative to `cxws-user-web-portal/`.

## Component states

- **OBSERVED** Buttons support primary, secondary, outline, ghost, and danger variants; small/medium/large sizes; disabled and loading props. Loading disables the control and shows a spinning icon. Source: `src/components/ui/Primitives.tsx`.
- **OBSERVED** Text, select, and textarea fields have hint and error states. Error text receives `role="alert"`; fields set `aria-invalid` and connect the visible message with `aria-describedby`. Source: `src/components/ui/Primitives.tsx`.
- **OBSERVED** Status badges and inline alerts provide ok, warning, danger, and neutral tones. Source: `src/components/ui/Primitives.tsx`.
- **OBSERVED** Page skeletons announce loading with `role="status"`; toast viewport uses `aria-live="polite"`; empty states have title, description, and optional action. Source: `src/components/ui/Primitives.tsx`.
- **OBSERVED** Modals have focus trapping, Escape close, labelled title, optional description, and an explicit close button. Source: `src/components/ui/Primitives.tsx` (`useDialogFocusTrap`, `Modal`).
- **UNKNOWN** A shared pressed/active style for every control; it is not uniform across the source.

## Keyboard and assistive technology

- **OBSERVED** Global `:focus-visible` style is a 2px outline with a 2px offset using a theme focus color. Source: `src/index.css`.
- **OBSERVED** Native buttons, inputs, selects, textareas, labels, `nav`, `main`, and `aside` landmarks are used in shared components/layouts. Source: `src/components/ui/Primitives.tsx`, `src/components/layout/AppLayouts.tsx`.
- **OBSERVED** Decorative status icons use `aria-hidden="true"`; icon-only actions use `aria-label`; form help and errors are connected to fields. Source: `src/components/ui/Primitives.tsx`.
- **DERIVED** Consumers should preserve the visible field label and supply an accessible name for icon-only controls; the source uses those patterns where needed.
- **UNKNOWN** A reported WCAG conformance level or complete screen-reader/browser test matrix. The attached brand document mentions an AA target, but that is not treated as evidence that this code has been audited.

## Behavior implemented by this package

The library mirrors the patterns above and exposes controlled callbacks/props. It does not supply validation rules, authentication, loading data, authorization, persistence, or toast state management. See [component examples](components.md).
