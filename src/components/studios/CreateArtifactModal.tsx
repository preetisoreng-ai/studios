import * as React from "react";
import { Button, CaretDown, Dropdown, Input, Modal, type DropdownOption } from "@nuclios";
import { FUNCTIONS, INDUSTRIES, PROJECT_OPTIONS, WORKSPACES } from "@/data";
import { cn } from "@/lib/utils";

/**
 * Common "Create artifact" popup (Figma 10161:5982 / 10161:6162).
 * One popup for every feature: core metadata + an "Advanced" section with
 * optional fields contextual to the feature.
 */
export interface NewArtifact {
  featureId: string;
  featureTitle: string;
  workspace: string;
  project: string;
  industry: string;
  function: string;
  name: string;
  description: string;
  advanced: Record<string, string>;
}

type AdvancedField =
  | { kind: "select"; id: string; label: string; options: string[] }
  | { kind: "text"; id: string; label: string; placeholder: string };

/** Optional fields shown under "Advanced", per feature (Figma: Applications → Import External App). */
const ADVANCED: Record<string, AdvancedField[]> = {
  apps: [
    {
      kind: "select",
      id: "import",
      label: "Import External App",
      options: ["None", "Power BI", "Tableau", "Streamlit"],
    },
    {
      kind: "select",
      id: "template",
      label: "Template",
      options: ["Blank", "Executive summary", "Scenario planner"],
    },
  ],
  "ai-assistants": [
    {
      kind: "select",
      id: "model",
      label: "Base Model",
      options: ["NucliOS default", "Claude Opus 5.5", "Claude Sonnet 5.5"],
    },
    { kind: "text", id: "persona", label: "Persona", placeholder: "e.g. Category manager" },
  ],
  "ai-agents": [
    {
      kind: "select",
      id: "trigger",
      label: "Trigger",
      options: ["Manual", "Scheduled", "On data refresh"],
    },
    { kind: "text", id: "tools", label: "Tools", placeholder: "e.g. SQL, Email" },
  ],
  "data-control-tower": [
    {
      kind: "select",
      id: "source",
      label: "Data Source",
      options: ["Snowflake", "Databricks", "BigQuery", "SharePoint"],
    },
    {
      kind: "select",
      id: "refresh",
      label: "Refresh Frequency",
      options: ["Daily", "Weekly", "Monthly"],
    },
  ],
  "data-marketplace": [
    {
      kind: "select",
      id: "visibility",
      label: "Visibility",
      options: ["Private", "Workspace", "Organisation"],
    },
    { kind: "text", id: "tags", label: "Tags", placeholder: "Comma separated" },
  ],
  "llm-workbench": [
    {
      kind: "select",
      id: "model",
      label: "Model",
      options: ["Claude Opus 5.5", "Claude Sonnet 5.5", "Claude Haiku 5.5"],
    },
    { kind: "text", id: "temperature", label: "Temperature", placeholder: "0.0 – 1.0" },
  ],
  "model-blueprint": [
    {
      kind: "select",
      id: "modelType",
      label: "Model Type",
      options: ["Regression", "Classification", "Forecasting", "Optimisation"],
    },
    { kind: "text", id: "target", label: "Target Variable", placeholder: "e.g. Sales volume" },
  ],
};
const DEFAULT_ADVANCED: AdvancedField[] = [
  {
    kind: "select",
    id: "visibility",
    label: "Visibility",
    options: ["Private", "Workspace", "Organisation"],
  },
  { kind: "text", id: "tags", label: "Tags", placeholder: "Comma separated" },
];

/** "Applications" → "Application", "Business Strategies" → "Business Strategy". */
const singular = (t: string) =>
  t.replace(/ies$/, "y").replace(/([^s])s$/, "$1");

const opts = (xs: string[]): DropdownOption[] => xs.map((x) => ({ value: x, label: x }));
const EMPTY = { workspace: "", project: "", industry: "", function: "", name: "", description: "" };
type Core = typeof EMPTY;
const REQUIRED: (keyof Core)[] = [
  "workspace",
  "project",
  "industry",
  "function",
  "name",
  "description",
];

