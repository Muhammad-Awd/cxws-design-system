# Component examples

The examples use `@muhammad-awd/cxws-design-system`, the package name chosen for this initially empty repository. Rename it in the imports if your publishing scope changes. Components are grouped by Atomic Design level. This document is the component reference/story page; every exported component below has an example.

```tsx
import {
  Alert, AppShell, Badge, BottomNavigation, Button, Card, Checkbox, DataTable,
  EmptyState, Field, Form, IconButton, Input, Modal, Navbar, OverflowMenu, PageHeader, Select,
  Sidebar, Skeleton, Spinner, TabPanel, Tabs, Textarea, CloudXLogo,
} from '@muhammad-awd/cxws-design-system'
import '@muhammad-awd/cxws-design-system/styles.css'
```

## Atoms

### `Button`

```tsx
<Button variant="primary" size="md" onClick={onContinue}>Continue</Button>
<Button variant="secondary" loading>Saving</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`; sizes: `sm`, `md`, `lg`. Loading disables the button and announces busy state. The caller owns the action.

### `IconButton`

```tsx
<IconButton label="Close panel" onClick={onClose}><X /></IconButton>
```

An accessible name is required through `label`.

### `OverflowMenu`

```tsx
<OverflowMenu
  label="More mailbox actions"
  items={[
    { id: 'edit', label: 'Edit mailbox', onSelect: onEdit },
    { id: 'cancel', label: 'Cancel mailbox', tone: 'danger', onSelect: onCancel },
  ]}
/>
```

Use for secondary or occasional actions when keeping the screen focused. Keep the most important action visible; the menu is not a substitute for a clear primary action. Menus support keyboard navigation and return focus when dismissed with Escape.

### `Input`

```tsx
<Input type="email" name="email" autoComplete="email" placeholder="name@example.com" />
```

Use with `Field` to supply a visible associated label and hint/error text.

### `Textarea`

```tsx
<Field id="message" label="Message"><Textarea id="message" maxLength={500} /></Field>
```

### `Select`

```tsx
<Field id="region" label="Region">
  <Select id="region" defaultValue=""><option value="">Choose a region</option><option>Egypt</option></Select>
</Field>
```

### `Checkbox`

```tsx
<Checkbox name="updates" label="Product updates" description="Occasional service notices." />
```

### `Toggle`

Use a controlled switch for a single binary setting. The application owns the current value.

```tsx
<Toggle checked={enabled} onCheckedChange={setEnabled} aria-label="Enable notifications" />
```

### `Badge`

```tsx
<Badge tone="ok">Operational</Badge>
<Badge tone="warn" icon={<AlertTriangle aria-hidden="true" />}>Scheduled</Badge>
```

Tones: `ok`, `warn`, `danger`, `neutral`. Supply a label in text; the default tone icons are decorative.

### `Spinner`

```tsx
<Spinner label="Loading invoices" size="md" />
```

### `Skeleton`

```tsx
<Skeleton width="12rem" height="1.5rem" />
<Skeleton width="2.5rem" height="2.5rem" rounded />
```

## Molecules

### `MetricCard`

Use `MetricCard` to present one named value with optional supporting detail, icon, and status. Keep its data meaning in caller props.

```tsx
<MetricCard label="Active workspaces" value="24" detail="77% of all workspaces" icon={<Globe />} />
```

### `Field`

```tsx
<Field id="email" label="Email" required hint="Use your work email." error={error}>
  <Input type="email" />
</Field>
```

`Field` supplies the input `id`, `aria-invalid`, and `aria-describedby` to a single valid React child. Pass the matching `id` for hand-authored markup only when not using a component child.

### `Form`

```tsx
<Form onSubmit={handleSubmit}><Field id="name" label="Name"><Input /></Field><Button type="submit">Save</Button></Form>
```

`Form` forwards native form attributes and callbacks; validation and submission remain with the application.

### `Card`

```tsx
<Card padding="md"><h2>Workspace</h2><p>Details go here.</p></Card>
```

### `Alert`

