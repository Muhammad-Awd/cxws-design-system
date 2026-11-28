import {
  cloneElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type SelectHTMLAttributes,
  type TableHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, HelpCircle, ImagePlus, LoaderCircle, MinusCircle, MoreHorizontal, Search, X } from 'lucide-react'

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

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Fixed text shown after the value, such as a domain. Rendered left-to-right inside the field. */
  suffix?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className = '', suffix, ...props }, ref) {
  if (suffix === undefined || suffix === null) {
    return <input ref={ref} className={`cx-input${className ? ` ${className}` : ''}`} {...props} />
  }
  return (
    <span className="cx-input-group">
      <input ref={ref} className={`cx-input cx-input--grouped${className ? ` ${className}` : ''}`} {...props} />
      <span className="cx-input-group__suffix"><bdi dir="ltr">{suffix}</bdi></span>
    </span>
  )
})

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

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Accessible name. Shown to assistive technology only. */
  label: string
}

/** Search box with a leading icon. */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField({ label, className = '', id, ...props }, ref) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return (
    <div className={`cx-search${className ? ` ${className}` : ''}`}>
      <label className="cx-sr-only" htmlFor={inputId}>{label}</label>
      <Search className="cx-search__icon" aria-hidden="true" />
      <input ref={ref} id={inputId} type="search" className="cx-input cx-search__input" {...props} />
    </div>
  )
})

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

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
  description?: ReactNode
}

/** One option of a choice. Give every option in a group the same `name`. */
export function Radio({ label, description, className = '', id, ...props }: RadioProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return (
    <label className={`cx-checkbox cx-radio${className ? ` ${className}` : ''}`} htmlFor={inputId}>
      <input id={inputId} type="radio" className="cx-checkbox__input" {...props} />
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

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** `raised` sits one level above a card, for panels inside a card. */
  tone?: 'default' | 'raised'
  className?: string
}

export function Card({ children, padding = 'md', tone = 'default', className = '', ...rest }: CardProps) {
  return <div className={`cx-card cx-card--${padding}${tone === 'raised' ? ' cx-card--raised' : ''}${className ? ` ${className}` : ''}`} {...rest}>{children}</div>
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
  children?: ReactNode
  /** Optional call to action shown after the message. */
  action?: ReactNode
  onDismiss?: () => void
  dismissLabel?: string
  className?: string
}

export function Alert({ tone = 'neutral', title, children, action, onDismiss, dismissLabel = 'Dismiss message', className = '' }: AlertProps) {
  const Icon = tone === 'ok' ? CheckCircle2 : tone === 'warn' ? AlertTriangle : tone === 'danger' ? AlertCircle : HelpCircle
  return (
    <div className={`cx-alert cx-alert--${tone}${className ? ` ${className}` : ''}`} role={tone === 'danger' ? 'alert' : 'status'}>
      <Icon className="cx-icon cx-alert__icon" aria-hidden="true" />
      <div className="cx-alert__body">
        {title && <p className="cx-alert__title">{title}</p>}
        {children && <div className="cx-alert__description">{children}</div>}
      </div>
      {action && <div className="cx-alert__action">{action}</div>}
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
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({ open, title, description, onClose, children, footer, closeLabel = 'Close dialog', size = 'md' }: ModalProps) {
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
        className={`cx-modal${size === 'md' ? '' : ` cx-modal--${size}`} cx-motion-sheet cx-float-shadow`}
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
          onClick={(event) => {
            if (item.disabled) { event.preventDefault(); return }
            if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
              event.preventDefault()
              onNavigate(item)
            }
          }}
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
                  <a
                    className={`cx-nav-link${item.active ? ' is-active' : ''}${item.disabled ? ' is-disabled' : ''}`}
                    href={item.disabled ? undefined : item.href}
                    aria-current={item.active ? 'page' : undefined}
                    aria-disabled={item.disabled || undefined}
                    tabIndex={item.disabled ? -1 : undefined}
                    onClick={(event) => {
                      if (item.disabled) { event.preventDefault(); return }
                      if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                        event.preventDefault()
                        onNavigate(item)
                      }
                    }}
                  >
                    {item.icon && <span className="cx-nav-link__icon" aria-hidden="true">{item.icon}</span>}
                    <span>{item.label}</span>
                    {item.count != null && <span className="cx-nav-group__count">{item.count}</span>}
                  </a>
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


/** Shared focus handling for overlays: moves focus in, traps Tab, closes on Escape, restores focus. */
function useOverlayFocus(open: boolean, onClose: () => void, ref: { current: HTMLElement | null }) {
  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    ref.current?.focus()
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !ref.current) return
      const focusable = Array.from(ref.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      ))
      if (focusable.length === 0) {
        event.preventDefault()
        ref.current.focus()
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
  }, [open, onClose, ref])
}

