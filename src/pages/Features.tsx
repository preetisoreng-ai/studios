import * as React from "react";
import { Button } from "@nuclios";
import { cn } from "@/lib/utils";
import { Code, Database, Layers } from "lucide-react";
import { ApplicationsGlyph, AssistantsGlyph } from "@/components/studios/TileArt";

/* ------------------------------------------------------------------ */
/* Explore Features — layout from the "NucliOS Applications Studio
   Dashboard" mockup; icons from Figma "WORKING _ Studio landing Pages",               */
/* section "feature page" (40000002:12689):                             */
/*   rest  40000002:12694 · hover 40000002:12766 (card 40000002:12833)  */
/* ------------------------------------------------------------------ */

const A = "figma/features/";

/** Two-layer "glass" icon: a blurred background shape + a front shape, as in Figma. */
function Glass({
  w,
  h,
  bg,
  bgBox,
  bgInset,
  icon,
  iconBox,
  iconInset,
}: {
  w: number;
  h: number;
  bg: string;
  bgBox: string;
  bgInset: string;
  icon: string;
  iconBox: string;
  iconInset: string;
}) {
  return (
    <span className="relative block shrink-0" style={{ width: w, height: h }}>
      <span className="absolute" style={{ inset: bgBox }}>
        <span className="absolute" style={{ inset: bgInset }}>
          <img alt="" src={A + bg} className="block size-full max-w-none" />
        </span>
      </span>
      <span className="absolute" style={{ inset: iconBox }}>
        <span className="absolute" style={{ inset: iconInset }}>
          <img alt="" src={A + icon} className="block size-full max-w-none" />
        </span>
      </span>
    </span>
  );
}

type IconKind =
  | "pie"
  | "star"
  | "folder"
  | "cart"
  | "shield"
  | "agent"
  | "llm"
  | "info"
  | "chart"
  | "apps"
  | "bookmark"
  | "strategy"
  | "folder-pink"
  | "discovery"
  | "orb"
  | "metadata"
  | "transformation";

