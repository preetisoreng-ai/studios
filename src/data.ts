// Content for the Studios prototype, taken from the Figma "Studios – Final files".

export type Route =
  | { page: "home" }
  | { page: "features" }
  | { page: "admin" }
  | { page: "support" }
  | { page: "workspace" }
  | { page: "project"; projectId: string }
  | { page: "landing"; featureId: string }
  | { page: "artifact" };

export type TileId =
  | "applications"
  | "solution-journeys"
  | "business-processes"
  | "assistants"
  | "business-strategies"
  | "analytics-control-tower"
  | "data-control-tower"
  | "marketplace";

export type BadgeTone = "yellow" | "pink" | "blue" | "purple";

export interface Tile {
  id: TileId;
  label: string; // name in the "Add to Home Page" modal
  title: string;
  description: string;
  count: number;
  tone: BadgeTone;
  featureId: string;
}

export const TILES: Record<TileId, Tile> = {
  applications: {
    id: "applications",
    label: "Applications",
    title: "Applications",
    description:
      "Access all your business apps in one place to streamline organisational decision-making",
    count: 300,
    tone: "yellow",
    featureId: "apps",
  },
  "solution-journeys": {
    id: "solution-journeys",
    label: "Solution Journey",
    title: "Solution Journeys",
    description: "View structured solutioning paths that guide data-to-insight-to-impact workflows",
    count: 30,
    tone: "pink",
    featureId: "solution-journey",
  },
  "business-processes": {
    id: "business-processes",
    label: "Ai Agents",
    title: "Ai Agents",
    description:
      "Oversee workflows ensuring operational efficiency, accuracy, and consistent repeatability",
    count: 80,
    tone: "purple",
    featureId: "ai-agents",
  },
  assistants: {
    id: "assistants",
    label: "Assistants",
    title: "Assistants",
    description:
      "Converse with contextual AI assistants to support decisions and automate workflows",
    count: 20,
    tone: "purple",
    featureId: "ai-assistants",
  },
  "business-strategies": {
    id: "business-strategies",
    label: "Business Strategies",
    title: "Business Strategies",
    description: "Define, track and align strategic goals with the decisions that move them",
    count: 12,
    tone: "purple",
    featureId: "business-strategies",
  },
  "analytics-control-tower": {
    id: "analytics-control-tower",
    label: "Analytics Control Tower",
    title: "Analytics Control Tower",
    description: "Monitor model health, usage and performance across every analytics asset",
    count: 8,
    tone: "blue",
    featureId: "analytics-control-tower",
  },
  "data-control-tower": {
    id: "data-control-tower",
    label: "Data Control Tower",
    title: "Data Control Tower",
    description: "Observe data quality, lineage and freshness from a single control point",
    count: 14,
    tone: "pink",
    featureId: "data-control-tower",
  },
  marketplace: {
    id: "marketplace",
    label: "Marketplace",
    title: "Marketplace",
    description: "Discover and reuse certified datasets, models and templates across teams",
    count: 46,
    tone: "yellow",
    featureId: "data-marketplace",
  },
};

/** Modal order (two columns, row by row) as in the Figma "Add to Home Page" popup. */
export const TILE_PICKER_ORDER: TileId[] = [
  "business-strategies",
  "analytics-control-tower",
  "business-processes",
  "data-control-tower",
  "applications",
  "marketplace",
  "assistants",
  "solution-journeys",
];

/** Slots: wide (top) · tall (left) · short (right top) · short (right bottom). */
export const DEFAULT_TILES: TileId[] = [
  "applications",
  "solution-journeys",
  "business-processes",
  "assistants",
];

export type ArtifactIcon = "apps" | "blueprint" | "bot" | "sparkle" | "ai-assistant";

export interface Artifact {
  id: string;
  name: string;
  icon: ArtifactIcon;
  edited: string;
  workspace: string;
  industry: string;
  fn: string;
  featureId: string;
  isNew?: boolean;
  recent?: boolean;
}

