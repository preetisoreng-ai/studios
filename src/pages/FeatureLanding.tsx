import * as React from "react";
import { Copy, Ellipsis, LayoutGrid, Lightbulb, List, Plus, Search, X } from "lucide-react";
import {
  Breadcrumb,
  Button,
  Chip,
  Input,
  Menu,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
} from "@nuclios";
import { cn } from "@/lib/utils";
import { ARTIFACTS, FEATURES } from "@/data";
import { ICONS, MaskIcon } from "@/components/studios/MaskIcon";

/** Feature landing page — Figma "Blueprint Landing page - Recent" (2014:7072). */
type File = { id: string; name: string; icon: string; date: string; edited: string };

const SAMPLE: File[] = [
  { id: "s1", name: "template_1", icon: ICONS.apps, date: "21st Dec 2024", edited: "4 days ago" },
  {
    id: "s2",
    name: "Q3 pricing review",
    icon: ICONS.sparkle,
    date: "25th Jan 2025",
    edited: "1 day ago",
  },
];

const TIPS = [
  {
    id: "t1",
    title: "How to create your first",
    body: "Start from a blank canvas or a template, then invite collaborators from your workspace.",
    tint: "bg-(--color-surface-blue-subtle)",
  },
  {
    id: "t2",
    title: "Did you know you can import pre-built templates",
    body: "Browse the Marketplace for certified templates your team already uses.",
    tint: "bg-(--color-background-primary-muted)",
  },
  {
    id: "t3",
    title: "Share with the right people",
    body: "Role-based access means Readers see results while Contributors can edit.",
    tint: "bg-(--color-surface-yellow-subtle)",
  },
];

const iconBtn =
  "inline-flex size-8 items-center justify-center rounded-(--radius-component-set-1) text-(--color-icons-neutral-subtle) hover:bg-(--color-background-neutral-hover) hover:text-(--color-icons-neutral) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused) cursor-pointer";

