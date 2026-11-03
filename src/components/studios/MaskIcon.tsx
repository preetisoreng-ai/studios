import type * as React from "react";
import { cn } from "@/lib/utils";

/* Mask SVGs embedded as data URIs: browsers block CSS mask images loaded from
   file:// (the standalone dist/index.html), but data URIs always work. */
const RAW_SVGS = import.meta.glob<string>("/public/figma/**/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

/** CSS `url(...)` for a mask image, inlined when the SVG is one of ours. */
export function maskUrl(src: string) {
  const raw = RAW_SVGS[`/public/${src.replace(/^\//, "")}`];
  return raw ? `url("data:image/svg+xml,${encodeURIComponent(raw)}")` : `url("${src}")`;
}

/** A monochrome Figma SVG rendered as a CSS mask, so it takes the current text colour (light + dark). */
export function MaskIcon({
  src,
  width,
  height = width,
  className,
  style,
}: {
  src: string;
  width: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={cn("studios-mask", className)}
      style={{ width, height, ["--mask" as string]: maskUrl(src), ...style }}
    />
  );
}

export const ICONS = {
  logo: "figma/logo.svg",
  bell: "figma/bell.svg",
  user: "figma/user.svg",
  back: "figma/back.svg",
  add: "figma/add.svg",
  filter: "figma/filter.svg",
  chevron: "figma/chevron-down.svg",
  arrow: "figma/ws-arrow.svg",
  apps: "figma/icon-apps.svg",
  blueprint: "figma/icon-blueprint.svg",
  bot: "figma/icon-bot.svg",
  sparkle: "figma/icon-sparkle.svg",
  "ai-assistant": "figma/home/row-ai-assistant.svg",
};

/** Home screen icons — Figma "Studios – Final files", App 9331:2698. */
export const HOME_ICONS = {
  bell: "figma/home/bell.svg",
  user: "figma/home/user.svg",
  filter: "figma/home/filter.svg",
  chevron: "figma/home/chevron-down.svg",
  reset: "figma/home/reset.svg",
  add: "figma/home/add.svg",
  back: "figma/home/back.svg",
  next: "figma/home/next.svg",
  rowApps: "figma/home/row-apps.svg",
  rowBlueprint: "figma/home/row-blueprint.svg",
  rowBot: "figma/home/row-bot.svg",
  rowSparkle: "figma/home/row-sparkle.svg",
  rowAiAssistant: "figma/home/row-ai-assistant.svg",
};