export const ARTIFACTS: Artifact[] = [
  {
    id: "a1",
    name: "Asia: Integrated Demand forecasting",
    icon: "apps",
    edited: "Edited 3 hours ago",
    workspace: "Sales & Marketing",
    industry: "CPG",
    fn: "Supply Chain",
    featureId: "apps",
    recent: true,
  },
  {
    id: "a2",
    name: "MMM Blueprint",
    icon: "blueprint",
    edited: "Edited 10 hours ago",
    workspace: "Sales & Marketing",
    industry: "CPG",
    fn: "Marketing",
    featureId: "model-blueprint",
    isNew: true,
    recent: true,
  },
  {
    id: "a3",
    name: "RGM Bot",
    icon: "bot",
    edited: "Edited 1 day ago",
    workspace: "Sales & Marketing",
    industry: "Retail",
    fn: "Revenue",
    featureId: "ai-assistants",
    isNew: true,
  },
  {
    id: "a4",
    name: "Contact Review Bot",
    icon: "bot",
    edited: "Edited 1 day ago",
    workspace: "Operations",
    industry: "Retail",
    fn: "Legal",
    featureId: "ai-assistants",
    recent: true,
  },
  {
    id: "a5",
    name: "Automated Dashboard",
    icon: "sparkle",
    edited: "Edited 1 day ago",
    workspace: "Operations",
    industry: "Technology",
    fn: "Finance",
    featureId: "apps",
    isNew: true,
  },
  {
    id: "a6",
    name: "US: Integrated Demand Forecasting",
    icon: "ai-assistant",
    edited: "Edited 2 days ago",
    workspace: "Sales & Marketing",
    industry: "CPG",
    fn: "Supply Chain",
    featureId: "apps",
  },
  {
    id: "a7",
    name: "US: Integrated Demand Forecasting",
    icon: "apps",
    edited: "Edited 4 days ago",
    workspace: "Finance",
    industry: "CPG",
    fn: "Supply Chain",
    featureId: "apps",
    recent: true,
  },
];

/* Applications landing (Figma "Final exec Landing pages" 9465:3450). */
export type AppTone =
  "peach" | "teal" | "lavender" | "mint" | "cobalt" | "olive" | "brown" | "pink";

export interface StudioApp {
  id: string;
  title: string;
  description: string;
  tone: AppTone;
  tags: string[];
  workspace: string;
  industry: string;
  fn: string;
}

const APP_DESC =
  "Decide which products to carry, how much to stock, and optimal placement to maximize sales";

export const APPLICATIONS: StudioApp[] = [
  {
    id: "ap1",
    title: "Integrated Demand Renewal Forecasting for Kelvin Clein",
    description: APP_DESC,
    tone: "peach",
    tags: ["CPG", "Merchandising"],
    workspace: "Sales & Marketing",
    industry: "CPG",
    fn: "Merchandising",
  },
  {
    id: "ap2",
    title: "Social Media Listening",
    description: APP_DESC,
    tone: "teal",
    tags: ["CPG", "Merchandising"],
    workspace: "Sales & Marketing",
    industry: "CPG",
    fn: "Merchandising",
  },
  {
    id: "ap3",
    title: "Integrated Demand Forecasting for Retail Media",
    description: APP_DESC,
    tone: "lavender",
    tags: ["CPG", "Merchandising"],
    workspace: "Operations",
    industry: "CPG",
    fn: "Merchandising",
  },
  {
    id: "ap4",
    title: "Integrated Demand Forecasting",
    description: APP_DESC,
    tone: "mint",
    tags: ["CPG", "Merchandising"],
    workspace: "Operations",
    industry: "CPG",
    fn: "Merchandising",
  },
  {
    id: "ap5",
    title: "Integrated Demand Forecasting",
    description: APP_DESC,
    tone: "cobalt",
    tags: ["CPG", "Merchandising"],
    workspace: "Finance",
    industry: "CPG",
    fn: "Merchandising",
  },
  {
    id: "ap6",
    title: "Integrated Demand Forecasting",
    description: APP_DESC,
    tone: "olive",
    tags: ["CPG", "Merchandising"],
    workspace: "Finance",
    industry: "CPG",
    fn: "Merchandising",
  },
  {
    id: "ap7",
    title: "Integrated Demand Forecasting",
    description: APP_DESC,
    tone: "brown",
    tags: ["CPG", "Merchandising"],
    workspace: "Operations",
    industry: "CPG",
    fn: "Merchandising",
  },
  {
    id: "ap8",
    title: "Integrated Demand Forecasting",
    description: `${APP_DESC} Decide which products to carry, how much to stock, and optimal placement to maximize sales`,
    tone: "pink",
    tags: ["CPG", "Merchandising"],
    workspace: "Sales & Marketing",
    industry: "CPG",
    fn: "Merchandising",
  },
];

