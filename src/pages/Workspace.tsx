import * as React from "react";
import { ArrowLeft, Copy, EllipsisVertical, Pencil, Plus, RotateCcw, Search } from "lucide-react";
import {
  Button,
  Checkbox,
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
import { cn } from "@/lib/utils";
import { ARTIFACTS, FUNCTIONS, INDUSTRIES, WORKSPACES, type Project } from "@/data";

const iconBtn =
  "inline-flex size-8 items-center justify-center rounded-(--radius-component-set-1) text-(--color-icons-neutral-subtle) hover:bg-(--color-background-neutral-hover) hover:text-(--color-icons-neutral) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused) cursor-pointer";

const MEMBERS = [
  "Samuel",
  "Anish",
  "Isha",
  "Disha",
  "Deepak",
  "Florence",
  "John",
  "Teresa",
  "Keerthi",
];

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
            <button type="button" aria-label={`Edit ${p.name}`} className={iconBtn}>
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
        <Tabs defaultValue="projects">
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-4">
            <TabsList
              type="ghost"
              aria-label="Workspace content"
              className="gap-0 rounded-(--radius-component-set-1) border border-(--color-border-neutral) p-0"
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
                aria-label="Search projects"
                placeholder="Search anything inside projects"
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
                { key: "name", header: "Name", sortable: true },
                { key: "industry", header: "Industry", sortable: true },
                { key: "fn", header: "Function", sortable: true },
                { key: "edited", header: "Last edited" },
              ]}
              rows={ARTIFACTS.filter((a) => a.workspace === workspace)}
              rowKey={(a) => a.id}
              emptyMessage="No artifacts in this workspace yet."
            />
          </TabsContent>
          <TabsContent
            value="exec"
            className="mt-3 px-6 pb-8 nuclios-type-body-default-regular text-(--color-text-neutral-muted)"
          >
            Execution environments for {workspace} are managed by your workspace admin.
          </TabsContent>
        </Tabs>
      </section>

      <AddProjectModal
        open={addOpen}
        onOpenChange={setAddOpen}
        workspace={workspace}
        onCreate={(p) => {
          onProjectsChange([...projects, p]);
          notify("Project created", `${p.name} was added to ${workspace}.`);
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

/* "Add Project" — Figma 1974:10384: Details → Members */
function AddProjectModal({
  open,
  onOpenChange,
  workspace,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  workspace: string;
  onCreate: (p: Project) => void;
}) {
  const [step, setStep] = React.useState<"details" | "members">("details");
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [members, setMembers] = React.useState<string[]>([]);
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setStep("details");
      setName("");
      setDesc("");
      setMembers([]);
      setTouched(false);
    }
  }, [open]);

  const nameError = touched && !name.trim() ? "Enter a project name" : undefined;

  return (
    <Modal open={open} onOpenChange={onOpenChange} size="m" title="Add Project">
      <Tabs
        value={step}
        onValueChange={(v) =>
          v === "members" && !name.trim() ? setTouched(true) : setStep(v as typeof step)
        }
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <TabsList tone="brand" aria-label="Add project steps" className="border-b-0">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>
          <p className="nuclios-type-body-default-regular text-(--color-text-neutral-subtle)">
            Workspace : <span className="font-medium text-(--color-text-neutral)">{workspace}</span>
          </p>
        </div>
        <TabsContent value="details" className="flex flex-col gap-5">
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
            className="min-h-36"
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
        <TabsContent value="members" className="flex flex-col gap-5">
          <p className="nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
            Choose who can collaborate on {name || "this project"}.
          </p>
          <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-2">
            {MEMBERS.map((m) => (
              <Checkbox
                key={m}
                id={`m-${m}`}
                size="m"
                label={m}
                checked={members.includes(m)}
                onCheckedChange={(v) =>
                  setMembers((xs) => (v === true ? [...xs, m] : xs.filter((x) => x !== m)))
                }
              />
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="border" size="large" onClick={() => setStep("details")}>
              BACK
            </Button>
            <Button
              size="large"
              className={cn(members.length === 0 && "")}
              onClick={() => {
                onCreate({
                  id: `p${Date.now()}`,
                  name: name.trim(),
                  description: desc.trim() || "—",
                  artifacts: "Nil",
                  collaborators: members.length ? members.join(", ") : "Amy",
                  workspace,
                });
                onOpenChange(false);
              }}
            >
              CREATE PROJECT
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Modal>
  );
}
