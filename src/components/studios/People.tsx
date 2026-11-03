import * as React from "react";
import { Search } from "lucide-react";
import { Button, Checkbox, Chip, Dropdown, Input, SidePanel } from "@nuclios";
import { PEOPLE, ROLES, type Role } from "@/data";
import { cn } from "@/lib/utils";

const ROLE_BG: Record<Role, string> = {
  Admin: "bg-(--studios-role-admin)",
  Contributor: "bg-(--studios-role-contributor)",
  Reader: "bg-(--studios-role-reader)",
};

/** Admin role chip — Figma 2014:13242 (label + white count bubble). Built on the NucliOS Chip. */
export function RoleChip({ role, n }: { role: Role; n?: number }) {
  return (
    <Chip
      size="m"
      className={cn(
        "h-6 gap-1 pl-(--spacing-xs) nuclios-type-body-small-medium tracking-[0.5px] text-(--studios-role-text)",
        n !== undefined ? "pr-0.5" : "pr-(--spacing-xs)",
        ROLE_BG[role]
      )}
    >
      {role}
      {n !== undefined && (
        <span className="inline-flex size-5 items-center justify-center rounded-(--radius-pill) bg-(--studios-role-count) nuclios-type-body-x-small-regular">
          {n}
        </span>
      )}
    </Chip>
  );
}

export const roleOptions = ROLES.map((r) => ({ value: r, label: r }));

export function RoleSelect({
  id,
  value,
  onChange,
  label,
  className,
}: {
  id: string;
  value: Role;
  onChange: (r: Role) => void;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("w-36", className)}>
      {/* Visually hidden label: the NucliOS Dropdown has no aria-label prop when header="none". */}
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Dropdown
        id={id}
        header="none"
        size="m"
        options={roleOptions}
        value={value}
        onValueChange={(v) => onChange(v as Role)}
      />
    </div>
  );
}

export type Member = { email: string; role: Role };

/**
 * "Members" step used by Create Workspace (Figma 2028:7826) and Add Project (6114:28198):
 * type emails (comma / Enter), then set access per person.
 */