/** Feature icons, built from the Figma layers (positions and insets kept exactly). */
function FeatureIcon({ kind }: { kind: IconKind }) {
  switch (kind) {
    case "pie":
      return <img alt="" src={A + "pie-chart.svg"} className="block size-10" />;
    case "star":
      return (
        <Glass
          w={33}
          h={40}
          bg="star-bg.svg"
          bgBox="0 5.77% 33.34% 9.8%"
          bgInset="-73.91% -70.21% -74.78% -74.17%"
          icon="star-icon.svg"
          iconBox="26.87% 0 0 0"
          iconInset="-3.42% -13.73% -19.2% -3.03%"
        />
      );
    case "folder":
      return (
        <Glass
          w={45}
          h={40}
          bg="folder-bg.svg"
          bgBox="0 0 9.01% 23.1%"
          bgInset="-31.64% -34.35% -31.66% -34.34%"
          icon="folder-icon.svg"
          iconBox="12.68% 21.57% 0 0"
          iconInset="-2.86% -22.18% -20.93% -2.83%"
        />
      );
    case "cart":
      return <img alt="" src={A + "cart.svg"} className="block h-8 w-[37.923px]" />;
    case "shield":
      return (
        <span className="relative block h-[40px] w-[42px] shrink-0">
          <span className="absolute left-0 top-0 h-[31.08px] w-[29.863px]">
            <span className="absolute" style={{ inset: "-44.72% -47.72% -41.89% -49.95%" }}>
              <img alt="" src={A + "shield-bg.svg"} className="block size-full max-w-none" />
            </span>
          </span>
          <span className="absolute left-[10.05px] top-[4.08px] flex h-[35.926px] w-[31.945px] items-center justify-center">
            <span className="relative block h-[32.149px] w-[27.365px] rotate-[8.73deg]">
              <span className="absolute" style={{ inset: "-3.1% -28.15% -8.27% -3.64%" }}>
                <img alt="" src={A + "shield-icon.svg"} className="block size-full max-w-none" />
              </span>
            </span>
          </span>
        </span>
      );
    case "agent":
      return (
        <span className="relative block h-10 w-[33px]">
          <span className="absolute" style={{ inset: "-0.1% -0.13% 0 -0.12%" }}>
            <img alt="" src={A + "agent.svg"} className="block size-full max-w-none" />
          </span>
        </span>
      );
    case "llm":
      return (
        <span className="relative block h-7 w-10">
          <span className="absolute" style={{ inset: "0 0 -2.07% -2.5%" }}>
            <img alt="" src={A + "llm.svg"} className="block size-full max-w-none" />
          </span>
        </span>
      );
    case "info":
      return (
        <span className="relative block size-10">
          {/* Bg: a 30.57px square turned -15°, centred in the top-left 93.6% box */}
          <span
            className="absolute flex items-center justify-center"
            style={{ inset: "0 6.39% 6.39% 0" }}
          >
            <span className="relative block size-[30.57px] -rotate-15">
              <span className="absolute" style={{ inset: "-62.99% -61.94% -58.53% -61.34%" }}>
                <img alt="" src={A + "info-bg.svg"} className="block size-full max-w-none" />
              </span>
            </span>
          </span>
          <span className="absolute" style={{ inset: "23.56% 0 0 23.56%" }}>
            <span className="absolute" style={{ inset: "-3.27% -3.27% -12.26% -3.27%" }}>
              <img alt="" src={A + "info-icon.svg"} className="block size-full max-w-none" />
            </span>
          </span>
        </span>
      );
    case "chart":
      return (
        <span className="relative block h-10 w-[42.5px]">
          <span className="absolute left-0 top-0 h-[38.229px] w-[38.036px]">
            <span className="absolute" style={{ inset: "-24.85% -18.55% -21.05% -25.55%" }}>
              <img alt="" src={A + "chart-bg.svg"} className="block size-full max-w-none" />
            </span>
          </span>
          <span className="absolute left-[11.41px] top-[8.79px] h-[31.213px] w-[31.054px]">
            <span className="absolute" style={{ inset: "-3.2% -25.63% -27.57% -3.22%" }}>
              <img alt="" src={A + "chart-icon.svg"} className="block size-full max-w-none" />
            </span>
          </span>
        </span>
      );
    case "apps":
      return <ApplicationsGlyph />;
    case "bookmark":
      return (
        <span className="relative block h-10 w-[37.8px]">
          <span
            className="absolute left-[7.73px] top-0 h-[28.334px] w-[30.074px] rounded-[4px] shadow-[inset_0_2.563px_2.563px_rgb(255_255_255/0.25)]"
            style={{
              backgroundImage:
                "linear-gradient(195.71deg, rgb(84 198 251 / 0.8) 6.28%, rgb(57 47 248 / 0.8) 76.31%)",
            }}
          />
          <span className="absolute left-0 top-[5.67px] h-[34.334px] w-[30.074px]">
            <span className="absolute" style={{ inset: "-67.19% -85.23% -74.95% -85.23%" }}>
              <img alt="" src={A + "bp-rect.svg"} className="block size-full max-w-none" />
            </span>
          </span>
          <span className="absolute left-[10.31px] top-[15.91px] h-[2.171px] w-[9.624px] rounded-[7.929px] bg-(--studios-art-white)" />
          <span className="absolute left-[14px] top-[12.33px] h-[9.333px] w-[2.238px] rounded-[3px] bg-(--studios-art-white)" />
        </span>
      );
    case "strategy":
      return (
        <span className="relative block h-10 w-[40.6px]">
          <span className="absolute left-0 top-0 h-[37.618px] w-[38.654px]">
            <span className="absolute" style={{ inset: "-147.76% -115.51% -147.76% -65.36%" }}>
              <img alt="" src={A + "strat-bg.svg"} className="block size-full max-w-none" />
            </span>
          </span>
          <span className="absolute left-[13.77px] top-[11.76px] h-[28.245px] w-[26.832px]">
            <span className="absolute" style={{ inset: "-3.65% -22.76% -18.44% -3.84%" }}>
              <img alt="" src={A + "strat-icon.svg"} className="block size-full max-w-none" />
            </span>
          </span>
        </span>
      );
    case "folder-pink":
      return (
        <span className="relative block h-[32.376px] w-[43.817px]">
          <span className="absolute" style={{ inset: "-16.74% -33.08% -73.07% -32.94%" }}>
            <img alt="" src={A + "folder-pink.svg"} className="block size-full max-w-none" />
          </span>
        </span>
      );
    case "transformation":
      return <img alt="" src={A + "transformation.svg"} className="block h-[26px] w-10" />;
    case "orb":
      return <AssistantsGlyph />;
    case "metadata":
      // Analytics chart glass in the mockup's pink (no separate asset exists).
      return (
        <span className="block [filter:hue-rotate(-28deg)_saturate(1.15)]">
          <FeatureIcon kind="chart" />
        </span>
      );
    case "discovery":
      return (
        <Glass
          w={36}
          h={36}
          bg="discovery-bg.svg"
          bgBox="0 16.38% 16.38% 0"
          bgInset="-55.63% -55.38% -54.87% -55.12%"
          icon="discovery-icon.svg"
          iconBox="16.38% 0 0 16.38%"
          iconInset="-3.32% -19.24% -18.04% -3.32%"
        />
      );
  }
}

