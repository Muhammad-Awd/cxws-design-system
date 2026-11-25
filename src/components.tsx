import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type FormHTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type SelectHTMLAttributes,
  type TableHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, ChevronDown, HelpCircle, LoaderCircle, MinusCircle, MoreHorizontal, X } from 'lucide-react'
import dipduxRed from './assets/dipdux-wordmark-red.png'
import dipduxWhite from './assets/dipdux-wordmark-white.png'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ControlSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ControlSize
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`cx-button cx-button--${variant} cx-button--${size}${fullWidth ? ' cx-button--full' : ''}${className ? ` ${className}` : ''}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <LoaderCircle className="cx-icon cx-spin" aria-hidden="true" />}
      {children}
    </button>
  )
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  children: ReactNode
  variant?: Extract<ButtonVariant, 'secondary' | 'outline' | 'ghost'>
}

export function IconButton({ label, variant = 'ghost', className = '', children, ...props }: IconButtonProps) {
  return (
    <button
      className={`cx-icon-button cx-button--${variant}${className ? ` ${className}` : ''}`}
      aria-label={label}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className = '', ...props }: InputProps) {
  return <input className={`cx-input${className ? ` ${className}` : ''}`} {...props} />
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea({ className = '', rows = 4, ...props }: TextareaProps) {
  return <textarea className={`cx-input cx-textarea${className ? ` ${className}` : ''}`} rows={rows} {...props} />
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ className = '', children, ...props }: SelectProps) {
  return (
    <span className="cx-select-wrap">
      <select className={`cx-input cx-select${className ? ` ${className}` : ''}`} {...props}>
        {children}
      </select>
      <ChevronDown className="cx-select-icon" aria-hidden="true" />
    </span>
  )
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode
  description?: ReactNode
}

export function Checkbox({ label, description, className = '', id, ...props }: CheckboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return (
    <label className={`cx-checkbox${className ? ` ${className}` : ''}`} htmlFor={inputId}>
      <input id={inputId} type="checkbox" className="cx-checkbox__input" {...props} />
      <span className="cx-checkbox__copy">
        <span className="cx-checkbox__label">{label}</span>
        {description && <span className="cx-checkbox__description">{description}</span>}
      </span>
    </label>
  )
}

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'type'> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: ReactNode
}

/** Compact controlled switch for a single on/off setting. */
export function Toggle({ checked, onCheckedChange, label, className = '', disabled, ...props }: ToggleProps) {
  return (
    <button type="button" role="switch" aria-checked={checked} disabled={disabled} className={`cx-toggle${checked ? ' is-checked' : ''}${className ? ` ${className}` : ''}`} onClick={() => onCheckedChange(!checked)} {...props}>
      <span className="cx-toggle__track" aria-hidden="true"><span className="cx-toggle__thumb" /></span>
      {label && <span className="cx-toggle__label">{label}</span>}
    </button>
  )
}

export interface FieldProps {
  id: string
  label: ReactNode
  hint?: ReactNode
  error?: ReactNode
  required?: boolean
  children: ReactNode
  className?: string
}

export function Field({ id, label, hint, error, required, children, className = '' }: FieldProps) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = error ? errorId : hint ? hintId : undefined
  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
      } as Record<string, unknown>)
    : children

  return (
    <div className={`cx-field${className ? ` ${className}` : ''}`}>
      <label className="cx-field__label" htmlFor={id}>
        {label}{required && <span className="cx-field__required" aria-hidden="true">*</span>}
      </label>
      {control}
      {hint && !error && <p className="cx-field__hint" id={hintId}>{hint}</p>}
      {error && (
        <p className="cx-field__error" id={errorId} role="alert">
          <AlertCircle className="cx-icon" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export function Form({ className = '', children, ...props }: FormProps) {
  return <form className={`cx-form${className ? ` ${className}` : ''}`} {...props}>{children}</form>
}

export type StatusTone = 'ok' | 'warn' | 'danger' | 'neutral'
export interface BadgeProps {
  tone?: StatusTone
  children: ReactNode
  icon?: ReactNode
  className?: string
}

export function Badge({ tone = 'neutral', children, icon, className = '' }: BadgeProps) {
  const toneIcon = tone === 'ok'
    ? <CheckCircle2 className="cx-icon" aria-hidden="true" />
    : tone === 'warn'
      ? <AlertTriangle className="cx-icon" aria-hidden="true" />
    : tone === 'danger'
      ? <AlertCircle className="cx-icon" aria-hidden="true" />
        : <MinusCircle className="cx-icon" aria-hidden="true" />

  return (
    <span className={`cx-badge cx-badge--${tone}${className ? ` ${className}` : ''}`}>
      {icon ?? toneIcon}
      <span>{children}</span>
    </span>
  )
}

export interface OverflowMenuItem {
  id: string
  label: string
  onSelect: () => void
  icon?: ReactNode
  tone?: 'neutral' | 'danger'
  disabled?: boolean
}

export function OverflowMenu({
  label,
  items,
}: {
  label: string
  items: OverflowMenuItem[]
}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.parentElement?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() => menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus())
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const onMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const enabled = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? [])
    if (!enabled.length) return
    const active = enabled.indexOf(document.activeElement as HTMLButtonElement)
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? enabled.length - 1
        : (active + (event.key === 'ArrowDown' ? 1 : -1) + enabled.length) % enabled.length
    enabled[next].focus()
  }

  return (
    <div className="cx-overflow-menu">
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="cx-icon-button cx-overflow-menu__trigger"
      >
        <MoreHorizontal size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false)
          }}
          className="cx-overflow-menu__items"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                setOpen(false)
                item.onSelect()
              }}
              className={`cx-overflow-menu__item${item.tone === 'danger' ? ' cx-overflow-menu__item--danger' : ''}`}
            >
              {item.icon && <span aria-hidden="true">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export interface CardProps {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export function Card({ children, padding = 'md', className = '' }: CardProps) {
  return <div className={`cx-card cx-card--${padding}${className ? ` ${className}` : ''}`}>{children}</div>
}

export interface MetricCardProps {
  label: ReactNode
  value: ReactNode
  detail?: ReactNode
  icon?: ReactNode
  tone?: 'ok' | 'warn' | 'danger' | 'neutral'
  status?: ReactNode
  className?: string
}

/** Compact summary card for a single metric and its optional status. */
export function MetricCard({ label, value, detail, icon, tone = 'neutral', status, className = '' }: MetricCardProps) {
  return (
    <Card className={`cx-metric-card${className ? ` ${className}` : ''}`}>
      <div className="cx-metric-card__top">
        {icon && <span className="cx-metric-card__icon" aria-hidden="true">{icon}</span>}
        {status && <Badge tone={tone}>{status}</Badge>}
      </div>
      <p className="cx-metric-card__label">{label}</p>
      <p className="cx-metric-card__value">{value}</p>
      {detail && <p className="cx-metric-card__detail">{detail}</p>}
    </Card>
  )
}

export interface AlertProps {
  tone?: StatusTone
  title?: ReactNode
  children: ReactNode
  onDismiss?: () => void
  dismissLabel?: string
  className?: string
}

export function Alert({ tone = 'neutral', title, children, onDismiss, dismissLabel = 'Dismiss message', className = '' }: AlertProps) {
  const Icon = tone === 'ok' ? CheckCircle2 : tone === 'warn' ? AlertTriangle : tone === 'danger' ? AlertCircle : HelpCircle
  return (
    <div className={`cx-alert cx-alert--${tone}${className ? ` ${className}` : ''}`} role={tone === 'danger' ? 'alert' : 'status'}>
      <Icon className="cx-icon cx-alert__icon" aria-hidden="true" />
      <div className="cx-alert__body">
        {title && <p className="cx-alert__title">{title}</p>}
        <div className="cx-alert__description">{children}</div>
      </div>
      {onDismiss && <IconButton label={dismissLabel} onClick={onDismiss}><X className="cx-icon" aria-hidden="true" /></IconButton>}
    </div>
  )
}

export interface SpinnerProps {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Spinner({ label = 'Loading', size = 'md', className = '' }: SpinnerProps) {
  return (
    <span className={`cx-spinner cx-spinner--${size}${className ? ` ${className}` : ''}`} role="status">
      <LoaderCircle className="cx-spin" aria-hidden="true" />
      <span className="cx-sr-only">{label}</span>
    </span>
  )
}

export interface SkeletonProps {
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  rounded?: boolean
  className?: string
}

export function Skeleton({ width = '100%', height = '1rem', rounded = false, className = '' }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={`cx-skeleton${rounded ? ' cx-skeleton--round' : ''}${className ? ` ${className}` : ''}`}
      style={{ width, height }}
    />
  )
}

export interface EmptyStateProps {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({ title, description, action, className = '' }: EmptyStateProps) {
  return (
    <Card padding="md" className={`cx-empty-state${className ? ` ${className}` : ''}`}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div className="cx-empty-state__action">{action}</div>}
    </Card>
  )
}

export interface TabItem {
  id: string
  label: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  value: string
  onChange: (value: string) => void
  ariaLabel: string
  className?: string
}

export function Tabs({ items, value, onChange, ariaLabel, className = '' }: TabsProps) {
  function handleKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    const enabled = items.filter((item) => !item.disabled)
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const current = enabled.findIndex((item) => item.id === value)
    const next = event.key === 'Home'
      ? enabled[0]
      : event.key === 'End'
        ? enabled[enabled.length - 1]
        : enabled[(current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length]
    if (next) {
      onChange(next.id)
      document.getElementById(`cx-tab-${next.id}`)?.focus()
    }
  }

  return (
    <div className={`cx-tabs${className ? ` ${className}` : ''}`} role="tablist" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item.id}
          id={`cx-tab-${item.id}`}
          className="cx-tab"
          type="button"
          role="tab"
          aria-selected={value === item.id}
          aria-controls={`cx-panel-${item.id}`}
          tabIndex={value === item.id ? 0 : -1}
          disabled={item.disabled}
          onClick={() => onChange(item.id)}
          onKeyDown={handleKeyDown}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export interface TabPanelProps {
  id: string
  labelledBy: string
  active: boolean
  children: ReactNode
  className?: string
}

export function TabPanel({ id, labelledBy, active, children, className = '' }: TabPanelProps) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy} hidden={!active} tabIndex={0} className={className}>
      {children}
    </div>
  )
}

export interface TableColumn<Row> {
  id: string
  header: ReactNode
  cell: (row: Row) => ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
}

export interface DataTableProps<Row> extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: TableColumn<Row>[]
  rows: Row[]
  getRowId: (row: Row) => string | number
  emptyTitle: ReactNode
  emptyDescription?: ReactNode
}

export function DataTable<Row>({
  columns,
  rows,
  getRowId,
  emptyTitle,
  emptyDescription,
  className = '',
  ...props
}: DataTableProps<Row>) {
  return (
    <div className="cx-table-wrap">
      <table className={`cx-table${className ? ` ${className}` : ''}`} {...props}>
        <thead><tr>{columns.map((column) => (
          <th key={column.id} scope="col" className={`cx-table__cell cx-table__head cx-table__align--${column.align ?? 'start'} ${column.className ?? ''}`}>
            {column.header}
          </th>
        ))}</tr></thead>
        <tbody>
          {rows.length > 0 ? rows.map((row) => (
            <tr key={getRowId(row)}>{columns.map((column) => (
              <td key={column.id} className={`cx-table__cell cx-table__align--${column.align ?? 'start'} ${column.className ?? ''}`}>
                {column.cell(row)}
              </td>
            ))}</tr>
          )) : (
            <tr><td className="cx-table__empty" colSpan={columns.length}>
              <EmptyState title={emptyTitle} description={emptyDescription} />
            </td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export interface ModalProps {
  open: boolean
  title: ReactNode
  description?: ReactNode
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  closeLabel?: string
}

export function Modal({ open, title, description, onClose, children, footer, closeLabel = 'Close dialog' }: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialogRef.current?.focus()
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      ))
      if (focusable.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
      } else if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault()
        focusable.at(-1)?.focus()
      } else if (!event.shiftKey && document.activeElement === focusable.at(-1)) {
        event.preventDefault()
        focusable[0]?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="cx-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div
        ref={dialogRef}
        className="cx-modal cx-motion-sheet cx-float-shadow"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
      >
        <header className="cx-modal__header">
          <div><h2 id={titleId}>{title}</h2>{description && <p id={descriptionId}>{description}</p>}</div>
          <IconButton label={closeLabel} onClick={onClose}><X className="cx-icon" aria-hidden="true" /></IconButton>
        </header>
        <div className="cx-modal__body">{children}</div>
        {footer && <footer className="cx-modal__footer">{footer}</footer>}
      </div>
    </div>
  )
}

export interface NavItem {
  id: string
  label: ReactNode
  href: string
  icon?: ReactNode
  active?: boolean
  disabled?: boolean
}

export interface NavbarProps {
  brand: ReactNode
  center?: ReactNode
  actions?: ReactNode
  className?: string
}

export function Navbar({ brand, center, actions, className = '' }: NavbarProps) {
  return (
    <header className={`cx-navbar${className ? ` ${className}` : ''}`}>
      <div className="cx-navbar__brand">{brand}</div>
      {center && <div className="cx-navbar__center">{center}</div>}
      {actions && <div className="cx-navbar__actions">{actions}</div>}
    </header>
  )
}

export interface SidebarProps {
  items: NavItem[]
  label?: string
  onNavigate?: (item: NavItem) => void
  className?: string
}

function NavigationLinks({ items, onNavigate, compact = false }: { items: NavItem[]; onNavigate?: (item: NavItem) => void; compact?: boolean }) {
  return <ul className={compact ? 'cx-nav-list cx-nav-list--compact' : 'cx-nav-list'}>
    {items.map((item) => (
      <li key={item.id}>
        <a
          className={`cx-nav-link${item.active ? ' is-active' : ''}${item.disabled ? ' is-disabled' : ''}`}
          href={item.disabled ? undefined : item.href}
          aria-current={item.active ? 'page' : undefined}
          aria-disabled={item.disabled || undefined}
          tabIndex={item.disabled ? -1 : undefined}
          onClick={(event) => { if (item.disabled) event.preventDefault(); else onNavigate?.(item) }}
        >
          {item.icon && <span className="cx-nav-link__icon" aria-hidden="true">{item.icon}</span>}
          <span>{item.label}</span>
        </a>
      </li>
    ))}
  </ul>
}

export function Sidebar({ items, label = 'Primary navigation', onNavigate, className = '' }: SidebarProps) {
  return <aside className={`cx-sidebar${className ? ` ${className}` : ''}`}><nav aria-label={label}><NavigationLinks items={items} onNavigate={onNavigate} /></nav></aside>
}

export interface NavGroup {
  label: ReactNode
  items: Array<NavItem & { count?: ReactNode }>
}

export interface GroupedSidebarProps {
  groups: NavGroup[]
  label?: string
  onNavigate?: (item: NavItem) => void
  className?: string
}

/** Sidebar for apps whose navigation is organized into named sections. */
export function GroupedSidebar({ groups, label = 'Primary navigation', onNavigate, className = '' }: GroupedSidebarProps) {
  return (
    <aside className={`cx-sidebar cx-grouped-sidebar${className ? ` ${className}` : ''}`}>
      <nav aria-label={label}>
        {groups.map((group) => (
          <section className="cx-nav-group" key={String(group.label)}>
            <h2 className="cx-nav-group__label">{group.label}</h2>
            <ul className="cx-nav-list">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button type="button" className={`cx-nav-link cx-nav-link--button${item.active ? ' is-active' : ''}`} aria-current={item.active ? 'page' : undefined} disabled={item.disabled} onClick={() => onNavigate?.(item)}>
                    {item.icon && <span className="cx-nav-link__icon" aria-hidden="true">{item.icon}</span>}
                    <span>{item.label}</span>
                    {item.count != null && <span className="cx-nav-group__count">{item.count}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  )
}

export interface BottomNavigationProps extends SidebarProps {
  maxItems?: number
}

export function BottomNavigation({ items, label = 'Primary navigation', onNavigate, maxItems = 5, className = '' }: BottomNavigationProps) {
  return (
    <nav className={`cx-bottom-nav${className ? ` ${className}` : ''}`} aria-label={label}>
      <NavigationLinks items={items.slice(0, maxItems)} onNavigate={onNavigate} compact />
    </nav>
  )
}

export interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  eyebrow?: ReactNode
  className?: string
}

export function PageHeader({ title, description, actions, eyebrow, className = '' }: PageHeaderProps) {
  return (
    <div className={`cx-page-header${className ? ` ${className}` : ''}`}>
      <div className="cx-page-header__copy">
        {eyebrow && <p className="cx-page-header__eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="cx-page-header__description">{description}</p>}
      </div>
      {actions && <div className="cx-page-header__actions">{actions}</div>}
    </div>
  )
}

export interface AppShellProps {
  brand: ReactNode
  items: NavItem[]
  actions?: ReactNode
  children: ReactNode
  sidebarLabel?: string
  onNavigate?: (item: NavItem) => void
}

export function AppShell({ brand, items, actions, children, sidebarLabel, onNavigate }: AppShellProps) {
  return (
    <div className="cx-app-shell">
      <Navbar brand={brand} actions={actions} />
      <div className="cx-app-shell__row">
        <Sidebar items={items} label={sidebarLabel} onNavigate={onNavigate} />
        <main className="cx-app-shell__main">{children}</main>
      </div>
      <BottomNavigation items={items} label={sidebarLabel} onNavigate={onNavigate} />
    </div>
  )
}

export interface CloudXLogoProps {
  size?: 'sm' | 'md' | 'compactText'
  className?: string
  showWorkspaceLabel?: boolean
  workspaceLabel?: ReactNode
  surface?: 'auto' | 'light'
}

export function CloudXLogo({
  size = 'sm',
  className = '',
  showWorkspaceLabel = false,
  workspaceLabel = 'Customer Portal',
  surface = 'auto',
}: CloudXLogoProps) {
  if (size === 'compactText') {
    return <span className={`cx-logo cx-logo--compact${className ? ` ${className}` : ''}`}>CloudX</span>
  }

  return (
    <span dir="ltr" className={`cx-logo${className ? ` ${className}` : ''}`}>
      <svg
        viewBox="0 0 65 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="CloudX"
        className={`cx-logo__mark cx-logo__mark--${size}${surface === 'light' ? ' cx-logo__mark--light' : ''}`}
      >
        <path d="M6.61206 20.2139C9.57056 20.2139 11.5845 18.6544 12.0746 15.9989H10.0874C9.6864 17.5494 8.41211 18.4673 6.62097 18.4673C4.25952 18.4673 2.76245 16.5692 2.76245 13.5662C2.76245 10.5898 4.27734 8.67395 6.61206 8.67395C8.35864 8.67395 9.73096 9.7522 10.0874 11.4008H12.0657C11.7271 8.7185 9.526 6.92737 6.61206 6.92737C3.02087 6.92737 0.721802 9.49377 0.721802 13.5662C0.721802 17.6653 3.00305 20.2139 6.61206 20.2139ZM13.7544 20H15.6792V7.14123H13.7544V20ZM21.7254 20.1782C24.4077 20.1782 26.1721 18.3336 26.1721 15.3127C26.1721 12.3008 24.3988 10.4562 21.7254 10.4562C19.0521 10.4562 17.2788 12.3008 17.2788 15.3127C17.2788 18.3336 19.0432 20.1782 21.7254 20.1782ZM21.7254 18.592C20.2195 18.592 19.2392 17.3979 19.2392 15.3127C19.2392 13.2364 20.2195 12.0424 21.7254 12.0424C23.2314 12.0424 24.2116 13.2364 24.2116 15.3127C24.2116 17.3979 23.2403 18.592 21.7254 18.592ZM35.7383 10.6255H33.8134V16.088C33.8134 17.5494 32.9758 18.5118 31.5857 18.5118C30.2579 18.5118 29.5807 17.7455 29.5807 16.3197V10.6255H27.6559V16.694C27.6559 18.8416 28.9034 20.1693 30.9441 20.1693C32.3788 20.1693 33.3322 19.5366 33.8491 18.4138H33.8936V20H35.7383V10.6255ZM41.2053 20.1604C42.5687 20.1604 43.638 19.4742 44.1905 18.4049H44.2262V20H46.0975V7.14123H44.1638V12.1849H44.1281C43.6024 11.1512 42.533 10.474 41.1875 10.474C38.8349 10.474 37.2666 12.3542 37.2666 15.3127C37.2666 18.2712 38.8349 20.1604 41.2053 20.1604ZM41.7132 12.0958C43.1925 12.0958 44.1816 13.3701 44.1816 15.3127C44.1816 17.2732 43.1925 18.5297 41.7132 18.5297C40.1894 18.5297 39.2359 17.291 39.2359 15.3127C39.2359 13.3434 40.1894 12.0958 41.7132 12.0958Z" fill="currentColor" />
        <path d="M52.9375 17.7933C49.8408 20.0043 46.167 21.287 42.3613 21.462L49.4142 14.2234L49.6454 13.986L49.4142 13.7487L42.3879 6.53741C46.1792 6.70007 49.8407 7.98155 52.9384 10.1794L53.1757 10.3477L53.3787 10.1393L56.6886 6.74233L60.4133 10.5651L57.3113 13.7487L57.0801 13.986L57.3113 14.2234L64.1933 21.2866H56.7439L53.3787 17.8328L53.1751 17.6237L52.9375 17.7933Z" fill="currentColor" stroke={surface === 'light' ? 'var(--doc-bg)' : 'var(--cx-surface)'} strokeWidth="0.680124" />
      </svg>
      {showWorkspaceLabel && <><span className="cx-logo__divider" aria-hidden="true" /><span className="cx-logo__workspace">{workspaceLabel}</span></>}
    </span>
  )
}

export interface CoBrandLockupProps {
  surface?: 'auto' | 'light'
  className?: string
}

export function DipduxCoBrandLockup({ surface = 'auto', className = '' }: CoBrandLockupProps) {
  return (
    <div dir="ltr" className={`cx-cobrand${className ? ` ${className}` : ''}`} aria-label="Dipdux and CloudX">
      <img src={dipduxRed} alt="Dipdux" className="cx-cobrand__dipdux" />
      <span className={`cx-cobrand__divider${surface === 'light' ? ' cx-cobrand__divider--light' : ''}`} aria-hidden="true" />
      <CloudXLogo size="sm" surface={surface} />
    </div>
  )
}

export interface DipduxOfficialMarkProps {
  variant?: 'red' | 'white'
  className?: string
}

export function DipduxOfficialMark({ variant = 'red', className = '' }: DipduxOfficialMarkProps) {
  return <img src={variant === 'red' ? dipduxRed : dipduxWhite} alt="Dipdux" className={`cx-dipdux-mark${className ? ` ${className}` : ''}`} />
}
