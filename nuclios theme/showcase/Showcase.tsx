import * as React from "react";
import { Icons } from "@/components/ui/icons";
import {
  Accordion,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Chip,
  DataTable,
  Drawer,
  Dropdown,
  Input,
  KpiCard,
  Menu,
  Modal,
  ModalClose,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  SideNav,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toast,
  Toggle,
  Tooltip,
  TooltipProvider,
  TopNav,
} from "../components";

const BRANDS = ["nuclios", "good-year", "mars"] as const;
const RADII = ["default", "square", "round-1", "round-2", "round-3", "round-4"] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-(--spacing-2xl) rounded-(--radius-container-set-2) border border-(--color-border-subtle) bg-(--color-surface-surface-1) p-(--spacing-6xl)">
      <h2 className="nuclios-type-heading-h5-medium">{title}</h2>
      {children}
    </section>
  );
}

const swatches = [
  "background-primary",
  "background-primary-muted",
  "background-secondary",
  "background-subtle",
  "background-inverse",
  "background-positive",
  "background-negative",
  "background-warning",
  "background-information",
  ...Array.from({ length: 10 }, (_, i) => `data-visualization-category-${i + 1}`),
];

const rows = [
  { id: "1", sku: "Food_1_116_TX_3", region: "Texas", sales: 1240, status: "Active" },
  { id: "2", sku: "Food_2_031_CA_1", region: "California", sales: 980, status: "Paused" },
  { id: "3", sku: "Home_1_004_WI_2", region: "Wisconsin", sales: 2210, status: "Active" },
];