/* ------------------------------------------------------------------ */
/* Explore Features — studios on the left, details panel right.        */
/* Hover a tile to preview it in the panel; click to pin it there.     */
/* ------------------------------------------------------------------ */
type Item = {
  /** Feature id — View opens that feature's page. */
  id: string;
  title: string;
  icon: IconKind;
  ai?: boolean;
};

type Studio = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  viewMore?: boolean;
  items: Item[];
  /** Revealed when the studio is expanded with View More (Figma 40000015:13684). */
  more?: Item[];
};

const STUDIOS: Studio[] = [
  {
    label: "DATA STUDIO",
    icon: Database,
    viewMore: true,
    more: [
      {
        id: "transformation-journey",
        title: "Transformation Journey",
        icon: "transformation",
      },
    ],
    items: [
      {
        id: "data-control-tower",
        title: "Data Control Tower",
        icon: "shield",
      },
      {
        id: "data-marketplace",
        title: "Data Marketplace",
        icon: "cart",
      },
      {
        id: "data-model",
        title: "Data Model",
        icon: "pie",
        ai: true,
      },
      {
        id: "data-quality-control",
        title: "Data Quality Control",
        icon: "star",
        ai: true,
      },
      {
        id: "integrations",
        title: "Integrations",
        icon: "folder",
      },
      {
        id: "metadata",
        title: "Metadata & Business Rules",
        icon: "metadata",
      },
    ],
  },
  {
    label: "ALGO STUDIO",
    icon: Code,
    items: [
      {
        id: "ai-agents",
        title: "AI Agents",
        icon: "agent",
        ai: true,
      },
      {
        id: "llm-workbench",
        title: "LLM WorkBench",
        icon: "llm",
      },
      {
        id: "analytics-control-tower",
        title: "Analytics Control Tower",
        icon: "chart",
      },
      {
        id: "model-blueprint",
        title: "Model Blueprint",
        icon: "info",
        ai: true,
      },
    ],
  },
  {
    label: "DECISION STUDIO",
    icon: Layers,
    items: [
      {
        id: "apps",
        title: "Applications",
        icon: "apps",
        ai: true,
      },
      {
        id: "ai-assistants",
        title: "AI Assistants",
        icon: "orb",
      },
      {
        id: "business-processes",
        title: "Business Process",
        icon: "bookmark",
      },
      {
        id: "business-strategies",
        title: "Business Strategies",
        icon: "strategy",
      },
      {
        id: "solution-journey",
        title: "Solution Journey",
        icon: "folder-pink",
      },
      {
        id: "frameworks",
        title: "Frameworks",
        icon: "discovery",
      },
    ],
  },
];

const ALL_ITEMS = STUDIOS.flatMap((s) => [...s.items, ...(s.more ?? [])]);
const DEFAULT_ID = "apps";

