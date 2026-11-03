import * as React from "react";
import {
  ChevronDown,
  Copy,
  Database,
  EllipsisVertical,
  LayoutGrid,
  Network,
  Plus,
  Search,
  Star,
  Users,
  Workflow,
} from "lucide-react";
import {
  Breadcrumb,
  Button,
  DataTable,
  Input,
  Menu,
  Tabs,
  TabsList,
  TabsTrigger,
  Tooltip,
  type Column,
} from "@nuclios";
import { cn } from "@/lib/utils";
import type { Feature, Project as ProjectT } from "@/data";
import { ArtifactPicker } from "@/components/studios/ArtifactPicker";
import { RolesAccessDrawer } from "@/components/studios/RolesAccess";

/* Project detail — Figma 12344:8018 (RBAC page): ARTIFACTS sidebar · + Add New ·
   My Artifacts / Shared with me · Name / Description / Created On table. */

type Row = {
  id: string;
  name: string;
  description: string;
  created: string;
  shared?: boolean;
  actions?: string;
};
type Item = { id: string; label: string; icon: React.ReactNode; rows: Row[] };

const r = (id: string, name: string, description: string, shared = false): Row => ({
  id,
  name,
  description,
  created: "16 May 2025",
  shared,
});

const GROUPS: { studio: string; items: Item[] }[] = [
  {
    studio: "DECISION STUDIO",
    items: [
      {
        id: "apps",
        label: "Applications",
        icon: <LayoutGrid className="size-[18px]" />,
        rows: [
          r("a1", "Nova Economics Forecasting", "Predictive modeling of economic indicators"),
          r(
            "a2",
            "Beacon Education Forecasting",
            "Student performance and attendance trend analysis"
          ),
          r("a3", "Atlas Transit Analysis", "Public transport KPIs, route efficiency"),
          r("a4", "Promo Effectiveness Explorer", "Lift and ROI by promotion mechanic", true),
        ],
      },
      {
        id: "frameworks",
        label: "Frameworks",
        icon: <Workflow className="size-[18px]" />,
        rows: [
          r("f1", "Pricing framework", "Elasticity-led price recommendations"),
          r("f2", "Promo framework", "Promotion calendar planning and guardrails"),
          r("f3", "Assortment", "Range rationalisation by store cluster"),
        ],
      },
    ],
  },
  {
    studio: "ALGO STUDIO",
    items: [
      {
        id: "blueprint",
        label: "Model Blueprint",
        icon: <Network className="size-[18px]" />,
        rows: [
          r("m1", "MMM Blueprint", "Media mix response curves and saturation"),
          r("m2", "Elasticity model", "Own and cross price elasticities", true),
        ],
      },
    ],
  },
  {
    studio: "DATA STUDIO",
    items: [
      {
        id: "data-model",
        label: "Data Model",
        icon: <Database className="size-[18px]" />,
        rows: [r("d1", "Sales cube", "Weekly sell-in and sell-out by SKU and store")],
      },
      {
        id: "integrations",
        label: "Integrations",
        icon: <Workflow className="size-[18px]" />,
        rows: [
          r("i1", "Snowflake", "Warehouse connection for the sales cube"),
          r("i2", "Nielsen feed", "Syndicated market share data", true),
        ],
      },
    ],
  },
];

const iconBtn =
  "inline-flex size-8 items-center justify-center rounded-(--radius-component-set-1) text-(--color-icons-neutral-subtle) hover:bg-(--color-background-neutral-hover) hover:text-(--color-icons-neutral) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused) cursor-pointer";

