import * as React from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  Button,
  Chip,
  DataTable,
  Input,
  Modal,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toggle,
  Tooltip,
  Dropdown,
  type Column,
} from "@nuclios";
import { USERS, WORKSPACES, type AdminUser } from "@/data";

const iconBtn =
  "inline-flex size-8 items-center justify-center rounded-(--radius-component-set-1) text-(--color-icons-neutral-subtle) hover:bg-(--color-background-neutral-hover) hover:text-(--color-icons-neutral) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused) cursor-pointer";

type Row = AdminUser & { workplace?: string; project?: string; actions?: string };

const ROLE_STATE = { Admin: "error", Contributor: "selected", Reader: "success" } as const;

function Role({ role, n }: { role: keyof typeof ROLE_STATE; n: number }) {
  return (
    <Chip size="s" state={ROLE_STATE[role]} className="gap-1.5 font-medium">
      {role} <span className="font-normal opacity-80">{n}</span>
    </Chip>
  );
}

function RoleSet() {
  return (
    <span className="flex flex-wrap gap-1.5">
      <Role role="Admin" n={1} />
      <Role role="Contributor" n={1} />
      <Role role="Reader" n={99} />
    </span>
  );
}

export function Admin({ notify }: { notify: (t: string, d?: string) => void }) {
  const [users, setUsers] = React.useState(USERS);
  const [q, setQ] = React.useState("");
  const [addOpen, setAddOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<AdminUser["org"]>("Reader");

  const columns: Column<Row>[] = [
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
      render: (u) => <Role role={u.org} n={u.org === "Reader" ? 99 : 1} />,
    },
    { key: "workplace", header: "Workplace Roles", render: () => <RoleSet /> },
    { key: "project", header: "Project Roles", render: () => <RoleSet /> },
  ];
  const withActions: Column<Row>[] = [
    ...columns,
    {
      key: "actions",
      header: "",
      align: "right",
      render: (u) => (
        <span className="flex justify-end gap-2">
          <Tooltip content="Edit roles">
            <button type="button" aria-label={`Edit ${u.name}`} className={iconBtn}>
              <Pencil className="size-4" />
            </button>
          </Tooltip>
          <Tooltip content="Remove user">
            <button
              type="button"
              aria-label={`Remove ${u.name}`}
              className={iconBtn}
              onClick={() => {
                setUsers((xs) => xs.filter((x) => x.id !== u.id));
                notify("User removed", `${u.name} no longer has access.`);
              }}
            >
              <Trash2 className="size-4" />
            </button>
          </Tooltip>
        </span>
      ),
    },
  ];

  const rows = users.filter((u) => `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="mx-auto w-full max-w-[1824px] px-4 pb-16 pt-8 sm:px-12">
      <h1 className="nuclios-type-heading-h4-regular text-(--color-text-neutral)">Admin</h1>
      <Tabs defaultValue="roles" className="mt-8">
        <div className="flex items-end justify-between gap-4 border-b border-(--color-border-subtle)">
          <TabsList tone="brand" aria-label="Admin sections" className="border-b-0">
            <TabsTrigger value="roles">Roles and permissions</TabsTrigger>
            <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
            <TabsTrigger value="platform">Platform Util</TabsTrigger>
          </TabsList>
          <Button
            variant="border"
            size="medium"
            className="mb-2"
            leadingIcon={<Plus className="size-4" aria-hidden />}
            onClick={() => setAddOpen(true)}
          >
            User
          </Button>
        </div>

        <TabsContent value="roles" className="mt-4">
          <DataTable
            className="rounded-(--radius-container-set-2) border border-(--color-border-subtle)"
            title="All Workspaces"
            actions={
              <div className="relative w-[300px] max-sm:w-44">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-icons-neutral-subtle)"
                  aria-hidden
                />
                <Input
                  id="admin-search"
                  size="m"
                  aria-label="Search users"
                  placeholder="Search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="pl-9"
                />
              </div>
            }
            columns={withActions}
            rows={rows}
            rowKey={(u) => u.id}
            emptyMessage="No users match your search."
          />
        </TabsContent>

        <TabsContent value="workspaces" className="mt-4">
          <DataTable
            className="rounded-(--radius-container-set-2) border border-(--color-border-subtle)"
            title="Workspaces"
            columns={[
              { key: "name", header: "Workspace", sortable: true },
              { key: "owner", header: "Owner" },
              { key: "members", header: "Members", sortable: true, align: "right" },
            ]}
            rows={WORKSPACES.map((w, i) => ({
              id: w,
              name: w,
              owner: ["Micheal", "Dwight", "Angela"][i],
              members: [24, 12, 9][i],
            }))}
            rowKey={(r) => r.id}
          />
        </TabsContent>

        <TabsContent
          value="platform"
          className="mt-4 flex max-w-xl flex-col gap-6 rounded-(--radius-container-set-2) border border-(--color-border-subtle) bg-(--color-background-neutral) p-6"
        >
          <Toggle
            id="pu-1"
            label="Allow users to create workspaces"
            description="Contributors can create new workspaces without admin approval."
            defaultChecked
          />
          <Toggle
            id="pu-2"
            label="Require approval to promote artifacts"
            description="Promotions to Production need a workspace admin."
          />
          <Toggle
            id="pu-3"
            label="Enable AI assistants"
            description="Makes Assistants available on every user's home page."
            defaultChecked
          />
        </TabsContent>
      </Tabs>

      <Modal
        open={addOpen}
        onOpenChange={setAddOpen}
        size="s"
        title="Add user"
        description="They'll get an email invite to NucliOS Studios."
        footer={
          <>
            <Button variant="border" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!/\S+@\S+\.\S+/.test(email)}
              onClick={() => {
                const name = email.split("@")[0];
                setUsers((xs) => [
                  ...xs,
                  {
                    id: `u${Date.now()}`,
                    name: name[0].toUpperCase() + name.slice(1),
                    email,
                    created: "Just now",
                    org: role,
                  },
                ]);
                notify("Invite sent", `${email} was added as ${role}.`);
                setEmail("");
                setAddOpen(false);
              }}
            >
              Send invite
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            id="new-email"
            type="email"
            label="Work email"
            required
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Dropdown
            id="new-role"
            label="Organisation role"
            options={["Admin", "Contributor", "Reader"].map((r) => ({ value: r, label: r }))}
            value={role}
            onValueChange={(v) => setRole(v as AdminUser["org"])}
          />
        </div>
      </Modal>
    </main>
  );
}
