import * as React from "react";
import {
  Blocks,
  Factory,
  LayoutDashboard,
  Network,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Tag,
  Trash2,
  UserCog,
  Users,
} from "lucide-react";
import {
  Accordion,
  Button,
  DataTable,
  Drawer,
  Input,
  Modal,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  type Column,
} from "@nuclios";
import {
  ADMIN_WORKSPACES,
  PROJECT_OPTIONS,
  USERS,
  type AdminUser,
  type AdminWorkspace,
  type Membership,
  type Role,
} from "@/data";
import {
  AssignModal,
  MembersEditor,
  RoleChip,
  RoleSelect,
  type Member,
} from "@/components/studios/People";

const iconBtn =
  "inline-flex size-8 items-center justify-center rounded-(--radius-component-set-1) text-(--color-icons-neutral-subtle) hover:bg-(--color-background-neutral-hover) hover:text-(--color-icons-neutral) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused) cursor-pointer";

const ALL_PROJECTS = Object.values(PROJECT_OPTIONS).flat();
const DEFAULT_WS: Membership[] = [
  { name: "Marketing", role: "Admin" },
  { name: "Supply Chain", role: "Contributor" },
  { name: "Finance", role: "Reader" },
];
const DEFAULT_PROJ: Membership[] = [
  { name: "UK Promofit", role: "Admin" },
  { name: "UK Market Mix Model", role: "Contributor" },
  { name: "US Market Mix Model", role: "Reader" },
];

/** Count chips per role, e.g. Admin 1 · Contributor 1 · Reader 99 (Figma 2014:13240). */
function RoleSet({ items }: { items: Membership[] }) {
  const count = (r: Role) => items.filter((x) => x.role === r).length;
  return (
    <span className="flex flex-wrap gap-1">
      {(["Admin", "Contributor", "Reader"] as Role[]).map((r) =>
        count(r) ? <RoleChip key={r} role={r} n={count(r)} /> : null
      )}
      {items.length === 0 && (
        <span className="nuclios-type-body-small-regular text-(--color-text-neutral-muted)">—</span>
      )}
    </span>
  );
}

type UserRow = AdminUser & { wsRoles?: string; projRoles?: string; actions?: string };
type WsRow = AdminWorkspace & { memberCount?: number; actions?: string };
type Tab = "roles" | "workspaces" | "platform";

const searchBox = (id: string, label: string, q: string, setQ: (v: string) => void) => (
  <div className="relative w-[400px] max-md:w-56">
    <Search
      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-icons-neutral-subtle)"
      aria-hidden
    />
    <Input
      id={id}
      size="m"
      aria-label={label}
      placeholder="Search"
      value={q}
      onChange={(e) => setQ(e.target.value)}
      className="pl-9"
    />
  </div>
);