export function FeatureLanding({
  featureId,
  onHome,
  onFeatures,
  notify,
}: {
  featureId: string;
  onHome: () => void;
  onFeatures: () => void;
  notify: (t: string, d?: string) => void;
}) {
  const feature = FEATURES.find((f) => f.id === featureId) ?? FEATURES[0];
  const singular = feature.label.replace(/ies$/, "y").replace(/s$/, "");
  const [view, setView] = React.useState<"list" | "grid">("list");
  const [searching, setSearching] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [tips, setTips] = React.useState(TIPS);

  const mine: File[] = [
    ...ARTIFACTS.filter((a) => a.featureId === featureId).map((a) => ({
      id: a.id,
      name: a.name,
      icon: ICONS[a.icon],
      date: "2nd Feb 2025",
      edited: a.edited.replace("Edited ", ""),
    })),
    ...SAMPLE,
  ].filter((f) => f.name.toLowerCase().includes(q.toLowerCase()));

  const FileList = ({ files }: { files: File[] }) =>
    files.length === 0 ? (
      <p className="rounded-(--radius-container-set-1) bg-(--color-background-neutral) px-6 py-12 text-center nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
        {q
          ? `No files match “${q}”.`
          : `No ${feature.label.toLowerCase()} here yet. Create one with New ${singular}.`}
      </p>
    ) : (
      <ul
        className={cn(
          view === "list" ? "flex flex-col gap-4" : "grid grid-cols-2 gap-4 sm:grid-cols-3"
        )}
      >
        {files.map((f) => (
          <li
            key={f.id}
            className={cn(
              "rounded-(--radius-component-set-2) bg-(--color-background-neutral) shadow-(--shadow-1)",
              view === "list"
                ? "grid grid-cols-[1.4fr_0.8fr_0.9fr_0.8fr_auto] items-center gap-4 px-4 py-3 max-md:grid-cols-[1fr_auto]"
                : "flex flex-col gap-3 p-4"
            )}
          >
            <span className="flex min-w-0 items-center gap-3 nuclios-type-body-default-regular text-(--color-text-primary)">
              <MaskIcon src={f.icon} width={20} className="text-(--color-icons-neutral-subtle)" />
              <span className="truncate">{f.name}</span>
            </span>
            <Chip size="s" className={cn("w-fit", view === "list" && "max-md:hidden")}>
              Project
            </Chip>
            <span
              className={cn(
                "nuclios-type-body-small-regular text-(--color-text-neutral-subtle)",
                view === "list" && "max-md:hidden"
              )}
            >
              {f.date}
            </span>
            <span
              className={cn(
                "nuclios-type-body-small-regular text-(--color-text-neutral-subtle)",
                view === "list" && "max-md:hidden"
              )}
            >
              {f.edited}
            </span>
            <span className="flex items-center gap-1">
              <Tooltip content="Duplicate">
                <button
                  type="button"
                  aria-label={`Duplicate ${f.name}`}
                  className={iconBtn}
                  onClick={() => notify("Duplicated", `${f.name} (copy) was created.`)}
                >
                  <Copy className="size-4" />
                </button>
              </Tooltip>
              <Menu
                align="end"
                trigger={
                  <button
                    type="button"
                    aria-label={`More actions for ${f.name}`}
                    className={iconBtn}
                  >
                    <Ellipsis className="size-4" />
                  </button>
                }
                items={["Share", "Move", "Promote", "Bookmark", "Export", "Delete"].map((l) => ({
                  label: l,
                  onSelect: () => notify(l, `${l} · ${f.name}`),
                }))}
              />
            </span>
          </li>
        ))}
      </ul>
    );

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 pb-16 pt-4 sm:px-[120px]">
      <Breadcrumb
        items={[
          {
            label: "Home",
            onClick: onHome,
          },
          {
            label: "Features",
            onClick: onFeatures,
          },
          { label: feature.label },
        ]}
      />
      <h1 className="mt-2 nuclios-type-heading-h4-regular text-(--color-text-neutral)">
        {feature.label}
      </h1>

      <div className="mt-6 grid grid-cols-[1fr_360px] gap-[60px] max-lg:grid-cols-1">
        <Tabs defaultValue="mine">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList
              type="ghost"
              aria-label="Files"
              className="rounded-(--radius-component-set-2) bg-(--color-background-subtle) p-1"
            >
              <TabsTrigger
                value="mine"
                className="h-8 aria-selected:bg-(--color-background-neutral)"
              >
                My Files
              </TabsTrigger>
              <TabsTrigger
                value="org"
                className="h-8 aria-selected:bg-(--color-background-neutral)"
              >
                Org Space
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-3">
              {searching ? (
                <Input
                  id="landing-search"
                  size="m"
                  autoFocus
                  aria-label={`Search ${feature.label}`}
                  placeholder="Search files"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onBlur={() => !q && setSearching(false)}
                  fieldClassName="w-56"
                />
              ) : (
                <Button
                  variant="ghost"
                  size="medium"
                  iconOnly
                  aria-label="Search"
                  onClick={() => setSearching(true)}
                >
                  <Search className="size-5" />
                </Button>
              )}
              <div
                className="flex rounded-(--radius-component-set-1) bg-(--color-background-subtle) p-0.5"
                role="group"
                aria-label="View"
              >
                {(["grid", "list"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={view === v}
                    aria-label={`${v} view`}
                    onClick={() => setView(v)}
                    className={cn(
                      "inline-flex size-8 items-center justify-center rounded-(--radius-component-set-1) text-(--color-icons-neutral-subtle) cursor-pointer",
                      view === v && "bg-(--color-background-neutral) text-(--color-icons-primary)"
                    )}
                  >
                    {v === "grid" ? <LayoutGrid className="size-4" /> : <List className="size-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <TabsContent value="mine" className="mt-5">
            <FileList files={mine} />
          </TabsContent>
          <TabsContent value="org" className="mt-5">
            <FileList
              files={SAMPLE.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()))}
            />
          </TabsContent>
        </Tabs>

        <aside className="flex flex-col gap-6">
          <div>
            <h2 className="nuclios-type-body-x-large-medium text-(--color-text-neutral)">
              Get Started
            </h2>
            <Button
              variant="border"
              size="large"
              fullWidth
              className="mt-4 justify-between"
              trailingIcon={<Plus className="size-5" aria-hidden />}
              onClick={() => notify(`New ${singular}`, "A blank canvas was created in My Files.")}
            >
              New {singular}
            </Button>
          </div>
          {tips.length > 0 && (
            <div>
              <h2 className="flex items-center gap-2 nuclios-type-body-x-large-medium text-(--color-text-neutral)">
                <Lightbulb className="size-5" aria-hidden /> Tips
              </h2>
              <ul className="mt-4 flex flex-col gap-4">
                {tips.map((t) => (
                  <li
                    key={t.id}
                    className="relative rounded-(--radius-container-set-2) bg-(--color-background-neutral) p-2 shadow-(--shadow-1)"
                  >
                    <div className={cn("rounded-(--radius-container-set-1) p-4 pr-10", t.tint)}>
                      <p className="nuclios-type-body-large-medium text-(--color-text-neutral)">
                        {t.id === "t1" ? `${t.title} ${singular.toLowerCase()}` : t.title}
                      </p>
                      <p className="mt-2 nuclios-type-body-small-regular text-(--color-text-neutral-muted)">
                        {t.body}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Dismiss tip"
                      className={cn(iconBtn, "absolute right-3 top-3")}
                      onClick={() => setTips((xs) => xs.filter((x) => x.id !== t.id))}
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