/* Catalog pages — every Home shortcut opens the same tile / list layout as Applications.
   Keyed by the tile's featureId. Items use the 8 Figma icon tones in turn. */
const TONES: AppTone[] = ["peach", "teal", "lavender", "mint", "cobalt", "olive", "brown", "pink"];
type Row = [title: string, description: string, industry: string, fn: string, workspace: string];
const mk = (prefix: string, rows: Row[]): StudioApp[] =>
  rows.map(([title, description, industry, fn, workspace], i) => ({
    id: `${prefix}${i + 1}`,
    title,
    description,
    tone: TONES[i % TONES.length],
    tags: [industry, fn],
    workspace,
    industry,
    fn,
  }));

export const CATALOGS: Record<string, StudioApp[]> = {
  apps: APPLICATIONS,
  "solution-journey": mk("sj", [
    [
      "Demand Sensing Journey",
      "Move from raw sell-out signals to a short-term demand view your planners can act on",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Pricing & Promotion Journey",
      "Test price and promo scenarios, then roll the winners into the commercial plan",
      "Retail",
      "Revenue",
      "Sales & Marketing",
    ],
    [
      "Assortment Optimisation Journey",
      "Decide which products to range by store cluster using sales, space and margin data",
      "Retail",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Customer Churn Journey",
      "Spot customers likely to leave and plan targeted retention actions",
      "Technology",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Supply Planning Journey",
      "Balance production, inventory and service levels across the network",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Marketing Mix Journey",
      "Measure what each channel really drives and rebalance spend with confidence",
      "CPG",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Inventory Health Journey",
      "Find slow movers and stock-out risks before they hit the shelf",
      "Retail",
      "Supply Chain",
      "Operations",
    ],
    [
      "Revenue Growth Journey",
      "Connect pricing, mix and trade terms into one growth plan for the year",
      "CPG",
      "Revenue",
      "Finance",
    ],
  ]),
  "ai-agents": mk("ag", [
    [
      "Invoice Reconciliation Agent",
      "Matches invoices to purchase orders and flags mismatches for review",
      "Retail",
      "Finance",
      "Finance",
    ],
    [
      "Demand Planning Agent",
      "Refreshes the weekly forecast and explains the biggest changes",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Contract Review Agent",
      "Reads supplier contracts and highlights risky or missing clauses",
      "Technology",
      "Legal",
      "Finance",
    ],
    [
      "Promo Compliance Agent",
      "Checks in-store promotions against the agreed plan and reports gaps",
      "Retail",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Order Exception Agent",
      "Triages late or short orders and suggests the next best action",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Supplier Risk Agent",
      "Monitors supplier signals and alerts you to emerging risks",
      "Technology",
      "Supply Chain",
      "Operations",
    ],
    [
      "Pricing Guardrail Agent",
      "Stops price changes that break margin or competitive rules",
      "Retail",
      "Revenue",
      "Sales & Marketing",
    ],
    [
      "Returns Triage Agent",
      "Sorts incoming returns by reason and routes them to the right team",
      "Retail",
      "Finance",
      "Operations",
    ],
  ]),
  "business-processes": mk("bp", [
    [
      "Order to Cash",
      "Track every order from booking to payment and spot where cash gets stuck",
      "CPG",
      "Finance",
      "Finance",
    ],
    [
      "Procure to Pay",
      "See purchase requests through approval, receipt and payment in one flow",
      "Technology",
      "Finance",
      "Finance",
    ],
    [
      "Demand to Supply",
      "Align demand plans with supply capacity in a single monthly cycle",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Promotion Planning",
      "Plan, approve and review trade promotions with clear owners at each step",
      "Retail",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "New Product Launch",
      "Coordinate launch tasks across marketing, supply and sales",
      "CPG",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Price Change Approval",
      "Route price changes through checks and sign-off before they go live",
      "Retail",
      "Revenue",
      "Sales & Marketing",
    ],
    [
      "Month-end Close",
      "Run the close checklist with status and blockers visible to everyone",
      "Technology",
      "Finance",
      "Finance",
    ],
    [
      "Returns Management",
      "Handle returns from request to refund with fewer manual hand-offs",
      "Retail",
      "Supply Chain",
      "Operations",
    ],
  ]),
  "ai-assistants": mk("as", [
    [
      "RGM Bot",
      "Ask about price, promo and mix performance in plain language",
      "CPG",
      "Revenue",
      "Sales & Marketing",
    ],
    [
      "Contact Review Bot",
      "Summarises customer contacts and pulls out themes and complaints",
      "Retail",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Category Insights Assistant",
      "Explains category trends and what is driving share changes",
      "CPG",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Supply Chain Copilot",
      "Answers questions on stock, lead times and service levels",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Finance Q&A Assistant",
      "Finds the numbers behind variances and drafts the commentary",
      "Technology",
      "Finance",
      "Finance",
    ],
    [
      "Marketing Brief Assistant",
      "Turns campaign goals into a structured brief with audiences and KPIs",
      "Retail",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Policy Lookup Assistant",
      "Finds the right policy clause and explains it in context",
      "Technology",
      "Legal",
      "Finance",
    ],
    [
      "Sales Coach Assistant",
      "Prepares account reviews and suggests talking points for each customer",
      "CPG",
      "Revenue",
      "Sales & Marketing",
    ],
  ]),
  "business-strategies": mk("bs", [
    [
      "Market Entry Strategy",
      "Size new markets and compare entry options side by side",
      "Technology",
      "Revenue",
      "Finance",
    ],
    [
      "Portfolio Prioritisation",
      "Rank brands and SKUs by growth, margin and strategic fit",
      "CPG",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Channel Growth Plan",
      "Set targets by channel and track progress against them",
      "Retail",
      "Revenue",
      "Sales & Marketing",
    ],
    [
      "Cost-to-Serve Review",
      "See what it really costs to serve each customer and route",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Sustainability Roadmap",
      "Plan emissions reductions and track them alongside business goals",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Pricing Strategy 2026",
      "Align list price moves with brand positioning and elasticity",
      "Retail",
      "Revenue",
      "Finance",
    ],
    [
      "Digital Shelf Strategy",
      "Improve online share with content, ratings and availability",
      "Retail",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Working Capital Plan",
      "Free up cash by tuning inventory, payables and receivables",
      "Technology",
      "Finance",
      "Finance",
    ],
  ]),
  "analytics-control-tower": mk("ac", [
    [
      "Model Health Monitor",
      "Tracks accuracy and drift for every production model",
      "Technology",
      "Finance",
      "Operations",
    ],
    [
      "Forecast Accuracy Board",
      "Compares forecasts with actuals by market and category",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Usage & Adoption",
      "Shows who uses which analytics assets and how often",
      "Technology",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Pipeline Run Status",
      "Lists scheduled runs, failures and how long each job takes",
      "Technology",
      "Supply Chain",
      "Operations",
    ],
    [
      "Promo ROI Tracker",
      "Measures promotion returns as soon as sell-out lands",
      "Retail",
      "Revenue",
      "Sales & Marketing",
    ],
    [
      "Alert Center",
      "Collects threshold breaches across dashboards in one place",
      "CPG",
      "Finance",
      "Finance",
    ],
    [
      "Experiment Results",
      "Summarises A/B tests with uplift and confidence",
      "Retail",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Cost of Analytics",
      "Breaks down compute and licence spend by team and asset",
      "Technology",
      "Finance",
      "Finance",
    ],
  ]),
  "data-control-tower": mk("dc", [
    [
      "Data Quality Monitor",
      "Checks freshness, completeness and validity across key tables",
      "Technology",
      "Supply Chain",
      "Operations",
    ],
    [
      "Lineage Explorer",
      "Traces any metric back to the source systems it comes from",
      "Technology",
      "Finance",
      "Finance",
    ],
    [
      "Master Data Health",
      "Finds duplicate or incomplete product and customer records",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Sell-out Feed Status",
      "Tracks retailer data deliveries and late or missing files",
      "Retail",
      "Revenue",
      "Sales & Marketing",
    ],
    [
      "Access Review",
      "Shows who can see which datasets and flags stale access",
      "Technology",
      "Legal",
      "Finance",
    ],
    [
      "Schema Change Log",
      "Lists recent schema changes and the assets they affect",
      "Technology",
      "Supply Chain",
      "Operations",
    ],
    [
      "Privacy Scanner",
      "Finds personal data in datasets and checks it is protected",
      "Retail",
      "Legal",
      "Finance",
    ],
    [
      "Storage & Cost",
      "Shows storage growth and cost by domain and owner",
      "Technology",
      "Finance",
      "Finance",
    ],
  ]),
  "data-marketplace": mk("dm", [
    [
      "Retail Sell-out Dataset",
      "Weekly store-level sales across major retail partners",
      "Retail",
      "Revenue",
      "Sales & Marketing",
    ],
    [
      "Promo Calendar Dataset",
      "Planned and executed promotions with mechanics and depth",
      "CPG",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Demand Forecast Model",
      "Certified weekly demand model ready to plug into planning",
      "CPG",
      "Supply Chain",
      "Operations",
    ],
    [
      "Price Elasticity Model",
      "Elasticities by brand and pack, refreshed every quarter",
      "Retail",
      "Revenue",
      "Finance",
    ],
    [
      "Customer 360 Dataset",
      "Unified customer profile with purchases and preferences",
      "Technology",
      "Marketing",
      "Sales & Marketing",
    ],
    [
      "Supplier Master Dataset",
      "Clean supplier records with risk and spend attributes",
      "Technology",
      "Supply Chain",
      "Operations",
    ],
    [
      "Dashboard Starter Kit",
      "Ready-made dashboard templates for common business reviews",
      "CPG",
      "Finance",
      "Finance",
    ],
    [
      "Store Clusters Dataset",
      "Store groupings by format, shopper mix and location",
      "Retail",
      "Marketing",
      "Operations",
    ],
  ]),
};

