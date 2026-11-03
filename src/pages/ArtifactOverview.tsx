import * as React from "react";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type DropdownOption,
} from "@nuclios";
import { FUNCTIONS, INDUSTRIES, PROJECT_OPTIONS, WORKSPACES } from "@/data";
import type { NewArtifact } from "@/components/studios/CreateArtifactModal";

/**
 * Artifact overview (Figma 10161:8502): every new artifact lands here after
 * "Save & Open" to continue building it. Leaving before Save asks to confirm
 * (handled by the parent through `onExitRequest`).
 */
const opts = (xs: string[]): DropdownOption[] => xs.map((x) => ({ value: x, label: x }));

export function ArtifactOverview({
  artifact,
  onDirtyChange,
  onSave,
  onExitRequest,
  onFeatures,
}: {
  artifact: NewArtifact;
  onDirtyChange: (dirty: boolean) => void;
  onSave: (a: NewArtifact) => void;
  onExitRequest: () => void;
  onFeatures: () => void;
}) {
  const [v, setV] = React.useState({ ...artifact, order: "1", active: true });
  const [saved, setSaved] = React.useState(false);
  const orderInvalid = !/^[1-9]\d*$/.test(v.order);

  // A new artifact counts as unsaved until Save is pressed.
  React.useEffect(() => onDirtyChange(!saved), [saved, onDirtyChange]);

  const set =
    <K extends keyof typeof v>(k: K) =>
    (val: (typeof v)[K]) => {
      setV((s) => ({ ...s, [k]: val }));
      setSaved(false);
    };
  const projects = PROJECT_OPTIONS[v.workspace] ?? [];
  const advanced = Object.entries(artifact.advanced).filter(([, x]) => x);

  return (
    <main className="mx-4 flex flex-1 flex-col pb-8 pt-6 sm:mx-11 xl:mx-[74px]">
      <Breadcrumb
        items={[
          { label: "Features", onClick: onFeatures },
          { label: artifact.featureTitle, onClick: onFeatures },
          { label: v.name || "Untitled" },
        ]}
      />
      <div className="mt-(--spacing-l) flex flex-wrap items-center justify-between gap-(--spacing-l)">
        <div className="min-w-0">
          <h1 className="truncate nuclios-type-heading-h4-regular text-(--color-text-neutral)">
            {v.name || "Untitled"}
          </h1>
          <p className="nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
            {artifact.featureTitle} · {v.project} · {saved ? "Saved" : "Not saved yet"}
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-(--spacing-2xl) flex flex-1 flex-col">
        <TabsList tone="brand">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex flex-1 flex-col pt-(--spacing-4xl)">
          <div className="grid gap-x-(--spacing-14xl) gap-y-(--spacing-2xl) lg:grid-cols-2">
            <div className="flex flex-col gap-(--spacing-2xl)">
              <Dropdown
                id="ao-industry"
                label="Industry"
                required
                variant="underline"
                options={opts(INDUSTRIES)}
                value={v.industry}
                onValueChange={set("industry")}
              />
              <Dropdown
                id="ao-function"
                label="Function"
                required
                variant="underline"
                options={opts(FUNCTIONS)}
                value={v.function}
                onValueChange={set("function")}
              />
              <Dropdown
                id="ao-project"
                label="Project"
                required
                variant="underline"
                options={opts(projects.includes(v.project) ? projects : [v.project, ...projects])}
                value={v.project}
                onValueChange={set("project")}
              />
              <Dropdown
                id="ao-workspace"
                label="Workspace"
                required
                options={opts(WORKSPACES)}
                value={v.workspace}
                onValueChange={set("workspace")}
                className="max-w-[262px]"
              />
            </div>
            <div className="flex flex-col gap-(--spacing-2xl)">
              <Input
                id="ao-name"
                label="Name"
                required
                value={v.name}
                onChange={(e) => set("name")(e.target.value)}
                error={!v.name.trim() ? "Required" : undefined}
              />
              <Input id="ao-type" label="Type" required value={artifact.featureTitle} readOnly />
              <Input
                id="ao-order"
                label="Order"
                inputMode="numeric"
                value={v.order}
                onChange={(e) => set("order")(e.target.value)}
                helper="Enter any whole number greater than 0"
                error={orderInvalid ? "Enter any whole number greater than 0" : undefined}
              />
              <Checkbox
                id="ao-active"
                label="Is Active"
                checked={v.active}
                onCheckedChange={(c) => set("active")(c === true)}
              />
              {advanced.length > 0 && (
                <dl className="grid grid-cols-[auto_1fr] gap-x-(--spacing-l) gap-y-(--spacing-xs) rounded-(--radius-component-set-4) border border-(--color-border-subtle) p-(--spacing-l) nuclios-type-body-default-regular">
                  <dt className="col-span-2 nuclios-type-body-default-medium text-(--color-text-neutral)">
                    Advanced
                  </dt>
                  {advanced.map(([k, x]) => (
                    <React.Fragment key={k}>
                      <dt className="text-(--color-text-neutral-muted)">{k}</dt>
                      <dd className="text-(--color-text-neutral)">{x}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              )}
            </div>
          </div>

          <div className="mt-auto flex justify-end gap-(--spacing-l) pt-(--spacing-4xl)">
            <Button variant="neutral" onClick={onExitRequest}>
              Cancel
            </Button>
            <Button
              variant="filled"
              disabled={orderInvalid || !v.name.trim()}
              onClick={() => {
                setSaved(true);
                onSave({ ...artifact, ...v });
              }}
            >
              Save
            </Button>
          </div>
        </TabsContent>

        {(["kpis", "insights", "tools"] as const).map((t) => (
          <TabsContent key={t} value={t} className="pt-(--spacing-4xl)">
            <div className="flex flex-col items-center gap-(--spacing-s) rounded-(--radius-container-set-2) border border-dashed border-(--color-border-subtle) px-(--spacing-l) py-(--spacing-14xl) text-center">
              <p className="nuclios-type-body-large-medium text-(--color-text-neutral)">
                Nothing here yet
              </p>
              <p className="nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
                Save the overview first, then add {t === "kpis" ? "KPIs" : t} to this{" "}
                {artifact.featureTitle.toLowerCase()}.
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
