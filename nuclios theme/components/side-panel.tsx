import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * SidePanel — a secondary panel that docks to the LEFT of an open Drawer, with a gutter
 * between them, instead of stacking a centered Modal on top of the Drawer.
 * (Pattern from the Figma RBAC screens: Roles & Access drawer + per-artifact settings.)
 *
 * It is a nested Radix Dialog, so focus trapping, Escape and outside-click dismissal stay
 * correct; it renders no second scrim — the Drawer's scrim already covers the page.
 * Falls back to covering the Drawer when there isn't room on the left (small screens).
 */
export interface SidePanelProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  /** Preferred width in px (Bento: 560 for pickers, 796 for settings). */
  width?: number;
  className?: string;
}

const GUTTER = 16; // space between the panel and the drawer
const EDGE = 8; // matches the Drawer's inset (--spacing-s)

/** Finds the open Drawer this panel belongs to (the right-docked Radix dialog). */
function useDrawerLeft(open: boolean) {
  const [left, setLeft] = React.useState<number | null>(null);
  React.useLayoutEffect(() => {
    if (!open) return;
    const measure = () => {
      const drawers = [
        ...document.querySelectorAll<HTMLElement>(
          '[role="dialog"][data-state="open"][class*="inset-y-"]:not([data-side-panel])'
        ),
      ];
      const d = drawers[drawers.length - 1];
      setLeft(d ? d.getBoundingClientRect().left : null);
    };
    measure();
    // The drawer may still be sliding in; re-measure once it settles.
    const t = window.setTimeout(measure, 450);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [open]);
  return left;
}

export function SidePanel({
  open,
  onOpenChange,
  title,
  description,
  footer,
  children,
  width = 560,
  className,
}: SidePanelProps) {
  const drawerLeft = useDrawerLeft(open);
  const room = drawerLeft === null ? 0 : drawerLeft - GUTTER - EDGE;
  const docked = room >= 360;
  const style: React.CSSProperties = docked
    ? { right: window.innerWidth - drawerLeft! + GUTTER, width: Math.min(width, room) }
    : { right: EDGE, left: EDGE };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          data-side-panel=""
          {...(description ? {} : { "aria-describedby": undefined })}
          style={style}
          className={cn(
            "fixed inset-y-(--spacing-s) z-50 flex flex-col overflow-hidden rounded-(--radius-container-set-1) border border-(--color-border-neutral) bg-(--color-surface-surface-3) text-(--color-text-neutral) shadow-(--shadow-8) focus:outline-none",
            className
          )}
        >
          <div className="flex items-start justify-between gap-(--spacing-l) px-(--spacing-2xl) pb-(--spacing-l) pt-(--spacing-2xl)">
            <div className="flex min-w-0 flex-col gap-(--spacing-2xs)">
              <DialogPrimitive.Title className="nuclios-type-heading-h5-medium">
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="nuclios-type-body-default-regular text-(--color-text-neutral-muted)">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-(--radius-component-set-1) text-(--color-icons-neutral) hover:bg-(--color-background-neutral-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-primary-focused) cursor-pointer"
            >
              <Icons.close className="size-5" />
            </DialogPrimitive.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-(--spacing-2xl) pb-(--spacing-l) nuclios-type-body-default-regular">
            {children}
          </div>
          {footer && (
            <div className="flex justify-end gap-(--spacing-l) border-t border-(--color-border-subtle) px-(--spacing-2xl) py-(--spacing-l)">
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