export const WORKSPACES = ["Sales & Marketing", "Operations", "Finance"];
/** Dummy projects offered in the "Create artifact" popup, grouped by workspace. */
export const PROJECT_OPTIONS: Record<string, string[]> = {
  "Sales & Marketing": [
    "UK Promofit",
    "UK Market Mix Model",
    "US Market Mix Model",
    "Brand Health Tracker",
    "Retail Media Optimiser",
    "Customer 360 Segmentation",
  ],
  Operations: [
    "Asia Demand Forecasting",
    "Inventory Optimisation EU",
    "Supplier Risk Monitor",
    "Network Design 2026",
    "Warehouse Labour Planning",
  ],
  Finance: [
    "Revenue Growth Management",
    "Price Pack Architecture",
    "Trade Spend Effectiveness",
    "Cash Flow Forecasting",
    "Cost-to-Serve Analysis",
  ],
};

export const INDUSTRIES = ["CPG", "Retail", "Technology"];
export const FUNCTIONS = ["Supply Chain", "Marketing", "Revenue", "Legal", "Finance"];

export interface Feature {
  id: string;
  label: string;
  studio: "decision" | "algo" | "data";
  description: string;
}

export const FEATURES: Feature[] = [
  {
    id: "transformation-journey",
    label: "Transformation Journey",
    studio: "data",
    description:
      "Structured workflows for managing data transformation efforts aligned with business goals.",
  },
  {
    id: "ai-agents",
    label: "AI Agents",
    studio: "algo",
    description:
      "Autonomous agents that monitor workflows, act on routine tasks and hand off the exceptions to your team.",
  },
  {
    id: "data-quality-control",
    label: "Data Quality Control",
    studio: "data",
    description:
      "Set quality rules on key datasets and get alerted when freshness, completeness or validity slips.",
  },
  {
    id: "business-strategies",
    label: "Business Strategies",
    studio: "decision",
    description:
      "Set strategic goals, cascade them into decisions and track the outcomes that matter.",
  },
  {
    id: "business-processes",
    label: "Business Processes",
    studio: "decision",
    description:
      "Monitor and manage business workflows that ensure efficiency, accuracy, and repeatability across operations.",
  },
  {
    id: "apps",
    label: "Apps",
    studio: "decision",
    description:
      "Access all your business apps in one place to streamline organisational decision-making.",
  },
  {
    id: "frameworks",
    label: "Frameworks",
    studio: "decision",
    description: "Reusable decision frameworks that structure how problems are framed and solved.",
  },
  {
    id: "ai-assistants",
    label: "AI Assistants",
    studio: "decision",
    description:
      "Converse with contextual AI assistants to support decisions and automate workflows.",
  },
  {
    id: "solution-journey",
    label: "Solution Journey",
    studio: "decision",
    description:
      "View structured solutioning paths that guide data-to-insight-to-impact workflows.",
  },
  {
    id: "ai-skillset",
    label: "AI Skillset",
    studio: "algo",
    description: "A library of AI skills that can be composed into assistants and workflows.",
  },
  {
    id: "analytics-control-tower",
    label: "Analytics Control Tower",
    studio: "algo",
    description: "Monitor model health, usage and performance across every analytics asset.",
  },
  {
    id: "llm-workbench",
    label: "LLM Workbench",
    studio: "algo",
    description: "Experiment with prompts, models and evaluations in one workbench.",
  },
  {
    id: "model-blueprint",
    label: "Model Blueprint",
    studio: "algo",
    description: "Design, version and reuse model pipelines as visual blueprints.",
  },
  {
    id: "data-model",
    label: "Data Model",
    studio: "data",
    description: "Model entities and relationships that power every downstream artifact.",
  },
  {
    id: "metadata",
    label: "Metadata and Business",
    studio: "data",
    description: "Business glossary and metadata to make data understandable.",
  },
  {
    id: "integrations",
    label: "Integrations",
    studio: "data",
    description: "Connect source systems and keep data flowing reliably.",
  },
  {
    id: "data-control-tower",
    label: "Data Control Tower",
    studio: "data",
    description: "Observe data quality, lineage and freshness from a single control point.",
  },
  {
    id: "data-marketplace",
    label: "Data Marketplace",
    studio: "data",
    description: "Discover and reuse certified datasets, models and templates across teams.",
  },
];