export function CreateArtifactModal({
  open,
  onOpenChange,
  featureId,
  featureTitle,
  onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  featureId: string;
  featureTitle: string;
  onSave: (a: NewArtifact) => void;
}) {
  const [v, setV] = React.useState<Core>(EMPTY);
  const [adv, setAdv] = React.useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [tried, setTried] = React.useState(false);

  // Fresh form every time the popup opens.
  React.useEffect(() => {
    if (open) {
      setV(EMPTY);
      setAdv({});
      setShowAdvanced(false);
      setTried(false);
    }
  }, [open, featureId]);

  const set = (k: keyof Core) => (val: string) => setV((s) => ({ ...s, [k]: val }));
  const err = (k: keyof Core) => (tried && !v[k].trim() ? "Required" : undefined);
  const projects = v.workspace
    ? PROJECT_OPTIONS[v.workspace] ?? []
    : Object.values(PROJECT_OPTIONS).flat();
  const advanced = ADVANCED[featureId] ?? DEFAULT_ADVANCED;

  const save = () => {
    setTried(true);
    if (REQUIRED.some((k) => !v[k].trim())) return;
    onSave({ featureId, featureTitle, ...v, advanced: adv });
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="s"
      title={`Create ${singular(featureTitle)}`}
      footer={
        <>
          <Button variant="neutral" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="filled" onClick={save}>
            Save &amp; Open
          </Button>
        </>
      }
    >
      <form
        className="grid grid-cols-1 gap-x-(--spacing-4xl) gap-y-(--spacing-2xl) sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <Dropdown
          id="ca-workspace"
          label="Workspace"
          required
          placeholder="Select workspace"
          options={opts(WORKSPACES)}
          value={v.workspace}
          onValueChange={(x) => setV((s) => ({ ...s, workspace: x, project: "" }))}
          error={err("workspace")}
        />
        <Dropdown
          id="ca-project"
          label="Project"
          required
          placeholder="Select project"
          options={opts(projects)}
          value={v.project}
          onValueChange={set("project")}
          error={err("project")}
        />
        <Dropdown
          id="ca-industry"
          label="Industry"
          required
          placeholder="Select industry"
          options={opts(INDUSTRIES)}
          value={v.industry}
          onValueChange={set("industry")}
          error={err("industry")}
        />
        <Dropdown
          id="ca-function"
          label="Function"
          required
          placeholder="Select function"
          options={opts(FUNCTIONS)}
          value={v.function}
          onValueChange={set("function")}
          error={err("function")}
        />
        <Input
          id="ca-name"
          label="Name"
          required
          placeholder={`Name your ${singular(featureTitle).toLowerCase()}`}
          value={v.name}
          onChange={(e) => set("name")(e.target.value)}
          error={err("name")}
          fieldClassName="sm:col-span-2"
        />
        <Input
          id="ca-description"
          label="Description"
          required
                    placeholder="What is it for?"
          value={v.description}
          onChange={(e) => set("description")(e.target.value)}
          error={err("description")}
          fieldClassName="sm:col-span-2"
        />

        {/* Advanced: optional fields contextual to the feature (Figma 10161:6162). */}
        <div className="sm:col-span-2">
          <Button
            variant="ghost"
            size="small"
            aria-expanded={showAdvanced}
            aria-controls="ca-advanced"
            onClick={() => setShowAdvanced((s) => !s)}
            className="-ml-(--spacing-s) text-(--color-text-neutral)"
          >
            Advanced
            <CaretDown
              className={cn(
                "size-4 transition-transform duration-300",
                showAdvanced && "rotate-180"
              )}
            />
          </Button>
          <div
            id="ca-advanced"
            className="studios-accordion"
            data-open={showAdvanced}
            inert={!showAdvanced}
          >
            <div className="studios-accordion-clip">
              <div className="grid grid-cols-1 gap-x-(--spacing-4xl) gap-y-(--spacing-2xl) pt-(--spacing-l) sm:grid-cols-2">
                {advanced.map((f) =>
                  f.kind === "select" ? (
                    <Dropdown
                      key={f.id}
                      id={`ca-adv-${f.id}`}
                      label={f.label}
                      optional
                      placeholder="Select"
                      options={opts(f.options)}
                      value={adv[f.label] ?? ""}
                      onValueChange={(x) => setAdv((a) => ({ ...a, [f.label]: x }))}
                    />
                  ) : (
                    <Input
                      key={f.id}
                      id={`ca-adv-${f.id}`}
                      label={f.label}
                      optional
                      placeholder={f.placeholder}
                      value={adv[f.label] ?? ""}
                      onChange={(e) => {
                        const x = e.target.value;
                        setAdv((a) => ({ ...a, [f.label]: x }));
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <button type="submit" hidden />
      </form>
    </Modal>
  );
}

/** "Are you sure you want to exit?" (Figma 10209:9363). */
export function ExitConfirmModal({
  open,
  onOpenChange,
  onExit,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onExit: () => void;
}) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="xs"
      title="Are you sure you want to exit?"
      description="Looks like you haven’t saved yet. Do you want to leave without saving?"
      footer={
        <>
          <Button variant="neutral" className="min-w-23" onClick={onExit}>
            Yes
          </Button>
          <Button variant="filled" className="min-w-23" onClick={() => onOpenChange(false)}>
            No
          </Button>
        </>
      }
    />
  );
}
