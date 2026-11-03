import * as React from "react";
import { Accordion, Button, Toast, TooltipProvider } from "@nuclios";
import {
  CATALOGS,
  DEFAULT_TILES,
  FEATURES,
  PROJECTS,
  TILES,
  type Route,
  type TileId,
} from "@/data";
import { TopBar, type NavId } from "@/components/studios/TopBar";
import { GlassBackground, Home } from "@/pages/Home";
import { Features } from "@/pages/Features";
import { Workspace } from "@/pages/Workspace";
import { Project } from "@/pages/Project";
import { Admin } from "@/pages/Admin";
import { FeatureLanding } from "@/pages/FeatureLanding";
import { Applications, type AppsView } from "@/pages/Applications";
import { ArtifactOverview } from "@/pages/ArtifactOverview";
import {
  CreateArtifactModal,
  ExitConfirmModal,
  type NewArtifact,
} from "@/components/studios/CreateArtifactModal";

/** Tiny in-memory router — every screen in the Studios task flow, no URL routing needed. */
function useStored<T>(key: string, initial: T) {
  const [v, setV] = React.useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {
      /* storage unavailable — keep in memory */
    }
  }, [key, v]);
  return [v, setV] as const;
}

export default function App() {
  const [route, setRoute] = React.useState<Route>({ page: "home" });
  const [tiles, setTiles] = useStored<TileId[]>("studios.tiles", DEFAULT_TILES);
  const [favourites, setFavourites] = useStored<string[]>("studios.favourites", []);
  const [projects, setProjects] = React.useState(PROJECTS);
  const [dark, setDark] = useStored("studios.dark", false);
  const [appsView, setAppsView] = useStored<AppsView>("studios.appsView", "tiles");
  const [toast, setToast] = React.useState<{
    title: string;
    description?: string;
    type?: "informative" | "success";
    key: number;
  } | null>(null);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // Create-artifact flow (Figma 10161:5977): Create → popup → Save & Open → overview page.
  const [creating, setCreating] = React.useState<{
    featureId: string;
    title: string;
    defaults?: { workspace?: string; project?: string };
  } | null>(null);
  const [artifact, setArtifact] = React.useState<NewArtifact | null>(null);
  const [artifactKey, setArtifactKey] = React.useState(0);
  const unsaved = React.useRef(false);
  const [pendingExit, setPendingExit] = React.useState<Route | null>(null);
  const onDirtyChange = React.useCallback((d: boolean) => {
    unsaved.current = d;
  }, []);

  const go = (r: Route, force = false) => {
    // Leaving an unsaved artifact asks first (Figma 10209:9363).
    if (!force && route.page === "artifact" && unsaved.current) {
      setPendingExit(r);
      return;
    }
    setRoute(r);
    window.scrollTo({ top: 0 });
  };
  const notify = (title: string, description?: string, type?: "informative" | "success") =>
    setToast({ title, description, type, key: Date.now() });

  const navActive: NavId | undefined =
    route.page === "home" || route.page === "workspace" || route.page === "project"
      ? "home"
      : route.page === "landing" || route.page === "artifact"
        ? "features"
        : route.page;

  const isHome = route.page === "home";
  /** Catalog pages (tile / list): every Home shortcut opens one, styled like the
      Applications landing (Figma 9465:3450). */
  const catalog = route.page === "landing" ? CATALOGS[route.featureId] : undefined;
  const isApps = !!catalog;
  const catalogTitle =
    route.page === "landing"
      ? (Object.values(TILES).find((t) => t.featureId === route.featureId)?.title ??
        FEATURES.find((f) => f.id === route.featureId)?.label ??
        "")
      : "";
  const isGlass = isHome || isApps;

  return (
    <TooltipProvider>
      <div
        className="relative isolate flex min-h-screen flex-col"
        style={
          isGlass
            ? undefined
            : {
                background:
                  route.page === "features"
                    ? "var(--studios-explore-bg)"
                    : "var(--studios-inner-bg)",
              }
        }
      >
        {isGlass && <GlassBackground />}
        <TopBar
          active={navActive}
          transparent={isGlass || route.page === "features"}
          onNavigate={(id) => go({ page: id })}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
        />

        {route.page === "home" && (
          <Home
            tiles={tiles}
            onTilesChange={(t) => {
              setTiles(t);
              notify("Home page updated", "Your shortcuts were saved.");
            }}
            favourites={favourites}
            onToggleFavourite={(id) =>
              setFavourites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
            }
            onOpenFeature={(featureId) => go({ page: "landing", featureId })}
            onWorkspaces={() => go({ page: "workspace" })}
            onSupport={() => go({ page: "support" })}
          />
        )}
        {route.page === "features" && (
          <Features
            onOpen={(featureId) => go({ page: "landing", featureId })}
            onCreate={(featureId, title) => setCreating({ featureId, title })}
            notify={notify}
          />
        )}
        {isApps && (
          <Applications
            key={route.page === "landing" ? route.featureId : ""}
            title={catalogTitle}
            items={catalog ?? []}
            view={appsView}
            onViewChange={setAppsView}
            notify={notify}
          />
        )}
        {route.page === "landing" && !isApps && (
          <FeatureLanding
            featureId={route.featureId}
            onHome={() => go({ page: "home" })}
            onFeatures={() => go({ page: "features" })}
            notify={notify}
          />
        )}
        {route.page === "workspace" && (
          <Workspace
            projects={projects}
            onProjectsChange={setProjects}
            onBack={() => go({ page: "home" })}
            onOpenProject={(projectId) => go({ page: "project", projectId })}
            notify={notify}
          />
        )}
        {route.page === "project" &&
          (() => {
            const p = projects.find((x) => x.id === route.projectId);
            return p ? (
              <Project
                project={p}
                onHome={() => go({ page: "home" })}
                onWorkspace={() => go({ page: "workspace" })}
                onCreateArtifact={(f) =>
                  setCreating({
                    featureId: f.id,
                    title: f.label,
                    defaults: { workspace: p.workspace, project: p.name },
                  })
                }
                onOpenFeature={(featureId) => go({ page: "landing", featureId })}
                notify={notify}
              />
            ) : null;
          })()}
        {route.page === "artifact" && artifact && (
          <ArtifactOverview
            key={artifactKey}
            artifact={artifact}
            onDirtyChange={onDirtyChange}
            onSave={(a) => {
              setArtifact(a);
              notify(`${a.name} saved`, `Your ${a.featureTitle.toLowerCase()} is ready to build.`);
            }}
            onExitRequest={() => go({ page: "features" })}
            onFeatures={() => go({ page: "features" })}
          />
        )}
        <CreateArtifactModal
          open={!!creating}
          onOpenChange={(o) => !o && setCreating(null)}
          featureId={creating?.featureId ?? ""}
          featureTitle={creating?.title ?? ""}
          defaults={creating?.defaults}
          onSave={(a) => {
            setCreating(null);
            setArtifact(a);
            setArtifactKey((k) => k + 1);
            go({ page: "artifact" }, true);
          }}
        />
        <ExitConfirmModal
          open={!!pendingExit}
          onOpenChange={(o) => !o && setPendingExit(null)}
          onExit={() => {
            const r = pendingExit;
            setPendingExit(null);
            unsaved.current = false;
            if (r) go(r, true);
          }}
        />
        {route.page === "admin" && <Admin notify={notify} />}
        {route.page === "support" && <Support onHome={() => go({ page: "home" })} />}

        {toast && (
          <div
            className="fixed right-4 top-20 z-50 w-[min(420px,calc(100vw-32px))]"
            aria-live="polite"
          >
            <Toast
              key={toast.key}
              type={toast.type ?? "success"}
              title={toast.title}
              description={toast.description}
              onClose={() => setToast(null)}
            />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

function Support({ onHome }: { onHome: () => void }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10">
      <h1 className="nuclios-type-heading-h4-regular text-(--color-text-neutral)">
        Know more about Studios
      </h1>
      <p className="mt-3 nuclios-type-body-large-regular text-(--color-text-neutral-subtle)">
        Studios is the unified entry point for the decision-flow ecosystem: one place for
        executives, managers and analysts to find projects, dashboards, models, workflows and other
        artifacts, with role-based access.
      </p>
      <Accordion
        className="mt-8"
        type="stroke"
        trigger="right"
        defaultValue={["tiles"]}
        items={[
          {
            value: "tiles",
            title: "How do I change the tiles on my home page?",
            content: "Select CUSTOM under the tiles, pick up to four shortcuts and save.",
          },
          {
            value: "filter",
            title: "How do filters work?",
            content:
              "FILTER narrows the artifact list by workspace, industry and function. Reset clears them.",
          },
          {
            value: "ws",
            title: "What is a workspace?",
            content:
              "A workspace groups projects, artifacts and collaborators. Open WORKSPACES on the home page to manage them.",
          },
          {
            value: "roles",
            title: "Who can edit an artifact?",
            content:
              "Admins and Contributors can edit; Readers can view. Super admins manage roles under Admin.",
          },
        ]}
      />
      <Button variant="border" className="mt-8" onClick={onHome}>
        Back to Home
      </Button>
    </main>
  );
}