export const ALL_FEATURES_COPY =
  "Welcome to the future of data science. Our all-in-one platform supercharges your entire data journey—ingest, clean, explore, predict, and deploy with ease. Build machine learning models faster, scale smarter, and turn raw data into real-time business breakthroughs. Collaborate seamlessly, automate intelligently, and visualize insights that drive bold action. With built-in MLOps, ironclad security, and flexible integrations, we help every team move from data to decisions.";

export interface Project {
  id: string;
  name: string;
  description: string;
  artifacts: string;
  collaborators: string;
  workspace: string;
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "UK Promofit",
    description:
      "Predict the right offer for the right customer at the right time—powered by data science",
    artifacts: "Nil",
    collaborators: "Samuel, Anish, Isha",
    workspace: "Sales & Marketing",
  },
  {
    id: "p2",
    name: "UK Market Mix Model",
    description:
      "Analyzes the impact of marketing activities on sales to optimize budget allocation across channels",
    artifacts: "MMM Blueprint",
    collaborators: "Samuel, Disha, Deepak, Isha",
    workspace: "Sales & Marketing",
  },
  {
    id: "p3",
    name: "US Market Mix Model",
    description:
      "Analyzes the impact of marketing activities on sales to optimize budget allocation across channels",
    artifacts: "Nil",
    collaborators: "Samuel, Disha, Deepak, Isha",
    workspace: "Sales & Marketing",
  },
  {
    id: "p4",
    name: "Sentiment Analysis",
    description: "Uncover what your customers feel, not just what they say",
    artifacts: "Nil",
    collaborators: "Florence, John, Teresa",
    workspace: "Sales & Marketing",
  },
  {
    id: "p5",
    name: "Social Media Trend Analysis",
    description: "Spot emerging trends before they go mainstream",
    artifacts: "Nil",
    collaborators: "Florence, John, Teresa",
    workspace: "Sales & Marketing",
  },
];

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  created: string;
  org: "Admin" | "Contributor" | "Reader";
  /** Memberships shown in the User Details panel (Figma 2014:11797). */
  workspaces?: Membership[];
  projects?: Membership[];
}