export interface DrawerProps {
  open: boolean
  title: ReactNode
  subtitle?: ReactNode
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  closeLabel?: string
}

/** Side panel on wide screens and a bottom sheet on phones. Use for quick views that keep the user in context. */
export function Drawer({ open, title, subtitle, onClose, children, footer, closeLabel = 'Close' }: DrawerProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  useOverlayFocus(open, onClose, panelRef)
  if (!open) return null
  return (
    <div className="cx-drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div ref={panelRef} className="cx-drawer cx-float-shadow" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <header className="cx-drawer__header">
          <div><h2 id={titleId}>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
          <IconButton label={closeLabel} onClick={onClose}><X className="cx-icon" aria-hidden="true" /></IconButton>
        </header>
        <div className="cx-drawer__body">{children}</div>
        {footer && <footer className="cx-drawer__footer">{footer}</footer>}
      </div>
    </div>
  )
}

export interface DetailRowProps {
  label: ReactNode
  children: ReactNode
  className?: string
}

/** One label/value pair. Wrap several in a <dl> (see DetailList) so assistive tech reads them as a list. */
export function DetailRow({ label, children, className = '' }: DetailRowProps) {
  return (
    <div className={`cx-detail-row${className ? ` ${className}` : ''}`}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export function DetailList({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <dl className={`cx-detail-list${className ? ` ${className}` : ''}`} style={{ display: 'grid', gap: '0.5rem', margin: 0 }}>{children}</dl>
}

export interface ProgressBarProps {
  /** Current amount. */
  value: number
  /** Amount that counts as full. */
  max: number
  label: string
  /** Percentage at which the bar turns amber. Default 90. */
  warnAt?: number
  className?: string
}

/** Usage meter: green normally, amber when nearly full, red when over. */
export function ProgressBar({ value, max, label, warnAt = 90, className = '' }: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  const tone = max > 0 && value > max ? ' cx-progress__bar--danger' : percent >= warnAt ? ' cx-progress__bar--warn' : ''
  return (
    <div className={`cx-progress${className ? ` ${className}` : ''}`} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={Math.min(value, max)}>
      <div className={`cx-progress__bar${tone}`} style={{ width: `${percent}%` }} />
    </div>
  )
}

export interface DropzoneProps {
  /** Called with the first accepted file. */
  onFile: (file: File) => void
  /** Called with a plain-language reason when a file is rejected. */
  onReject?: (reason: string) => void
  accept?: string[]
  maxBytes?: number
  title?: ReactNode
  hint?: ReactNode
  invalid?: boolean
  disabled?: boolean
  className?: string
}

/** Click-or-drop file target. Validates type and size before handing the file over. */
export function Dropzone({
  onFile,
  onReject,
  accept = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxBytes = 5 * 1024 * 1024,
  title,
  hint,
  invalid,
  disabled,
  className = '',
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function take(file: File | undefined) {
    if (!file) return
    if (!accept.includes(file.type)) { onReject?.(`That file type is not supported. Use ${accept.map((type) => type.split('/')[1].toUpperCase()).join(', ')}.`); return }
    if (file.size > maxBytes) { onReject?.(`That file is larger than ${Math.round(maxBytes / 1024 / 1024)} MB.`); return }
    onFile(file)
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept.join(',')}
        className="cx-visually-hidden"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => { take(event.target.files?.[0]); event.target.value = '' }}
      />
      <button
        type="button"
        disabled={disabled}
        className={`cx-dropzone${dragging ? ' is-dragging' : ''}${invalid ? ' is-invalid' : ''}${className ? ` ${className}` : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => { event.preventDefault(); setDragging(false); take(event.dataTransfer.files[0]) }}
      >
        <span className="cx-dropzone__icon" aria-hidden="true"><ImagePlus className="cx-icon" width={28} height={28} /></span>
        <span className="cx-dropzone__title">{title ?? <><strong>Click to upload</strong> or drag and drop</>}</span>
        {hint && <span className="cx-dropzone__hint">{hint}</span>}
      </button>
    </>
  )
}

export interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  previousLabel?: string
  nextLabel?: string
  ariaLabel?: string
}

export function Pagination({ page, pageCount, onPageChange, previousLabel = 'Previous page', nextLabel = 'Next page', ariaLabel = 'Pagination' }: PaginationProps) {
  const pages = Array.from({ length: Math.max(1, pageCount) }, (_, index) => index + 1)
  return (
    <nav className="cx-pagination" aria-label={ariaLabel}>
      <button type="button" className="cx-pagination__step" aria-label={previousLabel} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeft className="cx-icon cx-icon--directional" aria-hidden="true" />
      </button>
      {pages.map((n) => (
        <button key={n} type="button" className="cx-pagination__page" aria-current={n === page ? 'page' : undefined} onClick={() => onPageChange(n)}>{n}</button>
      ))}
      <button type="button" className="cx-pagination__step" aria-label={nextLabel} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
        <ChevronRight className="cx-icon cx-icon--directional" aria-hidden="true" />
      </button>
    </nav>
  )
}

export interface PulseDotProps {
  tone?: StatusTone
  /** Only a state that is happening right now may ping. Anything else stays still. */
  live?: boolean
  size?: 'sm' | 'md'
  /** Read out to assistive technology. Leave empty when the dot sits next to text that says the same thing. */
  label?: string
  className?: string
}

/** A small status dot, in a status tone. It pings only while `live`. Never use it as decoration. */
export function PulseDot({ tone = 'neutral', live = false, size = 'md', label, className = '' }: PulseDotProps) {
  return (
    <span
      className={`cx-pulse-dot cx-pulse-dot--${tone} cx-pulse-dot--${size}${live ? ' cx-pulse-dot--live' : ''}${className ? ` ${className}` : ''}`}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    />
  )
}

export interface HeartbeatProps {
  tone?: StatusTone
  /** The line draws itself in a loop while live, and is a flat line otherwise. */
  live?: boolean
  label?: string
  className?: string
}

/** A heartbeat line for something that runs all the time, such as an uptime check. */
export function Heartbeat({ tone = 'ok', live = true, label, className = '' }: HeartbeatProps) {
  const beat = (i: number) => `M${i * 120} 10 H${i * 120 + 30} L${i * 120 + 36} 3 L${i * 120 + 44} 17 L${i * 120 + 50} 10 H${i * 120 + 72} L${i * 120 + 78} 5 L${i * 120 + 84} 15 L${i * 120 + 88} 10 H${i * 120 + 120}`
  return (
    <svg
      viewBox="0 0 480 20"
      preserveAspectRatio="none"
      className={`cx-heartbeat cx-heartbeat--${tone}${live ? ' cx-heartbeat--live' : ''}${className ? ` ${className}` : ''}`}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <path d={live ? [0, 1, 2, 3].map(beat).join(' ') : 'M0 10 H480'} pathLength={480} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export interface GhostCursorProps {
  /** Position inside the frame, in percent. The cursor glides there. */
  x: number
  y: number
  visible?: boolean
  className?: string
}

/** A visitor's cursor for an example that shows how a tester behaves. Glides between positions; place it inside a `position: relative` frame. */
export function GhostCursor({ x, y, visible = true, className = '' }: GhostCursorProps) {
  return (
    <svg className={`cx-ghost-cursor${className ? ` ${className}` : ''}`} style={{ left: `${x}%`, top: `${y}%`, opacity: visible ? 1 : 0 }} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 2 L3 15 L6.5 11.5 L9 17 L11.2 16 L8.8 10.6 L13.5 10.6 Z" fill="var(--cx-text)" stroke="var(--cx-surface)" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

export interface ClickRippleProps {
  x: number
  y: number
}

/** A ring that expands once where the cursor clicked. Give it a new `key` for every click. */
export function ClickRipple({ x, y }: ClickRippleProps) {
  return <span className="cx-ghost-ripple" style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true" />
}

export interface AnnotationPinProps {
  /** Number shown on the pin. */
  n: number
  tone?: StatusTone
  /** The note next to the pin. */
  children: ReactNode
  x: number
  y: number
  /** Put the note on the left of the pin. */
  flip?: boolean
}

/** A numbered pin with a short note, placed on top of an example screen. */
export function AnnotationPin({ n, tone = 'danger', children, x, y, flip = false }: AnnotationPinProps) {
  return (
    <div className={`cx-pin cx-pin--${tone}${flip ? ' cx-pin--flip' : ''}`} style={{ left: `${x}%`, top: `${y}%` }}>
      <span className="cx-pin__dot" aria-hidden="true">{n}</span>
      <span className="cx-pin__note">{children}</span>
    </div>
  )
}

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  selected?: boolean
  /** A number shown after the label, such as how many items match. */
  count?: number
}

/** A filter or choice chip. Use inside a `ChipGroup`. */
export function Chip({ selected = false, count, className = '', children, ...props }: ChipProps) {
  return (
    <button type="button" aria-pressed={selected} className={`cx-chip${selected ? ' is-selected' : ''}${className ? ` ${className}` : ''}`} {...props}>
      {children}
      {count !== undefined && <span className="cx-chip__count">{count}</span>}
    </button>
  )
}

export interface ChipGroupProps {
  /** Accessible name for the group. */
  label: string
  children: ReactNode
  /** One scrolling row instead of wrapping. Use for long lists on phones. */
  scroll?: boolean
  className?: string
}

export function ChipGroup({ label, children, scroll = false, className = '' }: ChipGroupProps) {
  return <div role="group" aria-label={label} className={`cx-chip-group${scroll ? ' cx-chip-group--scroll' : ''}${className ? ` ${className}` : ''}`}>{children}</div>
}

export interface StepperProps {
  steps: string[]
  /** The current step, starting at 1. */
  current: number
  /** Called when a step before the current one is chosen. */
  onSelect?: (step: number) => void
  label?: string
  className?: string
}

/** Numbered steps. Earlier steps can be revisited, later ones cannot. */
export function Stepper({ steps, current, onSelect, label = 'Steps', className = '' }: StepperProps) {
  return (
    <ol className={`cx-stepper${className ? ` ${className}` : ''}`} aria-label={label}>
      {steps.map((name, i) => {
        const n = i + 1
        const reachable = n < current && !!onSelect
        return (
          <li key={name} aria-current={n === current ? 'step' : undefined}>
            <button type="button" disabled={!reachable} onClick={() => onSelect?.(n)} className={`cx-stepper__step${n === current ? ' is-current' : ''}${n < current ? ' is-done' : ''}`}>
              <span className="cx-stepper__number">{n}</span>
              {name}
            </button>
          </li>
        )
      })}
    </ol>
  )
}

export interface SegmentedOption<T extends string> {
  value: T
  label: ReactNode
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  label: string
  className?: string
}

/** A small switch between a few exclusive views or terms. */
export function SegmentedControl<T extends string>({ options, value, onChange, label, className = '' }: SegmentedControlProps<T>) {
  return (
    <div role="group" aria-label={label} className={`cx-segmented${className ? ` ${className}` : ''}`}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={value === o.value} className={`cx-segmented__option${value === o.value ? ' is-selected' : ''}`} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  )
}

export interface TextButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  tone?: 'default' | 'danger'
}

/** A button that reads as an underlined link, for small secondary actions inside text. */
export function TextButton({ tone = 'default', className = '', ...props }: TextButtonProps) {
  return <button type="button" className={`cx-text-button${tone === 'danger' ? ' cx-text-button--danger' : ''}${className ? ` ${className}` : ''}`} {...props} />
}

export interface SectionTitleProps {
  children: ReactNode
  /** The heading level in the page outline. Section titles are h2 by default. */
  as?: 'h2' | 'h3'
  /** A quiet count after the title. */
  count?: number
  id?: string
  className?: string
}

/** The one heading style for a section on a page. */
export function SectionTitle({ children, as: Tag = 'h2', count, id, className = '' }: SectionTitleProps) {
  return <Tag id={id} className={`cx-section-title${className ? ` ${className}` : ''}`}>{children}{count !== undefined && <span className="cx-section-title__count">{count}</span>}</Tag>
}

/** The heading style for the title of a card or panel. */
export function CardTitle({ children, as: Tag = 'h3', id, className = '' }: Omit<SectionTitleProps, 'count'>) {
  return <Tag id={id} className={`cx-card-title${className ? ` ${className}` : ''}`}>{children}</Tag>
}

/* Ledger: rows divided by hairlines instead of cards, a timeline spine for things that happen in order, and large figures. */

export interface LedgerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  children: ReactNode
  className?: string
}

/** A stack of full-width rows separated by hairlines. Use it where a grid of cards would repeat itself. */
export function Ledger({ children, className = '', ...rest }: LedgerProps) {
  return <div className={`cx-ledger${className ? ` ${className}` : ''}`} {...rest}>{children}</div>
}

export interface LedgerRowProps {
  /** The short name of the row, in the narrow column. */
  label: ReactNode
  children: ReactNode
  /** Something to the right, such as an action. */
  aside?: ReactNode
  className?: string
}

export function LedgerRow({ label, children, aside, className = '' }: LedgerRowProps) {
  return (
    <div className={`cx-ledger__row${className ? ` ${className}` : ''}`}>
      <div className="cx-ledger__label">{label}</div>
      <div className="cx-ledger__body">{children}</div>
      {aside && <div className="cx-ledger__aside">{aside}</div>}
    </div>
  )
}

export interface FigureProps {
  value: ReactNode
  caption: ReactNode
  tone?: 'default' | 'ok' | 'warn' | 'danger'
  className?: string
}

/** A large number with a small caption under it. Digits are tabular so they do not jump. */
export function Figure({ value, caption, tone = 'default', className = '' }: FigureProps) {
  return (
    <div className={`cx-figure cx-figure--${tone}${className ? ` ${className}` : ''}`}>
      <span className="cx-figure__value">{value}</span>
      <span className="cx-figure__caption">{caption}</span>
    </div>
  )
}

export type SpineState = 'queued' | 'building' | 'done' | 'failed'

export interface SpineProps {
  children: ReactNode
  label: string
  className?: string
}

/** A vertical timeline. Each SpineStep is a node on one line, so order and progress read at a glance. */
export function Spine({ children, label, className = '' }: SpineProps) {
  return <ol className={`cx-spine${className ? ` ${className}` : ''}`} aria-label={label}>{children}</ol>
}

export interface SpineStepProps {
  state: SpineState
  title: ReactNode
  /** Small text beside the title, such as a time. */
  meta?: ReactNode
  /** Plain-word state, read by assistive technology (for example "Building"). */
  stateLabel: string
  children?: ReactNode
  className?: string
}

/** One node on a Spine. A building node breathes slowly; a done node settles in; a failed node holds still. */
export function SpineStep({ state, title, meta, stateLabel, children, className = '' }: SpineStepProps) {
  return (
    <li className={`cx-spine__step cx-spine__step--${state}${className ? ` ${className}` : ''}`} aria-current={state === 'building' ? 'step' : undefined}>
      <span className="cx-spine__node" aria-hidden>
        {state === 'done' && <svg viewBox="0 0 12 12" width="10" height="10"><path d="M2.5 6.5l2.2 2.2L9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        {state === 'failed' && <svg viewBox="0 0 12 12" width="10" height="10"><path d="M3 3l6 6M9 3l-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>}
      </span>
      <div className="cx-spine__content">
        <p className="cx-spine__title"><span>{title}</span>{meta && <span className="cx-spine__meta">{meta}</span>}<span className="cx-sr-only">{stateLabel}</span></p>
        {children && <div className="cx-spine__body">{children}</div>}
      </div>
    </li>
  )
}

export type SpotName = 'product' | 'server' | 'database' | 'mail' | 'pulse' | 'tester' | 'shield' | 'globe' | 'plus'

export interface SpotProps {
  name: SpotName
  size?: number
  className?: string
}

/** A small drawn picture on a 48 point grid: soft fill, 1.5 outline in the text colour and one accent detail. Decorative, so it is hidden from assistive technology. */
export function Spot({ name, size = 28, className = '' }: SpotProps) {
  const soft = 'var(--cx-surface)'
  const accent = 'var(--cx-accent-text)'
  const parts: Record<SpotName, ReactNode> = {
    product: <><rect x="6" y="9" width="36" height="30" rx="5" fill={soft} /><path d="M6 18h36" /><circle cx="11.5" cy="13.5" r="1" /><circle cx="16" cy="13.5" r="1" /><rect x="12" y="23" width="13" height="9" rx="2" stroke={accent} /><path d="M30 24h6M30 29h4" /></>,
    server: <><rect x="6" y="8" width="36" height="14" rx="4" fill={soft} /><rect x="6" y="26" width="36" height="14" rx="4" fill={soft} /><circle cx="13" cy="15" r="1.6" stroke={accent} /><circle cx="13" cy="33" r="1.6" stroke={accent} /><path d="M21 15h14M21 33h14" /></>,
    database: <><path d="M10 12v24c0 2.8 6.3 5 14 5s14-2.2 14-5V12" fill={soft} /><ellipse cx="24" cy="12" rx="14" ry="5" fill={soft} /><path d="M10 24c0 2.8 6.3 5 14 5s14-2.2 14-5" stroke={accent} /></>,
    mail: <><rect x="6" y="12" width="36" height="24" rx="4" fill={soft} /><path d="M7 15l17 12 17-12" stroke={accent} /></>,
    pulse: <><circle cx="24" cy="24" r="18" fill={soft} /><path d="M9 25h8l4-9 6 18 4-9h8" stroke={accent} /></>,
    tester: <><circle cx="21" cy="21" r="12" fill={soft} /><path d="M30 30l11 11" /><path d="M16 21.5l3.5 3.5 6-7" stroke={accent} /></>,
    shield: <><path d="M24 6l14 5v11c0 9-6 15-14 19-8-4-14-10-14-19V11z" fill={soft} /><path d="M18 24l5 5 8-10" stroke={accent} /></>,
    globe: <><circle cx="24" cy="24" r="17" fill={soft} /><path d="M7 24h34" /><ellipse cx="24" cy="24" rx="7" ry="17" stroke={accent} /></>,
    plus: <><circle cx="24" cy="24" r="17" strokeDasharray="3 4" /><path d="M24 16v16M16 24h16" stroke={accent} /></>,
  }
  return (
    <svg className={`cx-spot${className ? ` ${className}` : ''}`} viewBox="0 0 48 48" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      {parts[name]}
    </svg>
  )
}

export type NodeState = 'ok' | 'warn' | 'danger' | 'off'

export interface NodeMapProps {
  /** Names the diagram for assistive technology, for example "How Atlas Journal is set up". */
  label: string
  /** The thing in the middle, usually a NodeHub. */
  hub: ReactNode
  /** NodeLink items. */
  children: ReactNode
  /** `tree` always stacks the parts under the hub. `row` lays them in one line from wide screens and stacks them on narrow ones. */
  layout?: 'tree' | 'row'
  className?: string
}

/** A hub with the parts it is connected to. It is a real list, so the order, names and states read the same without the drawing. */
export function NodeMap({ label, hub, children, layout = 'tree', className = '' }: NodeMapProps) {
  return (
    <div className={`cx-nodemap cx-nodemap--${layout}${className ? ` ${className}` : ''}`} role="group" aria-label={label}>
      <div className="cx-nodemap__hub">{hub}</div>
      <ul className="cx-nodemap__nodes">{children}</ul>
    </div>
  )
}

export interface NodeHubProps {
  icon: ReactNode
  name: ReactNode
  detail?: ReactNode
  /** Hide the name and detail from wide screens in a `row` map, for when the page already shows them. They stay readable to assistive technology. */
  quiet?: boolean
  className?: string
}

/** The centre of a NodeMap. */
export function NodeHub({ icon, name, detail, quiet = false, className = '' }: NodeHubProps) {
  return (
    <div className={`cx-node cx-node--hub${quiet ? ' cx-node--quiet' : ''}${className ? ` ${className}` : ''}`}>
      <span className="cx-node__icon" aria-hidden>{icon}</span>
      <span className="cx-node__text">
        <span className="cx-node__name">{name}</span>
        {detail && <span className="cx-node__detail">{detail}</span>}
      </span>
    </div>
  )
}

export type NodeLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
  icon: ReactNode
  name: ReactNode
  detail?: ReactNode
  state: NodeState
  /** The state in plain words, always shown, so colour is never the only signal (for example "Working", "Needs a look", "Not set up"). */
  stateLabel: string
  /** Render as another element, for example a router link. */
  as?: ElementType
  to?: string
}

/** One part connected to the hub. A dashed link means it is not set up. A coloured ring means it needs a look or has failed. */
export function NodeLink({ icon, name, detail, state, stateLabel, as, className = '', ...rest }: NodeLinkProps) {
  const interactive = Boolean(as || rest.href || rest.onClick || rest.to)
  const Tag: ElementType = as ?? (rest.href ? 'a' : rest.onClick ? 'button' : 'div')
  return (
    <li className={`cx-nodemap__item cx-nodemap__item--${state}`}>
      <Tag className={`cx-node cx-node--${state}${interactive ? ' cx-node--action' : ''}${className ? ` ${className}` : ''}`} {...(Tag === 'button' ? { type: 'button' } : {})} {...rest}>
        <span className="cx-node__icon" aria-hidden>{icon}</span>
        <span className="cx-node__text">
          <span className="cx-node__name">{name}</span>
          {detail && <span className="cx-node__detail">{detail}</span>}
          <span className="cx-node__state"><span className="cx-node__dot" aria-hidden />{stateLabel}</span>
        </span>
      </Tag>
    </li>
  )
}

export interface BrowserFrameProps {
  /** The address shown in the bar. */
  address: string
  /** A real picture of the page. When missing, a drawn page stands in. */
  src?: string
  alt?: string
  /** Small text under the frame, for example when it was last checked. */
  caption?: ReactNode
  /** `danger` or `off` dims the page and says why, in words. */
  state?: 'ok' | 'danger' | 'off'
  stateLabel?: string
  className?: string
}

/** A page seen in a browser window. */
export function BrowserFrame({ address, src, alt = '', caption, state = 'ok', stateLabel, className = '' }: BrowserFrameProps) {
  return (
    <figure className={`cx-browser cx-browser--${state}${className ? ` ${className}` : ''}`}>
      <div className="cx-browser__bar" aria-hidden>
        <span className="cx-browser__dots"><i /><i /><i /></span>
        <span className="cx-browser__address" dir="ltr">{address}</span>
      </div>
      <div className="cx-browser__page">
        {src ? <img src={src} alt={alt} /> : (
          <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
            <path d="M16 20h40M232 20h20M264 20h20M16 34h288" opacity=".5" />
            <rect x="16" y="50" width="288" height="62" rx="8" fill="var(--cx-surface)" />
            <path d="M32 70h110M32 84h80" />
            <rect x="32" y="94" width="44" height="12" rx="6" stroke="var(--cx-accent-text)" />
            <rect x="16" y="124" width="90" height="42" rx="6" /><rect x="115" y="124" width="90" height="42" rx="6" /><rect x="214" y="124" width="90" height="42" rx="6" />
          </svg>
        )}
        {state !== 'ok' && stateLabel && <span className="cx-browser__overlay">{stateLabel}</span>}
      </div>
      {caption && <figcaption className="cx-browser__caption">{caption}</figcaption>}
    </figure>
  )
}
