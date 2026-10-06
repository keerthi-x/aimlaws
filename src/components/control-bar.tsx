import { Camera, Columns3, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { ScenarioId } from "@/lib/scene/plaza";
import { usePipeline } from "@/store/pipeline";

const SCENARIOS: { id: ScenarioId; label: string }[] = [
  { id: "courtyard", label: "Courtyard" },
  { id: "crossing", label: "Crossing" },
  { id: "cover", label: "Deep cover" },
];

export function ControlBar() {
  const running = usePipeline((s) => s.running);
  const source = usePipeline((s) => s.source);
  const scenario = usePipeline((s) => s.scenario);
  const maxAge = usePipeline((s) => s.maxAge);
  const showDetections = usePipeline((s) => s.showDetections);
  const showTracks = usePipeline((s) => s.showTracks);
  const showTrails = usePipeline((s) => s.showTrails);
  const showPredicted = usePipeline((s) => s.showPredicted);
  const setRunning = usePipeline((s) => s.setRunning);
  const setSource = usePipeline((s) => s.setSource);
  const setScenario = usePipeline((s) => s.setScenario);
  const setMaxAge = usePipeline((s) => s.setMaxAge);
  const bumpReset = usePipeline((s) => s.bumpReset);

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Button
          variant="primary"
          size="md"
          onClick={() => setRunning(!running)}
          aria-label={running ? "Pause" : "Play"}
        >
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
          {running ? "Pause" : "Play"}
        </Button>
        <Button variant="outline" size="md" onClick={() => bumpReset()} aria-label="Reset tracks">
          <RotateCcw className="size-4" />
          Reset
        </Button>
        <Button
          variant={source === "camera" ? "primary" : "outline"}
          size="md"
          onClick={() => setSource(source === "camera" ? "plaza" : "camera")}
        >
          {source === "camera" ? <Columns3 className="size-4" /> : <Camera className="size-4" />}
          {source === "camera" ? "Plaza" : "Camera"}
        </Button>
      </div>

      <div className="grid min-w-0 grid-cols-3 gap-1">
        {SCENARIOS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setScenario(item.id);
              bumpReset();
            }}
            className={cn(
              "h-11 min-w-0 truncate rounded-sm px-2 text-sm transition-colors duration-150",
              scenario === item.id && source === "plaza"
                ? "bg-surface-2 text-fg"
                : "text-muted hover:text-fg",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid min-w-0 gap-3">
        <label className="flex min-w-0 items-center gap-3">
          <span className="w-20 shrink-0 text-xs text-muted">Hold {maxAge}f</span>
          <Slider
            min={10}
            max={90}
            step={1}
            value={[maxAge]}
            onValueChange={(v) => setMaxAge(v[0] ?? 50)}
            className="min-w-0 flex-1"
            aria-label="Occlusion hold frames"
          />
        </label>
        <div className="grid grid-cols-2 gap-x-3 sm:flex sm:flex-wrap sm:gap-4">
          <Toggle label="Detections" checked={showDetections} onChange={usePipeline.getState().setShowDetections} />
          <Toggle label="Tracks" checked={showTracks} onChange={usePipeline.getState().setShowTracks} />
          <Toggle label="Trails" checked={showTrails} onChange={usePipeline.getState().setShowTrails} />
          <Toggle label="Predicted" checked={showPredicted} onChange={usePipeline.getState().setShowPredicted} />
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex h-11 min-w-0 items-center gap-2 text-sm text-muted">
      <Switch checked={checked} onCheckedChange={onChange} />
      <span className="truncate">{label}</span>
    </label>
  );
}
