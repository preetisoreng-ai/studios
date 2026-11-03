import * as React from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  EllipsisVertical,
  Pencil,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import {
  Button,
  Chip,
  DataTable,
  Dropdown,
  Input,
  Menu,
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
  EXEC_ENVS,
  FUNCTIONS,
  INDUSTRIES,
  WORKSPACE_ARTIFACTS,
  WORKSPACES,
  type Project,
} from "@/data";
import { MembersEditor, type Member } from "@/components/studios/People";

const iconBtn =
  "inline-flex size-8 items-center justify-center rounded-(--radius-component-set-1) text-(--color-icons-neutral-subtle) hover:bg-(--color-background-neutral-hover) hover:text-(--color-icons-neutral) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused) cursor-pointer";

export function Workspace({
  projects,
  onProjectsChange,
  onBack,
  onOpenProject,
  notify,
}: {
  projects: Project[];
  onProjectsChange: (p: Project[]) => void;
  onBack: () => void;
  onOpenProject: (id: string) => void;
  notify: (title: string, description?: string) => void;
}) {
  const [workspace, setWorkspace] = React.useState(WORKSPACES[0]);
  const [industry, setIndustry] = React.useState("all");
  const [fn, setFn] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [addOpen, setAddOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Project | null>(null);
  const [tab, setTab] = React.useState("projects");
  const [toDelete, setToDelete] = React.useState<Project | null>(null);

  const rows = projects.filter(
    (p) =>
      p.workspace === workspace &&
      (query === "" ||
        `${p.name} ${p.description} ${p.collaborators}`.toLowerCase().includes(query.toLowerCase()))
  );

  const clone = (p: Project) => {
    onProjectsChange([...projects, { ...p, id: `p${Date.now()}`, name: `${p.name} (copy)` }]);
    notify("Project cloned", `${p.name} (copy) was added to ${workspace}.`);
  };

  const columns: Column<Project>[] = [
    { key: "name", header: "Name", sortable: true, className: "w-[22%]" },
    { key: "description", header: "Description", className: "w-[30%] whitespace-normal" },
    { key: "artifacts", header: "Artifacts", sortable: true },
    { key: "collaborators", header: "Collaborators", sortable: true },
    {
      key: "id",
      header: "",
      align: "right",
      render: (p) => (
        <span className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <Tooltip content="Edit">
            <button
              type="button"
              aria-label={`Edit ${p.name}`}
              className={iconBtn}
              onClick={() => setEditing(p)}
            >
              <Pencil className="size-4" />
            </button>
          </Tooltip>
          <Tooltip content="Clone">
            <button
              type="button"
              aria-label={`Clone ${p.name}`}
              className={iconBtn}
              onClick={() => clone(p)}
            >
              <Copy className="size-4" />
            </button>
          </Tooltip>
          <Menu
            align="end"
            trigger={
              <button type="button" aria-label={`More actions for ${p.name}`} className={iconBtn}>
                <EllipsisVertical className="size-4" />
              </button>
            }
            items={[
              {
                label: "Share",
                onSelect: () =>
                  notify(
                    "Share link copied",
                    `Anyone in ${workspace} with access can open ${p.name}.`
                  ),
              },
              {
                label: "Move to workspace",
                onSelect: () => notify("Move", "Choose a destination workspace (coming next)."),
              },
              {
                label: "Promote",
                onSelect: () =>
                  notify("Promoted to Production", `${p.name} is now visible to Readers.`),
              },
              {
                label: "Bookmark",
                onSelect: () => notify("Bookmarked", `${p.name} was added to your favourites.`),
              },
              {
                label: "Export",
                onSelect: () =>
                  notify("Export started", "You'll get a notification when the file is ready."),
              },
              { label: "Delete", onSelect: () => setToDelete(p) },
            ]}
          />
        </span>
      ),
    },
  ];

  const opt = (xs: string[]) => [
    { value: "all", label: "All" },
    ...xs.map((x) => ({ value: x, label: x })),
  ];

  return (
    <main className="mx-auto w-full max-w-[1824px] px-4 pb-16 pt-5 sm:px-12">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-3 rounded-(--radius-component-set-1) py-1 pr-2 nuclios-type-body-large-regular text-(--color-text-neutral) cursor-pointer hover:text-(--color-text-primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
      >
        <ArrowLeft className="size-4 text-(--color-icons-neutral-subtle)" aria-hidden />
        <h1>Manage Workspace</h1>
      </button>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <Dropdown
            id="ws-workspace"
            label="Workspace"
            header="inline"
            variant="filled"
            size="m"
            className="w-auto"
            options={WORKSPACES.map((w) => ({ value: w, label: w }))}
            value={workspace}
            onValueChange={setWorkspace}
          />
          {tab !== "exec" && (
            <>
              <Dropdown
                id="ws-industry"
                label="Industry"
                header="inline"
                variant="filled"
                size="m"
                className="w-auto"
                options={opt(INDUSTRIES)}
                value={industry}
                onValueChange={setIndustry}
              />
              <Dropdown
                id="ws-function"
                label="Function"
                header="inline"
                variant="filled"
                size="m"
                className="w-auto"
                options={opt(FUNCTIONS)}
                value={fn}
                onValueChange={setFn}
              />
            </>
          )}
          <Tooltip content="Reset filters">
            <button
              type="button"
              aria-label="Reset filters"
              className={iconBtn}
              onClick={() => {
                setIndustry("all");
                setFn("all");
              }}
            >
              <RotateCcw className="size-4" />
            </button>
          </Tooltip>
        </div>
        <Button
          size="medium"
          leadingIcon={<Plus className="size-4" aria-hidden />}
          onClick={() => setAddOpen(true)}
        >
          Project
        </Button>
      </div>

      <section className="mt-4 rounded-(--radius-container-set-2) border border-(--color-border-subtle) bg-(--color-background-neutral)">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-4">
            <TabsList
              type="ghost"
              aria-label="Workspace content"
              className="w-fit flex-none gap-0 overflow-hidden rounded-(--radius-component-set-1) border border-(--color-border-neutral) p-0"
            >
              <TabsTrigger value="projects" className="h-8 rounded-none px-3">
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="artifacts"
                className="h-8 rounded-none border-x border-(--color-border-neutral) px-3"
              >
                Artifacts
              </TabsTrigger>
              <TabsTrigger value="exec" className="h-8 rounded-none px-3">
                Exec. Environment
              </TabsTrigger>
            </TabsList>
            <div className="relative w-full max-w-[300px]">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-icons-neutral-subtle)"
                aria-hidden
              />
              <Input
                id="ws-search"
                size="m"
                aria-label={`Search ${tab === "exec" ? "environments" : tab}`}
                placeholder={`Search anything inside ${tab === "exec" ? "environments" : tab}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <TabsContent value="projects" className="mt-3">
            <DataTable
              columns={columns}
              rows={rows}
              rowKey={(p) => p.id}
              onRowClick={(p) => onOpenProject(p.id)}
              emptyMessage={
                query
                  ? "No projects match your search."
                  : "No projects in this workspace yet. Create one with + Project."
              }
            />
          </TabsContent>
          <TabsContent value="artifacts" className="mt-3">
            <DataTable
              columns={[
                { key: "name", header: "Artifact Name", sortable: true },
                { key: "project", header: "Project Location" },
                { key: "type", header: "Type", sortable: true },
                {
                  key: "tags",
                  header: "Tags",
                  render: (a) => (
                    <span className="flex flex-wrap gap-(--spacing-xs)">
                      {a.tags.map((t, i) => (
                        <Chip key={t} size="m" state={i === 0 ? "error" : "selected"}>
                          {t}
                        </Chip>
                      ))}
                    </span>
                  ),
                },
                { key: "collaborators", header: "Collaborators", sortable: true },
                {
                  key: "id",
                  header: "",
                  align: "right",
                  render: (a) => (
                    <span className="flex justify-end gap-2">
                      <Tooltip content="Edit">
                        <button
                          type="button"
                          aria-label={`Edit ${a.name}`}
                          className={iconBtn}
                          onClick={() => notify(`Edit ${a.name}`, "Opening the artifact overview.")}
                        >
                          <Pencil className="size-4" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Clone">
                        <button
                          type="button"
                          aria-label={`Clone ${a.name}`}
                          className={iconBtn}
                          onClick={() =>
                            notify("Artifact cloned", `${a.name} (copy) was added to ${a.project}.`)
                          }
                        >
                          <Copy className="size-4" />
                        </button>
                      </Tooltip>
                      <Menu
                        align="end"
                        trigger={
                          <button
                            type="button"
                            aria-label={`More actions for ${a.name}`}
                            className={iconBtn}
                          >
                            <EllipsisVertical className="size-4" />
                          </button>
                        }
                        items={["Share", "Move", "Promote", "Export"].map((label) => ({
                          label,
                          onSelect: () =>
                            notify(label, `${a.name}: ${label.toLowerCase()} started.`),
                        }))}
                      />
                    </span>
                  ),
                },
              ]}
              rows={WORKSPACE_ARTIFACTS.filter(
                (a) =>
                  a.workspace === workspace &&
                  `${a.name} ${a.project} ${a.type}`.toLowerCase().includes(query.toLowerCase())
              )}
              rowKey={(a) => a.id}
              emptyMessage="No artifacts in this workspace yet."
            />
          </TabsContent>
          <TabsContent value="exec" className="mt-3">
            <DataTable
              columns={[
                { key: "name", header: "Environment Name", sortable: true },
                { key: "python", header: "Python version" },
                {
                  key: "status",
                  header: "Status",
                  sortable: true,
                  render: (e) => (
                    <span className="flex items-center gap-(--spacing-xs)">
                      <CheckCircle2 className="size-4 text-(--color-icons-positive)" aria-hidden />
                      {e.status}
                    </span>
                  ),
                },
                {
                  key: "id",
                  header: "",
                  align: "right",
                  render: (e) => (
                    <span className="flex justify-end gap-2">
                      <Tooltip content="Edit">
                        <button
                          type="button"
                          aria-label={`Edit ${e.name}`}
                          className={iconBtn}
                          onClick={() =>
                            notify(`Edit ${e.name}`, "Environment settings open in a new tab.")
                          }
                        >
                          <Pencil className="size-4" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Clone">
                        <button
                          type="button"
                          aria-label={`Clone ${e.name}`}
                          className={iconBtn}
                          onClick={() =>
                            notify("Environment cloned", `${e.name} (copy) is starting.`)
                          }
                        >
                          <Copy className="size-4" />
                        </button>
                      </Tooltip>
                    </span>
                  ),
                },
              ]}
              rows={EXEC_ENVS.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))}
              rowKey={(e) => e.id}
            />
          </TabsContent>
        </Tabs>
      </section>

      <AddProjectModal
        open={addOpen || !!editing}
        onOpenChange={(o) => {
          if (!o) {
            setAddOpen(false);
            setEditing(null);
          }
        }}
        workspace={workspace}
        editing={editing}
        siblings={rows.map((p) => p.name)}
        onSave={(p, openAfter) => {
          const exists = projects.some((x) => x.id === p.id);
          onProjectsChange(
            exists ? projects.map((x) => (x.id === p.id ? p : x)) : [...projects, p]
          );
          notify(
            exists ? "Project updated" : "Project created",
            `${p.name} was saved in ${workspace}.`
          );
          if (openAfter) onOpenProject(p.id);
        }}
      />

      <Modal
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        size="xs"
        title="Delete project?"
        description={
          toDelete
            ? `${toDelete.name} and its artifact links will be removed for all collaborators. This can't be undone.`
            : undefined
        }
        footer={
          <>
            <Button variant="border" onClick={() => setToDelete(null)}>
              Cancel
            </Button>
            <Button
              destructive
              onClick={() => {
                if (!toDelete) return;
                onProjectsChange(projects.filter((p) => p.id !== toDelete.id));
                notify("Project deleted", `${toDelete.name} was removed.`);
                setToDelete(null);
              }}
            >
              Delete project
            </Button>
          </>
        }
      />
    </main>
  );
}

/* "Add Project" — Figma 1974:10384 (Details) → 6114:28198 (Members); edit = 6114:29408 */
function AddProjectModal({
  open,
  onOpenChange,
  workspace,
  editing,
  siblings,
  onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  workspace: string;
  editing: Project | null;
  siblings: string[];
  onSave: (p: Project, openAfter: boolean) => void;
}) {
  const [step, setStep] = React.useState<"details" | "members">("details");
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [members, setMembers] = React.useState<Member[]>([]);
  const [inherit, setInherit] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setStep("details");
    setName(editing?.name ?? "");
    setDesc(editing?.description ?? "");
    setMembers(
      editing
        ? editing.collaborators
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
            .map((c, i) => ({
              email: `${c.toLowerCase()}@company.com`,
              role: i === 0 ? "Admin" : "Contributor",
            }))
        : []
    );
    setInherit("");
    setTouched(false);
  }, [open, editing]);

  const nameError = touched && !name.trim() ? "Enter a project name" : undefined;
  const save = (openAfter: boolean) => {
    const people = members
      .map((m) => m.email.split("@")[0])
      .map((n) => n[0].toUpperCase() + n.slice(1));
    onSave(
      {
        id: editing?.id ?? `p${Date.now()}`,
        name: name.trim(),
        description: desc.trim() || "—",
        artifacts: editing?.artifacts ?? "Nil",
        collaborators: people.length ? people.join(", ") : "Amy",
        workspace,
      },
      openAfter
    );
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="m"
      title={editing ? "Edit Project" : "Add Project"}
    >
      <Tabs
        value={step}
        onValueChange={(v) =>
          v === "members" && !name.trim() ? setTouched(true) : setStep(v as typeof step)
        }
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <TabsList tone="brand" aria-label="Project steps" className="w-fit">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>
          <p className="nuclios-type-body-default-regular text-(--color-text-neutral-subtle)">
            Workspace : <span className="font-medium text-(--color-text-neutral)">{workspace}</span>
          </p>
        </div>
        <TabsContent value="details" className="flex flex-col gap-(--spacing-xl) pt-(--spacing-xl)">
          <Input
            id="proj-name"
            label="Project Name"
            required
            placeholder="Enter name of the project"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            error={nameError}
          />
          <Textarea
            id="proj-desc"
            label="Description"
            placeholder="Describe the project"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="min-h-32"
          />
          <div>
            <Button
              size="large"
              onClick={() => (name.trim() ? setStep("members") : setTouched(true))}
            >
              NEXT
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="members" className="flex flex-col gap-(--spacing-xl) pt-(--spacing-xl)">
          <MembersEditor
            idPrefix="proj"
            members={members}
            onChange={setMembers}
            aside={
              <Dropdown
                id="proj-inherit"
                label="Inherit roles from projects"
                header="inline"
                size="l"
                placeholder="Select"
                className="w-auto"
                options={siblings
                  .filter((n) => n !== editing?.name)
                  .map((n) => ({ value: n, label: n }))}
                value={inherit}
                onValueChange={(v) => {
                  setInherit(v);
                  const extra: Member[] = ["samuel", "disha", "deepak"]
                    .map((n) => ({
                      email: `${n}@company.com`,
                      role: "Contributor" as const,
                    }))
                    .filter((m) => !members.some((x) => x.email === m.email));
                  setMembers([...members, ...extra]);
                }}
              />
            }
          />
          <div className="flex gap-(--spacing-l)">
            <Button size="large" onClick={() => save(false)}>
              SAVE
            </Button>
            <Button variant="border" size="large" onClick={() => save(true)}>
              Save &amp; Open
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Modal>
  );
}
