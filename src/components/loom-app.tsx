import { List } from "lucide-react";
import { ControlBar } from "@/components/control-bar";
import { TrackPanel } from "@/components/track-panel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Viewport } from "@/components/viewport";
import { usePipeline } from "@/store/pipeline";

export function LoomApp() {
  const recoveries = usePipeline((s) => s.snapshot?.stats.recoveries ?? 0);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-dvh min-w-0 flex-col overflow-x-hidden bg-bg text-fg">
        <header className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="loom-enter">
            <p className="font-display text-3xl leading-none tracking-tight italic sm:text-4xl">
              Loom
            </p>
            <p className="mt-1 text-sm text-muted">Identity that holds through occlusion</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="loom-enter loom-enter-delay-1 hidden text-right sm:block">
              <p className="text-lg tabular-nums text-fg">{recoveries}</p>
              <p className="text-[11px] text-muted">recoveries</p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open tracks">
                  <List className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>Tracks</SheetTitle>
                <div className="mt-4">
                  <TrackPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-5 sm:px-6 lg:flex-row">
          <section className="loom-enter loom-enter-delay-2 flex min-h-0 min-w-0 flex-1 flex-col gap-3">
            <Viewport />
            <ControlBar />
            <p className="hidden text-sm text-muted md:block">
              Dashed cyan boxes are per-frame detections. Solid colored boxes are identities. When
              someone passes behind stone, the tracker predicts their Kalman state and keeps the same
              T-ID until they reappear.
            </p>
          </section>
          <aside className="loom-enter loom-enter-delay-3 hidden w-[320px] shrink-0 rounded-lg border border-border bg-surface p-4 lg:block">
            <TrackPanel />
          </aside>
        </main>
      </div>
    </TooltipProvider>
  );
}
