import * as React from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronDown, Info, Search } from "lucide-react";
import {
  Accordion,
  Avatar,
  Button,
  Checkbox,
  Chip,
  Drawer,
  Dropdown,
  Radio,
  RadioGroup,
  Toggle,
  SidePanel,
} from "@nuclios";
import { cn } from "@/lib/utils";
import { RoleChip } from "@/components/studios/People";
import type { Role } from "@/data";

/* ------------------------------------------------------------------ */
/* Data — Figma "RBAC roles and access permissions" (1530:6853)        */
/* Scenario: an Artifact Contributor in Workspace 1 must NOT see       */
/* Artifact C in Project 1 or Artifact B in Project 2, and has limited */
/* access to Artifact E in Project 2 (no copy / move).                 */
/* ------------------------------------------------------------------ */
export type Access = "full" | "limited" | "none";
type Perms = { general: boolean; feature: boolean; checks: string[] };
type Setting = { access: Access; perms: Perms };

const PEOPLE: { name: string; email: string; role: Role }[] = [
  ["GAM Gamer", "Admin"],
  ["Abhinash Behera", "Contributor"],
  ["Swathi Suresh", "Reader"],
  ["Varsha A", "Contributor"],
  ["Apan Singha", "Admin"],
  ["Shantanu Seth", "Contributor"],
  ["Mradul Dwivedi", "Reader"],
  ["Narmadha K", "Admin"],
  ["Vishnu D", "Contributor"],
  ["Utkarsh Taneja", "Reader"],
  ["Nikita Gupta", "Admin"],
].map(([name, role]) => ({
  name,
  role: role as Role,
  email: `${name.split(" ")[0].toLowerCase()}@mathco.com`,
}));

const PROJECTS = [
  "CPG- Supply Chain",
  "CPG- Supply",
  "Project lists 2",
  "CPG- Ecommerce",
  "Retail Pricing",
];
const GROUPS: { id: string; label: string; kind: string; items: string[] }[] = [
  {
    id: "apps",
    label: "Applications",
    kind: "Application",
    items: [
      "K-Nova Demo",
      "CPG - RGM - Promo Optimization Journey",
      "Assortment Planner",
      "Germany-SellOut analyser",
    ],
  },
  { id: "dm", label: "Data Model", kind: "Data Model", items: ["Sales Cube", "Shipments Mart"] },
  {
    id: "assist",
    label: "Assistants",
    kind: "Assistant",
    items: ["RGM Bot", "Contact Review Bot"],
  },
  { id: "agents", label: "AI Agents", kind: "AI Agent", items: ["Promo Planner Agent"] },
];
const ROLE_OPTIONS = ["Workspace Admin", "Workspace Contributor", "Artifact Contributor", "Reader"];
const WORKSPACES = ["Workspace 1", "Workspace 2"];

export const FEATURE_PERMS = [
  "Can Export",
  "Can Rename",
  "Can Copy",
  "Can Move",
  "Can Create Variation",
  "Can Create function",
  "Can Create Preview",
  "Can Execute Preview",
  "Can Create Preview Execute Start",
  "Can Create Execute Environment",
  "Can Reset All Apps",
  "Can Reset my App",
  "Can Edit Prod Exec",
];
const GENERAL_PERMS = ["Can View", "Can Comment", "Can Share", "Can Bookmark"];

const FULL: Setting = {
  access: "full",
  perms: { general: true, feature: true, checks: [...GENERAL_PERMS, ...FEATURE_PERMS] },
};
const key = (project: string, item: string) => `${project}::${item}`;

/** Seeded so the Figma scenario is visible on "Project lists 2". */
const SEED: Record<string, Setting> = {
  [key("CPG- Supply", "CPG - RGM - Promo Optimization Journey")]: { ...FULL, access: "none" },
  [key("Project lists 2", "K-Nova Demo")]: { ...FULL, access: "none" },
  [key("Project lists 2", "Assortment Planner")]: {
    access: "limited",
    perms: {
      general: true,
      feature: true,
      checks: [
        ...GENERAL_PERMS,
        ...FEATURE_PERMS.filter((p) => p !== "Can Copy" && p !== "Can Move"),
      ],
    },
  },
};

const an = (r: string) => (/^[aeiou]/i.test(r) ? `An ${r}` : `A ${r}`);

