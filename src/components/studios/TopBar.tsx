import type * as React from "react";
import { Menu, Popover } from "@nuclios";
import { cn } from "@/lib/utils";
import { HOME_ICONS, ICONS, MaskIcon } from "./MaskIcon";

/**
 * Studios top bar — Figma "Top Nav" (5830:35737): logo left, right-aligned text tabs with a 1px
 * primary underline on the selected tab, then notification + profile icon buttons.
 * Candidate for a NucliOS TopNav update: align="end" + a transparent variant.
 */
export type NavId = "home" | "features" | "admin" | "support";

const NAV: { id: NavId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "admin", label: "Admin" },
  { id: "support", label: "Support" },
];

const iconBtn =
  "studios-icon-btn inline-flex size-10 items-center justify-center rounded-full text-(--studios-topbar-icon) hover:bg-(--studios-row-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused) cursor-pointer";

export function TopBar({
  active,
  onNavigate,
  transparent,
  dark,
  onToggleDark,
  actions,
}: {
  active?: NavId;
  onNavigate: (id: NavId) => void;
  transparent?: boolean;
  dark: boolean;
  onToggleDark: () => void;
  /** Page-specific controls shown left of the bell (e.g. "View by" on Applications). */
  actions?: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        "relative z-10 flex h-16 items-center justify-between px-6",
        transparent
          ? "bg-transparent"
          : "bg-(--studios-nav-bg-inner) border-b border-(--color-border-subtle)"
      )}
    >
      <button
        type="button"
        onClick={() => onNavigate("home")}
        aria-label="NucliOS Studios home"
        className="flex h-[22px] items-center pl-5 pr-4 text-(--studios-ink) cursor-pointer"
      >
        <MaskIcon src={ICONS.logo} width={78} height={14.45} />
      </button>

      <div className="flex items-center gap-6">
        <nav aria-label="Main" className="flex items-center gap-8 max-sm:gap-2">
          {NAV.map((n) => {
            const on = n.id === active;
            return (
              <button
                key={n.id}
                type="button"
                aria-current={on ? "page" : undefined}
                onClick={() => onNavigate(n.id)}
                className={cn(
                  "border-b px-2 py-1 text-sm leading-6 tracking-[0.5px] whitespace-nowrap cursor-pointer transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused)",
                  on
                    ? "border-(--studios-ink) font-medium text-(--studios-ink)"
                    : "border-transparent text-(--color-text-neutral-muted) hover:text-(--studios-ink)"
                )}
              >
                {n.label}
              </button>
            );
          })}
        </nav>
        <div className="flex h-16 items-center gap-0">
          {actions}
          <Popover
            align="end"
            title="Notifications"
            trigger={
              <button type="button" aria-label="Notifications" className={iconBtn}>
                <MaskIcon src={HOME_ICONS.bell} width={20} className="studios-bell" />
              </button>
            }
          >
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-(--color-text-neutral)">Samuel</span> shared{" "}
                <span className="text-(--color-text-neutral)">MMM Blueprint</span> with you
              </li>
              <li>
                <span className="text-(--color-text-neutral)">RGM Bot</span> was promoted to
                Production
              </li>
            </ul>
          </Popover>
          <Menu
            align="end"
            trigger={
              <button type="button" aria-label="Profile and settings" className={iconBtn}>
                <MaskIcon src={HOME_ICONS.user} width={20} className="studios-profile" />
              </button>
            }
            items={[
              { type: "header", label: "Amy Santiago" },
              {
                label: dark ? "Switch to light mode" : "Switch to dark mode",
                onSelect: onToggleDark,
              },
              { label: "Sign out", onSelect: () => {} },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
