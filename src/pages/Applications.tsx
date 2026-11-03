import * as React from "react";
import { Ellipsis } from "lucide-react";
import { Dropdown, Tooltip } from "@nuclios";
import { cn } from "@/lib/utils";
import { FUNCTIONS, INDUSTRIES, WORKSPACES, type AppTone, type StudioApp } from "@/data";
import { HOME_ICONS, MaskIcon } from "@/components/studios/MaskIcon";

/* ------------------------------------------------------------------ */
/* Applications landing — Figma "Final exec Landing pages" App 9465:3450 */
/* Card rules — Figma "Card note" 9465:2657:                           */
/*  · title wraps to 2 lines, body to 3, then "…"; full text in a      */
/*    tooltip on the more icon                                         */
/*  · every card on the page has the same fixed height (276)           */
/*  · corner radius 20, min 24px internal spacing                      */
/*  · hover: soft multicolour glow (10548:9791)                        */
/* ------------------------------------------------------------------ */

export type AppsView = "tiles" | "list";

const ICON: Record<AppTone, string> = {
  peach: "figma/apps/icon-peach.svg",
  teal: "figma/apps/icon-teal.svg",
  lavender: "figma/apps/icon-lavender.svg",
  mint: "figma/apps/icon-mint-olive.svg",
  olive: "figma/apps/icon-mint-olive.svg",
  cobalt: "figma/apps/icon-cobalt.svg",
  brown: "figma/apps/icon-brown.svg",
  pink: "figma/apps/icon-pink.svg",
};

const APP_ICONS = {
  star: "figma/apps/star.svg",
  grid: "figma/home/view-grid.svg",
  list: "figma/apps/view-list.svg",
};