```tsx
<Alert tone="danger" title="Unable to save">Your changes are still available.</Alert>
```

Use `onDismiss` to render a close control and `dismissLabel` to localize it; the callback does not manage alert state.

### `EmptyState`

```tsx
<EmptyState title="No reports yet" description="Reports will appear here when available." action={<Button>Create report</Button>} />
```

### `Tabs` and `TabPanel`

```tsx
<Tabs ariaLabel="Workspace details" items={items} value={activeTab} onChange={setActiveTab} />
<TabPanel id="cx-panel-profile" labelledBy="cx-tab-profile" active={activeTab === 'profile'}>
  <ProfilePanel />
</TabPanel>
```

`Tabs` is controlled; the parent decides which panels are rendered. Arrow keys, Home, and End move selection and focus.

## Organisms

### `GroupedSidebar`

Use it when the application groups destinations under section headings. Navigation state and transitions stay with the caller.
Items use real `href` links. An ordinary click calls `onNavigate` without reloading; modified clicks keep the browser's native link behavior.

```tsx
<GroupedSidebar groups={[{ label: 'Workspace', items: [{ id: 'overview', label: 'Overview', href: '#overview', active: true }] }]} onNavigate={(item) => navigate(item.id)} />
```

### `DataTable<Row>`

```tsx
<DataTable
  aria-label="Invoices"
  columns={[{ id: 'number', header: 'Invoice', cell: (row) => row.number }]}
  rows={invoices}
  getRowId={(row) => row.id}
  emptyTitle="No invoices yet"
  emptyDescription="Issued invoices will appear here."
/>
```

Supply a stable row ID, accessible table name/caption, columns, rows, and explicit empty-state copy. Cell rendering is delegated through a callback.

### `Modal`

```tsx
<Modal open={open} title="Discard changes?" onClose={onClose} footer={<Button onClick={onConfirm}>Discard</Button>}>
  <p>Your unsaved changes will be lost.</p>
</Modal>
```

Escape, backdrop click, and the close icon call `onClose`. The caller owns open state and any action.

### `Navbar`

```tsx
<Navbar brand={<CloudXLogo />} actions={<Button variant="ghost">Help</Button>} />
```

### `Sidebar`

```tsx
<Sidebar label="Workspace navigation" items={navItems} onNavigate={onNavigate} />
```

Each `NavItem` contains `id`, `label`, `href`, and optional icon/active/disabled values.

### `BottomNavigation`

```tsx
<BottomNavigation label="Workspace navigation" items={navItems} maxItems={5} />
```

It displays up to five items; the layout switches visibility through CSS at the `lg` breakpoint.

### `PageHeader`

```tsx
<PageHeader title="Reports" description="Review recent activity." eyebrow="Workspace" actions={<Button>Export</Button>} />
```

### `CloudXLogo`

```tsx
<CloudXLogo size="sm" showWorkspaceLabel workspaceLabel="Customer Experience" />
```

The SVG paths, display sizes, text variant, and optional workspace label are copied from `src/components/brand/CloudXLogo.tsx` in the portal.

### `AppShell`

```tsx
<AppShell brand={<CloudXLogo />} items={navItems} actions={<Button variant="ghost">Account</Button>}>
  <PageHeader title="Overview" />
  <Card>Workspace content</Card>
</AppShell>
```

`AppShell` composes `Navbar`, `Sidebar`, and `BottomNavigation`; it does not determine routes, permissions, or account state.

## Overlays, meters and file input (0.7.0)

- **`Drawer`** is a side panel on wide screens and a bottom sheet on phones. Use it for quick views that keep the user on the page. It traps focus, closes on Escape and restores focus. Props: `open`, `title`, `subtitle`, `onClose`, `footer`, `closeLabel`.
- **`DetailRow`** is one label and value pair. Put several inside `DetailList` (a `<dl>`).
- **`ProgressBar`** shows usage and turns amber at `warnAt` (default 90) and red when over. Give it a `label` so it has an accessible name.
- **`Dropzone`** is a click-or-drop file target. It checks type (`accept`) and size (`maxBytes`, default 5 MB) and reports a plain-language reason through `onReject`.
- **`Pagination`** shows page buttons with previous and next. The current page uses the accent.
- **`Modal`** takes `size`: `sm`, `md` (default), `lg` or `xl`.

