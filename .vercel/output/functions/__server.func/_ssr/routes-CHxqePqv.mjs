import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as RotateCcw, c as List, i as Scan, l as Columns3, n as Waypoints, o as Play, s as Pause, t as X, u as Camera } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
import { n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CHxqePqv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2",
			ghost: "text-muted hover:bg-surface-2 hover:text-fg"
		},
		size: {
			sm: "h-9 px-3",
			md: "h-11 px-4",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex h-11 w-full touch-none items-center select-none", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1 w-full grow overflow-hidden rounded-full bg-surface-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full border border-border bg-fg shadow-panel focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none" })]
}));
Slider.displayName = Slider$1.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	ref,
	className: cn("focus-visible:ring-accent/40 peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:bg-accent data-[state=unchecked]:bg-surface-2", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-4 rounded-full bg-fg transition-transform duration-150 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:bg-accent-fg" })
}));
Switch.displayName = Switch$1.displayName;
var emptyStats = {
	frame: 0,
	detections: 0,
	active: 0,
	occluded: 0,
	tentative: 0,
	recoveries: 0,
	idSwitches: 0,
	lost: 0
};
var usePipeline = create((set) => ({
	running: true,
	source: "plaza",
	scenario: "courtyard",
	maxAge: 50,
	minHits: 3,
	iouThreshold: .3,
	showDetections: true,
	showTracks: true,
	showTrails: true,
	showPredicted: true,
	selectedId: null,
	snapshot: {
		detections: [],
		tracks: [],
		associations: [],
		events: [],
		stats: emptyStats
	},
	cameraError: null,
	detectorLoading: false,
	resetKey: 0,
	setRunning: (running) => set({ running }),
	setSource: (source) => set({
		source,
		cameraError: null,
		selectedId: null
	}),
	setScenario: (scenario) => set({
		scenario,
		source: "plaza",
		selectedId: null
	}),
	setMaxAge: (maxAge) => set({ maxAge }),
	setMinHits: (minHits) => set({ minHits }),
	setIouThreshold: (iouThreshold) => set({ iouThreshold }),
	setShowDetections: (showDetections) => set({ showDetections }),
	setShowTracks: (showTracks) => set({ showTracks }),
	setShowTrails: (showTrails) => set({ showTrails }),
	setShowPredicted: (showPredicted) => set({ showPredicted }),
	setSelectedId: (selectedId) => set({ selectedId }),
	setSnapshot: (snapshot) => set({ snapshot }),
	setCameraError: (cameraError) => set({ cameraError }),
	setDetectorLoading: (detectorLoading) => set({ detectorLoading }),
	bumpReset: () => set((s) => ({
		resetKey: s.resetKey + 1,
		selectedId: null
	}))
}));
var SCENARIOS = [
	{
		id: "courtyard",
		label: "Courtyard"
	},
	{
		id: "crossing",
		label: "Crossing"
	},
	{
		id: "cover",
		label: "Deep cover"
	}
];
function ControlBar() {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "primary",
						size: "md",
						onClick: () => setRunning(!running),
						"aria-label": running ? "Pause" : "Play",
						children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), running ? "Pause" : "Play"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "md",
						onClick: () => bumpReset(),
						"aria-label": "Reset tracks",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reset"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: source === "camera" ? "primary" : "outline",
						size: "md",
						onClick: () => setSource(source === "camera" ? "plaza" : "camera"),
						children: [source === "camera" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns3, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), source === "camera" ? "Plaza" : "Camera"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid min-w-0 grid-cols-3 gap-1",
				children: SCENARIOS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setScenario(item.id);
						bumpReset();
					},
					className: cn("h-11 min-w-0 truncate rounded-sm px-2 text-sm transition-colors duration-150", scenario === item.id && source === "plaza" ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "w-20 shrink-0 text-xs text-muted",
						children: [
							"Hold ",
							maxAge,
							"f"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 10,
						max: 90,
						step: 1,
						value: [maxAge],
						onValueChange: (v) => setMaxAge(v[0] ?? 50),
						className: "min-w-0 flex-1",
						"aria-label": "Occlusion hold frames"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-x-3 sm:flex sm:flex-wrap sm:gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Detections",
							checked: showDetections,
							onChange: usePipeline.getState().setShowDetections
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Tracks",
							checked: showTracks,
							onChange: usePipeline.getState().setShowTracks
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Trails",
							checked: showTrails,
							onChange: usePipeline.getState().setShowTrails
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Predicted",
							checked: showPredicted,
							onChange: usePipeline.getState().setShowPredicted
						})
					]
				})]
			})
		]
	});
}
function Toggle({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex h-11 min-w-0 items-center gap-2 text-sm text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: label
		})]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { tone: {
		muted: "bg-surface-2 text-muted",
		detect: "bg-detect/15 text-detect",
		hold: "bg-hold/15 text-hold",
		lost: "bg-lost/15 text-lost",
		fg: "bg-fg/10 text-fg"
	} },
	defaultVariants: { tone: "muted" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
	...props
}));
Separator.displayName = Root.displayName;
function TrackPanel() {
	const snapshot = usePipeline((s) => s.snapshot);
	const selectedId = usePipeline((s) => s.selectedId);
	const setSelectedId = usePipeline((s) => s.setSelectedId);
	const tracks = snapshot?.tracks ?? [];
	const events = snapshot?.events ?? [];
	const stats = snapshot?.stats;
	const associations = snapshot?.associations ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.14em] text-subtle uppercase",
					children: "Pipeline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-4 gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
							label: "Detect",
							value: stats?.detections ?? 0,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scan, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
							label: "Match",
							value: associations.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
							label: "Hold",
							value: stats?.occluded ?? 0,
							hot: (stats?.occluded ?? 0) > 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
							label: "Live",
							value: stats?.active ?? 0,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waypoints, { className: "size-3.5" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-3 gap-2 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Recovered",
							value: stats?.recoveries ?? 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "ID switch",
							value: stats?.idSwitches ?? 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Dropped",
							value: stats?.lost ?? 0
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "min-h-0 flex-1 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.14em] text-subtle uppercase",
					children: "Identities"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex max-h-48 flex-col gap-1 overflow-y-auto pr-1 lg:max-h-none lg:h-[calc(100%-1.5rem)]",
					children: tracks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-6 text-sm text-muted",
						children: "Waiting for detections."
					}) : tracks.map((track) => {
						const selected = selectedId === track.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSelectedId(selected ? null : track.id),
							className: cn("flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left transition-colors duration-150", selected ? "border-accent/40 bg-surface-2" : "border-transparent hover:bg-surface-2"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2.5 shrink-0 rounded-full",
									style: { backgroundColor: track.color }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-sm text-fg tabular-nums",
										children: ["T-", pad$2(track.id)]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[11px] text-muted",
										children: track.state === "occluded" ? `predicted ${track.timeSinceUpdate}f` : `${Math.round(track.score * 100)}% · ${track.hits} hits`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: track.state === "occluded" ? "hold" : track.state === "tentative" ? "detect" : "fg",
									children: track.state
								})
							]
						}) }, track.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.14em] text-subtle uppercase",
				children: "Log"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex max-h-36 flex-col gap-1 overflow-y-auto",
				children: (events.slice().reverse() ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "Association events appear here."
				}) : events.slice().reverse().map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start justify-between gap-3 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-muted", event.kind === "recovered" && "text-hold", event.kind === "occluded" && "text-detect", event.kind === "lost" && "text-lost", event.kind === "confirmed" && "text-fg"),
						children: event.note
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 tabular-nums text-subtle",
						children: event.frame
					})]
				}, event.id))
			})] })
		]
	});
}
function Stage({ label, value, icon, hot }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-surface-2 px-2 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-subtle",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] tracking-wide uppercase",
				children: label
			}), icon]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 text-lg tabular-nums ${hot ? "text-hold loom-pulse" : "text-fg"}`,
			children: value
		})]
	});
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-lg tabular-nums text-fg",
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[11px] text-muted",
		children: label
	})] });
}
function pad$2(id) {
	return String(id).padStart(2, "0");
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-xl border border-border bg-surface p-4 shadow-panel", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 size-11 rounded-sm text-muted hover:bg-surface-2 hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mx-auto size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-xl text-fg", className),
		...props
	});
}
var TooltipProvider = Provider;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 rounded-sm border border-border bg-surface-2 px-2 py-1 text-xs text-fg shadow-panel", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
function boxArea(b) {
	return Math.max(0, b.w) * Math.max(0, b.h);
}
function intersectionArea(a, b) {
	const x1 = Math.max(a.x, b.x);
	const y1 = Math.max(a.y, b.y);
	const x2 = Math.min(a.x + a.w, b.x + b.w);
	const y2 = Math.min(a.y + a.h, b.y + b.h);
	return Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
}
function iou(a, b) {
	const inter = intersectionArea(a, b);
	if (inter <= 0) return 0;
	const union = boxArea(a) + boxArea(b) - inter;
	return union <= 0 ? 0 : inter / union;
}
function boxCenter(b) {
	return {
		x: b.x + b.w / 2,
		y: b.y + b.h / 2
	};
}
var STYLES = [
	{
		coat: "#6d7a86",
		pants: "#3d3a36",
		hair: "#2a2420",
		skin: "#c4a48a",
		height: 1.78,
		girth: .3
	},
	{
		coat: "#8a6a58",
		pants: "#3a3f3a",
		hair: "#4a3428",
		skin: "#d2b39a",
		height: 1.64,
		girth: .28
	},
	{
		coat: "#5a5e52",
		pants: "#2f3338",
		hair: "#1c1a18",
		skin: "#b08a72",
		height: 1.86,
		girth: .32
	},
	{
		coat: "#7a5c68",
		pants: "#3a3532",
		hair: "#3a2a24",
		skin: "#c9aa90",
		height: 1.7,
		girth: .29
	},
	{
		coat: "#4e5c62",
		pants: "#2c2c2a",
		hair: "#5a4638",
		skin: "#d8bba0",
		height: 1.74,
		girth: .3
	},
	{
		coat: "#6a5848",
		pants: "#3c3a3e",
		hair: "#241e1a",
		skin: "#b89478",
		height: 1.6,
		girth: .27
	},
	{
		coat: "#5c6a5a",
		pants: "#35322e",
		hair: "#4a3028",
		skin: "#c2a086",
		height: 1.82,
		girth: .31
	},
	{
		coat: "#5a4e58",
		pants: "#2e3230",
		hair: "#1a1816",
		skin: "#c8a890",
		height: 1.68,
		girth: .28
	}
];
var NAMES = [
	"Nia",
	"Rowan",
	"Elsa",
	"Malik",
	"Ivo",
	"Sera",
	"Jun",
	"Pia"
];
function pingPong(t, a, b, speed, phase) {
	const period = Math.abs(b - a) / speed * 2;
	const u = (t + phase) % period / period;
	if (u < .5) {
		const k = u * 2;
		return {
			p: a + (b - a) * k,
			v: Math.sign(b - a) * speed
		};
	}
	const k = (u - .5) * 2;
	return {
		p: b + (a - b) * k,
		v: Math.sign(a - b) * speed
	};
}
function linearPass(t, a, b, speed, phase) {
	const dur = Math.abs(b - a) / speed;
	const u = (t + phase) % (dur + 1.4) / dur;
	if (u > 1) return {
		p: b,
		v: 0
	};
	return {
		p: a + (b - a) * u,
		v: Math.sign(b - a) * speed
	};
}
function worldToScreen(x, z, map) {
	const padX = map.width * .06;
	const top = map.height * .3;
	const bot = map.height * .9;
	return {
		sx: padX + x / 100 * (map.width - padX * 2),
		sy: top + z / 100 * (bot - top),
		scale: .48 + .78 * (z / 100)
	};
}
function personBox(person, map) {
	const { sx, sy, scale } = worldToScreen(person.x, person.z, map);
	const h = person.style.height * 92 * scale;
	const w = h * person.style.girth;
	return {
		x: sx - w / 2,
		y: sy - h,
		w,
		h
	};
}
function pillarBox(pillar, map) {
	const { sx, sy, scale } = worldToScreen(pillar.x, pillar.z, map);
	const w = pillar.w * 7.2 * scale;
	const h = pillar.h * 92 * scale;
	return {
		x: sx - w / 2,
		y: sy - h,
		w,
		h
	};
}
function visibilityOf(person, pillars, map) {
	const box = personBox(person, map);
	const area = box.w * box.h;
	if (area <= 1) return 0;
	let hidden = 0;
	for (const pillar of pillars) {
		if (pillar.z <= person.z + 3) continue;
		hidden += intersectionArea(box, pillarBox(pillar, map));
	}
	return Math.max(0, 1 - hidden / area);
}
function pillarsFor(scenario) {
	if (scenario === "cover") return [
		{
			id: "wall",
			x: 50,
			z: 58,
			w: 28,
			d: 6,
			h: 2.35,
			kind: "wall"
		},
		{
			id: "planter",
			x: 18,
			z: 72,
			w: 10,
			d: 6,
			h: .7,
			kind: "planter"
		},
		{
			id: "col-r",
			x: 84,
			z: 40,
			w: 7,
			d: 7,
			h: 2.2,
			kind: "column"
		}
	];
	if (scenario === "crossing") return [{
		id: "col-a",
		x: 32,
		z: 46,
		w: 8,
		d: 8,
		h: 2.25,
		kind: "column"
	}, {
		id: "col-b",
		x: 68,
		z: 52,
		w: 8,
		d: 8,
		h: 2.2,
		kind: "column"
	}];
	return [
		{
			id: "col-l",
			x: 26,
			z: 50,
			w: 11,
			d: 9,
			h: 2.3,
			kind: "column"
		},
		{
			id: "col-c",
			x: 52,
			z: 40,
			w: 12,
			d: 10,
			h: 2.45,
			kind: "column"
		},
		{
			id: "col-r",
			x: 78,
			z: 56,
			w: 11,
			d: 8,
			h: 2.15,
			kind: "column"
		},
		{
			id: "planter",
			x: 10,
			z: 74,
			w: 9,
			d: 6,
			h: .65,
			kind: "planter"
		}
	];
}
function makePerson(gtId, path, t0 = 0) {
	const pose = path(t0);
	return {
		gtId,
		name: NAMES[(gtId - 1) % NAMES.length],
		style: STYLES[(gtId - 1) % STYLES.length],
		x: pose.x,
		z: pose.z,
		vx: 0,
		vz: 0,
		facing: 1,
		phase: gtId * .7,
		path
	};
}
function peopleFor(scenario) {
	if (scenario === "cover") return [
		makePerson(1, (t) => {
			return {
				x: pingPong(t, 8, 92, 14, 0).p,
				z: 42
			};
		}),
		makePerson(2, (t) => {
			return {
				x: pingPong(t, 90, 10, 12, 1.6).p,
				z: 44
			};
		}),
		makePerson(3, (t) => {
			return {
				x: pingPong(t, 12, 88, 10, 3.2).p,
				z: 38
			};
		}),
		makePerson(4, (t) => {
			return {
				x: pingPong(t, 20, 80, 9, .4).p,
				z: 70
			};
		}),
		makePerson(5, (t) => {
			return {
				x: 64,
				z: pingPong(t, 28, 82, 8, 2.1).p
			};
		})
	];
	if (scenario === "crossing") return [
		makePerson(1, (t) => {
			return {
				x: pingPong(t, 6, 94, 16, 0).p,
				z: 48
			};
		}),
		makePerson(2, (t) => {
			return {
				x: pingPong(t, 94, 6, 15, .2).p,
				z: 52
			};
		}),
		makePerson(3, (t) => {
			return {
				x: pingPong(t, 10, 90, 13, 1.4).p,
				z: 36
			};
		}),
		makePerson(4, (t) => {
			return {
				x: 40,
				z: pingPong(t, 22, 84, 11, .8).p
			};
		}),
		makePerson(5, (t) => {
			return {
				x: 60,
				z: pingPong(t, 80, 24, 11, .8).p
			};
		}),
		makePerson(6, (t) => {
			return {
				x: pingPong(t, 18, 82, 9, 2.8).p,
				z: 68
			};
		}),
		makePerson(7, (t) => {
			return {
				x: pingPong(t, 88, 14, 10, 3.5).p,
				z: 30
			};
		}),
		makePerson(8, (t) => {
			return {
				x: pingPong(t, 30, 70, 7, 1.1).p,
				z: 58
			};
		})
	];
	return [
		makePerson(1, (t) => {
			return {
				x: pingPong(t, 6, 94, 13, 0).p,
				z: 36
			};
		}),
		makePerson(2, (t) => {
			return {
				x: pingPong(t, 92, 8, 11, 1.8).p,
				z: 48
			};
		}),
		makePerson(3, (t) => {
			return {
				x: pingPong(t, 14, 86, 9, 3.4).p,
				z: 46
			};
		}),
		makePerson(4, (t) => {
			return {
				x: pingPong(t, 24, 76, 8, .6).p,
				z: 72
			};
		}),
		makePerson(5, (t) => {
			const z = pingPong(t, 26, 80, 8, 2.2);
			return {
				x: 40 + Math.sin(t * .35) * 6,
				z: z.p
			};
		}),
		makePerson(6, (t) => {
			const x = linearPass(t, 4, 96, 12, .3);
			const z = 44 + Math.sin(t * .5) * 4;
			return {
				x: x.p,
				z
			};
		})
	];
}
function stepPeople(people, t, dt) {
	for (const person of people) {
		const next = person.path(t);
		person.vx = (next.x - person.x) / Math.max(dt, 1 / 60);
		person.vz = (next.z - person.z) / Math.max(dt, 1 / 60);
		if (Math.abs(person.vx) > .4) person.facing = person.vx > 0 ? 1 : -1;
		person.x = next.x;
		person.z = next.z;
		const speed = Math.hypot(person.vx, person.vz);
		person.phase += dt * (1.7 + speed * .08);
	}
}
function detectPeople(people, pillars, map, frame) {
	const dets = [];
	for (const person of people) {
		const vis = visibilityOf(person, pillars, map);
		if (vis < .42) continue;
		const missChance = vis < .62 ? .28 : .03;
		const seed = Math.abs(Math.sin(frame * 12.9898 + person.gtId * 78.233));
		if (seed < missChance) continue;
		const box = personBox(person, map);
		const jitter = 1.6;
		const jx = seed * 13 % 1 * 2 * jitter - jitter;
		const jy = seed * 29 % 1 * 2 * jitter - jitter;
		const shrink = vis < .7 ? .12 : .02;
		const w = box.w * (1 - shrink);
		const h = box.h * (1 - shrink);
		dets.push({
			x: box.x + jx + (box.w - w) / 2,
			y: box.y + jy + (box.h - h) * .15,
			w,
			h,
			score: Math.min(.98, .42 + vis * .55 + (seed - .5) * .08),
			gtId: person.gtId
		});
	}
	return dets;
}
function createWorld(scenario) {
	return {
		scenario,
		people: peopleFor(scenario),
		pillars: pillarsFor(scenario),
		time: 0
	};
}
function stepWorld(world, dt) {
	world.time += dt;
	stepPeople(world.people, world.time, dt);
}
function drawPlaza(ctx, world, map, detections, tracks, associations, overlay) {
	ctx.clearRect(0, 0, map.width, map.height);
	drawSky(ctx, map);
	drawGround(ctx, map);
	drawFarBuildings(ctx, map);
	const items = [...world.people.map((person) => ({
		z: person.z,
		kind: "person",
		person
	})), ...world.pillars.map((pillar) => ({
		z: pillar.z,
		kind: "pillar",
		pillar
	}))];
	items.sort((a, b) => a.z - b.z);
	if (overlay.trails) drawTrails(ctx, tracks, overlay.selectedId);
	for (const item of items) if (item.kind === "person") drawPerson(ctx, item.person, map);
	else drawPillar(ctx, item.pillar, map);
	if (overlay.detections) drawDetections(ctx, detections);
	if (overlay.tracks) {
		if (overlay.predicted) drawPredicted(ctx, tracks, overlay.selectedId);
		drawTracks(ctx, tracks, overlay.selectedId);
		drawAssociations(ctx, detections, tracks, associations);
	}
}
function drawSky(ctx, map) {
	const g = ctx.createLinearGradient(0, 0, 0, map.height * .42);
	g.addColorStop(0, "#161310");
	g.addColorStop(1, "#2a231c");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, map.width, map.height * .42);
}
function drawFarBuildings(ctx, map) {
	ctx.fillStyle = "#1b1815";
	const base = map.height * .3;
	for (const b of [
		{
			x: .04,
			w: .12,
			h: .1
		},
		{
			x: .18,
			w: .08,
			h: .16
		},
		{
			x: .28,
			w: .14,
			h: .12
		},
		{
			x: .5,
			w: .1,
			h: .18
		},
		{
			x: .64,
			w: .16,
			h: .11
		},
		{
			x: .84,
			w: .12,
			h: .15
		}
	]) ctx.fillRect(map.width * b.x, base - map.height * b.h, map.width * b.w, map.height * b.h);
}
function drawGround(ctx, map) {
	const top = map.height * .3;
	const g = ctx.createLinearGradient(0, top, 0, map.height);
	g.addColorStop(0, "#2c2620");
	g.addColorStop(1, "#1a1714");
	ctx.fillStyle = g;
	ctx.beginPath();
	ctx.moveTo(0, top);
	ctx.lineTo(map.width, top);
	ctx.lineTo(map.width, map.height);
	ctx.lineTo(0, map.height);
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "rgba(242,239,233,0.05)";
	ctx.lineWidth = 1;
	for (let i = 1; i <= 8; i++) {
		const y = top + (map.height - top) * i / 8;
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(map.width, y);
		ctx.stroke();
	}
	const vanishX = map.width * .5;
	for (let i = -6; i <= 6; i++) {
		ctx.beginPath();
		ctx.moveTo(vanishX + i * map.width * .08, top);
		ctx.lineTo(vanishX + i * map.width * .22, map.height);
		ctx.stroke();
	}
}
function drawPillar(ctx, pillar, map) {
	const box = pillarBox(pillar, map);
	const { scale } = worldToScreen(pillar.x, pillar.z, map);
	const depth = Math.max(8, pillar.d * 3.4 * scale);
	ctx.fillStyle = "rgba(8,7,6,0.35)";
	ctx.beginPath();
	ctx.ellipse(box.x + box.w / 2, box.y + box.h + 4, box.w * .55, 6 * scale, 0, 0, Math.PI * 2);
	ctx.fill();
	if (pillar.kind === "planter") {
		roundRect(ctx, box.x, box.y + box.h * .35, box.w, box.h * .65, 6);
		ctx.fillStyle = "#3a342e";
		ctx.fill();
		roundRect(ctx, box.x + 4, box.y, box.w - 8, box.h * .45, 8);
		ctx.fillStyle = "#4a3a32";
		ctx.fill();
		ctx.fillStyle = "#3e4a3a";
		ctx.fillRect(box.x + box.w * .2, box.y - 8, 4, 18);
		ctx.fillRect(box.x + box.w * .55, box.y - 4, 5, 14);
		ctx.fillStyle = "#5a6a4a";
		ctx.beginPath();
		ctx.ellipse(box.x + box.w * .22, box.y - 8, 10, 6, 0, 0, Math.PI * 2);
		ctx.ellipse(box.x + box.w * .58, box.y - 6, 12, 7, 0, 0, Math.PI * 2);
		ctx.fill();
		return;
	}
	ctx.fillStyle = "#2f2a26";
	ctx.fillRect(box.x + box.w * .72, box.y + 8, depth, box.h - 8);
	const body = ctx.createLinearGradient(box.x, 0, box.x + box.w, 0);
	body.addColorStop(0, "#4c453e");
	body.addColorStop(.45, "#5a534b");
	body.addColorStop(1, "#3e3933");
	ctx.fillStyle = body;
	ctx.fillRect(box.x, box.y + 10, box.w, box.h - 10);
	ctx.fillStyle = "#635c54";
	ctx.fillRect(box.x - 4, box.y, box.w + 8, 14);
	ctx.fillStyle = "#3a352f";
	ctx.fillRect(box.x - 6, box.y + box.h - 12, box.w + 12, 12);
	if (pillar.kind === "wall") {
		ctx.fillStyle = "rgba(242,239,233,0.04)";
		for (let i = 1; i < 5; i++) ctx.fillRect(box.x + box.w * i / 5, box.y + 16, 1, box.h - 28);
	}
}
function drawPerson(ctx, person, map) {
	const { sx, sy, scale } = worldToScreen(person.x, person.z, map);
	const h = person.style.height * 92 * scale;
	const w = h * person.style.girth;
	const bob = Math.sin(person.phase * 2) * 1.2 * scale;
	const stride = Math.sin(person.phase) * .22 * h;
	const face = person.facing;
	const top = sy - h + bob;
	ctx.fillStyle = "rgba(8,7,6,0.32)";
	ctx.beginPath();
	ctx.ellipse(sx, sy + 2, w * .7, 5 * scale, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = person.style.pants;
	ctx.lineWidth = Math.max(3, w * .22);
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(sx - 2 * face, top + h * .55);
	ctx.lineTo(sx - 4 * face, top + h * .78);
	ctx.lineTo(sx - stride * .35 * face, sy);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(sx + 2 * face, top + h * .55);
	ctx.lineTo(sx + 4 * face, top + h * .78);
	ctx.lineTo(sx + stride * .35 * face, sy);
	ctx.stroke();
	roundRect(ctx, sx - w / 2, top + h * .22, w, h * .38, 6);
	ctx.fillStyle = person.style.coat;
	ctx.fill();
	ctx.strokeStyle = person.style.coat;
	ctx.lineWidth = Math.max(2.4, w * .16);
	ctx.beginPath();
	ctx.moveTo(sx + 6 * face, top + h * .28);
	ctx.lineTo(sx + 10 * face + stride * .2, top + h * .48);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(sx - 6 * face, top + h * .28);
	ctx.lineTo(sx - 8 * face - stride * .2, top + h * .46);
	ctx.stroke();
	const headR = h * .09;
	ctx.beginPath();
	ctx.arc(sx + 3 * face, top + h * .14, headR, 0, Math.PI * 2);
	ctx.fillStyle = person.style.skin;
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(sx + 2 * face, top + h * .11, headR * 1.05, headR * .7, 0, Math.PI, Math.PI * 2);
	ctx.fillStyle = person.style.hair;
	ctx.fill();
}
function drawDetections(ctx, detections) {
	ctx.save();
	ctx.setLineDash([4, 4]);
	ctx.strokeStyle = "rgba(142,185,194,0.85)";
	ctx.lineWidth = 1.25;
	for (const det of detections) {
		ctx.strokeRect(det.x, det.y, det.w, det.h);
		ctx.setLineDash([]);
		ctx.font = "500 10px Outfit, sans-serif";
		ctx.fillStyle = "rgba(142,185,194,0.9)";
		ctx.fillText(`${Math.round(det.score * 100)}`, det.x, det.y - 4);
		ctx.setLineDash([4, 4]);
	}
	ctx.restore();
}
function drawTrails(ctx, tracks, selectedId) {
	for (const track of tracks) {
		if (track.trail.length < 2) continue;
		const dim = selectedId != null && selectedId !== track.id;
		ctx.beginPath();
		ctx.moveTo(track.trail[0].x, track.trail[0].y);
		for (let i = 1; i < track.trail.length; i++) ctx.lineTo(track.trail[i].x, track.trail[i].y);
		ctx.strokeStyle = hexAlpha(track.color, dim ? .18 : .45);
		ctx.lineWidth = dim ? 1 : 1.75;
		ctx.lineJoin = "round";
		ctx.stroke();
	}
}
function drawPredicted(ctx, tracks, selectedId) {
	ctx.save();
	ctx.setLineDash([3, 5]);
	for (const track of tracks) {
		if (track.state !== "occluded" && track.timeSinceUpdate < 1) continue;
		const dim = selectedId != null && selectedId !== track.id;
		const b = track.predBox;
		ctx.strokeStyle = hexAlpha(track.color, dim ? .2 : .7);
		ctx.lineWidth = 1.25;
		ctx.strokeRect(b.x, b.y, b.w, b.h);
	}
	ctx.restore();
}
function drawTracks(ctx, tracks, selectedId) {
	ctx.font = "600 11px Outfit, sans-serif";
	for (const track of tracks) {
		const dim = selectedId != null && selectedId !== track.id;
		const b = track.box;
		ctx.strokeStyle = hexAlpha(track.color, dim ? .25 : .95);
		ctx.lineWidth = track.state === "occluded" ? 1 : 1.75;
		if (track.state === "occluded") ctx.setLineDash([5, 4]);
		else ctx.setLineDash([]);
		ctx.strokeRect(b.x, b.y, b.w, b.h);
		ctx.setLineDash([]);
		const label = track.state === "occluded" ? `T-${pad$1(track.id)} held` : track.state === "tentative" ? `T-${pad$1(track.id)}…` : `T-${pad$1(track.id)}`;
		const tw = ctx.measureText(label).width + 10;
		const lx = b.x;
		const ly = Math.max(12, b.y - 16);
		ctx.fillStyle = hexAlpha(track.color, dim ? .35 : .92);
		roundRect(ctx, lx, ly - 11, tw, 16, 4);
		ctx.fill();
		ctx.fillStyle = dim ? "rgba(12,11,10,0.55)" : "#0c0b0a";
		ctx.fillText(label, lx + 5, ly + 1);
	}
}
function drawAssociations(ctx, detections, tracks, associations) {
	ctx.lineWidth = 1;
	for (const link of associations) {
		const det = detections[link.detIndex];
		const track = tracks.find((t) => t.id === link.trackId);
		if (!det || !track) continue;
		const a = boxCenter(det);
		const b = boxCenter(track.box);
		ctx.strokeStyle = hexAlpha(track.color, .28);
		ctx.beginPath();
		ctx.moveTo(a.x, a.y);
		ctx.lineTo(b.x, b.y);
		ctx.stroke();
	}
}
function drawCameraFrame(ctx, video, map, detections, tracks, associations, overlay) {
	ctx.clearRect(0, 0, map.width, map.height);
	ctx.fillStyle = "#0c0b0a";
	ctx.fillRect(0, 0, map.width, map.height);
	const vw = video.videoWidth || 1;
	const vh = video.videoHeight || 1;
	const cover = Math.max(map.width / vw, map.height / vh);
	const dw = vw * cover;
	const dh = vh * cover;
	const dx = (map.width - dw) / 2;
	const dy = (map.height - dh) / 2;
	ctx.drawImage(video, dx, dy, dw, dh);
	if (overlay.trails) drawTrails(ctx, tracks, overlay.selectedId);
	if (overlay.detections) drawDetections(ctx, detections);
	if (overlay.tracks) {
		if (overlay.predicted) drawPredicted(ctx, tracks, overlay.selectedId);
		drawTracks(ctx, tracks, overlay.selectedId);
		drawAssociations(ctx, detections, tracks, associations);
	}
}
function videoToCanvasBox(box, video, map) {
	const vw = video.videoWidth || 1;
	const vh = video.videoHeight || 1;
	const cover = Math.max(map.width / vw, map.height / vh);
	const dw = vw * cover;
	const dh = vh * cover;
	const dx = (map.width - dw) / 2;
	const dy = (map.height - dh) / 2;
	return {
		x: dx + box.x * cover,
		y: dy + box.y * cover,
		w: box.w * cover,
		h: box.h * cover
	};
}
function roundRect(ctx, x, y, w, h, r) {
	const radius = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.arcTo(x + w, y, x + w, y + h, radius);
	ctx.arcTo(x + w, y + h, x, y + h, radius);
	ctx.arcTo(x, y + h, x, y, radius);
	ctx.arcTo(x, y, x + w, y, radius);
	ctx.closePath();
}
function hexAlpha(hex, alpha) {
	const n = parseInt(hex.slice(1), 16);
	return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${alpha})`;
}
function pad$1(id) {
	return String(id).padStart(2, "0");
}
/**
* Kuhn–Munkres (Hungarian) min-cost assignment.
* Returns column index for each row, or -1 if that row is unmatched.
*/
function hungarian(cost) {
	const rows = cost.length;
	const cols = cost[0]?.length ?? 0;
	if (rows === 0 || cols === 0) return Array.from({ length: rows }, () => -1);
	const n = Math.max(rows, cols);
	const a = Array.from({ length: n + 1 }, () => Array(n + 1).fill(1e5));
	for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) a[i + 1][j + 1] = cost[i][j];
	const u = Array(n + 1).fill(0);
	const v = Array(n + 1).fill(0);
	const p = Array(n + 1).fill(0);
	const way = Array(n + 1).fill(0);
	for (let i = 1; i <= n; i++) {
		p[0] = i;
		let j0 = 0;
		const minv = Array(n + 1).fill(Number.POSITIVE_INFINITY);
		const used = Array(n + 1).fill(false);
		do {
			used[j0] = true;
			const i0 = p[j0];
			let delta = Number.POSITIVE_INFINITY;
			let j1 = 0;
			for (let j = 1; j <= n; j++) {
				if (used[j]) continue;
				const cur = a[i0][j] - u[i0] - v[j];
				if (cur < minv[j]) {
					minv[j] = cur;
					way[j] = j0;
				}
				if (minv[j] < delta) {
					delta = minv[j];
					j1 = j;
				}
			}
			for (let j = 0; j <= n; j++) if (used[j]) {
				u[p[j]] += delta;
				v[j] -= delta;
			} else minv[j] -= delta;
			j0 = j1;
		} while (p[j0] !== 0);
		do {
			const j1 = way[j0];
			p[j0] = p[j1];
			j0 = j1;
		} while (j0 !== 0);
	}
	const assignment = Array.from({ length: rows }, () => -1);
	for (let j = 1; j <= n; j++) {
		const row = p[j];
		if (row >= 1 && row <= rows && j <= cols) assignment[row - 1] = j - 1;
	}
	return assignment;
}
/**
* SORT-style constant-velocity Kalman on [cx, cy, s, r, vx, vy, vs].
* s = area, r = aspect (w/h).
*/
var KalmanBoxTracker = class {
	x;
	p;
	constructor(box) {
		const cx = box.x + box.w / 2;
		const cy = box.y + box.h / 2;
		const s = Math.max(1, box.w * box.h);
		const r = box.w / Math.max(1, box.h);
		this.x = new Float64Array([
			cx,
			cy,
			s,
			r,
			0,
			0,
			0
		]);
		this.p = /* @__PURE__ */ new Float64Array(49);
		for (let i = 0; i < 7; i++) this.p[i * 7 + i] = i < 4 ? 10 : 1e3;
	}
	predict() {
		const [cx, cy, s, r, vx, vy, vs] = this.x;
		let ns = s + vs;
		if (ns < 1) ns = 1;
		this.x[0] = cx + vx;
		this.x[1] = cy + vy;
		this.x[2] = ns;
		this.x[4] = vx * .995;
		this.x[5] = vy * .995;
		this.x[6] = vs * .99;
		const qPos = 1;
		const qVel = .08;
		const q = [
			qPos,
			qPos,
			qPos,
			1e-4,
			qVel,
			qVel,
			qVel
		];
		for (let i = 0; i < 7; i++) this.p[i * 7 + i] += q[i];
		this.p[4] += .02;
		this.p[28] += .02;
		this.p[12] += .02;
		this.p[36] += .02;
		return this.toBox();
	}
	update(box) {
		const zcx = box.x + box.w / 2;
		const zcy = box.y + box.h / 2;
		const zs = Math.max(1, box.w * box.h);
		const z = [
			zcx,
			zcy,
			zs,
			box.w / Math.max(1, box.h)
		];
		const r = [
			4,
			4,
			10,
			.02
		];
		const gain = [
			.55,
			.55,
			.4,
			.35
		];
		for (let i = 0; i < 4; i++) {
			const innov = z[i] - this.x[i];
			const k = gain[i] * (this.p[i * 7 + i] / (this.p[i * 7 + i] + r[i]));
			this.x[i] += k * innov;
			this.p[i * 7 + i] *= 1 - k;
		}
		this.x[4] = .65 * this.x[4] + .35 * (zcx - (this.x[0] - this.x[4]));
		this.x[5] = .65 * this.x[5] + .35 * (zcy - (this.x[1] - this.x[5]));
		this.x[6] = .7 * this.x[6] + .3 * (zs - (this.x[2] - this.x[6]));
		return this.toBox();
	}
	toBox() {
		const cx = this.x[0];
		const cy = this.x[1];
		const s = Math.max(16, this.x[2]);
		const r = Math.max(.15, Math.min(4, this.x[3]));
		const w = Math.sqrt(s * r);
		const h = s / w;
		return {
			x: cx - w / 2,
			y: cy - h / 2,
			w,
			h
		};
	}
	velocity() {
		return {
			vx: this.x[4],
			vy: this.x[5]
		};
	}
};
var TRACK_COLORS = [
	"#7BA3B0",
	"#C4A484",
	"#8BAF8E",
	"#B08AA8",
	"#A8B07A",
	"#C48484",
	"#7A9BB0",
	"#B09A7A",
	"#9A8FB0",
	"#7AA89A",
	"#C4B07A",
	"#8A9A7A"
];
var DEFAULT_PARAMS = {
	maxAge: 45,
	minHits: 3,
	iouThreshold: .3,
	lowIouThreshold: .15,
	highScore: .45
};
var SortTracker = class {
	nextId = 1;
	eventSeq = 1;
	tracks = [];
	events = [];
	frame = 0;
	recoveries = 0;
	idSwitches = 0;
	lost = 0;
	gtBinding = /* @__PURE__ */ new Map();
	params;
	constructor(params = {}) {
		this.params = {
			...DEFAULT_PARAMS,
			...params
		};
	}
	reset() {
		this.nextId = 1;
		this.eventSeq = 1;
		this.tracks = [];
		this.events = [];
		this.frame = 0;
		this.recoveries = 0;
		this.idSwitches = 0;
		this.lost = 0;
		this.gtBinding.clear();
	}
	setParams(params) {
		this.params = {
			...this.params,
			...params
		};
	}
	update(detections) {
		this.frame += 1;
		const { maxAge, minHits, iouThreshold, lowIouThreshold, highScore } = this.params;
		for (const track of this.tracks) {
			track.predBox = track.kalman.predict();
			track.age += 1;
			track.timeSinceUpdate += 1;
		}
		const live = this.tracks.filter((t) => t.state !== "deleted");
		const highDets = [];
		const lowDets = [];
		detections.forEach((det, i) => {
			if (det.score >= highScore) highDets.push(i);
			else lowDets.push(i);
		});
		const associations = [];
		const unmatchedTracks = new Set(live.map((_, i) => i));
		const unmatchedDets = new Set(detections.map((_, i) => i));
		const match = (trackIdxs, detIdxs, minIou, stage) => {
			if (trackIdxs.length === 0 || detIdxs.length === 0) return;
			const cost = trackIdxs.map((ti) => detIdxs.map((di) => {
				const overlap = iou(live[ti].predBox, detections[di]);
				return overlap < minIou ? 1e5 : 1 - overlap;
			}));
			hungarian(cost).forEach((col, row) => {
				if (col < 0) return;
				const c = cost[row][col];
				if (c >= 1e4) return;
				const ti = trackIdxs[row];
				const di = detIdxs[col];
				if (!unmatchedTracks.has(ti) || !unmatchedDets.has(di)) return;
				unmatchedTracks.delete(ti);
				unmatchedDets.delete(di);
				associations.push({
					trackId: live[ti].id,
					detIndex: di,
					iou: 1 - c,
					stage
				});
				this.applyMatch(live[ti], detections[di]);
			});
		};
		match([...unmatchedTracks], highDets, iouThreshold, "high");
		match([...unmatchedTracks], lowDets, lowIouThreshold, "low");
		for (const ti of unmatchedTracks) {
			const track = live[ti];
			if (track.state === "confirmed" || track.state === "occluded") {
				if (track.state === "confirmed") {
					track.state = "occluded";
					this.pushEvent("occluded", track.id, `T-${pad(track.id)} held through occlusion`);
				}
				track.occludedFrames += 1;
			}
			if (track.timeSinceUpdate > maxAge) {
				track.state = "deleted";
				this.lost += 1;
				this.pushEvent("lost", track.id, `T-${pad(track.id)} dropped after ${track.timeSinceUpdate} frames`);
			}
		}
		for (const di of unmatchedDets) {
			const det = detections[di];
			if (det.score < .25) continue;
			this.spawn(det);
		}
		const snapshots = [];
		for (const track of this.tracks) {
			if (track.state === "deleted") continue;
			const box = track.timeSinceUpdate === 0 ? track.lastBox : track.predBox;
			const c = {
				x: box.x + box.w / 2,
				y: box.y + box.h
			};
			track.trail.push(c);
			if (track.trail.length > 48) track.trail.shift();
			const vel = track.kalman.velocity();
			snapshots.push({
				id: track.id,
				box,
				predBox: track.predBox,
				color: track.color,
				state: track.state,
				hits: track.hits,
				age: track.age,
				timeSinceUpdate: track.timeSinceUpdate,
				score: track.score,
				trail: track.trail.slice(),
				vx: vel.vx,
				vy: vel.vy,
				gtId: track.gtId
			});
			if (track.state === "tentative" && track.hits >= minHits && track.timeSinceUpdate === 0) {
				track.state = "confirmed";
				this.pushEvent("confirmed", track.id, `T-${pad(track.id)} confirmed`);
			}
		}
		this.tracks = this.tracks.filter((t) => t.state !== "deleted" || t.age < maxAge + 2);
		const stats = {
			frame: this.frame,
			detections: detections.length,
			active: snapshots.filter((t) => t.state === "confirmed").length,
			occluded: snapshots.filter((t) => t.state === "occluded").length,
			tentative: snapshots.filter((t) => t.state === "tentative").length,
			recoveries: this.recoveries,
			idSwitches: this.idSwitches,
			lost: this.lost
		};
		return {
			tracks: snapshots,
			associations,
			events: this.events.slice(-14),
			stats
		};
	}
	spawn(det) {
		const id = this.nextId++;
		const track = {
			id,
			kalman: new KalmanBoxTracker(det),
			hits: 1,
			age: 1,
			timeSinceUpdate: 0,
			state: "tentative",
			color: TRACK_COLORS[(id - 1) % TRACK_COLORS.length],
			trail: [{
				x: det.x + det.w / 2,
				y: det.y + det.h
			}],
			lastBox: det,
			predBox: det,
			score: det.score,
			gtId: det.gtId,
			occludedFrames: 0
		};
		this.tracks.push(track);
		this.pushEvent("born", id, `T-${pad(id)} born from detection`);
		if (det.gtId != null) this.bindGt(id, det.gtId);
	}
	applyMatch(track, det) {
		const wasOccluded = track.state === "occluded" || track.timeSinceUpdate > 1;
		track.lastBox = track.kalman.update(det);
		track.hits += 1;
		track.timeSinceUpdate = 0;
		track.score = det.score;
		if (wasOccluded && (track.state === "occluded" || track.state === "confirmed")) {
			track.state = "confirmed";
			this.recoveries += 1;
			const held = Math.max(1, track.occludedFrames);
			this.pushEvent("recovered", track.id, `T-${pad(track.id)} recovered after ${held} frame${held === 1 ? "" : "s"}`);
			track.occludedFrames = 0;
		} else if (track.state === "tentative" && track.hits >= this.params.minHits) {
			track.state = "confirmed";
			this.pushEvent("confirmed", track.id, `T-${pad(track.id)} confirmed`);
		} else if (track.state !== "tentative") track.state = "confirmed";
		if (det.gtId != null) this.bindGt(track.id, det.gtId);
	}
	bindGt(trackId, gtId) {
		const prev = this.gtBinding.get(gtId);
		if (prev != null && prev !== trackId) this.idSwitches += 1;
		this.gtBinding.set(gtId, trackId);
		const track = this.tracks.find((t) => t.id === trackId);
		if (track) track.gtId = gtId;
	}
	pushEvent(kind, trackId, note) {
		this.events.push({
			id: this.eventSeq++,
			kind,
			trackId,
			frame: this.frame,
			note
		});
		if (this.events.length > 40) this.events.shift();
	}
};
function pad(id) {
	return String(id).padStart(2, "0");
}
var loading = null;
var model = null;
function loadScript(src) {
	return new Promise((resolve, reject) => {
		const existing = document.querySelector(`script[src="${src}"]`);
		if (existing) {
			if (existing.dataset.loaded === "1") {
				resolve();
				return;
			}
			existing.addEventListener("load", () => resolve(), { once: true });
			existing.addEventListener("error", () => reject(/* @__PURE__ */ new Error(`Failed to load ${src}`)), { once: true });
			return;
		}
		const script = document.createElement("script");
		script.src = src;
		script.async = true;
		script.onload = () => {
			script.dataset.loaded = "1";
			resolve();
		};
		script.onerror = () => reject(/* @__PURE__ */ new Error(`Failed to load ${src}`));
		document.head.appendChild(script);
	});
}
async function loadPersonDetector() {
	if (model) return;
	if (!loading) loading = (async () => {
		await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js");
		await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js");
		const w = window;
		if (w.tf?.ready) await w.tf.ready();
		if (!w.cocoSsd) throw new Error("Person detector failed to initialize");
		const loaded = await w.cocoSsd.load({ base: "lite_mobilenet_v2" });
		model = loaded;
		return loaded;
	})();
	await loading;
}
async function detectPersons(video) {
	if (!model) await loadPersonDetector();
	if (!model) return [];
	return (await model.detect(video)).filter((p) => p.class === "person" && p.score >= .35).map((p) => ({
		x: p.bbox[0],
		y: p.bbox[1],
		w: p.bbox[2],
		h: p.bbox[3],
		score: p.score
	}));
}
var emptyResult = {
	detections: [],
	tracks: [],
	associations: [],
	events: [],
	stats: {
		frame: 0,
		detections: 0,
		active: 0,
		occluded: 0,
		tentative: 0,
		recoveries: 0,
		idSwitches: 0,
		lost: 0
	}
};
var STEP = 1 / 30;
function Viewport() {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const videoRef = (0, import_react.useRef)(null);
	const worldRef = (0, import_react.useRef)(createWorld("courtyard"));
	const trackerRef = (0, import_react.useRef)(new SortTracker());
	const streamRef = (0, import_react.useRef)(null);
	const lastDetectRef = (0, import_react.useRef)(0);
	const cameraDetsRef = (0, import_react.useRef)([]);
	const detectBusy = (0, import_react.useRef)(false);
	const resultRef = (0, import_react.useRef)(emptyResult);
	const accRef = (0, import_react.useRef)(0);
	const frameRef = (0, import_react.useRef)(0);
	const source = usePipeline((s) => s.source);
	const scenario = usePipeline((s) => s.scenario);
	const resetKey = usePipeline((s) => s.resetKey);
	const maxAge = usePipeline((s) => s.maxAge);
	const minHits = usePipeline((s) => s.minHits);
	const iouThreshold = usePipeline((s) => s.iouThreshold);
	(0, import_react.useEffect)(() => {
		worldRef.current = createWorld(scenario);
		trackerRef.current.reset();
		cameraDetsRef.current = [];
		resultRef.current = emptyResult;
		accRef.current = 0;
		frameRef.current = 0;
	}, [
		scenario,
		resetKey,
		source
	]);
	(0, import_react.useEffect)(() => {
		trackerRef.current.setParams({
			maxAge,
			minHits,
			iouThreshold,
			lowIouThreshold: Math.max(.08, iouThreshold - .15)
		});
	}, [
		maxAge,
		minHits,
		iouThreshold
	]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const video = videoRef.current;
		async function startCamera() {
			if (source !== "camera" || !video) return;
			usePipeline.getState().setDetectorLoading(true);
			usePipeline.getState().setCameraError(null);
			try {
				await loadPersonDetector();
				if (cancelled) return;
				const stream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: "user",
						width: { ideal: 1280 },
						height: { ideal: 720 }
					},
					audio: false
				});
				if (cancelled) {
					stream.getTracks().forEach((t) => t.stop());
					return;
				}
				streamRef.current = stream;
				video.srcObject = stream;
				await video.play();
				trackerRef.current.reset();
			} catch (err) {
				const message = err instanceof Error ? err.message : "Camera or detector is unavailable in this session.";
				usePipeline.getState().setCameraError(message);
				usePipeline.getState().setSource("plaza");
			} finally {
				if (!cancelled) usePipeline.getState().setDetectorLoading(false);
			}
		}
		if (source === "camera") startCamera();
		else {
			streamRef.current?.getTracks().forEach((t) => t.stop());
			streamRef.current = null;
			if (video) video.srcObject = null;
		}
		return () => {
			cancelled = true;
			streamRef.current?.getTracks().forEach((t) => t.stop());
			streamRef.current = null;
		};
	}, [source, resetKey]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		let last = performance.now();
		let lastUi = 0;
		let alive = true;
		const loop = (now) => {
			if (!alive) return;
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			const rect = wrap.getBoundingClientRect();
			const cssW = Math.max(1, rect.width);
			const cssH = Math.max(1, rect.height);
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
				canvas.width = Math.round(cssW * dpr);
				canvas.height = Math.round(cssH * dpr);
				canvas.style.width = `${cssW}px`;
				canvas.style.height = `${cssH}px`;
			}
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const map = {
				width: cssW,
				height: cssH
			};
			const state = usePipeline.getState();
			const overlay = {
				detections: state.showDetections,
				tracks: state.showTracks,
				trails: state.showTrails,
				predicted: state.showPredicted,
				selectedId: state.selectedId
			};
			if (state.running) accRef.current += dt;
			while (accRef.current >= STEP) {
				accRef.current -= STEP;
				if (!state.running) break;
				frameRef.current += 1;
				let detections = [];
				if (state.source === "plaza") {
					stepWorld(worldRef.current, STEP);
					detections = detectPeople(worldRef.current.people, worldRef.current.pillars, map, frameRef.current);
				} else detections = cameraDetsRef.current;
				const updated = trackerRef.current.update(detections);
				resultRef.current = {
					...updated,
					detections
				};
			}
			if (state.source === "camera") {
				const video = videoRef.current;
				if (video && video.readyState >= 2 && state.running && !detectBusy.current && now - lastDetectRef.current > 90) {
					lastDetectRef.current = now;
					detectBusy.current = true;
					detectPersons(video).then((raw) => {
						cameraDetsRef.current = raw.map((d) => ({
							...videoToCanvasBox(d, video, map),
							score: d.score,
							gtId: d.gtId
						}));
					}).catch(() => {
						cameraDetsRef.current = [];
					}).finally(() => {
						detectBusy.current = false;
					});
				}
			}
			const result = resultRef.current;
			if (state.source === "plaza") drawPlaza(ctx, worldRef.current, map, result.detections, result.tracks, result.associations, overlay);
			else {
				const video = videoRef.current;
				if (video && video.readyState >= 2) drawCameraFrame(ctx, video, map, result.detections, result.tracks, result.associations, overlay);
				else {
					ctx.fillStyle = "#0c0b0a";
					ctx.fillRect(0, 0, cssW, cssH);
				}
			}
			if (now - lastUi > 90) {
				lastUi = now;
				state.setSnapshot(result);
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			alive = false;
			cancelAnimationFrame(raf);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: "relative min-h-[240px] w-full flex-1 overflow-hidden rounded-lg bg-surface-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 size-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				className: "hidden",
				playsInline: true,
				muted: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})
		]
	});
}
function Hud() {
	const stats = usePipeline((s) => s.snapshot?.stats);
	const source = usePipeline((s) => s.source);
	const detectorLoading = usePipeline((s) => s.detectorLoading);
	const cameraError = usePipeline((s) => s.cameraError);
	const occluded = stats?.occluded ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-x-3 top-3 flex flex-wrap justify-between gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-bg/70 px-2 py-1 text-[11px] text-fg",
					children: source === "plaza" ? "Detector" : "Camera"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-bg/70 px-2 py-1 text-[11px] tabular-nums text-muted",
					children: stats?.frame ?? 0
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-end gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-bg/70 px-2 py-1 text-[11px] text-detect",
						children: ["Det ", stats?.detections ?? 0]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-bg/70 px-2 py-1 text-[11px] text-fg",
						children: ["Live ", stats?.active ?? 0]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `rounded-full bg-bg/70 px-2 py-1 text-[11px] text-hold ${occluded > 0 ? "loom-pulse" : ""}`,
						children: ["Held ", occluded]
					})
				]
			})]
		}),
		detectorLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center bg-bg/50 text-sm text-muted",
			children: "Loading person detector…"
		}) : null,
		cameraError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute bottom-3 left-3 right-3 rounded-md border border-border bg-surface/90 px-3 py-2 text-sm text-lost",
			children: cameraError
		}) : null
	] });
}
function LoomApp() {
	const recoveries = usePipeline((s) => s.snapshot?.stats.recoveries ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 200,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh min-w-0 flex-col overflow-x-hidden bg-bg text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3 px-4 py-3 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "loom-enter",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl leading-none tracking-tight italic sm:text-4xl",
						children: "Loom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Identity that holds through occlusion"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "loom-enter loom-enter-delay-1 hidden text-right sm:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg tabular-nums text-fg",
							children: recoveries
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted",
							children: "recoveries"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							className: "lg:hidden",
							"aria-label": "Open tracks",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Tracks" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackPanel, {})
					})] })] })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex min-h-0 flex-1 flex-col gap-4 px-4 pb-5 sm:px-6 lg:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "loom-enter loom-enter-delay-2 flex min-h-0 min-w-0 flex-1 flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlBar, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-sm text-muted md:block",
							children: "Dashed cyan boxes are per-frame detections. Solid colored boxes are identities. When someone passes behind stone, the tracker predicts their Kalman state and keeps the same T-ID until they reappear."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "loom-enter loom-enter-delay-3 hidden w-[320px] shrink-0 rounded-lg border border-border bg-surface p-4 lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackPanel, {})
				})]
			})]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoomApp, {});
}
//#endregion
export { Home as component };
