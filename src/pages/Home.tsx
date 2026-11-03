import * as React from "react";
import { Star } from "lucide-react";
import {
  Button,
  Checkbox,
  Dropdown,
  Modal,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
} from "@nuclios";
import { cn } from "@/lib/utils";
import {
  ARTIFACTS,
  FUNCTIONS,
  INDUSTRIES,
  TILES,
  TILE_PICKER_ORDER,
  WORKSPACES,
  type Artifact,
  type TileId,
} from "@/data";
import { HOME_ICONS, MaskIcon } from "@/components/studios/MaskIcon";
import { TileArt } from "@/components/studios/TileArt";

/* ------------------------------------------------------------------ */
/* Background — Figma "Gradation" (9331:2699): blurred colour fields   */
/* clipped to the frame, under a frosted glass overlay. (The file's    */
/* second clip group sits off-frame at x=2083, so it isn't drawn.)     */
/* ------------------------------------------------------------------ */
export function GlassBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ filter: "var(--studios-bg-layer-filter)" }}>
        <div
          className="absolute"
          style={{
            left: "-11.5625%",
            top: "-40.648%",
            width: "118.75%",
            height: "169.72%",
          }}
        >
          <div className="absolute" style={{ inset: "-18.05% -4.35% -5.41% -14.51%" }}>
            <img alt="" src="figma/home/bg-group1.svg" className="block size-full max-w-none" />
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 backdrop-blur-[50px]"
        style={{ backgroundImage: "var(--studios-glass-overlay)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tiles — Figma "Landing page cards" (9331:2915 / 2928 / 2939 / 2964) */
/* ------------------------------------------------------------------ */
type Slot = "wide" | "tall" | "short";

const slotClass: Record<Slot, string> = {
  // 738 × 196 (Figma 180, +16 taller by request), padding 48/40, gap 52
  wide: "flex-row items-start gap-[52px] px-10 py-12 max-sm:flex-col max-sm:gap-8 max-sm:p-6 fit:shrink-0 fit:items-center fit:gap-10 fit:py-[clamp(20px,3.2vh,48px)]",
  // 274 × 416, padding 36/32/52/40, gap 51
  tall: "flex-col justify-center gap-[51px] pb-[52px] pl-10 pr-8 pt-9 md:h-[416px] max-sm:px-6 max-sm:py-8 fit:h-auto! fit:min-h-0 fit:gap-[clamp(12px,3.2vh,51px)] fit:py-[clamp(12px,2.6vh,52px)]",
  // 444 × 198, padding 32/32/32/36, gap 24
  short:
    "flex-row items-start gap-6 py-8 pl-9 pr-8 md:h-[198px] max-sm:flex-col max-sm:px-6 fit:h-auto! fit:min-h-0 fit:flex-1 fit:items-center fit:py-[clamp(8px,1.8vh,32px)]",
};

function TileCard({
  id,
  slot,
  onOpen,
}: {
  id: TileId;
  slot: Slot;
  onOpen: (featureId: string) => void;
}) {
  const t = TILES[id];
  return (
    <button
      type="button"
      data-slot={slot}
      onClick={() => onOpen(t.featureId)}
      className={cn(
        "studios-tile group flex overflow-clip rounded-[24px] bg-(--studios-card) text-left transition-shadow cursor-pointer",
        "duration-300 ease-out hover:shadow-(--studios-card-hover-shadow) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)",
        slotClass[slot]
      )}
    >
      <span className="shrink-0 fit:[zoom:0.85] fit-sm:[zoom:0.75]">
        <TileArt id={id} count={t.count} tone={t.tone} />
      </span>
      <span
        className={cn(
          "flex min-w-0 flex-col gap-6 fit:gap-[clamp(6px,1.3vh,24px)]",
          slot !== "tall" && "flex-1"
        )}
      >
        <span className="studios-type-tile-title text-(--studios-title)">{t.title}</span>
        <span
          className={cn(
            "studios-type-tile-desc text-(--studios-desc)",
            slot === "wide" && "max-w-[517px]"
          )}
        >
          {t.description}
        </span>
      </span>
    </button>
  );
}

function EmptySlot({ slot, onAdd }: { slot: Slot; onAdd: () => void }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className={cn(
        "flex min-h-40 items-center justify-center gap-3 rounded-[24px] border border-dashed border-(--color-border-neutral) bg-(--studios-custom) text-(--color-text-neutral-muted) studios-type-caps cursor-pointer hover:bg-(--studios-custom-hover)",
        slot === "tall"
          ? "md:h-[416px] fit:h-auto! fit:min-h-0"
          : slot === "short"
            ? "md:h-[198px] fit:h-auto! fit:min-h-0 fit:flex-1"
            : "h-[180px] fit:h-auto! fit:min-h-0"
      )}
    >
      <MaskIcon src={HOME_ICONS.add} width={20} />
      ADD TILE
    </button>
  );
}

function TileGrid({
  tiles,
  onOpen,
  onAdd,
}: {
  tiles: TileId[];
  onOpen: (f: string) => void;
  onAdd: () => void;
}) {
  const at = (i: number, slot: Slot) =>
    tiles[i] ? (
      <TileCard key={tiles[i]} id={tiles[i]} slot={slot} onOpen={onOpen} />
    ) : (
      <EmptySlot slot={slot} onAdd={onAdd} />
    );
  return (
    <div className="flex flex-col gap-5 fit:h-full fit:min-h-0 fit:gap-[clamp(10px,1.8vh,20px)]">
      {at(0, "wide")}
      <div className="grid grid-cols-[274fr_444fr] gap-5 max-md:grid-cols-1 fit:min-h-0 fit:flex-1 fit:grid-rows-[minmax(0,1fr)] fit:gap-[clamp(10px,1.8vh,20px)]">
        {at(1, "tall")}
        <div className="flex flex-col gap-5 fit:min-h-0 fit:gap-[clamp(10px,1.8vh,20px)]">
          {at(2, "short")}
          {at(3, "short")}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Artifact list (right column) — Figma "Feature" rows (9331:2977…)    */
/* ------------------------------------------------------------------ */
const ROW_ICON: Record<Artifact["icon"], { src: string; w: number; h: number }> = {
  apps: { src: HOME_ICONS.rowApps, w: 24, h: 24 },
  blueprint: { src: HOME_ICONS.rowBlueprint, w: 24, h: 24 },
  bot: { src: HOME_ICONS.rowBot, w: 24, h: 20.571 },
  sparkle: { src: HOME_ICONS.rowSparkle, w: 24, h: 24 },
  "ai-assistant": { src: HOME_ICONS.rowAiAssistant, w: 24, h: 24 },
};

/** Figma shows the top six in Most Popular. */
const POPULAR_LIMIT = 6;

function ArtifactRow({
  a,
  fav,
  onToggleFav,
  onOpen,
}: {
  a: Artifact;
  fav: boolean;
  onToggleFav: () => void;
  onOpen: () => void;
}) {
  const icon = ROW_ICON[a.icon];
  return (
    <li className="group relative">
      <button
        type="button"
        onClick={onOpen}
        className="flex h-(--row-h) w-full items-center gap-4 rounded-[4px] px-4 text-left transition-colors cursor-pointer hover:bg-(--studios-row-hover)! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--color-border-primary-focused) max-sm:px-3"
        style={{ backgroundImage: "var(--studios-row)" }}
      >
        <span className="flex size-6 shrink-0 items-center justify-center text-(--studios-row-icon)">
          <MaskIcon src={icon.src} width={icon.w} height={icon.h} />
        </span>
        <span className="min-w-0 flex-1 truncate text-sm leading-normal text-(--studios-row-text)">
          {a.name}
        </span>
        <span className="shrink-0 text-[11px] leading-normal text-(--studios-row-meta) transition-opacity group-hover:opacity-0 group-focus-within:opacity-0 max-sm:hidden">
          {a.edited}
        </span>
      </button>
      <Tooltip content={fav ? "Remove from favourites" : "Add to favourites"}>
        <button
          type="button"
          aria-label={fav ? `Remove ${a.name} from favourites` : `Add ${a.name} to favourites`}
          aria-pressed={fav}
          onClick={onToggleFav}
          className={cn(
            "absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full cursor-pointer transition-opacity hover:bg-(--studios-row-hover)",
            "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)",
            fav
              ? "text-(--studios-star) opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              : "text-(--color-icons-neutral-subtle) opacity-0 group-hover:opacity-100 max-sm:opacity-100"
          )}
        >
          <Star className="size-4" fill={fav ? "currentColor" : "none"} />
        </button>
      </Tooltip>
    </li>
  );
}

function EmptyList({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-3 rounded-[4px] px-6 text-center"
      style={{ background: "var(--studios-empty)" }}
    >
      <Star
        className="mb-4 size-[72px] text-(--studios-star)"
        fill="currentColor"
        strokeWidth={0}
        aria-hidden
      />
      <p className="studios-type-tile-title text-(--studios-title)">{title}</p>
      <p className="text-sm tracking-[0.5px] text-(--color-text-neutral)">{body}</p>
      {action}
    </div>
  );
}

type TabId = "popular" | "new" | "favourites" | "recents";

const TAB_LABELS: [TabId, string][] = [
  ["popular", "MOST POPULAR"],
  ["new", "WHAT’S NEW"],
  ["favourites", "FAVOURITES"],
  ["recents", "RECENTS"],
];

/* ------------------------------------------------------------------ */
/* Page — Figma "App" 9331:2698                                        */
/* ------------------------------------------------------------------ */
export function Home({
  tiles,
  onTilesChange,
  favourites,
  onToggleFavourite,
  onOpenFeature,
  onWorkspaces,
  onSupport,
}: {
  tiles: TileId[];
  onTilesChange: (t: TileId[]) => void;
  favourites: string[];
  onToggleFavourite: (id: string) => void;
  onOpenFeature: (featureId: string) => void;
  onWorkspaces: () => void;
  onSupport: () => void;
}) {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({
    workspace: "all",
    industry: "all",
    fn: "all",
  });
  const [tab, setTab] = React.useState<TabId>("popular");
  const [customOpen, setCustomOpen] = React.useState(false);

  const filtered = ARTIFACTS.filter(
    (a) =>
      (filters.workspace === "all" || a.workspace === filters.workspace) &&
      (filters.industry === "all" || a.industry === filters.industry) &&
      (filters.fn === "all" || a.fn === filters.fn)
  );
  const isFiltered =
    filters.workspace !== "all" || filters.industry !== "all" || filters.fn !== "all";
  const resetFilters = () => setFilters({ workspace: "all", industry: "all", fn: "all" });

  const lists: Record<TabId, Artifact[]> = {
    popular: filtered.slice(0, POPULAR_LIMIT),
    new: filtered.filter((a) => a.isNew),
    favourites: filtered.filter((a) => favourites.includes(a.id)),
    recents: filtered.filter((a) => a.recent),
  };

  const opt = (xs: readonly string[]) => [
    { value: "all", label: "All" },
    ...xs.map((x) => ({ value: x, label: x })),
  ];

  const filterFields = [
    {
      id: "f-workspace",
      label: "Workspace",
      options: WORKSPACES,
      key: "workspace",
    },
    {
      id: "f-industry",
      label: "Industry",
      options: INDUSTRIES,
      key: "industry",
    },
    { id: "f-function", label: "Function", options: FUNCTIONS, key: "fn" },
  ] as const;

  return (
    <>
      <main className="mx-auto w-full max-w-[calc(1428px+4rem)] flex-1 px-4 pb-12 pt-10 sm:px-8 fit:flex fit:h-[calc(100dvh-4rem-26px)] fit:min-h-0 fit:flex-col fit:pb-[clamp(6px,1.4vh,48px)] fit:pt-[clamp(10px,2.4vh,40px)]">
        {/* Welcome row (9331:2910) — the filter row opens into the 96px gap below it. */}
        <div className="relative shrink-0">
          <div className="flex h-8 items-center justify-between gap-4">
            <h1 className="studios-type-welcome text-(--studios-welcome) max-sm:text-[26px]">
              Welcome Amy !
            </h1>
            <button
              type="button"
              aria-expanded={filterOpen}
              aria-controls="home-filters"
              onClick={() => setFilterOpen((o) => !o)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-[4px] border px-2 py-1 cursor-pointer transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)",
                filterOpen
                  ? "border-(--studios-ink)"
                  : "border-transparent hover:border-(--studios-filter-btn-border)"
              )}
              style={{ background: "var(--studios-filter-btn)" }}
            >
              <MaskIcon
                src={HOME_ICONS.filter}
                width={16}
                className="text-(--studios-filter-icon)"
              />
              <span className="studios-type-caps font-medium tracking-[2.5px] text-(--studios-ink)">
                FILTER
              </span>
              {isFiltered && (
                <span
                  className="size-1.5 rounded-full bg-(--color-background-primary)"
                  aria-label="Filters applied"
                />
              )}
              <MaskIcon
                src={HOME_ICONS.chevron}
                width={16}
                className={cn(
                  "text-(--studios-filter-icon) transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  filterOpen && "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Filter row (9331:3018) — always mounted so it can animate; inert while closed. */}
          <div className="studios-filter-reveal" data-open={filterOpen} inert={!filterOpen}>
            <div className="studios-filter-clip">
              <div
                id="home-filters"
                role="region"
                aria-label="Filters"
                className="studios-filterbar rounded-[8px] px-6 py-3"
                style={{ backgroundImage: "var(--studios-filterbar-gradient)" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-11 gap-y-3 xl:w-max xl:min-w-[701px] xl:flex-nowrap">
                  <div className="flex flex-wrap items-center gap-x-11 gap-y-3 xl:flex-nowrap">
                    {filterFields.map((f, i) => (
                      <span
                        key={f.id}
                        className="studios-filter-item"
                        style={
                          {
                            "--stagger": `${120 + i * 55}ms`,
                          } as React.CSSProperties
                        }
                      >
                        <Dropdown
                          id={f.id}
                          label={f.label}
                          header="inline"
                          variant="filled"
                          size="m"
                          className="w-auto"
                          options={opt(f.options)}
                          value={filters[f.key]}
                          onValueChange={(v) => setFilters((s) => ({ ...s, [f.key]: v }))}
                        />
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={resetFilters}
                    aria-disabled={!isFiltered}
                    className="studios-filter-item flex items-center gap-2 rounded-[4px] border border-(--studios-filter-reset-border) px-3 py-[10px] text-sm leading-[1.2] text-(--studios-filter-label) cursor-pointer transition-colors hover:bg-(--studios-row-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
                    style={{ "--stagger": "285ms" } as React.CSSProperties}
                  >
                    <MaskIcon
                      src={HOME_ICONS.reset}
                      width={13.084}
                      height={15.98}
                      className="text-(--studios-ink)"
                    />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tiles + artifacts (9331:2913) — 738 / 642 with a 48px gutter. */}
        <div className="mt-10 grid gap-12 xl:mt-24 xl:grid-cols-[738fr_642fr] fit:mt-[clamp(82px,9.6vh,96px)] fit:min-h-0 fit:flex-1 fit:grid-rows-[minmax(0,1fr)]">
          <TileGrid tiles={tiles} onOpen={onOpenFeature} onAdd={() => setCustomOpen(true)} />

          <div
            className={cn(
              "flex flex-col items-start gap-[39px] fit:min-h-0 fit:gap-[clamp(12px,2.6vh,39px)]",
              // Row metrics shared by the rows and the fixed-height list area below.
              "[--row-h:55px] [--row-gap:12px] fit:[--row-h:clamp(38px,5.4vh,55px)] fit:[--row-gap:clamp(6px,1.1vh,12px)]"
            )}
          >
            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as TabId)}
              className="w-full gap-0 fit:flex fit:min-h-0 fit:flex-col"
            >
              <TabsList
                type="ghost"
                aria-label="Artifacts"
                className="h-auto w-full justify-between gap-2 overflow-x-auto p-0 sm:w-auto sm:justify-start sm:gap-[52px]"
              >
                {TAB_LABELS.map(([id, label]) => (
                  <TabsTrigger
                    key={id}
                    value={id}
                    className={cn(
                      "h-9 flex-none rounded-[8px] border border-transparent px-4 py-1 text-xs! leading-5! tracking-[0.5px] font-normal! text-(--studios-tab-text)",
                      "aria-selected:font-medium! aria-selected:text-(--studios-ink) aria-selected:bg-(--studios-tab-selected)",
                      "hover:bg-transparent hover:border-(--studios-ink) aria-selected:hover:border-transparent",
                      id === "favourites" && favourites.length === 0 && "text-(--studios-tab-muted)"
                    )}
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {/* List area is always exactly six rows tall (POPULAR_LIMIT), so the
                  WORKSPACES button below stays put whichever tab is open. */}
              {(Object.keys(lists) as TabId[]).map((id) => (
                <TabsContent
                  key={id}
                  value={id}
                  className="mt-4 h-[calc(6*var(--row-h)+5*var(--row-gap))] shrink-0 overflow-y-auto overscroll-contain [scrollbar-width:thin] fit:mt-[clamp(8px,1.4vh,16px)]"
                >
                  {lists[id].length ? (
                    <ul className="flex flex-col gap-(--row-gap)">
                      {lists[id].map((a) => (
                        <ArtifactRow
                          key={a.id}
                          a={a}
                          fav={favourites.includes(a.id)}
                          onToggleFav={() => onToggleFavourite(a.id)}
                          onOpen={() => onOpenFeature(a.featureId)}
                        />
                      ))}
                    </ul>
                  ) : id === "favourites" && !isFiltered ? (
                    <EmptyList
                      title="No favourites yet"
                      body="Mark items as favourites to quickly access them here"
                    />
                  ) : (
                    <EmptyList
                      title="Nothing here yet"
                      body={
                        isFiltered
                          ? "No artifacts match these filters"
                          : "Check back soon for new artifacts"
                      }
                      action={
                        isFiltered ? (
                          <Button variant="link" onClick={resetFilters}>
                            Reset filters
                          </Button>
                        ) : undefined
                      }
                    />
                  )}
                </TabsContent>
              ))}
            </Tabs>

            {/* WORKSPACES pill (9331:3014) — bottom-aligned with the last tile card. */}
            <button
              type="button"
              onClick={onWorkspaces}
              className="group/ws mt-auto inline-flex shrink-0 items-center gap-3 rounded-full border-2 border-(--studios-ws-border) bg-(--studios-ws-bg) py-[10px] pl-4 pr-3 shadow-(--studios-ws-shadow) cursor-pointer transition-colors hover:bg-(--studios-custom-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
            >
              <span className="studios-ws-label text-(--studios-ink)">WORKSPACES</span>
              <span className="flex rounded-full bg-(--studios-ws-dot) p-2 text-(--color-icons-onprimary) transition-transform group-hover/ws:translate-x-0.5">
                <MaskIcon src={HOME_ICONS.next} width={8} />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom row: CUSTOM (9331:2974) · links (9331:3015) */}
        <div className="mt-5 grid shrink-0 items-center gap-6 xl:grid-cols-[738fr_642fr] xl:gap-12 fit:mt-[clamp(8px,1.6vh,20px)]">
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="flex w-full items-center justify-center gap-3 rounded-[8px] border border-transparent p-[10px] text-(--studios-welcome) cursor-pointer transition-colors hover:border-(--studios-custom-border-hover) hover:bg-(--studios-custom-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
            style={{ background: "var(--studios-custom)" }}
          >
            <MaskIcon src={HOME_ICONS.add} width={20} className="text-(--studios-ink)" />
            <span className="studios-custom-label">CUSTOM</span>
          </button>
          <div className="flex flex-wrap items-center justify-end gap-8 max-xl:justify-start">
            {["Know more about Studios", "Documentation"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={onSupport}
                className="flex items-center gap-2 rounded-[4px] px-2 py-1 text-sm leading-6 tracking-[0.5px] text-(--studios-link) cursor-pointer hover:bg-(--studios-custom-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
              >
                {l}
                <MaskIcon
                  src={HOME_ICONS.back}
                  width={18}
                  className="rotate-180 text-(--studios-link-icon)"
                />
              </button>
            ))}
          </div>
        </div>

        <CustomTilesModal
          open={customOpen}
          onOpenChange={setCustomOpen}
          tiles={tiles}
          onSave={onTilesChange}
        />
      </main>

      {/* Footer (9331:2873): MathCo mark + wordmark, version. */}
      <footer className="flex items-end gap-[21px] px-10 pb-2">
        <span role="img" aria-label="MathCo" className="relative inline-block h-[18px] w-[72px]">
          <span className="absolute left-0 top-0 size-[18px] overflow-hidden">
            <img
              alt=""
              src="figma/home/mathco-mark.png"
              className="absolute max-w-none"
              style={{
                height: "194.86%",
                width: "169.15%",
                left: "-36.97%",
                top: "-49.1%",
              }}
            />
          </span>
          <img
            alt=""
            src="figma/home/mathco-wordmark.png"
            className="absolute left-[22px] top-[4px] h-[9.625px] w-[50px] max-w-none object-cover"
          />
        </span>
        <span className="text-xs leading-none tracking-[1px] text-(--studios-footer-version)">
          4.0.0
        </span>
      </footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* "Add to Home Page" — Figma 6683:63152                               */
/* ------------------------------------------------------------------ */
const MAX_TILES = 4;

function CustomTilesModal({
  open,
  onOpenChange,
  tiles,
  onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  tiles: TileId[];
  onSave: (t: TileId[]) => void;
}) {
  const [draft, setDraft] = React.useState<TileId[]>(tiles);
  React.useEffect(() => {
    if (open) setDraft(tiles);
  }, [open, tiles]);

  const toggle = (id: TileId, on: boolean) =>
    setDraft((d) => (on ? [...d, id] : d.filter((x) => x !== id)));

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="m"
      title="Add to Home Page"
      description={`Pick up to ${MAX_TILES} shortcuts. They appear on your home page in the order you select them.`}
    >
      <div className="grid grid-cols-2 gap-x-10 gap-y-7 px-2 py-2 max-sm:grid-cols-1">
        {TILE_PICKER_ORDER.map((id) => {
          const checked = draft.includes(id);
          const disabled = !checked && draft.length >= MAX_TILES;
          return (
            <div key={id} className={cn("flex items-center gap-3", disabled && "opacity-50")}>
              <Checkbox
                id={`tile-${id}`}
                size="m"
                checked={checked}
                disabled={disabled}
                onCheckedChange={(v) => toggle(id, v === true)}
              />
              <label
                htmlFor={`tile-${id}`}
                className={cn(
                  "text-sm leading-6 text-(--color-text-neutral) cursor-pointer",
                  checked && "font-medium",
                  disabled && "cursor-not-allowed"
                )}
              >
                {TILES[id].label}
              </label>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex items-center gap-4">
        <Button
          size="large"
          disabled={draft.length === 0}
          onClick={() => {
            onSave(draft);
            onOpenChange(false);
          }}
          className="px-9 tracking-[0.5px]"
        >
          SAVE
        </Button>
        <span
          className="nuclios-type-body-default-regular text-(--color-text-neutral-muted)"
          aria-live="polite"
        >
          {draft.length} of {MAX_TILES} selected
        </span>
      </div>
    </Modal>
  );
}
