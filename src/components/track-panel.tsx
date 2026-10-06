import type { ReactNode } from "react";
import { Scan, Waypoints } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePipeline } from "@/store/pipeline";

export function TrackPanel() {
  const snapshot = usePipeline((s) => s.snapshot);
  const selectedId = usePipeline((s) => s.selectedId);
  const setSelectedId = usePipeline((s) => s.setSelectedId);
  const tracks = snapshot?.tracks ?? [];
  const events = snapshot?.events ?? [];
  const stats = snapshot?.stats;
  const associations = snapshot?.associations ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <section>
        <p className="text-[11px] font-medium tracking-[0.14em] text-subtle uppercase">Pipeline</p>
        <div className="mt-2 grid grid-cols-4 gap-1">
          <Stage label="Detect" value={stats?.detections ?? 0} icon={<Scan className="size-3.5" />} />
          <Stage label="Match" value={associations.length} />
          <Stage
            label="Hold"
            value={stats?.occluded ?? 0}
            hot={(stats?.occluded ?? 0) > 0}
          />
          <Stage label="Live" value={stats?.active ?? 0} icon={<Waypoints className="size-3.5" />} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <Metric label="Recovered" value={stats?.recoveries ?? 0} />
          <Metric label="ID switch" value={stats?.idSwitches ?? 0} />
          <Metric label="Dropped" value={stats?.lost ?? 0} />
        </div>
      </section>

      <Separator />

      <section className="min-h-0 flex-1 overflow-hidden">
        <p className="text-[11px] font-medium tracking-[0.14em] text-subtle uppercase">Identities</p>
        <ul className="mt-2 flex max-h-48 flex-col gap-1 overflow-y-auto pr-1 lg:max-h-none lg:h-[calc(100%-1.5rem)]">
          {tracks.length === 0 ? (
            <li className="py-6 text-sm text-muted">Waiting for detections.</li>
          ) : (
            tracks.map((track) => {
              const selected = selectedId === track.id;
              return (
                <li key={track.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(selected ? null : track.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left transition-colors duration-150",
                      selected
                        ? "border-accent/40 bg-surface-2"
                        : "border-transparent hover:bg-surface-2",
                    )}
                  >
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: track.color }}
                    />
                    <span className="flex-1">
                      <span className="block text-sm text-fg tabular-nums">T-{pad(track.id)}</span>
                      <span className="block text-[11px] text-muted">
                        {track.state === "occluded"
                          ? `predicted ${track.timeSinceUpdate}f`
                          : `${Math.round(track.score * 100)}% · ${track.hits} hits`}
                      </span>
                    </span>
                    <Badge
                      tone={
                        track.state === "occluded"
                          ? "hold"
                          : track.state === "tentative"
                            ? "detect"
                            : "fg"
                      }
                    >
                      {track.state}
                    </Badge>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </section>

      <Separator />

      <section>
        <p className="text-[11px] font-medium tracking-[0.14em] text-subtle uppercase">Log</p>
        <ul className="mt-2 flex max-h-36 flex-col gap-1 overflow-y-auto">
          {(events.slice().reverse() ?? []).length === 0 ? (
            <li className="text-sm text-muted">Association events appear here.</li>
          ) : (
            events
              .slice()
              .reverse()
              .map((event) => (
                <li key={event.id} className="flex items-start justify-between gap-3 text-xs">
                  <span
                    className={cn(
                      "text-muted",
                      event.kind === "recovered" && "text-hold",
                      event.kind === "occluded" && "text-detect",
                      event.kind === "lost" && "text-lost",
                      event.kind === "confirmed" && "text-fg",
                    )}
                  >
                    {event.note}
                  </span>
                  <span className="shrink-0 tabular-nums text-subtle">{event.frame}</span>
                </li>
              ))
          )}
        </ul>
      </section>
    </div>
  );
}

function Stage({
  label,
  value,
  icon,
  hot,
}: {
  label: string;
  value: number;
  icon?: ReactNode;
  hot?: boolean;
}) {
  return (
    <div className="rounded-md bg-surface-2 px-2 py-2">
      <div className="flex items-center justify-between text-subtle">
        <span className="text-[10px] tracking-wide uppercase">{label}</span>
        {icon}
      </div>
      <p className={`mt-1 text-lg tabular-nums ${hot ? "text-hold loom-pulse" : "text-fg"}`}>
        {value}
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-lg tabular-nums text-fg">{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}

function pad(id: number): string {
  return String(id).padStart(2, "0");
}
