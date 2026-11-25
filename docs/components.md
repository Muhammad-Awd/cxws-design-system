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