/* ------------------------------------------------------------------ */
/* "View by" toggle — Figma 12013:5577 (lives in the top bar)          */
/* ------------------------------------------------------------------ */
export function ViewByToggle({
  view,
  onChange,
}: {
  view: AppsView;
  onChange: (v: AppsView) => void;
}) {
  const opts = [
    ["tiles", APP_ICONS.grid, "Tile view"],
    ["list", APP_ICONS.list, "List view"],
  ] as const;
  return (
    // One filled pill (same fill + height as Sort by) holding both icons.
    <div
      role="group"
      aria-label="View by"
      className="flex h-9 items-center gap-1 rounded-[8px] bg-(--color-background-subtle) p-0.5"
    >
      {opts.map(([v, icon, label]) => (
        <React.Fragment key={v}>
          <Tooltip content={label}>
            <button
              type="button"
              aria-label={label}
              aria-pressed={view === v}
              onClick={() => onChange(v)}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-[6px] text-(--studios-view-icon) cursor-pointer transition-[background-color,opacity,box-shadow] duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)",
                view === v
                  ? "bg-(--studios-view-btn-on) shadow-(--studios-view-btn-shadow)"
                  : "opacity-45 hover:opacity-90"
              )}
            >
              <MaskIcon src={icon} width={12} />
            </button>
          </Tooltip>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hover glow — Figma "Hover 1 - gardient a" (I10548:9791;9393:7693)   */
/* Placed for the 324 × 276 card; it's clipped to the card.            */
/* ------------------------------------------------------------------ */
type Blob = {
  src: string;
  box: [number, number, number, number]; // left, top, width, height (outer)
  inner: [number, number]; // inner width, height
  rotate: number;
  inset: string;
};
const GLOW: Blob[] = [
  {
    src: "9a67ff",
    box: [-29, 42, 52, 223],
    inner: [223, 52],
    rotate: 90,
    inset: "-84.62% -19.73%",
  },
  {
    src: "7c46bf",
    box: [295, -50, 52, 223],
    inner: [223, 52],
    rotate: 90,
    inset: "-84.62% -19.73%",
  },
  {
    src: "5337e2",
    box: [-37.46, -37.27, 219.37, 84],
    inner: [215, 43.59],
    rotate: -11.05,
    inset: "-146.81% -29.77%",
  },
  {
    src: "7b61ff",
    box: [-36, -11, 245, 18],
    inner: [245, 18],
    rotate: 0,
    inset: "-155.56% -11.43%",
  },
  {
    src: "3329c3",
    box: [181, -42.12, 139.45, 114.32],
    inner: [139.45, 114.32],
    rotate: 0,
    inset: "-24.49% -20.08%",
  },
  {
    src: "ca35c0",
    box: [241, 130.32, 131.93, 157.38],
    inner: [96.3, 134.91],
    rotate: 17.23,
    inset: "-47.44% -66.46%",
  },
  {
    src: "35a7ca",
    box: [235.23, 134.85, 115.7, 147.63],
    inner: [81, 129.45],
    rotate: 17.23,
    inset: "-49.44% -79.01%",
  },
  {
    src: "5337e3",
    box: [25.63, 224.04, 233.16, 68.46],
    inner: [49.49, 229.83],
    rotate: 85.22,
    inset: "-27.85% -129.33%",
  },
  {
    src: "49fcbd",
    box: [287.99, 51.73, 75.74, 100.22],
    inner: [73.55, 98.6],
    rotate: -1.29,
    inset: "-64.91% -87.02%",
  },
  {
    src: "d1ff67",
    box: [275.62, 138.6, 62.31, 134.8],
    inner: [59.33, 133.5],
    rotate: -1.29,
    inset: "-26.97% -60.68%",
  },
  {
    src: "3f42ea",
    box: [-24, -48.5, 104.03, 153.12],
    inner: [153.12, 104.03],
    rotate: 90,
    inset: "-42.3% -28.74%",
  },
  {
    src: "fdf5ea",
    box: [-23, -80, 23, 315],
    inner: [315, 23],
    rotate: 90,
    inset: "-52.17% -3.81%",
  },
  {
    src: "rect112752",
    box: [161.95, 248.49, 157.19, 36.26],
    inner: [155.79, 24.92],
    rotate: -4.2,
    inset: "-171.67% -28.24% -176.56% -25.98%",
  },
  { src: "fff8ec", box: [-25, 81, 33, 140], inner: [140, 33], rotate: 90, inset: "-36.36% -8.57%" },
];

/** Drift offsets (px) for the hover glow blobs — varied so colours swirl, not slide. */
const DRIFT: [number, number][] = [
  [26, -18],
  [-22, 24],
  [30, 16],
  [-28, -20],
  [18, 28],
  [-16, -26],
  [24, -12],
];

function HoverGlow() {
  return (
    <div
      aria-hidden
      className="studios-app-glow pointer-events-none absolute inset-0 overflow-clip rounded-[20px] border-2 border-(--studios-glow-edge) bg-linear-to-b from-(--studios-glow-from) to-(--studios-glow-to) blur-[0.5px]"
    >
      {GLOW.map((b, i) => (
        <div
          key={b.src}
          className="studios-glow-blob absolute flex items-center justify-center"
          style={
            {
              left: b.box[0],
              top: b.box[1],
              width: b.box[2],
              height: b.box[3],
              // Each blob drifts on its own path and tempo while the card is hovered.
              "--dx": `${DRIFT[i % DRIFT.length][0]}px`,
              "--dy": `${DRIFT[i % DRIFT.length][1]}px`,
              "--dur": `${7 + ((i * 1.7) % 5)}s`,
              "--delay": `${-((i * 1.3) % 6)}s`,
            } as React.CSSProperties
          }
        >
          <div className="flex-none" style={{ rotate: `${b.rotate}deg` }}>
            <div className="relative" style={{ width: b.inner[0], height: b.inner[1] }}>
              <div className="absolute" style={{ inset: b.inset }}>
                <img
                  alt=""
                  src={`figma/apps/glow/${b.src}.svg`}
                  className="block size-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */
function AppIcon({ tone, size = "m" }: { tone: AppTone; size?: "m" | "s" }) {
  return (
    <span
      className={cn(
        "studios-app-icon inline-flex shrink-0 items-center justify-center overflow-clip opacity-80 transition-colors duration-300",
        size === "m"
          ? "rounded-[14px] p-3 fit-sm:p-2"
          : "rounded-[12px] p-2.5 fit:rounded-[10px] fit:p-1"
      )}
      style={{ "--app-tone": `var(--studios-app-${tone})` } as React.CSSProperties}
    >
      <MaskIcon src={ICON[tone]} width={24} />
    </span>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <span className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="studios-app-tag rounded-[20px] px-2 py-0.5 text-xs leading-5 tracking-[0.5px] transition-colors duration-300"
        >
          {t}
        </span>
      ))}
    </span>
  );
}

function StarButton({
  app,
  fav,
  onToggle,
}: {
  app: StudioApp;
  fav: boolean;
  onToggle: () => void;
}) {
  return (
    <Tooltip content={fav ? "Remove from favourites" : "Add to favourites"}>
      <button
        type="button"
        aria-label={fav ? `Remove ${app.title} from favourites` : `Add ${app.title} to favourites`}
        aria-pressed={fav}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={cn(
          "relative z-[1] inline-flex shrink-0 items-center justify-center rounded-full p-1 cursor-pointer transition-colors hover:bg-(--studios-row-hover)",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)",
          fav ? "text-(--studios-star)" : "text-(--studios-ink)"
        )}
      >
        {fav ? (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden fill="currentColor">
            <path d="M12 2.5l2.94 6.1 6.56.86-4.8 4.6 1.2 6.54L12 17.4l-5.9 3.2 1.2-6.54-4.8-4.6 6.56-.86z" />
          </svg>
        ) : (
          <MaskIcon src={APP_ICONS.star} width={20} />
        )}
      </button>
    </Tooltip>
  );
}

/** True when an element's text is cut off by its line clamp / truncate. */
function useTruncated<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [cut, setCut] = React.useState(false);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () =>
      setCut(el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, cut] as const;
}

/** Card note: the full title + description appear in a tooltip on the more icon. */
function MoreInfo({ app }: { app: StudioApp }) {
  return (
    <Tooltip
      content={
        <span className="block max-w-[280px]">
          <span className="block font-medium">{app.title}</span>
          <span className="mt-1 block">{app.description}</span>
        </span>
      }
    >
      <button
        type="button"
        aria-label={`Show full details for ${app.title}`}
        onClick={(e) => e.stopPropagation()}
        className="relative z-[1] inline-flex size-5 items-center justify-center rounded-full text-(--studios-app-desc) cursor-pointer hover:bg-(--studios-row-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
      >
        <Ellipsis className="size-3.5" aria-hidden />
      </button>
    </Tooltip>
  );
}

/* ------------------------------------------------------------------ */
/* Tile — Figma "card" 9465:3644 (324 × 276, p20, r20, gap 16)         */
/* ------------------------------------------------------------------ */
function AppTile({
  app,
  fav,
  onToggleFav,
  onOpen,
}: {
  app: StudioApp;
  fav: boolean;
  onToggleFav: () => void;
  onOpen: () => void;
}) {
  const [titleRef, titleCut] = useTruncated<HTMLParagraphElement>();
  const [descRef, descCut] = useTruncated<HTMLParagraphElement>();
  return (
    <li className="studios-app group relative h-[276px] fit:h-auto rounded-[20px] bg-(--studios-app-card)">
      <HoverGlow />
      {/* Whole card is the open target; star + more sit above it. */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${app.title}`}
        className="absolute inset-0 z-0 rounded-[20px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
      />
      <div className="pointer-events-none relative flex h-full flex-col gap-4 p-5 fit:gap-[clamp(10px,1.4vh,16px)] fit:p-[clamp(12px,1.7vh,20px)] [&_button]:pointer-events-auto">
        <div className="flex items-start justify-between">
          <AppIcon tone={app.tone} />
          <StarButton app={app} fav={fav} onToggle={onToggleFav} />
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-between gap-6 fit:gap-[clamp(16px,2.2vh,24px)]">
          <div className="relative flex flex-col gap-2 tracking-[0.5px]">
            <p
              ref={titleRef}
              className="studios-app-title line-clamp-2 text-[15px] font-medium leading-6 text-(--studios-app-title)"
            >
              {app.title}
            </p>
            <p
              ref={descRef}
              className="studios-app-desc line-clamp-3 pr-5 text-xs leading-5 fit:leading-[clamp(18px,2.5vh,20px)] text-(--studios-app-desc) transition-colors duration-300"
            >
              {app.description}
            </p>
            {(titleCut || descCut) && (
              <span className="absolute bottom-0 right-0">
                <MoreInfo app={app} />
              </span>
            )}
          </div>
          <Tags tags={app.tags} />
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* List row — same content as the tile, one line each                  */
/* ------------------------------------------------------------------ */
function AppRow({
  app,
  fav,
  onToggleFav,
  onOpen,
}: {
  app: StudioApp;
  fav: boolean;
  onToggleFav: () => void;
  onOpen: () => void;
}) {
  const [titleRef, titleCut] = useTruncated<HTMLParagraphElement>();
  const [descRef, descCut] = useTruncated<HTMLParagraphElement>();
  return (
    <li className="studios-app studios-app-row group relative rounded-[20px] bg-(--studios-app-card)">
      <div
        aria-hidden
        className="studios-app-glow pointer-events-none absolute inset-0 rounded-[20px]"
      />
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${app.title}`}
        className="absolute inset-0 z-0 rounded-[20px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
      />
      <div className="pointer-events-none relative grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-6 px-5 py-4 fit:gap-5 fit:py-[clamp(4px,0.8vh,16px)] max-md:grid-cols-[auto_minmax(0,1fr)_auto] [&_button]:pointer-events-auto">
        <AppIcon tone={app.tone} size="s" />
        <div className="relative min-w-0 pr-6 tracking-[0.5px] fit:flex fit:items-baseline fit:gap-3">
          <p
            ref={titleRef}
            className="studios-app-title truncate text-[15px] font-medium leading-6 fit:max-w-[50%] fit:shrink-0 text-(--studios-app-title)"
          >
            {app.title}
          </p>
          <p
            ref={descRef}
            className="studios-app-desc truncate text-xs leading-5 fit:min-w-0 fit:flex-1 text-(--studios-app-desc) transition-colors duration-300"
          >
            {app.description}
          </p>
          {(titleCut || descCut) && (
            <span className="absolute bottom-0 right-0">
              <MoreInfo app={app} />
            </span>
          )}
        </div>
        <span className="max-md:hidden">
          <Tags tags={app.tags} />
        </span>
        <StarButton app={app} fav={fav} onToggle={onToggleFav} />
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
type Sort = "all" | "az" | "za";

export function Applications({
  title,
  items,
  view,
  onViewChange,
  notify,
}: {
  /** Page title: the Home card that was clicked (e.g. "Applications", "Ai Agents"). */
  title: string;
  items: StudioApp[];
  view: AppsView;
  onViewChange: (v: AppsView) => void;
  notify: (t: string, d?: string) => void;
}) {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({ workspace: "all", industry: "all", fn: "all" });
  const [sort, setSort] = React.useState<Sort>("all");
  const [favs, setFavs] = React.useState<string[]>([]);

  const isFiltered =
    filters.workspace !== "all" || filters.industry !== "all" || filters.fn !== "all";
  const resetFilters = () => setFilters({ workspace: "all", industry: "all", fn: "all" });

  const apps = items.filter(
    (a) =>
      (filters.workspace === "all" || a.workspace === filters.workspace) &&
      (filters.industry === "all" || a.industry === filters.industry) &&
      (filters.fn === "all" || a.fn === filters.fn)
  );
  const sorted =
    sort === "all"
      ? apps
      : [...apps].sort((a, b) =>
          sort === "az" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );

  const opt = (xs: readonly string[]) => [
    { value: "all", label: "All" },
    ...xs.map((x) => ({ value: x, label: x })),
  ];
  const filterFields = [
    { id: "a-workspace", label: "Workspace", options: WORKSPACES, key: "workspace" },
    { id: "a-industry", label: "Industry", options: INDUSTRIES, key: "industry" },
    { id: "a-function", label: "Function", options: FUNCTIONS, key: "fn" },
  ] as const;

  const toggleFav = (id: string) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const open = (a: StudioApp) => notify(`Opening ${a.title}`, title);

  return (
    <>
      <main className="mx-4 flex-1 pb-[52px] pt-5 sm:mx-11 fit:flex fit:h-[calc(100dvh-4rem-26px)] fit:min-h-0 fit:flex-none fit:flex-col fit:pb-[clamp(12px,1.7vh,52px)] fit:pt-[clamp(10px,1.4vh,20px)]">
        {/* Header (9465:3653 / 3655) — title and controls share one line; no subtitle. */}
        <div className="relative shrink-0">
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
            <div className="min-w-0 max-w-[900px]">
              <h1 className="studios-apps-title py-3 text-(--studios-app-title)">{title}</h1>
            </div>
            <div className="flex h-12 items-center gap-[19px]">
              {/* FILTER (9465:3659) */}
              <button
                type="button"
                aria-expanded={filterOpen}
                aria-controls="apps-filters"
                onClick={() => setFilterOpen((o) => !o)}
                className={cn(
                  "flex items-center gap-2 rounded-[8px] border px-2 py-1 cursor-pointer transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)",
                  filterOpen
                    ? "border-(--studios-ink)"
                    : "border-(--studios-apps-filter-border) hover:border-(--studios-filter-btn-border)"
                )}
                style={{ background: "var(--studios-filter-btn)" }}
              >
                <MaskIcon
                  src={HOME_ICONS.filter}
                  width={16}
                  className="text-(--studios-filter-icon)"
                />
                <span className="studios-apps-caps text-(--studios-ink)">FILTER</span>
                {isFiltered && (
                  <span
                    className="size-1.5 rounded-full bg-(--color-background-primary)"
                    aria-label="Filters applied"
                  />
                )}
              </button>
              {/* Sort by (9465:3664) */}
              <span className="studios-apps-dd">
                <Dropdown
                  id="apps-sort"
                  label="Sort by"
                  header="inline"
                  variant="filled"
                  size="m"
                  className="w-auto"
                  options={[
                    { value: "all", label: "All" },
                    { value: "az", label: "Name A–Z" },
                    { value: "za", label: "Name Z–A" },
                  ]}
                  value={sort}
                  onValueChange={(v) => setSort(v as Sort)}
                />
              </span>
              {/* View by — beside Sort by */}
              <ViewByToggle view={view} onChange={onViewChange} />
            </div>
          </div>

          {/* Filter row (9465:3678) — opens into the gap above the cards. */}
          <div
            className="studios-filter-reveal studios-apps-filter"
            data-open={filterOpen}
            inert={!filterOpen}
          >
            <div className="studios-filter-clip">
              <div
                id="apps-filters"
                role="region"
                aria-label="Filters"
                className="studios-filterbar studios-apps-dd rounded-[8px] px-6 py-[10px] fit:py-1.5"
                style={{ backgroundImage: "var(--studios-filterbar-gradient)" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-11 gap-y-3 xl:w-max xl:min-w-[701px] xl:flex-nowrap">
                  <div className="flex flex-wrap items-center gap-x-11 gap-y-3 xl:flex-nowrap">
                    {filterFields.map((f, i) => (
                      <span
                        key={f.id}
                        className="studios-filter-item"
                        style={{ "--stagger": `${120 + i * 55}ms` } as React.CSSProperties}
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

        {/* Cards (9465:3642) — tiles: 4 × 324 with 56 / 48 gaps; list: one row each. */}
        <section
          aria-label={title}
          className="mt-10 xl:mt-[92px] fit:mt-[clamp(80px,10.9vh,92px)] fit:flex fit:min-h-0 fit:flex-1 fit:flex-col"
        >
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-[20px] bg-(--studios-app-card) px-6 py-16 text-center">
              <p className="text-lg font-medium text-(--studios-app-title)">Nothing found</p>
              <p className="text-sm text-(--studios-app-desc)">Nothing matches these filters.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-1 rounded-[4px] px-2 py-1 text-sm font-medium text-(--studios-ink) underline-offset-4 cursor-pointer hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : view === "tiles" ? (
            // Card note: 56px column gap, 48px row gap (cards share the row equally).
            <ul
              className={cn(
                "grid grid-cols-1 gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                // Short screens: equal column/row gaps scale together; the two rows share the
                // height left under the header, so every card keeps one height.
                "fit:[--gap:clamp(28px,3.8vh,56px)] fit:grid-cols-4 fit:gap-(--gap) fit:auto-rows-[calc((100%-var(--gap))/2)]",
                "fit:-m-3 fit:min-h-0 fit:flex-1 fit:overflow-y-auto fit:p-3 fit:[scrollbar-width:thin]"
              )}
            >
              {sorted.map((a) => (
                <AppTile
                  key={a.id}
                  app={a}
                  fav={favs.includes(a.id)}
                  onToggleFav={() => toggleFav(a.id)}
                  onOpen={() => open(a)}
                />
              ))}
            </ul>
          ) : (
            <ul className="flex flex-col gap-4 fit:-m-3 fit:min-h-0 fit:flex-1 fit:gap-[clamp(6px,1.1vh,16px)] fit:overflow-y-auto fit:p-3 fit:[scrollbar-width:thin]">
              {sorted.map((a) => (
                <AppRow
                  key={a.id}
                  app={a}
                  fav={favs.includes(a.id)}
                  onToggleFav={() => toggleFav(a.id)}
                  onOpen={() => open(a)}
                />
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* Footer (9465:3668) */}
      <footer className="flex items-end gap-[21px] px-4 pb-2 sm:px-11">
        <span role="img" aria-label="MathCo" className="relative inline-block h-[18px] w-[72px]">
          <span className="absolute left-0 top-0 size-[18px] overflow-hidden">
            <img
              alt=""
              src="figma/home/mathco-mark.png"
              className="absolute max-w-none"
              style={{ height: "194.86%", width: "169.15%", left: "-36.97%", top: "-49.1%" }}
            />
          </span>
          <img
            alt=""
            src="figma/home/mathco-wordmark.png"
            className="absolute left-[22px] top-[4px] h-[9.625px] w-[50px] max-w-none object-cover"
          />
        </span>
        <span className="text-sm leading-none tracking-[1px] text-(--studios-apps-version)">
          4.0.0
        </span>
      </footer>
    </>
  );
}