/* ------------------------------------------------------------------ */
/* Tile                                                                */
/* ------------------------------------------------------------------ */
function Tile({
  item,
  selected,
  onPreview,
  onSelect,
}: {
  item: Item;
  selected: boolean;
  onPreview: () => void;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={selected}
        aria-label={`${item.title}${item.ai ? ", AI powered" : ""}`}
        onMouseEnter={onPreview}
        onFocus={onPreview}
        onClick={onSelect}
        className={cn(
          "studios-explore-tile flex w-full flex-col items-center justify-center gap-2 rounded-[14px] px-3 py-3 text-center cursor-pointer",
          "h-[138px] fit:h-[clamp(96px,15.6vh,138px)]",
          selected && "is-selected"
        )}
      >
        <span className="flex h-14 items-center justify-center fit:h-12 fit:[zoom:0.9]">
          <FeatureIcon kind={item.icon} />
        </span>
        <span className="flex flex-col items-center">
          <span className="text-sm leading-5 tracking-[0.5px] text-(--studios-feat-tile-name)">
            {item.title}
          </span>
          {item.ai && (
            <span className="text-xs leading-[19.2px] text-(--studios-feat-ai)">AI Powered</span>
          )}
        </span>
      </button>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Details panel — Figma "Studios – Final files" › Features Page ›      */
/* "feature screens detail", Opt 2 – Studio Theme (73333:191).         */
/* One panel per feature: title, description, Create / Open, then the  */
/* feature's illustration (518 × 300, r30) at the bottom.              */
/* ------------------------------------------------------------------ */
const FD = "figma/feature-details/";

/** How each illustration is cropped in its Figma frame. */
type Crop =
  | { fit: "cover"; position?: string }
  | { fit: "custom"; h: string; w: string; left: string; top: string };

type Detail = {
  text: string;
  image: string;
  crop: Crop;
  /** Frameworks only: two sub-sections instead of one description. */
  sections?: { label: string; icon: string; text: string }[];
};

const COVER: Crop = { fit: "cover" };
const BOTTOM: Crop = { fit: "cover", position: "bottom" };

const DETAILS: Record<string, Detail> = {
  "data-control-tower": {
    text: "Supports governance of data quality, lineage, and compliance through a unified dashboard. Offers proactive alerts, trend tracking, and stewardship tools to ensure trustworthy data is available for strategic and operational use.",
    image: "data-control-tower.png",
    crop: {
      fit: "custom",
      h: "139.77%",
      w: "147.22%",
      left: "-21.87%",
      top: "-4.85%",
    },
  },
  "data-marketplace": {
    text: "Facilitates discovery, sharing, and reuse of data assets across the organization. Users can browse certified datasets, access usage metrics, and request data – accelerating time-to-insight and reducing redundancy.",
    image: "data-marketplace.png",
    crop: COVER,
  },
  "data-model": {
    text: "Allows teams to design, visualize, and manage logical and physical data models. It supports alignment between technical data structures and business concepts, enhancing clarity, reuse, and enterprise-wide data consistency.",
    image: "data-model.png",
    crop: {
      fit: "custom",
      h: "150.95%",
      w: "139.87%",
      left: "-18.8%",
      top: "-22.12%",
    },
  },
  "data-quality-control": {
    text: "Ensures the accuracy, completeness, and reliability of enterprise data through configurable validation rules, anomaly detection, and cleansing workflows—empowering teams to maintain trusted data pipelines and drive confident decisions.",
    image: "data-quality-control.png",
    crop: BOTTOM,
  },
  integrations: {
    text: "Manages secure and scalable connections between NucliOS and external systems and data sources, enabling seamless data flow across platforms. With pre-built connectors and API support, it simplifies integration while maintaining security, scalability, and data flow integrity.",
    image: "integrations.png",
    crop: BOTTOM,
  },
  metadata: {
    text: "Bridges technical metadata with business context enhancing data assets more understandable and accessible. By tagging data with definitions, ownership, and relevance, it helps users find and trust the right information.",
    image: "metadata.png",
    crop: BOTTOM,
  },
  "ai-agents": {
    text: "Offers access to centralized marketplace to access and manage a library of AI capabilities – such as Text-to-SQL, Document Search, and Image Q&A. Users can explore both verified and in-development skillsets, enabling teams to apply ready-to-use AI agents across a variety of business and analytical scenarios.",
    image: "ai-agents.png",
    crop: COVER,
  },
  "llm-workbench": {
    text: "Facilitates full lifecycle management (loading, fine-tuning, and validating) large language models using enterprise data. Users can bring their own LLMs, run evaluations, and track deployed models — supporting custom use cases from experimentation to production.",
    image: "llm-workbench.png",
    crop: COVER,
  },
  "analytics-control-tower": {
    text: "Provides centralized oversight for managing analytics workflows, performance metrics, and operational insights. It empowers users to oversee analytical health, flag anomalies, and make proactive adjustments—ensuring sustained business impact from analytical initiatives.",
    image: "analytics-control-tower.png",
    crop: COVER,
  },
  "model-blueprint": {
    text: "Delivers accelerated solution development through a modular library of pre-built components and configurable code blocks designed to accelerate the development of data science solutions. With reusable widgets, detailed documentation, and embedded best practices, it helps teams build, adapt, and scale models faster — ensuring consistency and governance across projects.",
    image: "model-blueprint.png",
    crop: COVER,
  },
  apps: {
    text: "Supports creation of customized applications using a rich library of visualization and decision components. Teams can visualize data, simulate scenarios, collaborate on findings, and integrate AI to enhance decision quality.",
    image: "apps.png",
    crop: BOTTOM,
  },
  "ai-assistants": {
    text: "Delivers automation of business and technical tasks through a suite of contextual, AI-powered assistants. These assistants help surface insights, streamline workflows, and enhance productivity through conversational interfaces.",
    image: "ai-assistants.png",
    crop: COVER,
  },
  "business-processes": {
    text: "Enables automation and oversight of recurring business tasks and processes. Teams can design, monitor, and optimize processes to improve accuracy, reduce delays, identify dependencies, and ensure repeatability—supporting operational efficiency at scale.",
    image: "business-processes.png",
    crop: COVER,
  },
  "business-strategies": {
    text: "Empowers organizations to define, track, and align strategic objectives with measurable outcomes. Through visual planning tools and real-time dashboards, teams can view targets, monitor KPIs, and adapt goals based on performance insights—supporting leaders in navigating business direction with clarity and confidence.",
    image: "business-strategies.png",
    crop: COVER,
  },
  "solution-journey": {
    text: "Facilitates end-to-end solutioning paths from problem identification and definition to business value realization. Users can follow journeys that connect tools, insights, and actions—turning raw data into strategic outcomes through structured, goal-driven workflows",
    image: "solution-journey.png",
    crop: COVER,
  },
  "transformation-journey": {
    text: "Provides structured workflows for managing data transformation efforts aligned with business goals. Provides a comprehensive view of capabilities, dependencies, and outcomes to ensure initiatives stay on course and deliver measurable impact.",
    image: "transformation-journey.png",
    crop: COVER,
  },
  frameworks: {
    text: "",
    image: "frameworks.png",
    crop: COVER,
    sections: [
      {
        label: "DEFINE FRAMEWORK",
        icon: "fw-define.svg",
        text: "Enables organizations to establish, articulate, and oversee high-level business initiatives and measurable goals that drive data-centric decision-making. Through...",
      },
      {
        label: "ROADMAPS",
        icon: "fw-roadmaps.svg",
        text: "Supports teams in organizing, prioritizing, and sequencing opportunities across business themes. With...",
      },
    ],
  },
};

function Illustration({ detail }: { detail: Detail }) {
  const c = detail.crop;
  return (
    <div className="relative min-h-0 w-full flex-1">
      <div className="absolute inset-x-0 bottom-0 mx-auto aspect-[518/300] max-h-full overflow-hidden rounded-[30px]">
        {c.fit === "custom" ? (
          <img
            alt=""
            src={FD + detail.image}
            className="absolute max-w-none"
            style={{ height: c.h, width: c.w, left: c.left, top: c.top }}
          />
        ) : (
          <img
            alt=""
            src={FD + detail.image}
            className="absolute inset-0 size-full object-cover"
            style={{ objectPosition: c.position ?? "center" }}
          />
        )}
      </div>
    </div>
  );
}

function DetailsPanel({
  item,
  onOpen,
  onCreate,
  onCreateAI,
}: {
  item: Item;
  onOpen: () => void;
  onCreate: (what?: string) => void;
  onCreateAI: () => void;
}) {
  const d = DETAILS[item.id];
  return (
    <aside
      aria-label={`${item.title} details`}
      aria-live="polite"
      className="studios-detail-panel flex min-h-0 flex-col rounded-[40px] px-12 pb-12 pt-7 fit:px-[clamp(24px,3.4vh,48px)] fit:pb-[clamp(20px,3.4vh,48px)] fit:pt-[clamp(16px,2.4vh,28px)]"
    >
      {/* Re-keyed so the content eases in each time the feature changes. */}
      <div key={item.id} className="studios-explore-panel-body flex min-h-0 flex-1 flex-col">
        <h2 className="studios-detail-title text-(--studios-feat-title)">{item.title}</h2>

        {d?.sections ? (
          // Frameworks (6914:22969): two sub-sections, each with Create New / Open.
          <div className="mt-[clamp(16px,3.2vh,36px)] flex flex-col gap-[clamp(16px,3.4vh,40px)]">
            {d.sections.map((s) => (
              <div key={s.label} className="flex flex-col gap-3 fit:gap-[clamp(8px,1.4vh,16px)]">
                <p className="flex items-center gap-[7px] text-sm font-medium leading-6 tracking-[0.5px] text-(--studios-feat-title)">
                  <img alt="" src={FD + s.icon} className="size-4" />
                  {s.label}
                </p>
                <p className="text-[13px] leading-5 tracking-[0.5px] text-(--studios-detail-text)">
                  {s.text}{" "}
                  <button
                    type="button"
                    onClick={onOpen}
                    className="text-xs font-medium text-(--studios-detail-more) cursor-pointer hover:underline"
                  >
                    show more
                  </button>
                </p>
                <div className="flex items-center gap-[13px]">
                  <Button
                    variant="border"
                    size="small"
                    onClick={() => onCreate(s.label.toLowerCase())}
                  >
                    Create New
                  </Button>
                  <Button variant="border" size="small" onClick={onOpen}>
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="mt-[clamp(14px,3vh,36px)] text-[15px] leading-[23px] tracking-[0.5px] text-(--studios-detail-text) fit:text-sm fit:leading-[22px]">
              {d?.text}
            </p>
            <div className="mt-[clamp(16px,3.6vh,64px)] flex flex-wrap items-center gap-[14px]">
              {/* NucliOS Button — Figma "Button" 9872:41320 (border / medium). */}
              <Button variant="border" size="medium" className="px-5" onClick={() => onCreate()}>
                Create
              </Button>
              <Button variant="border" size="medium" className="px-5" onClick={onOpen}>
                View
              </Button>
              <Button
                variant="ghost"
                size="medium"
                onClick={() => onCreateAI()}
                leadingIcon={<img alt="" src="figma/features/sparkle-ai.svg" className="size-6" />}
                className="ml-auto bg-(--color-background-primary-muted) px-5 hover:bg-(--color-background-primary-selected)"
              >
                Create with AI
              </Button>
            </div>
          </>
        )}

        <div className="mt-[clamp(16px,3vh,40px)] flex min-h-0 flex-1">
          {d && <Illustration detail={d} />}
        </div>
      </div>
    </aside>
  );
}

/** Warm the image cache so switching features in the panel is instant. */
function usePreloadDetailImages() {
  React.useEffect(() => {
    const imgs = Object.values(DETAILS).map((d) => {
      const im = new Image();
      im.decoding = "async";
      im.src = FD + d.image;
      return im;
    });
    return () => imgs.forEach((im) => (im.src = ""));
  }, []);
}
/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function Features({
  onOpen,
  onCreate,
  notify,
}: {
  onOpen: (featureId: string) => void;
  /** Opens the common "Create artifact" popup (Figma 10161:5982). */
  onCreate?: (featureId: string, featureTitle: string) => void;
  notify?: (title: string, description?: string, type?: "informative" | "success") => void;
}) {
  const [selectedId, setSelectedId] = React.useState(DEFAULT_ID);
  const [previewId, setPreviewId] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const shown = ALL_ITEMS.find((i) => i.id === (previewId ?? selectedId)) ?? ALL_ITEMS[0];
  usePreloadDetailImages();

  return (
    <>
      <main className="mx-4 flex-1 pb-10 pt-10 sm:mx-11 xl:mx-[74px] fit:flex fit:h-[calc(100dvh-4rem-26px)] fit:min-h-0 fit:flex-none fit:flex-col fit:pb-[clamp(8px,1.6vh,40px)] fit:pt-[clamp(14px,3vh,48px)]">
        {/* Title + studios on the left; the details panel starts level with the title. */}
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(340px,460px)] xl:gap-9 fit:min-h-0 fit:flex-1">
          <div className="flex min-w-0 flex-col fit:min-h-0">
            <header className="shrink-0">
              <h1 className="studios-explore-title text-(--studios-feat-title)">
                Explore Features
              </h1>
            </header>
            {/* Studios */}
            <div
              className="studios-scroll mt-10 flex min-w-0 flex-col gap-7 fit:-mr-3 fit:mt-[clamp(14px,3vh,40px)] fit:min-h-0 fit:flex-1 fit:justify-between fit:gap-[clamp(10px,2vh,28px)] fit:overflow-y-auto fit:pr-3"
              onMouseLeave={() => setPreviewId(null)}
            >
              {STUDIOS.map((s) => (
                <section
                  key={s.label}
                  aria-label={s.label}
                  className="flex flex-col gap-4 fit:gap-[clamp(8px,1.4vh,16px)]"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-(--studios-feat-rule) pb-1 pl-[30px] pr-5 pt-1">
                    <h2 className="studios-explore-studio text-(--studios-feat-group-strong)">
                      {s.label}
                    </h2>
                    {s.viewMore && s.more && (
                      <button
                        type="button"
                        aria-expanded={!!expanded[s.label]}
                        aria-controls={`more-${s.label}`}
                        onClick={() => setExpanded((e) => ({ ...e, [s.label]: !e[s.label] }))}
                        className="flex h-9 items-center gap-2 rounded-[4px] px-5 text-sm font-medium text-(--studios-feat-viewmore) cursor-pointer hover:bg-(--studios-row-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)"
                      >
                        {expanded[s.label] ? "View Less" : "View More"}
                        <img
                          alt=""
                          src={A + "caret-up.svg"}
                          className={cn(
                            "size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:invert",
                            !expanded[s.label] && "rotate-180"
                          )}
                        />
                      </button>
                    )}
                  </div>
                  <ul className="grid grid-cols-2 gap-5 pl-2.5 sm:grid-cols-3 lg:grid-cols-[repeat(6,minmax(0,183px))]">
                    {s.items.map((it) => (
                      <Tile
                        key={it.id}
                        item={it}
                        selected={it.id === selectedId}
                        onPreview={() => setPreviewId(it.id)}
                        onSelect={() => {
                          setSelectedId(it.id);
                          setPreviewId(null);
                        }}
                      />
                    ))}
                  </ul>
                  {s.more && (
                    // Accordion: the extra row eases open under the first (grid rows 0fr -> 1fr).
                    <div
                      id={`more-${s.label}`}
                      className="studios-accordion"
                      data-open={!!expanded[s.label]}
                      inert={!expanded[s.label]}
                    >
                      <div className="studios-accordion-clip">
                        <ul className="grid grid-cols-2 gap-5 pt-5 pl-2.5 sm:grid-cols-3 lg:grid-cols-[repeat(6,minmax(0,183px))]">
                          {s.more.map((it) => (
                            <Tile
                              key={it.id}
                              item={it}
                              selected={it.id === selectedId}
                              onPreview={() => setPreviewId(it.id)}
                              onSelect={() => {
                                setSelectedId(it.id);
                                setPreviewId(null);
                              }}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>

          {/* Details */}
          <DetailsPanel
            item={shown}
            onOpen={() => onOpen(shown.id)}
            onCreate={(what) =>
              onCreate?.(
                shown.id,
                what ? what.replace(/^./, (c) => c.toUpperCase()) : shown.title
              )
            }
            onCreateAI={() =>
              notify?.(
                "Upcoming feature",
                `Create ${shown.title} with AI is coming soon.`,
                "informative"
              )
            }
          />
        </div>
      </main>

      <footer className="flex items-end gap-[21px] px-4 pb-2 sm:px-10">
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
      </footer>
    </>
  );
}