export type Role = "Admin" | "Contributor" | "Reader";
export const ROLES: Role[] = ["Admin", "Contributor", "Reader"];
export interface Membership {
  name: string;
  role: Role;
}

/** Admin › Workspaces table (Figma 2014:14090). */
export interface AdminWorkspace {
  id: string;
  name: string;
  description: string;
  created: string;
  projects: number;
  members: { email: string; role: Role }[];
}
export const ADMIN_WORKSPACES: AdminWorkspace[] = [
  ["Marketing", 12, 56],
  ["Supply Chain", 22, 67],
  ["Finance", 23, 78],
  ["Production", 24, 89],
  ["Misc", 25, 90],
].map(([name, projects, n], i) => ({
  id: `w${i + 1}`,
  name: name as string,
  description: "",
  created: "2025-04-25 10:42:24",
  projects: projects as number,
  members: Array.from({ length: n as number }, (_, k) => ({
    email: `member${k + 1}@company.com`,
    role: (k === 0 ? "Admin" : k < 4 ? "Contributor" : "Reader") as Role,
  })),
}));

/** Directory used by the people pickers. */
export const PEOPLE = [
  "disha@company.com",
  "samuel@company.com",
  "anish@company.com",
  "isha@company.com",
  "deepak@company.com",
  "florence@company.com",
  "john@company.com",
  "teresa@company.com",
  "keerthi@company.com",
];

