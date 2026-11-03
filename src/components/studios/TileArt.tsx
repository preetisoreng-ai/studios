import type * as React from "react";
import { BarChart3, Compass, Database, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { maskUrl } from "@/components/studios/MaskIcon";
import type { BadgeTone, TileId } from "@/data";

/** Count badge (Figma "Bookmark" pill): 28px tall, 17px radius, pastel fill + border. */
export function CountBadge({
  tone,
  children,
  style,
}: {
  tone: BadgeTone;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className="studios-art-badge inline-flex h-7 items-center justify-center rounded-[17px] border px-2 pt-0.5 text-sm leading-6 font-medium tracking-[0.5px] text-(--studios-badge-text) whitespace-nowrap"
      style={{
        background: `var(--studios-badge-${tone})`,
        borderColor: `var(--studios-badge-${tone}-border)`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

const abs = "absolute";
const highlight = { boxShadow: "var(--studios-art-highlight)" };

/** Applications — stacked orange cards + glass card (Figma 6683:34479). */
function ApplicationsArt({ count, badge = true }: { count: number; badge?: boolean }) {
  return (
    <div className="relative h-[97px] w-[104px] shrink-0" aria-hidden>
      <div
        className={cn(
          abs,
          "studios-art-app-back flex h-[73.324px] w-[82.093px] items-center justify-center"
        )}
        style={{ left: 1.5, top: 0 }}
      >
        <div
          className="h-[47.064px] w-[67.835px] rounded-lg"
          style={{
            background: "var(--studios-art-orange)",
            transform: "rotate(-27.97deg) skewX(0.15deg)",
            ...highlight,
          }}
        />
      </div>
      <div
        className={cn(
          abs,
          "studios-art-app-mid flex h-[65.979px] w-[79.3px] items-center justify-center"
        )}
        style={{ left: 0, top: 10.96 }}
      >
        <div
          className="h-[47.046px] w-[67.861px] rounded-lg"
          style={{
            background: "var(--studios-art-orange)",
            transform: "rotate(-18.34deg) skewX(0.11deg)",
            ...highlight,
          }}
        />
      </div>
      <div
        className={cn(
          abs,
          "studios-art-app-front h-[51.345px] w-[82.242px] rounded-lg backdrop-blur-[9.692px]"
        )}
        style={{
          left: 2.06,
          top: 36.79,
          background: "var(--studios-art-orange-glass)",
          boxShadow: "var(--studios-art-orange-shadow), var(--studios-art-highlight)",
        }}
      />
      <div
        className={cn(
          abs,
          "studios-art-app-front h-[2.914px] w-[20.766px] rounded-[1.869px] blur-[0.312px]"
        )}
        style={{ left: 14.23, top: 49.7, background: "var(--studios-art-white)" }}
      />
      <div
        className={cn(
          abs,
          "studios-art-app-front h-[5.099px] w-[20.766px] rounded-[1.869px] blur-[0.312px]"
        )}
        style={{ left: 14.23, top: 54.8, background: "var(--studios-art-white)" }}
      />
      {badge && (
        <CountBadge tone="yellow" style={{ position: "absolute", left: 61, top: 69 }}>
          {count}
        </CountBadge>
      )}
    </div>
  );
}

/** Solution Journeys — pink folder (Figma 6683:34492). */
function SolutionArt({ count }: { count: number }) {
  return (
    <div className="relative h-[74px] w-[98px] shrink-0" aria-hidden>
      <div
        className={cn(abs, "studios-art-folder h-[61.239px] w-[82.88px]")}
        style={{ left: 0, top: 0 }}
      >
        <div className="absolute" style={{ inset: "-8.85% -14.76% -32.03% -14.86%" }}>
          <img alt="" src="figma/home/solution-folder.svg" className="block size-full max-w-none" />
        </div>
      </div>
      <CountBadge tone="pink" style={{ position: "absolute", left: 60, top: 46 }}>
        {count}
      </CountBadge>
    </div>
  );
}

/** Ai Agents — glass chat bubbles (Figma 9331:2947 "Iconly/Glass/Chat", 66×60) + purple badge. */
function AgentsArt({ count }: { count: number }) {
  return (
    <div className="relative h-[72px] w-[89px] shrink-0" aria-hidden>
      <div className="absolute left-0 top-0 h-[60px] w-[66px]">
        <div className="studios-art-chat-bg absolute" style={{ inset: "28.12% 0 0 34.02%" }}>
          <div className="absolute" style={{ inset: "-21.18% -20.87% -22.33% -21.79%" }}>
            <img alt="" src="figma/home/chat-bg.svg" className="block size-full max-w-none" />
          </div>
        </div>
        <div className="studios-art-chat-icon absolute" style={{ inset: "0 15.81% 8.28% 0" }}>
          <div className="absolute" style={{ inset: "-1.82% -6.35% -1.82% -1.8%" }}>
            <img alt="" src="figma/home/chat-icon.svg" className="block size-full max-w-none" />
          </div>
        </div>
      </div>
      <CountBadge tone="purple" style={{ position: "absolute", left: 51, top: 44 }}>
        {count}
      </CountBadge>
    </div>
  );
}

/** Assistants — iridescent orb masked to an ellipse (Figma 6683:34514). */
function AssistantArt({ count }: { count: number }) {
  return (
    <div className="flex shrink-0 items-end" aria-hidden>
      <div className="studios-art-orb relative mr-[-10px] h-[67.156px] w-[68.947px]">
        <div
          className="absolute h-[78.034px] w-[82.404px] overflow-hidden"
          style={{
            left: -7.05,
            top: -4.82,
            WebkitMask: `${maskUrl("figma/assistants-mask.svg")} 7.051px 4.824px / 68.947px 67.156px no-repeat`,
            mask: `${maskUrl("figma/assistants-mask.svg")} 7.051px 4.824px / 68.947px 67.156px no-repeat`,
          }}
        >
          <img
            alt=""
            src="figma/assistants-img.png"
            className="studios-art-orb-fill absolute max-w-none"
            style={{ height: "147.2%", width: "185.86%", left: "-41.92%", top: "-24.27%" }}
          />
        </div>
      </div>
      <CountBadge tone="purple">{count}</CountBadge>
    </div>
  );
}

const GENERIC_ICON: Partial<
  Record<TileId, React.ComponentType<{ className?: string; strokeWidth?: number }>>
> = {
  "business-strategies": Compass,
  "analytics-control-tower": BarChart3,
  "data-control-tower": Database,
  marketplace: Store,
};

/** Tiles with no Figma illustration yet: gradient card + icon in the same visual language. */
function GenericArt({ id, count, tone }: { id: TileId; count: number; tone: BadgeTone }) {
  const Icon = GENERIC_ICON[id] ?? Compass;
  return (
    <div className="relative h-[80px] w-[98px] shrink-0" aria-hidden>
      <div
        className="studios-art-generic absolute left-[6px] top-0 flex h-[60px] w-[66px] items-center justify-center rounded-xl text-(--studios-art-white)"
        style={{
          background: "var(--studios-art-generic)",
          transform: "rotate(-8deg)",
          ...highlight,
        }}
      >
        <Icon className="size-7" strokeWidth={1.75} />
      </div>
      <CountBadge tone={tone} style={{ position: "absolute", left: 58, top: 46 }}>
        {count}
      </CountBadge>
    </div>
  );
}

export function TileArt({ id, count, tone }: { id: TileId; count: number; tone: BadgeTone }) {
  switch (id) {
    case "applications":
      return <ApplicationsArt count={count} />;
    case "solution-journeys":
      return <SolutionArt count={count} />;
    case "business-processes":
      return <AgentsArt count={count} />;
    case "assistants":
      return <AssistantArt count={count} />;
    default:
      return <GenericArt id={id} count={count} tone={tone} />;
  }
}

/** The Applications illustration without its count badge, at icon size (Features page, 38 × 40). */
export function ApplicationsGlyph() {
  return (
    <span className="relative block h-10 w-[38px]" aria-hidden>
      <span className="absolute left-0 top-0 block [zoom:0.455]">
        <ApplicationsArt count={0} badge={false} />
      </span>
    </span>
  );
}

/** The Assistants orb without its count badge, at icon size (Features page, 40 × 39). */
export function AssistantsGlyph() {
  return (
    <span className="relative block h-[39px] w-10" aria-hidden>
      <span className="absolute left-0 top-0 block h-[67.156px] w-[68.947px] [zoom:0.58]">
        <span
          className="absolute h-[78.034px] w-[82.404px] overflow-hidden"
          style={{
            left: -7.05,
            top: -4.82,
            WebkitMask: `${maskUrl("figma/assistants-mask.svg")} 7.051px 4.824px / 68.947px 67.156px no-repeat`,
            mask: `${maskUrl("figma/assistants-mask.svg")} 7.051px 4.824px / 68.947px 67.156px no-repeat`,
          }}
        >
          <img
            alt=""
            src="figma/assistants-img.png"
            className="absolute max-w-none"
            style={{ height: "147.2%", width: "185.86%", left: "-41.92%", top: "-24.27%" }}
          />
        </span>
      </span>
    </span>
  );
}