const ACCESS_META: Record<
  Access,
  {
    label: string;
    chip: "success" | "warning" | "error";
    tile: string;
    text: (role: string) => string;
  }
> = {
  full: {
    label: "Full Access",
    chip: "success",
    tile: "bg-(--color-background-positive-subtle)",
    text: (r) =>
      `${an(r)} has broad permissions to build and manage workspace assets. They can create, edit, clone, share, delete, and preview items, manage production runs, and create screens or functions for collaborative development.`,
  },
  limited: {
    label: "Limited Access",
    chip: "warning",
    tile: "bg-(--color-background-warning-subtle)",
    text: (r) =>
      `${an(r)} (Limited Access) has customizable permissions, allowing you to choose their preferred combination of configuration and action controls.`,
  },
  none: {
    label: "No Access",
    chip: "error",
    tile: "bg-(--color-background-negative-subtle)",
    text: () =>
      "This person won't see this artifact anywhere in Studios, including search and shared links.",
  },
};

/* ------------------------------------------------------------------ */
/* Roles & Access side panel                                           */
/* ------------------------------------------------------------------ */
export function RolesAccessDrawer({
  open,
  onOpenChange,
  notify,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  notify: (t: string, d?: string) => void;
}) {
  const [person, setPerson] = React.useState<(typeof PEOPLE)[number] | null>(null);
  const [q, setQ] = React.useState("");
  const [type, setType] = React.useState("all");
  const [roleF, setRoleF] = React.useState("all");

  React.useEffect(() => {
    if (open) {
      setPerson(null);
      setQ("");
    }
  }, [open]);

  const people = PEOPLE.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) &&
      (roleF === "all" || p.role === roleF) &&
      (type === "all" || type === "user")
  );

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      size="default"
      title="Roles & Access"
      footer={
        person ? undefined : (
          <p className="mr-auto nuclios-type-body-small-regular text-(--color-text-neutral-muted)">
            Select someone to set their access to this project's artifacts.
          </p>
        )
      }
    >
      {person ? (
        <PersonSettings
          key={person.email}
          person={person}
          onBack={() => setPerson(null)}
          onDone={(msg) => {
            notify("Access updated", msg);
            onOpenChange(false);
          }}
        />
      ) : (
        <div className="flex flex-col gap-(--spacing-l)">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-icons-neutral-subtle)"
              aria-hidden
            />
            <input
              aria-label="Find someone"
              placeholder="Find someone"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-11 w-full rounded-(--radius-component-set-4) border border-(--color-border-neutral) bg-(--color-background-neutral) pl-9 pr-3 nuclios-type-body-default-regular text-(--color-text-neutral) placeholder:text-(--color-text-neutral-muted) focus-visible:border-(--color-border-primary) focus-visible:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-(--spacing-xl)">
            <Dropdown
              id="ra-type"
              label="Type"
              size="m"
              options={[
                { value: "all", label: "All" },
                { value: "user", label: "Users" },
                { value: "group", label: "Groups" },
              ]}
              value={type}
              onValueChange={setType}
            />
            <Dropdown
              id="ra-role"
              label="Role"
              size="m"
              options={[
                { value: "all", label: "All" },
                ...["Admin", "Contributor", "Reader"].map((r) => ({ value: r, label: r })),
              ]}
              value={roleF}
              onValueChange={setRoleF}
            />
          </div>
          <ul className="flex flex-col">
            {people.map((p) => (
              <li key={p.email}>
                <button
                  type="button"
                  onClick={() => setPerson(p)}
                  className="flex w-full items-center gap-(--spacing-l) rounded-(--radius-component-set-1) px-(--spacing-xs) py-(--spacing-xs) text-left cursor-pointer hover:bg-(--color-background-neutral-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
                >
                  <Avatar name={p.name} size="l" />
                  <span className="flex-1 nuclios-type-body-default-regular text-(--color-text-neutral)">
                    {p.name}
                  </span>
                  <RoleChip role={p.role} />
                </button>
              </li>
            ))}
            {people.length === 0 && (
              <li className="py-(--spacing-xl) text-center nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
                {type === "group" ? "No groups have access yet." : "No one matches your filters."}
              </li>
            )}
          </ul>
        </div>
      )}
    </Drawer>
  );
}

