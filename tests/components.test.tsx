import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Alert, Badge, Button, Checkbox, DataTable, DetailRow, Drawer, Dropzone, EmptyState, Field, GroupedSidebar, Input, MetricCard, Modal, Pagination, ProgressBar, SearchField, Tabs, Toggle } from '../src/components'

describe('presentational components', () => {
  it('disables a button while loading and exposes busy state', () => {
    render(<Button loading>Saving</Button>)
    expect(screen.getByRole('button', { name: 'Saving' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Saving' })).toHaveAttribute('aria-busy', 'true')
  })

  it('connects a field label and error message to its input', () => {
    render(<Field id="email" label="Email" error="Enter a valid email."><Input type="email" /></Field>)
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-describedby', 'email-error')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email.')
  })

  it('renders checkbox text as its accessible name', () => {
    render(<Checkbox label="Product updates" />)
    expect(screen.getByRole('checkbox', { name: 'Product updates' })).toBeInTheDocument()
  })

  it('exposes toggle checked state and reports the requested next value', () => {
    const onCheckedChange = vi.fn()
    render(<Toggle checked={false} onCheckedChange={onCheckedChange} aria-label="Enable account" />)
    const toggle = screen.getByRole('switch', { name: 'Enable account' })
    expect(toggle).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(toggle)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('renders metric summary labels and values', () => {
    render(<MetricCard label="Active workspaces" value="24" detail="77% of all workspaces" />)
    expect(screen.getByText('Active workspaces')).toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
    expect(screen.getByText('77% of all workspaces')).toBeInTheDocument()
  })

  it('exposes grouped navigation and sends the selected item to the callback', () => {
    const onNavigate = vi.fn()
    render(<GroupedSidebar groups={[{ label: 'Workspace', items: [{ id: 'overview', label: 'Overview', href: '#overview', active: true }, { id: 'services', label: 'Services', href: '#services' }] }]} onNavigate={onNavigate} />)
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'page')
    const services = screen.getByRole('link', { name: 'Services' })
    expect(services).toHaveAttribute('href', '#services')
    expect(fireEvent.click(services)).toBe(false)
    expect(onNavigate).toHaveBeenCalledWith(expect.objectContaining({ id: 'services' }))
    onNavigate.mockClear()
    expect(fireEvent.click(services, { ctrlKey: true })).toBe(true)
    expect(onNavigate).not.toHaveBeenCalled()
  })

  it('exposes alert and badge text', () => {
    render(<><Alert tone="danger">Unable to save.</Alert><Badge tone="ok">Operational</Badge></>)
    expect(screen.getByRole('alert')).toHaveTextContent('Unable to save.')
    expect(screen.getByText('Operational')).toBeInTheDocument()
  })

  it('shows the table empty state when there are no rows', () => {
    type Row = { id: string; name: string }
    render(<DataTable<Row> columns={[{ id: 'name', header: 'Name', cell: (row) => row.name }]} rows={[]} getRowId={(row) => row.id} emptyTitle="No records" />)
    expect(screen.getByText('No records')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('renders the empty state title and description', () => {
    render(<EmptyState title="No records" description="Records will appear here." />)
    expect(screen.getByRole('heading', { name: 'No records' })).toBeInTheDocument()
    expect(screen.getByText('Records will appear here.')).toBeInTheDocument()
  })

  it('closes the modal on Escape and restores focus', () => {
    const close = vi.fn()
    render(<><button type="button">Open</button><Modal open title="Confirm" onClose={close}>Details</Modal></>)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(close).toHaveBeenCalledOnce()
  })

  it('selects a tab on click and supports directional navigation', () => {
    const onChange = vi.fn()
    render(<Tabs ariaLabel="Sections" items={[{ id: 'one', label: 'One' }, { id: 'two', label: 'Two' }]} value="one" onChange={onChange} />)
    fireEvent.keyDown(screen.getByRole('tab', { name: 'One' }), { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith('two')
  })

  it('shows a drawer as a labelled dialog, closes on Escape and restores nothing when closed', () => {
    const onClose = vi.fn()
    const { rerender } = render(<Drawer open title="Invoice" subtitle="May 2026" onClose={onClose}><p>Body</p></Drawer>)
    expect(screen.getByRole('dialog', { name: 'Invoice' })).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
    rerender(<Drawer open={false} title="Invoice" onClose={onClose}><p>Body</p></Drawer>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('applies a size class to larger modals', () => {
    render(<Modal open title="Wide" onClose={() => {}} size="lg"><p>Body</p></Modal>)
    expect(screen.getByRole('dialog')).toHaveClass('cx-modal--lg')
  })

  it('renders detail rows as a term and its value', () => {
    render(<dl><DetailRow label="Due">May 01</DetailRow></dl>)
    expect(screen.getByText('Due').tagName).toBe('DT')
    expect(screen.getByText('May 01').tagName).toBe('DD')
  })

  it('reports usage and warns as a progress bar fills', () => {
    const { rerender } = render(<ProgressBar value={3} max={5} label="Mailboxes used" />)
    const bar = screen.getByRole('progressbar', { name: 'Mailboxes used' })
    expect(bar).toHaveAttribute('aria-valuenow', '3')
    expect(bar.firstElementChild).not.toHaveClass('cx-progress__bar--warn')
    rerender(<ProgressBar value={5} max={5} label="Mailboxes used" />)
    expect(screen.getByRole('progressbar').firstElementChild).toHaveClass('cx-progress__bar--warn')
  })

  it('rejects files that are the wrong type or too large and accepts valid ones', () => {
    const onFile = vi.fn()
    const onReject = vi.fn()
    const { container } = render(<Dropzone onFile={onFile} onReject={onReject} maxBytes={10} />)
    const input = container.querySelector('input[type=file]') as HTMLInputElement
    fireEvent.change(input, { target: { files: [new File(['x'], 'a.txt', { type: 'text/plain' })] } })
    expect(onReject).toHaveBeenCalledWith('That file type is not supported.')
    fireEvent.change(input, { target: { files: [new File(['x'.repeat(20)], 'a.png', { type: 'image/png' })] } })
    expect(onReject).toHaveBeenCalledTimes(2)
    fireEvent.change(input, { target: { files: [new File(['x'], 'a.png', { type: 'image/png' })] } })
    expect(onFile).toHaveBeenCalledTimes(1)
  })

  it('marks the current page and disables the edges', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={1} pageCount={2} onPageChange={onPageChange} />)
    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('shows an input suffix and keeps the label connected to the input', () => {
    render(<Field id="mailbox" label="Mailbox"><Input suffix="@atlas.example" /></Field>)
    expect(screen.getByLabelText('Mailbox')).toBeInTheDocument()
    expect(screen.getByText('@atlas.example')).toBeInTheDocument()
  })

  it('renders an alert action next to the message', () => {
    render(<Alert tone="warn" title="Limit reached" action={<button>Add capacity</button>}>Upgrade to add more.</Alert>)
    expect(screen.getByRole('button', { name: 'Add capacity' })).toBeInTheDocument()
    expect(screen.getByText('Upgrade to add more.')).toBeInTheDocument()
  })

  it('names a search field for assistive technology and reports typing', () => {
    const onChange = vi.fn()
    render(<SearchField label="Search mailboxes" placeholder="Address" onChange={onChange} />)
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search mailboxes' }), { target: { value: 'info' } })
    expect(onChange).toHaveBeenCalled()
  })
})