export function Showcase() {
  const [dark, setDark] = React.useState(false);
  const [brand, setBrand] = React.useState<(typeof BRANDS)[number]>("nuclios");
  const [radius, setRadius] = React.useState<(typeof RADII)[number]>("default");
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(true);
  const [chips, setChips] = React.useState(["Beer", "USA", "CY 2020"]);
  const [nav, setNav] = React.useState("size");
  const [collapsed, setCollapsed] = React.useState(false);

  // The theme lives on <html> so portalled overlays (modal, menu, select, tooltip) inherit it.
  React.useEffect(() => {
    const el = document.documentElement;
    el.className = [
      "theme-nuclios",
      dark && "dark",
      brand !== "nuclios" && `brand-${brand}`,
      radius !== "default" && `radius-${radius}`,
    ]
      .filter(Boolean)
      .join(" ");
  }, [dark, brand, radius]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-(--color-background-subtle) text-(--color-text-neutral)">
        <TopNav
          brand={
            <span className="nuclios-type-heading-h5-medium text-(--color-text-primary)">
              NucliOS
            </span>
          }
          items={[
            { id: "a", label: "Demand Analysis" },
            { id: "b", label: "Forecast" },
            { id: "c", label: "Collaborative Planning" },
          ]}
          activeId="a"
          actions={
            <>
              <Dropdown
                id="brand"
                size="m"
                header="none"
                value={brand}
                onValueChange={(v) => setBrand(v as typeof brand)}
                options={BRANDS.map((b) => ({ value: b, label: `Brand: ${b}` }))}
                className="w-44"
              />
              <Dropdown
                id="radius"
                size="m"
                header="none"
                value={radius}
                onValueChange={(v) => setRadius(v as typeof radius)}
                options={RADII.map((r) => ({ value: r, label: `Radius: ${r}` }))}
                className="w-44"
              />
              <Toggle id="dark" label="Dark" checked={dark} onCheckedChange={setDark} />
            </>
          }
        />
        <div className="flex">
          <SideNav
            collapsed={collapsed}
            onToggle={() => setCollapsed((c) => !c)}
            activeId={nav}
            onSelect={setNav}
            items={[
              { id: "home", label: "Home", icon: <Icons.component className="size-4" /> },
              {
                id: "demand",
                label: "Demand Analysis",
                icon: <Icons.trendingUp className="size-4" />,
                children: [
                  { id: "size", label: "Size & Opportunity" },
                  { id: "pattern", label: "Pattern Analysis" },
                ],
              },
              { id: "forecast", label: "Forecast", icon: <Icons.sparkles className="size-4" /> },
            ]}
            className="sticky top-0 h-[calc(100vh-64px)]"
          />
          <main className="flex min-w-0 flex-1 flex-col gap-(--spacing-6xl) p-(--spacing-6xl)">
            <div>
              <Breadcrumb
                items={[
                  { label: "Home", icon: <Icons.component className="size-4" /> },
                  { label: "Demand Analysis" },
                  { label: "Sticker Sheet" },
                ]}
              />
              <h1 className="nuclios-type-heading-h3-medium mt-(--spacing-s)">
                NucliOS theme · Bento UI Library V2.0
              </h1>
              <p className="nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
                Every colour, space, radius, shadow and type token below comes from the Figma
                variables.
              </p>
            </div>

            <Section title="Colour tokens">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-(--spacing-l)">
                {swatches.map((s) => (
                  <div key={s} className="flex items-center gap-(--spacing-s)">
                    <span
                      className="size-8 shrink-0 rounded-(--radius-component-set-1) border border-(--color-border-subtle)"
                      style={{ background: `var(--color-${s})` }}
                    />
                    <code className="nuclios-type-body-x-small-regular break-all">{s}</code>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Buttons">
              {(["large", "medium", "small"] as const).map((size) => (
                <div key={size} className="flex flex-wrap items-center gap-(--spacing-l)">
                  {(["filled", "border", "ghost", "neutral", "secondary", "link"] as const).map(
                    (v) => (
                      <Button key={v} size={size} variant={v}>
                        {v[0].toUpperCase() + v.slice(1)}
                      </Button>
                    )
                  )}
                  <Button size={size} destructive>
                    Delete
                  </Button>
                  <Button size={size} loading>
                    Saving
                  </Button>
                  <Button size={size} disabled>
                    Disabled
                  </Button>
                  <Button size={size} iconOnly aria-label="Add">
                    <Icons.plus className="size-4" />
                  </Button>
                </div>
              ))}
            </Section>

            <div className="grid gap-(--spacing-6xl) lg:grid-cols-2">
              <Section title="Inputs & dropdown">
                <Input
                  id="name"
                  label="Header"
                  optional
                  info="Shown on the forecast card"
                  placeholder="Placeholder Text"
                  helper="Helper Text"
                />
                <Input
                  id="email"
                  label="Email"
                  required
                  size="m"
                  defaultValue="not-an-email"
                  error="Enter a valid email address"
                />
                <Dropdown
                  id="region"
                  label="Region"
                  required
                  placeholder="Select region"
                  helper="Choose one"
                  options={[
                    { value: "us", label: "USA" },
                    { value: "uk", label: "United Kingdom" },
                    { value: "in", label: "India" },
                  ]}
                />
                <Textarea id="notes" label="Notes" placeholder="Add details…" />
              </Section>

              <Section title="Selection controls">
                <div className="flex flex-wrap gap-(--spacing-6xl)">
                  <Checkbox
                    id="c1"
                    label="Label"
                    description="Description"
                    checked={checked}
                    onCheckedChange={setChecked}
                  />
                  <Checkbox id="c2" size="m" label="Indeterminate" checked="indeterminate" />
                  <Checkbox id="c3" size="l" label="Disabled" disabled />
                </div>
                <RadioGroup defaultValue="b" aria-label="Plan">
                  <Radio id="r1" value="a" label="Monthly" description="Billed every month" />
                  <Radio id="r2" value="b" size="m" label="Quarterly" />
                  <Radio id="r3" value="c" size="l" label="Yearly (tick)" indicator="tick" />
                </RadioGroup>
                <div className="flex flex-wrap gap-(--spacing-6xl)">
                  <Toggle id="t1" label="Small" description="Description" defaultChecked />
                  <Toggle id="t2" size="m" label="Medium" />
                  <Toggle
                    id="t3"
                    size="l"
                    label="Large, left text"
                    textPosition="left"
                    defaultChecked
                  />
                </div>
                <div className="flex flex-wrap gap-(--spacing-s)">
                  {chips.map((c) => (
                    <Chip key={c} onRemove={() => setChips((x) => x.filter((y) => y !== c))}>
                      {c}
                    </Chip>
                  ))}
                  <Chip state="selected">Selected</Chip>
                  <Chip state="success" size="m">
                    Success
                  </Chip>
                  <Chip state="warning" size="m">
                    Warning
                  </Chip>
                  <Chip state="error" size="m">
                    Error
                  </Chip>
                  <Chip state="disabled">Disabled</Chip>
                </div>
              </Section>
            </div>

            <Section title="Tabs">
              {(["stroke", "ghost", "filled"] as const).map((t) => (
                <Tabs key={t} defaultValue="one">
                  <TabsList type={t} size={t === "stroke" ? "medium" : "small"}>
                    <TabsTrigger value="one" icon={<Icons.component className="size-4" />}>
                      Demand Sizing
                    </TabsTrigger>
                    <TabsTrigger value="two">Opportunity</TabsTrigger>
                    <TabsTrigger value="three" disabled>
                      Disabled
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="one" className="nuclios-type-body-small-regular">
                    {t} tabs — panel one
                  </TabsContent>
                  <TabsContent value="two" className="nuclios-type-body-small-regular">
                    {t} tabs — panel two
                  </TabsContent>
                </Tabs>
              ))}
            </Section>

            <div className="grid gap-(--spacing-6xl) md:grid-cols-3">
              <KpiCard
                label="Invoice/POS"
                value="$220 K"
                delta={{ value: "-8% YoY", direction: "down" }}
                icon={<Icons.trendingUp className="size-4" />}
              />
              <KpiCard
                label="Total Spending"
                value="$220 K"
                delta={{ value: "+8% YoY", direction: "up" }}
                layout="stacked"
              />
              <KpiCard label="Risk Score" value="3.2" caption="Updated 2h ago" layout="centered" />
            </div>

            <div className="grid gap-(--spacing-6xl) lg:grid-cols-2">
              <Card
                title="Card title"
                subtitle="Supporting text"
                action={
                  <Button size="small" variant="ghost" iconOnly aria-label="More">
                    <Icons.menu className="size-4" />
                  </Button>
                }
                footer={
                  <>
                    <Button size="small" variant="border">
                      Secondary
                    </Button>
                    <Button size="small">Primary</Button>
                  </>
                }
                interactive
              >
                Copilot is an AI tool that helps you analyse demand drivers and forecast scenarios
                across regions.
              </Card>
              <Section title="Progress & feedback">
                <Progress value={30} label="right" />
                <Progress value={70} label="bottom" text="70% uploaded" />
                <Toast
                  type="success"
                  title="Forecast published"
                  description="Your scenario is now visible to the team."
                  onClose={() => {}}
                />
                <Toast
                  type="danger"
                  layout="horizontal"
                  title="Upload failed"
                  actions={
                    <Button size="small" variant="border" destructive>
                      Retry
                    </Button>
                  }
                />
              </Section>
            </div>

            <Section title="Overlays">
              <div className="flex flex-wrap gap-(--spacing-l)">
                <Modal
                  trigger={<Button variant="border">Open modal</Button>}
                  title="Delete Thread"
                  description="Are you sure you want to delete this comment thread?"
                  footer={
                    <>
                      <ModalClose asChild>
                        <Button variant="border">Cancel</Button>
                      </ModalClose>
                      <ModalClose asChild>
                        <Button destructive>Delete</Button>
                      </ModalClose>
                    </>
                  }
                />
                <Drawer
                  trigger={<Button variant="border">Open drawer</Button>}
                  title="Filters"
                  footer={
                    <>
                      <Button variant="border">Reset</Button>
                      <Button>Apply</Button>
                    </>
                  }
                >
                  <div className="flex flex-col gap-(--spacing-2xl)">
                    <Dropdown
                      id="d-cat"
                      label="Category"
                      options={[{ value: "all", label: "All" }]}
                      defaultValue="all"
                    />
                    <Checkbox id="d-c" label="Include archived" />
                  </div>
                </Drawer>
                <Popover
                  trigger={<Button variant="neutral">Popover</Button>}
                  title="Forecast accuracy"
                >
                  MAPE is calculated on the last 12 weeks of actuals.
                </Popover>
                <Menu
                  trigger={
                    <Button
                      variant="neutral"
                      trailingIcon={<Icons.chevronDown className="size-4" />}
                    >
                      Menu
                    </Button>
                  }
                  items={[
                    { type: "header", label: "Section" },
                    { label: "Copy Link" },
                    { label: "Duplicate", selected: true },
                    { label: "Delete Thread" },
                    { label: "Archived", disabled: true },
                  ]}
                />
                <Tooltip content="This is a tooltip" supportingText="Supporting text">
                  <Button variant="ghost">Light tooltip</Button>
                </Tooltip>
                <Tooltip content="Dark tooltip" variant="dark" side="bottom">
                  <Button variant="ghost">Dark tooltip</Button>
                </Tooltip>
              </div>
            </Section>

            <Section title="Accordion">
              <Accordion
                type="stroke"
                defaultValue={["a"]}
                items={[
                  {
                    value: "a",
                    title: "What is NucliOS?",
                    content: "Welcome to NucliOS — an AI decision-intelligence platform.",
                  },
                  {
                    value: "b",
                    title: "How are tokens generated?",
                    content: "From the Bento Figma variables via scripts/build-tokens.mjs.",
                  },
                  { value: "c", title: "Disabled item", content: "—", disabled: true },
                ]}
              />
            </Section>

            <DataTable
              title="Data Preview"
              actions={
                <Button size="small" variant="border">
                  Export
                </Button>
              }
              columns={[
                { key: "sku", header: "SKU", sortable: true },
                { key: "region", header: "Region", sortable: true },
                { key: "sales", header: "Sales", align: "right", sortable: true },
                {
                  key: "status",
                  header: "Status",
                  render: (r) => (
                    <Chip state={r.status === "Active" ? "success" : "warning"}>{r.status}</Chip>
                  ),
                },
              ]}
              rows={rows}
              rowKey={(r) => r.id}
              selectedKey="3"
            />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