/* ------------------------------------------------------------------ */
/* Details + Advanced settings — Figma 12344:8424                      */
/* ------------------------------------------------------------------ */
function PersonSettings({
  person,
  onBack,
  onDone,
}: {
  person: (typeof PEOPLE)[number];
  onBack: () => void;
  onDone: (msg: string) => void;
}) {
  const [role, setRole] = React.useState("Artifact Contributor");
  const [workspace, setWorkspace] = React.useState("Workspace 1");
  const [project, setProject] = React.useState("Project lists 2");
  const [settings, setSettings] = React.useState<Record<string, Setting>>(SEED);
  const [editing, setEditing] = React.useState<{
    group: (typeof GROUPS)[number];
    item: string;
  } | null>(null);
  const scroller = React.useRef<HTMLDivElement>(null);

  const get = (item: string) => settings[key(project, item)] ?? FULL;
  const restricted = Object.entries(settings).filter(([, s]) => s.access !== "full").length;

  return (
    <div className="flex min-h-full flex-col">
      <section className="border-b border-(--color-border-subtle) pb-(--spacing-xl)">
        <h3 className="nuclios-type-body-small-medium tracking-[1px] text-(--color-text-neutral)">
          DETAILS
        </h3>
        <p className="mt-(--spacing-l) nuclios-type-body-large-regular text-(--color-text-neutral)">
          {person.name}
        </p>
        <p className="nuclios-type-body-default-regular text-(--color-text-neutral-subtle)">
          {person.email}
        </p>
      </section>

      <section className="border-b border-(--color-border-subtle) py-(--spacing-xl)">
        <div className="flex items-center gap-(--spacing-s)">
          <Button
            variant="ghost"
            size="small"
            iconOnly
            aria-label="Back to people"
            onClick={onBack}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <h3 className="nuclios-type-body-small-medium tracking-[1px] text-(--color-text-neutral)">
            ADVANCED SETTINGS
          </h3>
        </div>
        <div className="mt-(--spacing-l) flex flex-wrap gap-x-(--spacing-4xl) gap-y-(--spacing-s)">
          <Dropdown
            id="ra-person-role"
            label="Role"
            header="inline"
            variant="filled"
            size="m"
            className="w-auto"
            options={ROLE_OPTIONS.map((r) => ({ value: r, label: r }))}
            value={role}
            onValueChange={setRole}
          />
          <Dropdown
            id="ra-person-ws"
            label="Workspace"
            header="inline"
            variant="filled"
            size="m"
            className="w-auto"
            options={WORKSPACES.map((w) => ({ value: w, label: w }))}
            value={workspace}
            onValueChange={setWorkspace}
          />
        </div>
      </section>

      <section className="border-b border-(--color-border-subtle) py-(--spacing-xl)">
        <p className="nuclios-type-body-default-regular text-(--color-text-neutral-subtle)">
          Project/s
        </p>
        <div className="mt-(--spacing-s) flex items-center gap-(--spacing-2xs)">
          <Button
            variant="ghost"
            size="small"
            iconOnly
            aria-label="Scroll projects left"
            onClick={() => scroller.current?.scrollBy({ left: -200, behavior: "smooth" })}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div
            ref={scroller}
            role="radiogroup"
            aria-label="Project"
            className="flex flex-1 gap-(--spacing-xs) overflow-x-auto [scrollbar-width:none]"
          >
            {PROJECTS.map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={p === project}
                onClick={() => setProject(p)}
                className="shrink-0 cursor-pointer rounded-(--radius-pill) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
              >
                <Chip
                  size="m"
                  state={p === project ? "selected" : "rest"}
                  className={cn(
                    "whitespace-nowrap",
                    p === project && "border border-(--color-border-primary)"
                  )}
                >
                  {p}
                </Chip>
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="small"
            iconOnly
            aria-label="Scroll projects right"
            onClick={() => scroller.current?.scrollBy({ left: 200, behavior: "smooth" })}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </section>

      <section className="flex-1 py-(--spacing-xl)">
        <Accordion
          multiple
          type="stroke"
          trigger="left"
          defaultValue={["apps"]}
          items={GROUPS.map((g) => {
            const changed = g.items.some((i) => get(i).access !== "full");
            return {
              value: g.id,
              title: (
                <span className="flex w-full items-center justify-between gap-(--spacing-s)">
                  {g.label}
                  {changed && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSettings((s) => {
                          const n = { ...s };
                          g.items.forEach((i) => delete n[key(project, i)]);
                          return n;
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          (e.currentTarget as HTMLElement).click();
                        }
                      }}
                      className="rounded-(--radius-component-set-1) px-(--spacing-xs) nuclios-type-body-default-regular text-(--color-text-primary) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
                    >
                      Reset
                    </span>
                  )}
                </span>
              ),
              content: (
                <ul className="-mx-(--spacing-l)">
                  {g.items.map((item) => {
                    const s = get(item);
                    const meta = ACCESS_META[s.access];
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => setEditing({ group: g, item })}
                          className="flex w-full items-center justify-between gap-(--spacing-l) px-(--spacing-4xl) py-(--spacing-s) text-left cursor-pointer hover:bg-(--color-background-primary-muted) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--color-border-primary-focused)"
                        >
                          <span className="nuclios-type-body-default-regular text-(--color-text-neutral)">
                            {item}
                          </span>
                          <Chip size="s" state={meta.chip} className="shrink-0 font-medium">
                            {meta.label}
                          </Chip>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ),
            };
          })}
        />
      </section>

      <div className="sticky bottom-0 flex justify-end gap-(--spacing-l) border-t border-(--color-border-subtle) bg-(--color-surface-surface-3) py-(--spacing-l)">
        <Button
          onClick={() =>
            onDone(
              `${person.name} is now ${role} in ${workspace}${restricted ? ` with ${restricted} restricted artifact${restricted > 1 ? "s" : ""}` : ""}.`
            )
          }
        >
          Save
        </Button>
        <Button variant="border" onClick={onBack}>
          Cancel
        </Button>
      </div>

      <ArtifactAccessModal
        target={editing}
        role={role}
        current={editing ? get(editing.item) : FULL}
        onClose={() => setEditing(null)}
        onApply={(s, all) => {
          if (!editing) return;
          setSettings((prev) => {
            const n = { ...prev };
            (all ? editing.group.items : [editing.item]).forEach((i) => (n[key(project, i)] = s));
            return n;
          });
          setEditing(null);
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Per-artifact access — Figma 12344:8638 (Full) / 12344:8867 (Limited) */
/* ------------------------------------------------------------------ */
function PermCard({
  id,
  title,
  enabled,
  onEnabled,
  items,
  checks,
  onChecks,
  defaultOpen,
}: {
  id: string;
  title: string;
  enabled: boolean;
  onEnabled: (v: boolean) => void;
  items: string[];
  checks: string[];
  onChecks: (c: string[]) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className="rounded-(--radius-component-set-4) border border-(--color-border-subtle)">
      <div className="flex items-center justify-between gap-(--spacing-l) px-(--spacing-l) py-(--spacing-s)">
        <span className="nuclios-type-body-default-medium text-(--color-text-neutral)">
          {title}
        </span>
        <span className="flex items-center gap-(--spacing-s)">
          <Toggle
            id={`${id}-on`}
            aria-label={`Enable ${title.toLowerCase()}`}
            checked={enabled}
            onCheckedChange={(v) => {
              onEnabled(v);
              onChecks(v ? items : []);
            }}
          />
          <Button
            variant="ghost"
            size="small"
            iconOnly
            aria-expanded={open}
            aria-controls={`${id}-list`}
            aria-label={`${open ? "Collapse" : "Expand"} ${title.toLowerCase()}`}
            onClick={() => setOpen((o) => !o)}
          >
            <ChevronDown className={cn("size-4 transition-transform", !open && "-rotate-90")} />
          </Button>
        </span>
      </div>
      {open && (
        <ul
          id={`${id}-list`}
          className="max-h-[30vh] overflow-y-auto border-t border-(--color-border-subtle) px-(--spacing-l) py-(--spacing-s)"
        >
          {items.map((p, i) => (
            <li key={p} className="py-(--spacing-2xs)">
              <Checkbox
                id={`${id}-${i}`}
                label={p}
                checked={checks.includes(p)}
                onCheckedChange={(c) =>
                  onChecks(c === true ? [...checks, p] : checks.filter((x) => x !== p))
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ArtifactAccessModal({
  target,
  role,
  current,
  onClose,
  onApply,
}: {
  target: { group: (typeof GROUPS)[number]; item: string } | null;
  role: string;
  current: Setting;
  onClose: () => void;
  onApply: (s: Setting, applyToAll: boolean) => void;
}) {
  const [access, setAccess] = React.useState<Access>("full");
  const [general, setGeneral] = React.useState(true);
  const [feature, setFeature] = React.useState(true);
  const [checks, setChecks] = React.useState<string[]>([]);
  const [all, setAll] = React.useState(false);

  React.useEffect(() => {
    if (!target) return;
    setAccess(current.access);
    setGeneral(current.perms.general);
    setFeature(current.perms.feature);
    setChecks(current.perms.checks);
    setAll(false);
  }, [target, current]);

  const meta = ACCESS_META[access];
  const kindPlural = target ? target.group.label.toLowerCase() : "";

  return (
    <SidePanel
      open={!!target}
      onOpenChange={(o) => !o && onClose()}
      width={560}
      title={
        <span className="flex flex-col gap-(--spacing-xs)">
          <Chip size="s" className="w-fit tracking-[0.5px] uppercase">
            {target?.group.kind}
          </Chip>
          {target?.item}
        </span>
      }
      description={`Access for this ${target?.group.kind.toLowerCase()} as ${role}.`}
      footer={
        <>
          <Button variant="border" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              onApply(
                {
                  access,
                  perms:
                    access === "full"
                      ? FULL.perms
                      : access === "none"
                        ? { general: false, feature: false, checks: [] }
                        : { general, feature, checks },
                },
                all
              )
            }
          >
            Apply
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-(--spacing-xl)">
        <div>
          <h4 className="mb-(--spacing-s) nuclios-type-body-small-medium tracking-[1px] text-(--color-text-neutral)">
            ACCESS TYPE
          </h4>
          <RadioGroup
            value={access}
            onValueChange={(v) => setAccess(v as Access)}
            aria-label="Access type"
            className="grid grid-cols-3 gap-0 overflow-hidden rounded-(--radius-component-set-4) border border-(--color-border-subtle)"
          >
            {(Object.keys(ACCESS_META) as Access[]).map((a, i) => (
              <label
                key={a}
                htmlFor={`acc-${a}`}
                className={cn(
                  "flex h-16 cursor-pointer items-center justify-center transition-colors",
                  i > 0 && "border-l border-(--color-border-subtle)",
                  access === a ? ACCESS_META[a].tile : "hover:bg-(--color-background-neutral-hover)"
                )}
              >
                <Radio id={`acc-${a}`} value={a} label={ACCESS_META[a].label} />
              </label>
            ))}
          </RadioGroup>
          <p className="mt-(--spacing-s) flex gap-(--spacing-s) rounded-(--radius-component-set-4) bg-(--color-background-information-subtle) p-(--spacing-l) nuclios-type-body-small-regular text-(--color-text-neutral)">
            <Info className="mt-0.5 size-4 shrink-0 text-(--color-icons-information)" aria-hidden />
            {meta.text(role)}
          </p>
        </div>

        {access === "limited" && (
          <div className="flex flex-col gap-(--spacing-s)">
            <PermCard
              id="perm-general"
              title="General settings"
              enabled={general}
              onEnabled={setGeneral}
              items={GENERAL_PERMS}
              checks={checks.filter((c) => GENERAL_PERMS.includes(c))}
              onChecks={(c) =>
                setChecks([...c, ...checks.filter((x) => !GENERAL_PERMS.includes(x))])
              }
            />
            <PermCard
              id="perm-feature"
              title="Feature settings"
              enabled={feature}
              onEnabled={setFeature}
              items={FEATURE_PERMS}
              checks={checks.filter((c) => FEATURE_PERMS.includes(c))}
              onChecks={(c) =>
                setChecks([...checks.filter((x) => !FEATURE_PERMS.includes(x)), ...c])
              }
              defaultOpen
            />
          </div>
        )}

        <Checkbox
          id="acc-all"
          label={`Apply this configuration to all the ${kindPlural}`}
          checked={all}
          onCheckedChange={(c) => setAll(c === true)}
        />
      </div>
    </SidePanel>
  );
}