The accent (`--cx-accent`, `--cx-accent-hover`, `--cx-accent-fg`, `--cx-accent-text`) is used by primary buttons, the selected tab underline, the current page and the focus ring. Selected filters and chips keep the neutral `--cx-primary-*` tokens so red does not spread.

## Live status marks

### `PulseDot` and `Heartbeat`

```tsx
<PulseDot tone="ok" live label="Working now" />
<Heartbeat tone="ok" live label="Checking every 5 minutes" />
```

Use them for something that is running right now: a tester at work, an uptime check, a backup in progress. `tone` is one of the four status tones (`ok`, `warn`, `danger`, `neutral`). They use only status tokens, so they follow the light and dark themes. Motion happens only while `live`, and stops for people who ask for reduced motion.

Do not use them as decoration. Do not add glows, gradients, dark panels that ignore the theme, or a fifth colour around them. Build the surface they sit on from `Card`, `--cx-surface` and `--cx-border`.

### Motion utilities

```tsx
<span className="cx-motion--ok relative block h-11 w-11 rounded-full"><span className="cx-motion-sweep" /></span>
<p className="cx-motion-reveal">New log line</p>
<p className="cx-motion-caret">Searching for products</p>
<div className="relative h-px bg-[var(--cx-border-strong)]"><span className="cx-motion-travel cx-motion--ok" /></div>
```

`cx-motion-sweep` (a slow tinted sweep for a live status circle), `cx-motion-scan` (a thin line passing over a preview), `cx-motion-shimmer` (the part that is running now), `cx-motion-reveal` (a new line fades up), `cx-motion-caret` (a blinking caret on the newest line) and `cx-motion-travel` (a dot moving along a line). Set the colour with `cx-motion--ok`, `--warn`, `--danger` or `--neutral`. They stop for people who ask for reduced motion.

Use them only while something is happening now, and not more than a few on one screen.

### Hero visuals: `GhostCursor`, `ClickRipple`, `AnnotationPin`

```tsx
<div className="relative">
  <ExampleScreen />
  <GhostCursor x={62} y={40} />
  <ClickRipple key={clicks} x={62} y={40} />
  <AnnotationPin n={1} tone="danger" x={70} y={46}>Checkout does nothing in Arabic</AnnotationPin>
</div>
```

For one flagship screen that needs to show what a feature does, such as a tester walking through a sample shop. Build the example screen from real surfaces (`--cx-surface`, `--cx-border`), not an illustration. The cursor glides, a ripple marks a click, and a pin names a problem in a status tone. Label the example as an example when the data is not the customer's own, give reduced-motion users the finished state, and keep it to one per screen.

## Choices, steps and headings

```tsx
<ChipGroup label="Filter by group">
  <Chip selected={group === 'all'} count={29} onClick={() => setGroup('all')}>All</Chip>
</ChipGroup>
<Stepper steps={['What you need', 'What it is about', 'Describe it']} current={2} onSelect={setStep} />
<SegmentedControl label="Billing term" value={term} onChange={setTerm} options={[{ value: 'monthly', label: 'Monthly' }, { value: 'annual', label: 'Yearly' }]} />
<SectionTitle count={5}>Business email</SectionTitle>
<CardTitle>Needs you</CardTitle>
<TextButton onClick={edit}>Edit</TextButton>
<Card tone="raised">A panel inside a card</Card>
```

`Radio` is one option of an exclusive choice, built like `Checkbox`. `Chip` filters or picks. `Stepper` shows numbered steps and lets people go back. `SegmentedControl` switches between a few exclusive options. `SectionTitle` is the one heading style for page sections (h2) and `CardTitle` for card titles (h3). `TextButton` is a small underlined action inside running text. Use `Card tone="raised"` for a panel inside a card instead of a custom background.

Body text never goes below 12 px (0.75rem).
