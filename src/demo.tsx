import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Activity, Bell, Check, Globe, Home, Moon, Sun } from 'lucide-react'
import {
  Alert,
  AppShell,
  Badge,
  Button,
  Card,
  Checkbox,
  CloudXLogo,
  DataTable,
  EmptyState,
  Field,
  Input,
  Modal,
  OverflowMenu,
  PageHeader,
  Select,
  Skeleton,
  Spinner,
  TabPanel,
  Tabs,
  Textarea,
} from './components'
import './demo.css'

const navItems = [
  { id: 'home', label: 'Overview', href: '#overview', icon: <Home />, active: true },
  { id: 'services', label: 'Services', href: '#services', icon: <Activity /> },
  { id: 'notifications', label: 'Notifications', href: '#notifications', icon: <Bell /> },
]

interface InvoiceRow { id: string; date: string; amount: string; status: string }
const invoiceRows: InvoiceRow[] = [
  { id: 'CX-INV-2026-028', date: 'Mar 25, 2026', amount: 'EGP 1,250.00', status: 'Paid' },
  { id: 'CX-INV-2026-044', date: 'Mar 20, 2026', amount: 'EGP 860.00', status: 'Overdue' },
]

function DemoPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [modalOpen, setModalOpen] = useState(false)
  const [isLight, setIsLight] = useState(false)

  function toggleTheme() {
    const next = !isLight
    setIsLight(next)
    document.documentElement.dataset.theme = next ? 'light' : 'dark'
  }

  return (
    <AppShell
      brand={<CloudXLogo size="sm" />}
      items={navItems}
      actions={
        <>
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Switch surface theme">
            {isLight ? <Moon size={16} strokeWidth={1.5} /> : <Sun size={16} strokeWidth={1.5} />}
          </Button>
          <Button variant="outline" size="sm"><Globe size={16} strokeWidth={1.5} /> العربية</Button>
        </>
      }
    >
      <div className="cx-demo-page">
        <PageHeader title="Overview" description="Manage your CloudX services and account." eyebrow="Customer Experience" actions={<><Button>Open a support ticket</Button><OverflowMenu label="More workspace actions" items={[{ id: 'team', label: 'Invite a teammate', onSelect: () => setActiveTab('settings') }, { id: 'copy', label: 'Copy workspace ID', onSelect: () => setActiveTab('activity') }]} /></>} />

        <section className="cx-demo-section" aria-labelledby="states-title">
          <h2 id="states-title">Status and feedback</h2>
          <div className="cx-demo-row">
            <Badge tone="ok">Operational</Badge>
            <Badge tone="warn">Scheduled maintenance</Badge>
            <Badge tone="danger">Action needed</Badge>
            <Badge tone="neutral">Unverified</Badge>
          </div>
          <div className="cx-demo-stack">
            <Alert tone="ok" title="Changes saved">Your workspace settings are up to date.</Alert>
            <Alert tone="danger" title="Unable to load service details">Try again when your connection is available.</Alert>
          </div>
        </section>

        <section className="cx-demo-section" aria-labelledby="fields-title">
          <h2 id="fields-title">Form fields</h2>
          <Card>
            <div className="cx-demo-grid">
              <Field id="demo-email" label="Email address" required hint="Use your work address.">
                <Input type="email" placeholder="name@example.com" />
              </Field>
              <Field id="demo-region" label="Region">
                <Select defaultValue="eg"><option value="eg">Egypt</option><option value="gb">United Kingdom</option></Select>
              </Field>
              <Field id="demo-message" label="Message" error="Enter a short message to continue.">
                <Textarea placeholder="How can we help?" />
              </Field>
              <Checkbox label="Email me about important service updates" />
            </div>
          </Card>
        </section>

        <section className="cx-demo-section" aria-labelledby="table-title">
          <h2 id="table-title">Invoices</h2>
          <DataTable<InvoiceRow>
            aria-label="Recent invoices"
            columns={[
              { id: 'invoice', header: 'Invoice', cell: (row) => <bdi dir="ltr">{row.id}</bdi> },
              { id: 'date', header: 'Issued', cell: (row) => row.date },
              { id: 'amount', header: 'Amount', align: 'end', cell: (row) => <bdi dir="ltr">{row.amount}</bdi> },
              { id: 'status', header: 'Status', cell: (row) => <Badge tone={row.status === 'Paid' ? 'ok' : 'danger'}>{row.status}</Badge> },
            ]}
            rows={invoiceRows}
            getRowId={(row) => row.id}
            emptyTitle="No invoices yet"
          />
        </section>

        <section className="cx-demo-section" aria-labelledby="tabs-title">
          <h2 id="tabs-title">Tabs</h2>
          <Tabs
            ariaLabel="Workspace sections"
            items={[{ id: 'overview', label: 'Overview' }, { id: 'activity', label: 'Activity' }, { id: 'settings', label: 'Settings' }]}
            value={activeTab}
            onChange={setActiveTab}
          />
          <TabPanel id={`cx-panel-${activeTab}`} labelledBy={`cx-tab-${activeTab}`} active>
            <Card>{activeTab[0].toUpperCase() + activeTab.slice(1)} details are shown here.</Card>
          </TabPanel>
        </section>

        <section className="cx-demo-section" aria-labelledby="loading-title">
          <h2 id="loading-title">Loading and empty</h2>
          <div className="cx-demo-row"><Spinner label="Loading service details" /><Skeleton width="12rem" height="1rem" /></div>
          <EmptyState title="No active services yet" description="Services connected to your workspace will appear here." />
        </section>

        <section className="cx-demo-section" aria-labelledby="modal-title">
          <h2 id="modal-title">Dialog</h2>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>Open dialog</Button>
          <Modal open={modalOpen} title="Confirm changes" description="Review the update before continuing." onClose={() => setModalOpen(false)} footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={() => setModalOpen(false)}><Check size={16} strokeWidth={1.5} /> Confirm</Button></>}>
            <p>The dialog content is provided by the consuming application.</p>
          </Modal>
        </section>
      </div>
    </AppShell>
  )
}

export default DemoPage

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Missing #root mount element')
createRoot(rootElement).render(<DemoPage />)