export function Admin({ notify }: { notify: (t: string, d?: string) => void }) {
  const [tab, setTab] = React.useState<Tab>("roles");
  const [users, setUsers] = React.useState<AdminUser[]>(() =>
    USERS.map((u) => ({
      ...u,
      workspaces: u.workspaces ?? DEFAULT_WS,
      projects: u.projects ?? DEFAULT_PROJ,
    }))
  );
  const [workspaces, setWorkspaces] = React.useState(ADMIN_WORKSPACES);
  const [q, setQ] = React.useState("");
  const [wq, setWq] = React.useState("");
  const [editingUser, setEditingUser] = React.useState<AdminUser | "new" | null>(null);
  const [editingWs, setEditingWs] = React.useState<AdminWorkspace | "new" | null>(null);
  const [toDelete, setToDelete] = React.useState<
    { kind: "user"; item: AdminUser } | { kind: "workspace"; item: AdminWorkspace } | null
  >(null);

  const userCols: Column<UserRow>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (u) => (
        <span className="flex flex-col">
          <span className="nuclios-type-body-default-medium">{u.name}</span>
          <span className="nuclios-type-body-small-regular text-(--color-text-neutral-muted)">
            {u.email}
          </span>
        </span>
      ),
    },
    { key: "created", header: "Created On", sortable: true },
    {
      key: "org",
      header: "Organisation",
      render: (u) => <RoleChip role={u.org} n={u.org === "Reader" ? 99 : 1} />,
    },
    {
      key: "wsRoles",
      header: "Workplace Roles",
      render: (u) => <RoleSet items={u.workspaces ?? []} />,
    },
    {
      key: "projRoles",
      header: "Project Roles",
      render: (u) => <RoleSet items={u.projects ?? []} />,
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (u) => (
        <span className="flex justify-end gap-2">
          <Tooltip content="Edit user">
            <button
              type="button"
              aria-label={`Edit ${u.name}`}
              className={iconBtn}
              onClick={() => setEditingUser(u)}
            >
              <Pencil className="size-4" />
            </button>
          </Tooltip>
          <Tooltip content="Remove user">
            <button
              type="button"
              aria-label={`Remove ${u.name}`}
              className={iconBtn}
              onClick={() => setToDelete({ kind: "user", item: u })}
            >
              <Trash2 className="size-4" />
            </button>
          </Tooltip>
        </span>
      ),
    },
  ];

  const wsCols: Column<WsRow>[] = [
    {
      key: "name",
      header: "Workspace name",
      sortable: true,
      render: (w) => <span className="nuclios-type-body-default-medium">{w.name}</span>,
    },
    { key: "created", header: "Created On", sortable: true },
    { key: "projects", header: "No. of Projects", sortable: true },
    {
      key: "memberCount",
      header: "Members",
      sortable: true,
      sortValue: (w) => w.members.length,
      render: (w) => w.members.length,
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (w) => (
        <span className="flex justify-end gap-2">
          <Tooltip content="Edit workspace">
            <button
              type="button"
              aria-label={`Edit ${w.name}`}
              className={iconBtn}
              onClick={() => setEditingWs(w)}
            >
              <Pencil className="size-4" />
            </button>
          </Tooltip>
          <Tooltip content="Delete workspace">
            <button
              type="button"
              aria-label={`Delete ${w.name}`}
              className={iconBtn}
              onClick={() => setToDelete({ kind: "workspace", item: w })}
            >
              <Trash2 className="size-4" />
            </button>
          </Tooltip>
        </span>
      ),
    },
  ];

  const userRows = users.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase())
  );
  const wsRows = workspaces.filter((w) => w.name.toLowerCase().includes(wq.toLowerCase()));
  const tableClass =
    "rounded-(--radius-container-set-2) border border-(--color-border-subtle) bg-(--color-background-neutral)";

  return (
    <main className="mx-auto w-full max-w-[1824px] px-4 pb-16 pt-8 sm:px-12">
      <h1 className="nuclios-type-heading-h4-regular text-(--color-text-neutral)">Admin</h1>
      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="mt-8">
        <div className="flex items-end justify-between gap-4 border-b border-(--color-border-subtle)">
          <TabsList tone="brand" aria-label="Admin sections" className="border-b-0">
            <TabsTrigger value="roles">Roles and Permissions</TabsTrigger>
            <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
            <TabsTrigger value="platform">Platform Utils</TabsTrigger>
          </TabsList>
          {tab !== "platform" && (
            <Button
              variant="border"
              size="medium"
              className="mb-2"
              leadingIcon={<Plus className="size-4" aria-hidden />}
              onClick={() => (tab === "roles" ? setEditingUser("new") : setEditingWs("new"))}
            >
              {tab === "roles" ? "User" : "Workspace"}
            </Button>
          )}
        </div>

        <TabsContent value="roles" className="mt-4">
          <DataTable
            className={tableClass}
            title="All Users"
            actions={searchBox("admin-search", "Search users", q, setQ)}
            columns={userCols}
            rows={userRows}
            rowKey={(u) => u.id}
            emptyMessage="No users match your search."
          />
        </TabsContent>

        <TabsContent value="workspaces" className="mt-4">
          <DataTable
            className={tableClass}
            title="All Workspaces"
            actions={searchBox("ws-admin-search", "Search workspaces", wq, setWq)}
            columns={wsCols}
            rows={wsRows}
            rowKey={(w) => w.id}
            emptyMessage="No workspaces match your search."
          />
        </TabsContent>

        <TabsContent value="platform" className="mt-6">
          <PlatformUtils onOpen={(t) => notify(t, "Opening configuration…")} />
        </TabsContent>
      </Tabs>

      <UserDrawer
        user={editingUser}
        workspaceNames={workspaces.map((w) => w.name)}
        onClose={() => setEditingUser(null)}
        onSave={(u, isNew) => {
          setUsers((xs) => (isNew ? [...xs, u] : xs.map((x) => (x.id === u.id ? u : x))));
          notify(isNew ? "User added" : "User updated", `${u.name}'s access was saved.`);
          setEditingUser(null);
        }}
      />

      <WorkspaceModal
        workspace={editingWs}
        onClose={() => setEditingWs(null)}
        onSave={(w, isNew) => {
          setWorkspaces((xs) => (isNew ? [...xs, w] : xs.map((x) => (x.id === w.id ? w : x))));
          notify(
            isNew ? "Workspace created" : "Workspace updated",
            `${w.name} has ${w.members.length} members.`
          );
          setEditingWs(null);
        }}
      />

      <Modal
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        size="xs"
        title={toDelete?.kind === "user" ? "Remove user?" : "Delete workspace?"}
        description={
          toDelete?.kind === "user"
            ? `${toDelete.item.name} will lose access to every workspace and project.`
            : toDelete
              ? `${toDelete.item.name} and its project links will be removed. This can't be undone.`
              : undefined
        }
        footer={
          <>
            <Button variant="neutral" onClick={() => setToDelete(null)}>
              Cancel
            </Button>
            <Button
              destructive
              onClick={() => {
                if (!toDelete) return;
                if (toDelete.kind === "user")
                  setUsers((xs) => xs.filter((x) => x.id !== toDelete.item.id));
                else setWorkspaces((xs) => xs.filter((x) => x.id !== toDelete.item.id));
                notify(
                  toDelete.kind === "user" ? "User removed" : "Workspace deleted",
                  `${toDelete.item.name} was removed.`
                );
                setToDelete(null);
              }}
            >
              {toDelete?.kind === "user" ? "Remove" : "Delete"}
            </Button>
          </>
        }
      />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* User Details side panel — Figma 2014:11797                          */
/* ------------------------------------------------------------------ */
function MembershipList({
  idPrefix,
  items,
  onChange,
  addLabel,
  onAdd,
}: {
  idPrefix: string;
  items: Membership[];
  onChange: (m: Membership[]) => void;
  addLabel: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-col gap-(--spacing-s)">
      {items.length === 0 && (
        <p className="nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
          Not a member yet.
        </p>
      )}
      {items.map((m, i) => (
        <div key={m.name} className="flex items-center justify-between gap-(--spacing-s)">
          <span className="min-w-0 truncate nuclios-type-body-default-regular text-(--color-text-neutral)">
            {m.name}
          </span>
          <span className="flex items-center gap-(--spacing-2xs)">
            <RoleSelect
              id={`${idPrefix}-${i}`}
              label={`Role in ${m.name}`}
              value={m.role}
              className="w-32"
              onChange={(role) =>
                onChange(items.map((x) => (x.name === m.name ? { ...x, role } : x)))
              }
            />
            <button
              type="button"
              aria-label={`Remove from ${m.name}`}
              className={iconBtn}
              onClick={() => onChange(items.filter((x) => x.name !== m.name))}
            >
              <Trash2 className="size-4" />
            </button>
          </span>
        </div>
      ))}
      <Button
        variant="ghost"
        size="medium"
        className="self-center"
        leadingIcon={<Plus className="size-4" aria-hidden />}
        onClick={onAdd}
      >
        {addLabel}
      </Button>
    </div>
  );
}

function UserDrawer({
  user,
  workspaceNames,
  onClose,
  onSave,
}: {
  user: AdminUser | "new" | null;
  workspaceNames: string[];
  onClose: () => void;
  onSave: (u: AdminUser, isNew: boolean) => void;
}) {
  const isNew = user === "new";
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [ws, setWs] = React.useState<Membership[]>([]);
  const [proj, setProj] = React.useState<Membership[]>([]);
  const [assign, setAssign] = React.useState<"workspace" | "project" | null>(null);
  const [tried, setTried] = React.useState(false);

  React.useEffect(() => {
    if (!user) return;
    const u = user === "new" ? null : user;
    setName(u ? (u.name === "Micheal" ? "Micheal Scott" : u.name) : "");
    setEmail(u?.email ?? "");
    setWs(u?.workspaces ?? []);
    setProj(u?.projects ?? []);
    setTried(false);
  }, [user]);

  const emailOk = /\S+@\S+\.\S+/.test(email);
  const merge = (cur: Membership[], names: string[], role: Role) => [
    ...cur.filter((c) => !names.includes(c.name)),
    ...names.map((n) => ({ name: n, role })),
  ];

  return (
    <>
      <Drawer
        open={!!user}
        onOpenChange={(o) => !o && onClose()}
        title={isNew ? "New User" : "User Details"}
        footer={
          <>
            <Button variant="border" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setTried(true);
                if (!name.trim() || !emailOk) return;
                const base = user && user !== "new" ? user : null;
                onSave(
                  {
                    id: base?.id ?? `u${Date.now()}`,
                    name: name.trim().split(" ")[0],
                    email: email.trim(),
                    created: base?.created ?? "Just now",
                    org: base?.org ?? "Reader",
                    workspaces: ws,
                    projects: proj,
                  },
                  isNew
                );
              }}
            >
              Save
            </Button>
          </>
        }
      >
        <Accordion
          multiple
          type="ghost"
          trigger="right"
          defaultValue={["details", "workspace", "project"]}
          items={[
            {
              value: "details",
              title: "Details",
              content: (
                <div className="flex flex-col gap-(--spacing-l) pb-(--spacing-s)">
                  <Input
                    id="ud-name"
                    label="User Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={tried && !name.trim() ? "Required" : undefined}
                  />
                  <Input
                    id="ud-email"
                    type="email"
                    label="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={tried && !emailOk ? "Enter a valid email" : undefined}
                  />
                </div>
              ),
            },
            {
              value: "workspace",
              title: `Workspace (${ws.length})`,
              content: (
                <MembershipList
                  idPrefix="ud-ws"
                  items={ws}
                  onChange={setWs}
                  addLabel="Add to new Workspace"
                  onAdd={() => setAssign("workspace")}
                />
              ),
            },
            {
              value: "project",
              title: `Project (${proj.length})`,
              content: (
                <MembershipList
                  idPrefix="ud-proj"
                  items={proj}
                  onChange={setProj}
                  addLabel="Add to new Project"
                  onAdd={() => setAssign("project")}
                />
              ),
            },
          ]}
        />
      </Drawer>

      <AssignModal
        open={assign !== null}
        onOpenChange={(o) => !o && setAssign(null)}
        kind={assign ?? "workspace"}
        options={(assign === "project" ? ALL_PROJECTS : workspaceNames).filter(
          (n) => !(assign === "project" ? proj : ws).some((m) => m.name === n)
        )}
        onSave={(names, role) =>
          assign === "project"
            ? setProj((p) => merge(p, names, role))
            : setWs((w) => merge(w, names, role))
        }
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Create / edit workspace — Figma 2024:7454 (Details) → 2028:7826     */
/* ------------------------------------------------------------------ */
function WorkspaceModal({
  workspace,
  onClose,
  onSave,
}: {
  workspace: AdminWorkspace | "new" | null;
  onClose: () => void;
  onSave: (w: AdminWorkspace, isNew: boolean) => void;
}) {
  const isNew = workspace === "new";
  const [step, setStep] = React.useState<"details" | "members">("details");
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [members, setMembers] = React.useState<Member[]>([]);
  const [tried, setTried] = React.useState(false);

  React.useEffect(() => {
    if (!workspace) return;
    const w = workspace === "new" ? null : workspace;
    setStep("details");
    setName(w?.name ?? "");
    setDesc(w?.description ?? "");
    setMembers(w ? w.members.slice(0, 6) : []);
    setTried(false);
  }, [workspace]);

  const next = () => {
    setTried(true);
    if (name.trim()) setStep("members");
  };

  return (
    <Modal
      open={!!workspace}
      onOpenChange={(o) => !o && onClose()}
      size="m"
      title={isNew ? "Create New Workspace" : `Edit ${name || "Workspace"}`}
    >
      <Tabs value={step} onValueChange={(v) => (v === "members" ? next() : setStep("details"))}>
        <TabsList tone="brand" aria-label="Workspace steps" className="w-fit">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="flex flex-col gap-(--spacing-xl) pt-(--spacing-xl)">
          <Input
            id="wsm-name"
            label="Workspace Name"
            required
            placeholder="Enter name of the workspace"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={tried && !name.trim() ? "Enter a workspace name" : undefined}
          />
          <Textarea
            id="wsm-desc"
            label="Description"
            placeholder="Describe the workspace"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="min-h-32"
          />
          <div>
            <Button size="large" onClick={next}>
              NEXT
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="members" className="flex flex-col gap-(--spacing-xl) pt-(--spacing-xl)">
          <MembersEditor idPrefix="wsm" members={members} onChange={setMembers} />
          <div className="flex gap-(--spacing-l)">
            <Button variant="border" size="large" onClick={() => setStep("details")}>
              BACK
            </Button>
            <Button
              size="large"
              onClick={() => {
                const base = workspace && workspace !== "new" ? workspace : null;
                onSave(
                  {
                    id: base?.id ?? `w${Date.now()}`,
                    name: name.trim(),
                    description: desc.trim(),
                    created: base?.created ?? "Just now",
                    projects: base?.projects ?? 0,
                    members: base
                      ? [
                          ...members,
                          ...base.members
                            .slice(6)
                            .filter((m) => !members.some((x) => x.email === m.email)),
                        ]
                      : members,
                  },
                  isNew
                );
              }}
            >
              SAVE
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Platform Utils — Figma 2022:7196                                    */
/* ------------------------------------------------------------------ */
const UTILS = [
  { label: "Industries", icon: Factory },
  { label: "Functions", icon: Network },
  { label: "Users", icon: Users },
  { label: "Dashboards", icon: LayoutDashboard },
  { label: "Ask NucliOS Consumers", icon: Sparkles },
  { label: "Solution Workbench Roles", icon: UserCog },
  { label: "Solution Blueprint", icon: Blocks },
  { label: "Business Tag Configurator", icon: Tag },
];

function PlatformUtils({ onOpen }: { onOpen: (label: string) => void }) {
  return (
    <ul className="grid grid-cols-2 gap-(--spacing-xl) md:grid-cols-4">
      {UTILS.map(({ label, icon: Icon }) => (
        <li key={label}>
          <button
            type="button"
            onClick={() => onOpen(label)}
            className="group flex h-[clamp(140px,20vh,226px)] w-full flex-col items-center justify-center gap-(--spacing-l) rounded-(--radius-container-set-1) border border-(--color-border-subtle) bg-(--color-background-neutral) px-(--spacing-l) text-center cursor-pointer transition-[box-shadow,border-color] hover:border-(--color-border-primary-subtle) hover:shadow-(--shadow-4) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
          >
            <Icon
              className="size-9 text-(--color-icons-primary-pressed) transition-transform group-hover:scale-110"
              strokeWidth={1.5}
              aria-hidden
            />
            <span className="nuclios-type-body-large-regular text-(--color-text-primary-pressed)">
              {label}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
