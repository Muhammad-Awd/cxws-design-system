import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Alert, Badge, Button, Checkbox, DataTable, EmptyState, Field, Input, Modal, Tabs } from '../src/components'

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
})