/** Manage Workspace › Artifacts tab (Figma 1954:12214). */
export const WORKSPACE_ARTIFACTS = [
  {
    id: "wa1",
    name: "MMM Blueprint",
    project: "UK Market Mix Model",
    type: "Blueprint",
    tags: ["CPG", "Merchandising"],
    collaborators: "Samuel, Anish, Isha",
    workspace: "Sales & Marketing",
  },
  {
    id: "wa2",
    name: "MMM Model",
    project: "UK Promofit",
    type: "Data Model",
    tags: ["CPG", "Merchandising"],
    collaborators: "Samuel, Disha, Deepak, Isha",
    workspace: "Sales & Marketing",
  },
  {
    id: "wa3",
    name: "Demand Sensing App",
    project: "Asia Demand Forecasting",
    type: "Application",
    tags: ["Retail", "Supply Chain"],
    collaborators: "Florence, John",
    workspace: "Operations",
  },
  {
    id: "wa4",
    name: "RGM Bot",
    project: "Revenue Growth Management",
    type: "AI Assistant",
    tags: ["CPG", "Revenue"],
    collaborators: "Teresa, Keerthi",
    workspace: "Finance",
  },
];

/** Manage Workspace › Exec. Environment tab (Figma 1965:10005). */
export const EXEC_ENVS = [
  { id: "e1", name: "Solutioning 1", python: "3.10", status: "Running" },
  { id: "e2", name: "Solutioning 2", python: "3.10", status: "Running" },
];

export const USERS: AdminUser[] = [
  {
    id: "u1",
    name: "Micheal",
    email: "micheal@company.com",
    created: "2025-04-25 10:42:24",
    org: "Admin",
  },
  {
    id: "u2",
    name: "Dwight",
    email: "dwight@company.com",
    created: "2025-04-25 10:42:24",
    org: "Contributor",
  },
  {
    id: "u3",
    name: "Jim",
    email: "jim@company.com",
    created: "2025-04-25 10:42:24",
    org: "Reader",
  },
  {
    id: "u4",
    name: "Angela",
    email: "angela@company.com",
    created: "2025-04-25 10:42:24",
    org: "Reader",
  },
  {
    id: "u5",
    name: "Pam",
    email: "pam@company.com",
    created: "2025-04-25 10:42:24",
    org: "Reader",
  },
  {
    id: "u6",
    name: "Oscar",
    email: "oscar@company.com",
    created: "2025-04-25 10:42:24",
    org: "Reader",
  },
  {
    id: "u7",
    name: "Darryl",
    email: "darryl@company.com",
    created: "2025-04-25 10:42:24",
    org: "Reader",
  },
];
