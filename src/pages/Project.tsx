import * as React from "react";
import {
  ArrowUpRight,
  LayoutGrid,
  MessageSquare,
  Network,
  PlusCircle,
  Plus,
  Users,
  Workflow,
  Database,
} from "lucide-react";
import { Breadcrumb, Button, DataTable } from "@nuclios";
import { cn } from "@/lib/utils";
import type { Project as ProjectT } from "@/data";

type Item = { id: string; name: string; repo: string; url: string };

const GROUPS: {
  studio: string;
  items: { id: string; label: string; icon: React.ReactNode; rows: Item[] }[];
}[] = [
  {
    studio: "DECISION STUDIO",
    items: [
      {
        id: "apps",
        label: "Apps",
        icon: <LayoutGrid className="size-4" />,
        rows: [
          {
            id: "1",
            name: "App 1",
            repo: "git integration",
            url: "https://dev.azure.com/mathco-products/codex/_git/git-integration",
          },
          {
            id: "2",
            name: "Sales",
            repo: "mmx_blueprint_v2",
            url: "https://dev.azure.com/mathco-products/codex/_git/mmx_blueprint_v2",
          },
          {
            id: "3",
            name: "Marketing",
            repo: "mmx_blueprint_v2",
            url: "https://dev.azure.com/mathco-products/codex/_git/mmx_blueprint_v2",
          },
        ],
      },
      {
        id: "frameworks",
        label: "Frameworks",
        icon: <Workflow className="size-4" />,
        rows: [
          {
            id: "1",
            name: "Pricing framework",
            repo: "pricing_fw",
            url: "https://dev.azure.com/mathco-products/codex/_git/pricing_fw",
          },
          {
            id: "2",
            name: "Promo framework",
            repo: "promo_fw",
            url: "https://dev.azure.com/mathco-products/codex/_git/promo_fw",
          },
          {
            id: "3",
            name: "Assortment",
            repo: "assortment_fw",
            url: "https://dev.azure.com/mathco-products/codex/_git/assortment_fw",
          },
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
        icon: <Network className="size-4" />,
        rows: [
          {
            id: "1",
            name: "MMM Blueprint",
            repo: "mmx_blueprint_v2",
            url: "https://dev.azure.com/mathco-products/codex/_git/mmx_blueprint_v2",
          },
          {
            id: "2",
            name: "Elasticity model",
            repo: "elasticity_v1",
            url: "https://dev.azure.com/mathco-products/codex/_git/elasticity_v1",
          },
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
        icon: <Database className="size-4" />,
        rows: [
          {
            id: "1",
            name: "Sales cube",
            repo: "sales_dm",
            url: "https://dev.azure.com/mathco-products/codex/_git/sales_dm",
          },
        ],
      },
      {
        id: "integrations",
        label: "Integrations",
        icon: <Workflow className="size-4" />,
        rows: [
          {
            id: "1",
            name: "Snowflake",
            repo: "snowflake_conn",
            url: "https://dev.azure.com/mathco-products/codex/_git/snowflake_conn",
          },
          {
            id: "2",
            name: "Nielsen feed",
            repo: "nielsen_feed",
            url: "https://dev.azure.com/mathco-products/codex/_git/nielsen_feed",
          },
        ],
      },
    ],
  },
];

export function Project({
  project,
  onHome,
  onWorkspace,
  notify,
}: {
  project: ProjectT;
  onHome: () => void;
  onWorkspace: () => void;
  notify: (t: string, d?: string) => void;
}) {
  const [selected, setSelected] = React.useState("apps");
  const current = GROUPS.flatMap((g) => g.items).find((i) => i.id === selected)!;

  return (
    <main className="w-full pb-16">
      <div className="border-b border-(--color-border-subtle) px-4 pb-6 pt-3 sm:px-[88px]">
        <Breadcrumb
          items={[
            {
              label: "Home",
              onClick: onHome,
            },
            {
              label: project.workspace,
              onClick: onWorkspace,
            },
            { label: project.name },
          ]}
        />
        <div className="mt-4 grid grid-cols-[1fr_1.4fr_1fr] items-start gap-6 max-lg:grid-cols-1">
          <h1 className="nuclios-type-heading-h4-regular text-(--color-text-neutral)">
            {project.name}
          </h1>
          <p className="nuclios-type-body-large-regular text-(--color-text-neutral-subtle)">
            {project.description}
          </p>
          <p className="flex items-center gap-2 justify-self-end nuclios-type-body-large-regular text-(--color-text-neutral) max-lg:justify-self-start">
            <Users className="size-5 text-(--color-icons-neutral-subtle)" aria-hidden />
            {project.collaborators}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[340px_1fr] gap-7 px-4 sm:px-[88px] max-lg:grid-cols-1">
        <aside className="rounded-(--radius-container-set-1) border border-(--color-border-neutral) bg-(--color-background-neutral)">
          <div className="flex items-center justify-between border-b border-(--color-border-neutral) px-5 py-3">
            <h2 className="nuclios-type-body-default-medium tracking-[1px] text-(--color-text-primary)">
              ARTIFACTS
            </h2>
            <Button
              variant="ghost"
              size="small"
              leadingIcon={<Plus className="size-4" aria-hidden />}
              onClick={() =>
                notify("Add artifact", "Pick a feature to create a new artifact in this project.")
              }
            >
              Add New
            </Button>
          </div>
          <nav aria-label="Artifacts" className="flex flex-col gap-6 p-3 pb-6">
            {GROUPS.map((g) => (
              <div key={g.studio}>
                <p className="px-2 pb-3 pt-2 nuclios-type-body-default-regular tracking-[1px] text-(--color-text-neutral-subtle)">
                  {g.studio}
                </p>
                <ul className="flex flex-col gap-2">
                  {g.items.map((it) => {
                    const on = it.id === selected;
                    return (
                      <li key={it.id}>
                        <button
                          type="button"
                          aria-current={on ? "page" : undefined}
                          onClick={() => setSelected(it.id)}
                          className={cn(
                            "flex h-[42px] w-full items-center gap-3 rounded-(--radius-component-set-2) border px-3 text-left nuclios-type-body-large-regular text-(--color-text-neutral) cursor-pointer",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)",
                            on
                              ? "border-(--color-border-inverted) border-[1.5px]"
                              : "border-(--color-border-subtle) hover:bg-(--color-background-neutral-hover)"
                          )}
                        >
                          <span className="inline-flex size-6 items-center justify-center rounded-(--radius-component-set-4) bg-(--color-background-primary-muted) text-(--color-icons-primary)">
                            {it.icon}
                          </span>
                          <span className="flex-1">{it.label}</span>
                          <span className="nuclios-type-body-x-large-regular">
                            {it.rows.length}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <section aria-label={current.label} className="flex flex-col gap-3">
          <div className="flex items-center justify-end gap-3">
            <Button variant="ghost" size="medium" iconOnly aria-label="Comments">
              <MessageSquare className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="medium"
              trailingIcon={<ArrowUpRight className="size-4" aria-hidden />}
              className="tracking-[1px]"
            >
              LIBRARY
            </Button>
          </div>
          <div className="rounded-(--radius-container-set-1) border border-(--color-border-neutral) bg-(--color-background-neutral) p-6 sm:px-9">
            <div className="mb-3 flex justify-end">
              <Button
                variant="link"
                leadingIcon={<PlusCircle className="size-5" aria-hidden />}
                onClick={() =>
                  notify(
                    `New ${current.label.replace(/s$/, "")}`,
                    "Link a repository to add it to this project."
                  )
                }
              >
                Add new
              </Button>
            </div>
            <DataTable
              columns={[
                { key: "name", header: "Name", sortable: true },
                { key: "repo", header: "Repository" },
                {
                  key: "url",
                  header: "URL",
                  sortable: true,
                  render: (r) => <span className="break-all">{r.url}</span>,
                },
              ]}
              rows={current.rows}
              rowKey={(r) => r.id}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
