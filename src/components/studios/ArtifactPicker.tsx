import * as React from "react";
import { Search } from "lucide-react";
import { Button, Modal, Tabs, TabsList, TabsTrigger } from "@nuclios";
import { FEATURES, type Feature } from "@/data";
import { cn } from "@/lib/utils";

/**
 * "Add New" artifact picker on the project page — Figma 4232:28925:
 * search · studio filter · feature list · description with Create / Open.
 */
const STUDIOS: { id: Feature["studio"]; label: string }[] = [
  { id: "decision", label: "Decision Studio" },
  { id: "algo", label: "Algo Studio" },
  { id: "data", label: "Data Studio" },
];

export function ArtifactPicker({
  open,
  onOpenChange,
  projectName,
  onCreate,
  onOpen,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  projectName: string;
  onCreate: (f: Feature) => void;
  onOpen: (f: Feature) => void;
}) {
  const [q, setQ] = React.useState("");
  const [studio, setStudio] = React.useState<"all" | Feature["studio"]>("all");
  const [selected, setSelected] = React.useState<Feature>(
    FEATURES.find((f) => f.studio === "decision")!
  );

  React.useEffect(() => {
    if (open) {
      setQ("");
      setStudio("all");
    }
  }, [open]);

  const match = (f: Feature) =>
    (studio === "all" || f.studio === studio) &&
    `${f.label} ${f.description}`.toLowerCase().includes(q.toLowerCase());
  const groups = STUDIOS.map((s) => ({
    ...s,
    items: FEATURES.filter((f) => f.studio === s.id && match(f)),
  })).filter((g) => g.items.length);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="m"
      title="Add New Artifact"
      description={`Pick what to create in ${projectName}.`}
    >
      <div className="flex flex-col gap-(--spacing-l)">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--color-icons-neutral-subtle)"
            aria-hidden
          />
          <input
            aria-label="Search features"
            placeholder="Search anything"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-11 w-full rounded-(--radius-component-set-4) border border-(--color-border-neutral) bg-(--color-background-neutral) pl-9 pr-3 nuclios-type-body-default-regular text-(--color-text-neutral) placeholder:text-(--color-text-neutral-muted) focus-visible:border-(--color-border-primary) focus-visible:outline-none"
          />
        </div>
        <Tabs value={studio} onValueChange={(v) => setStudio(v as typeof studio)}>
          <TabsList type="ghost" aria-label="Filter by studio" className="w-fit">
            <TabsTrigger value="all">All</TabsTrigger>
            {STUDIOS.map((s) => (
              <TabsTrigger key={s.id} value={s.id}>
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid min-h-[300px] grid-cols-1 overflow-hidden rounded-(--radius-component-set-4) border border-(--color-border-subtle) sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="max-h-[42vh] overflow-y-auto border-(--color-border-subtle) p-(--spacing-s) sm:border-r">
            {groups.length === 0 && (
              <p className="p-(--spacing-l) nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
                Nothing matches “{q}”.
              </p>
            )}
            {groups.map((g) => (
              <div key={g.id} className="mb-(--spacing-s)">
                <p className="px-(--spacing-s) py-(--spacing-xs) nuclios-type-body-small-medium tracking-[1px] text-(--color-text-neutral-muted) uppercase">
                  {g.label}
                </p>
                <ul>
                  {g.items.map((f) => {
                    const on = f.id === selected.id;
                    return (
                      <li key={f.id}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => setSelected(f)}
                          onDoubleClick={() => onCreate(f)}
                          className={cn(
                            "flex w-full items-center gap-(--spacing-s) rounded-(--radius-component-set-1) px-(--spacing-s) py-(--spacing-xs) text-left nuclios-type-body-default-regular text-(--color-text-neutral) cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)",
                            on
                              ? "bg-(--color-background-primary-selected) text-(--color-text-primary-selected)"
                              : "hover:bg-(--color-background-neutral-hover)"
                          )}
                        >
                          <span
                            aria-hidden
                            className="inline-flex size-7 shrink-0 items-center justify-center rounded-(--radius-component-set-1) bg-(--color-background-information-subtle) nuclios-type-body-small-medium text-(--color-text-information)"
                          >
                            {f.label.charAt(0)}
                          </span>
                          {f.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-(--spacing-s) p-(--spacing-xl)">
            <h3 className="nuclios-type-body-large-medium text-(--color-text-neutral)">
              {selected.label}
            </h3>
            <p className="flex-1 nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
              {selected.description}
            </p>
            <div className="flex gap-(--spacing-s)">
              <Button size="medium" onClick={() => onCreate(selected)}>
                Create
              </Button>
              <Button variant="border" size="medium" onClick={() => onOpen(selected)}>
                Open
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