export function Project({
  project,
  onHome,
  onWorkspace,
  onCreateArtifact,
  onOpenFeature,
  notify,
}: {
  project: ProjectT;
  onHome: () => void;
  onWorkspace: () => void;
  /** Opens the shared Create-artifact popup, pre-filled with this project. */
  onCreateArtifact?: (f: Feature) => void;
  onOpenFeature?: (featureId: string) => void;
  notify: (t: string, d?: string) => void;
}) {
  const [selected, setSelected] = React.useState("apps");
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});
  const [tab, setTab] = React.useState<"mine" | "shared">("mine");
  const [q, setQ] = React.useState("");
  const [favs, setFavs] = React.useState<string[]>([]);
  const [picking, setPicking] = React.useState(false);
  const [rolesOpen, setRolesOpen] = React.useState(false);
  const people = project.collaborators
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const current = GROUPS.flatMap((g) => g.items).find((i) => i.id === selected)!;
  const rows = current.rows.filter(
    (x) =>
      (tab === "shared" ? x.shared : !x.shared) &&
      `${x.name} ${x.description}`.toLowerCase().includes(q.toLowerCase())
  );

  const columns: Column<Row>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "description", header: "Description", className: "whitespace-normal" },
    { key: "created", header: "Created On" },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (x) => {
        const fav = favs.includes(x.id);
        return (
          <span className="flex justify-end gap-(--spacing-xs)">
            <Tooltip content={fav ? "Remove from favourites" : "Add to favourites"}>
              <button
                type="button"
                aria-pressed={fav}
                aria-label={`Favourite ${x.name}`}
                className={iconBtn}
                onClick={() => setFavs((f) => (fav ? f.filter((i) => i !== x.id) : [...f, x.id]))}
              >
                <Star
                  className={cn(
                    "size-4",
                    fav && "fill-(--color-icons-warning) text-(--color-icons-warning)"
                  )}
                />
              </button>
            </Tooltip>
            <Tooltip content="Clone">
              <button
                type="button"
                aria-label={`Clone ${x.name}`}
                className={iconBtn}
                onClick={() =>
                  notify("Artifact cloned", `${x.name} (copy) was added to ${project.name}.`)
                }
              >
                <Copy className="size-4" />
              </button>
            </Tooltip>
            <Menu
              align="end"
              trigger={
                <button type="button" aria-label={`More actions for ${x.name}`} className={iconBtn}>
                  <EllipsisVertical className="size-4" />
                </button>
              }
              items={["Share", "Move", "Promote", "Export"].map((label) => ({
                label,
                onSelect: () => notify(label, `${x.name}: ${label.toLowerCase()} started.`),
              }))}
            />
          </span>
        );
      },
    },
  ];

  return (
    <main className="w-full pb-10">
      <div className="px-4 pb-6 pt-3 sm:px-16">
        <Breadcrumb
          items={[
            { label: "Home", onClick: onHome },
            { label: project.workspace, onClick: onWorkspace },
            { label: project.name },
          ]}
        />
        <div className="mt-(--spacing-xl) grid grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_auto] items-start gap-(--spacing-2xl) max-lg:grid-cols-1">
          <h1 className="nuclios-type-heading-h4-regular text-(--color-text-neutral)">
            {project.name}
          </h1>
          <p className="nuclios-type-body-large-regular text-(--color-text-neutral)">
            {project.description}
          </p>
          {/* Collaborators pill opens Roles & Access (Figma 12344:8057 → 12344:8018). */}
          <button
            type="button"
            onClick={() => setRolesOpen(true)}
            aria-haspopup="dialog"
            aria-label={`Roles and access: ${project.collaborators}`}
            className="flex items-center gap-(--spacing-s) justify-self-end rounded-(--radius-container-set-1) bg-(--color-background-information-subtle) px-(--spacing-l) py-(--spacing-xs) nuclios-type-body-large-regular text-(--color-text-neutral) cursor-pointer transition-shadow hover:shadow-(--shadow-2) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused) max-lg:justify-self-start"
          >
            <Users className="size-5 text-(--color-icons-neutral)" aria-hidden />
            {people.slice(0, 3).join(", ")}
            {people.length > 3 && (
              <span className="rounded-(--radius-pill) border border-(--color-border-subtle) bg-(--color-background-neutral) px-(--spacing-xs) py-(--spacing-3xs) nuclios-type-body-small-regular">
                +{people.length - 3}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(240px,430px)_1fr] border-t border-(--color-border-subtle) px-4 sm:pl-16 sm:pr-16 max-lg:grid-cols-1">
        {/* ARTIFACTS sidebar — Figma 12344:8063 */}
        <aside className="border-(--color-border-neutral) py-(--spacing-2xl) pr-(--spacing-2xl) lg:border-r">
          <h2 className="nuclios-type-body-large-medium tracking-[1.12px] text-(--color-text-primary-pressed)">
            ARTIFACTS
          </h2>
          <nav
            aria-label="Artifacts"
            className="mt-(--spacing-2xl) flex flex-col gap-(--spacing-4xl)"
          >
            {GROUPS.map((g) => {
              const closed = collapsed[g.studio];
              const listId = `grp-${g.studio.replace(/\s/g, "-")}`;
              return (
                <div key={g.studio} className="flex flex-col gap-(--spacing-s)">
                  <button
                    type="button"
                    aria-expanded={!closed}
                    aria-controls={listId}
                    onClick={() => setCollapsed((c) => ({ ...c, [g.studio]: !closed }))}
                    className="flex w-fit items-center gap-(--spacing-l) rounded-(--radius-component-set-1) nuclios-type-body-default-regular tracking-[1.5px] text-(--color-text-neutral-muted) cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
                  >
                    <ChevronDown
                      className={cn(
                        "size-4 text-(--color-icons-primary-pressed) transition-transform",
                        !closed && "rotate-180"
                      )}
                      aria-hidden
                    />
                    {g.studio}
                  </button>
                  {!closed && (
                    <ul id={listId} className="flex flex-col gap-(--spacing-2xs)">
                      {g.items.map((it) => {
                        const on = it.id === selected;
                        return (
                          <li key={it.id}>
                            <button
                              type="button"
                              aria-current={on ? "page" : undefined}
                              onClick={() => {
                                setSelected(it.id);
                                setQ("");
                              }}
                              className={cn(
                                "flex w-full items-center justify-between gap-(--spacing-l) rounded-(--radius-component-set-3) py-(--spacing-xs) pl-(--spacing-s) pr-(--spacing-2xl) text-left cursor-pointer transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)",
                                on
                                  ? "bg-(--color-background-information-subtle) nuclios-type-body-large-medium text-(--color-text-neutral)"
                                  : "nuclios-type-body-large-regular text-(--color-text-neutral-subtle) hover:bg-(--color-background-neutral-hover)"
                              )}
                            >
                              <span className="flex items-center gap-(--spacing-s)">
                                <span
                                  className="inline-flex size-8 items-center justify-center text-(--color-icons-neutral)"
                                  aria-hidden
                                >
                                  {it.icon}
                                </span>
                                {it.label}
                              </span>
                              <span className="nuclios-type-body-x-large-regular text-(--color-text-neutral)">
                                {it.rows.length}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        <section
          aria-label={current.label}
          className="flex min-w-0 flex-col gap-(--spacing-xl) py-(--spacing-2xl) lg:pl-(--spacing-2xl)"
        >
          <Button
            variant="neutral"
            size="medium"
            className="w-fit"
            leadingIcon={<Plus className="size-4" aria-hidden />}
            onClick={() => setPicking(true)}
          >
            Add New
          </Button>
          {/* Table card — Figma 12344:8044 */}
          <div className="overflow-hidden rounded-(--radius-container-set-1) border border-(--color-border-subtle) bg-(--color-background-neutral) shadow-(--shadow-2)">
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <div className="flex flex-wrap items-center justify-between gap-(--spacing-l) px-(--spacing-l) py-(--spacing-l)">
                <TabsList
                  type="ghost"
                  aria-label="Artifact ownership"
                  className="w-fit flex-none gap-0 overflow-hidden rounded-(--radius-component-set-1) border border-(--color-border-neutral) p-0"
                >
                  <TabsTrigger
                    value="mine"
                    className="h-10 rounded-none px-(--spacing-l) aria-selected:bg-(--color-background-information-subtle)"
                  >
                    My Artifacts
                  </TabsTrigger>
                  <TabsTrigger
                    value="shared"
                    className="h-10 rounded-none border-l border-(--color-border-neutral) px-(--spacing-l) aria-selected:bg-(--color-background-information-subtle)"
                  >
                    Shared with me
                  </TabsTrigger>
                </TabsList>
                <div className="relative w-full max-w-[400px]">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-icons-neutral-subtle)"
                    aria-hidden
                  />
                  <Input
                    id="proj-search"
                    size="l"
                    aria-label={`Search ${current.label.toLowerCase()}`}
                    placeholder="Search anything inside projects"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </Tabs>
            <DataTable
              columns={columns}
              rows={rows}
              rowKey={(x) => x.id}
              emptyMessage={
                q
                  ? "Nothing matches your search."
                  : tab === "shared"
                    ? `Nothing in ${current.label} has been shared with you yet.`
                    : `No ${current.label.toLowerCase()} yet. Create one with + Add New.`
              }
            />
          </div>
        </section>
      </div>

      <RolesAccessDrawer open={rolesOpen} onOpenChange={setRolesOpen} notify={notify} />
      <ArtifactPicker
        open={picking}
        onOpenChange={setPicking}
        projectName={project.name}
        onCreate={(f) => {
          setPicking(false);
          if (onCreateArtifact) onCreateArtifact(f);
          else notify(`New ${f.label}`, `Created in ${project.name}.`);
        }}
        onOpen={(f) => {
          setPicking(false);
          onOpenFeature?.(f.id);
        }}
      />
    </main>
  );
}