export function MembersEditor({
  idPrefix,
  label = "Add People",
  members,
  onChange,
  aside,
}: {
  idPrefix: string;
  label?: string;
  members: Member[];
  onChange: (m: Member[]) => void;
  aside?: React.ReactNode;
}) {
  const [draft, setDraft] = React.useState("");
  const add = (raw: string) => {
    const emails = raw
      .split(/[,\s]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => /\S+@\S+\.\S+/.test(e) && !members.some((m) => m.email === e));
    if (emails.length)
      onChange([...members, ...emails.map((email) => ({ email, role: "Contributor" as Role }))]);
    setDraft("");
  };
  const listId = `${idPrefix}-people`;

  return (
    <div className="flex flex-col gap-(--spacing-l)">
      <div className="flex flex-wrap items-end gap-(--spacing-l)">
        <Input
          id={`${idPrefix}-add`}
          label={label}
          placeholder="Enter email, separated by commas"
          list={listId}
          value={draft}
          onChange={(e) => {
            const v = e.target.value;
            if (/[,;]$/.test(v)) add(v);
            else setDraft(v);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add(draft);
            }
          }}
          onBlur={() => draft && add(draft)}
          fieldClassName="min-w-60 flex-1"
        />
        <datalist id={listId}>
          {PEOPLE.filter((p) => !members.some((m) => m.email === p)).map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
        {aside}
      </div>

      <div className="overflow-hidden rounded-(--radius-component-set-4) border border-(--color-border-subtle)">
        <div className="flex items-center justify-between border-b border-(--color-border-subtle) px-(--spacing-l) py-(--spacing-s) nuclios-type-body-small-medium text-(--color-text-neutral)">
          <span>Name</span>
          <span className="w-36 pl-(--spacing-s)">Access</span>
        </div>
        {members.length === 0 ? (
          <p className="px-(--spacing-l) py-(--spacing-xl) text-center nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
            No one added yet. Type an email above and press Enter.
          </p>
        ) : (
          <ul className="max-h-[188px] overflow-y-auto">
            {members.map((m, i) => (
              <li
                key={m.email}
                className="flex items-center justify-between gap-(--spacing-l) border-b border-(--color-border-subtle) px-(--spacing-l) py-(--spacing-xs) last:border-b-0"
              >
                <Chip
                  size="l"
                  onRemove={() => onChange(members.filter((x) => x.email !== m.email))}
                  removeLabel={`Remove ${m.email}`}
                >
                  {m.email}
                </Chip>
                <RoleSelect
                  id={`${idPrefix}-role-${i}`}
                  label={`Access for ${m.email}`}
                  value={m.role}
                  onChange={(role) =>
                    onChange(members.map((x) => (x.email === m.email ? { ...x, role } : x)))
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * "Add to workspace" / "Add to project" (Figma 2014:11880 / 2014:11919):
 * multi-select with chips + searchable checkbox list, one role for all.
 */
export function AssignModal({
  open,
  onOpenChange,
  kind,
  options,
  onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  kind: "workspace" | "project";
  options: string[];
  onSave: (names: string[], role: Role) => void;
}) {
  const [picked, setPicked] = React.useState<string[]>([]);
  const [q, setQ] = React.useState("");
  const [role, setRole] = React.useState<Role>("Contributor");
  React.useEffect(() => {
    if (open) {
      setPicked([]);
      setQ("");
      setRole("Contributor");
    }
  }, [open]);
  const Label = kind === "workspace" ? "Workspace" : "Project";
  const shown = options.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  const toggle = (o: string, on: boolean) =>
    setPicked((p) => (on ? [...p, o] : p.filter((x) => x !== o)));

  return (
    <SidePanel
      open={open}
      onOpenChange={onOpenChange}
      width={560}
      title={`Add to ${kind}`}
      footer={
        <>
          <Button variant="neutral" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!picked.length}
            onClick={() => {
              onSave(picked, role);
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap items-start gap-(--spacing-l)">
        <div className="flex min-w-60 flex-1 flex-col gap-(--spacing-2xs)">
          <span className="nuclios-type-body-large-medium text-(--color-text-neutral)">
            {Label}
          </span>
          <div
            aria-live="polite"
            className="flex min-h-11 flex-wrap items-center gap-(--spacing-xs) rounded-(--radius-component-set-4) border border-(--color-border-neutral) bg-(--color-background-neutral) px-(--spacing-s) py-(--spacing-xs)"
          >
            {picked.length === 0 ? (
              <span className="nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
                Select one or more {kind}s below
              </span>
            ) : (
              picked.map((p) => (
                <Chip
                  key={p}
                  size="m"
                  state="selected"
                  onRemove={() => toggle(p, false)}
                  removeLabel={`Remove ${p}`}
                >
                  {p}
                </Chip>
              ))
            )}
          </div>
          <div className="mt-(--spacing-s) overflow-hidden rounded-(--radius-component-set-4) border border-(--color-border-neutral)">
            <div className="relative border-b border-(--color-border-subtle)">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-icons-neutral-subtle)"
                aria-hidden
              />
              <input
                aria-label={`Search ${kind}s`}
                placeholder="Search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-10 w-full bg-transparent pl-9 pr-3 nuclios-type-body-default-regular text-(--color-text-neutral) placeholder:text-(--color-text-neutral-muted) focus-visible:outline-none"
              />
            </div>
            <ul className="max-h-44 overflow-y-auto py-(--spacing-2xs)">
              {shown.map((o, i) => (
                <li
                  key={o}
                  className="px-(--spacing-s) py-(--spacing-xs) hover:bg-(--color-background-neutral-hover)"
                >
                  <Checkbox
                    id={`assign-${kind}-${i}`}
                    size="m"
                    label={o}
                    checked={picked.includes(o)}
                    onCheckedChange={(c) => toggle(o, c === true)}
                  />
                </li>
              ))}
              {shown.length === 0 && (
                <li className="px-(--spacing-l) py-(--spacing-s) nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
                  No {kind}s match “{q}”.
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-(--spacing-2xs)">
          <span className="nuclios-type-body-large-medium text-(--color-text-neutral)">Role</span>
          <RoleSelect id={`assign-${kind}-role`} label="Role" value={role} onChange={setRole} />
        </div>
      </div>
    </SidePanel>
  );
}
