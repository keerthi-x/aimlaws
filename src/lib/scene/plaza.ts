import { intersectionArea } from "../tracker/iou";
import type { Box, Detection } from "@/lib/tracker/types";

export type ScenarioId = "courtyard" | "crossing" | "cover";

export type PersonStyle = {
  coat: string;
  pants: string;
  hair: string;
  skin: string;
  height: number;
  girth: number;
};

export type Person = {
  gtId: number;
  name: string;
  style: PersonStyle;
  x: number;
  z: number;
  vx: number;
  vz: number;
  facing: 1 | -1;
  phase: number;
  path: PathFn;
};

export type Pillar = {
  id: string;
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  kind: "column" | "wall" | "planter";
};

export type ScreenMap = {
  width: number;
  height: number;
};

export type PathFn = (t: number) => { x: number; z: number };

const STYLES: PersonStyle[] = [
  { coat: "#6d7a86", pants: "#3d3a36", hair: "#2a2420", skin: "#c4a48a", height: 1.78, girth: 0.3 },
  { coat: "#8a6a58", pants: "#3a3f3a", hair: "#4a3428", skin: "#d2b39a", height: 1.64, girth: 0.28 },
  { coat: "#5a5e52", pants: "#2f3338", hair: "#1c1a18", skin: "#b08a72", height: 1.86, girth: 0.32 },
  { coat: "#7a5c68", pants: "#3a3532", hair: "#3a2a24", skin: "#c9aa90", height: 1.7, girth: 0.29 },
  { coat: "#4e5c62", pants: "#2c2c2a", hair: "#5a4638", skin: "#d8bba0", height: 1.74, girth: 0.3 },
  { coat: "#6a5848", pants: "#3c3a3e", hair: "#241e1a", skin: "#b89478", height: 1.6, girth: 0.27 },
  { coat: "#5c6a5a", pants: "#35322e", hair: "#4a3028", skin: "#c2a086", height: 1.82, girth: 0.31 },
  { coat: "#5a4e58", pants: "#2e3230", hair: "#1a1816", skin: "#c8a890", height: 1.68, girth: 0.28 },
];

const NAMES = ["Nia", "Rowan", "Elsa", "Malik", "Ivo", "Sera", "Jun", "Pia"];

function pingPong(t: number, a: number, b: number, speed: number, phase: number): { p: number; v: number } {
  const span = Math.abs(b - a);
  const period = (span / speed) * 2;
  const u = ((t + phase) % period) / period;
  if (u < 0.5) {
    const k = u * 2;
    return { p: a + (b - a) * k, v: Math.sign(b - a) * speed };
  }
  const k = (u - 0.5) * 2;
  return { p: b + (a - b) * k, v: Math.sign(a - b) * speed };
}

function linearPass(t: number, a: number, b: number, speed: number, phase: number): { p: number; v: number } {
  const span = Math.abs(b - a);
  const dur = span / speed;
  const u = ((t + phase) % (dur + 1.4)) / dur;
  if (u > 1) return { p: b, v: 0 };
  return { p: a + (b - a) * u, v: Math.sign(b - a) * speed };
}

export function worldToScreen(x: number, z: number, map: ScreenMap) {
  const padX = map.width * 0.06;
  const top = map.height * 0.3;
  const bot = map.height * 0.9;
  return {
    sx: padX + (x / 100) * (map.width - padX * 2),
    sy: top + (z / 100) * (bot - top),
    scale: 0.48 + 0.78 * (z / 100),
  };
}

export function personBox(person: Person, map: ScreenMap): Box {
  const { sx, sy, scale } = worldToScreen(person.x, person.z, map);
  const h = person.style.height * 92 * scale;
  const w = h * person.style.girth;
  return { x: sx - w / 2, y: sy - h, w, h };
}

export function pillarBox(pillar: Pillar, map: ScreenMap): Box {
  const { sx, sy, scale } = worldToScreen(pillar.x, pillar.z, map);
  const w = pillar.w * 7.2 * scale;
  const h = pillar.h * 92 * scale;
  return { x: sx - w / 2, y: sy - h, w, h };
}

export function visibilityOf(person: Person, pillars: Pillar[], map: ScreenMap): number {
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

export function pillarsFor(scenario: ScenarioId): Pillar[] {
  if (scenario === "cover") {
    return [
      { id: "wall", x: 50, z: 58, w: 28, d: 6, h: 2.35, kind: "wall" },
      { id: "planter", x: 18, z: 72, w: 10, d: 6, h: 0.7, kind: "planter" },
      { id: "col-r", x: 84, z: 40, w: 7, d: 7, h: 2.2, kind: "column" },
    ];
  }
  if (scenario === "crossing") {
    return [
      { id: "col-a", x: 32, z: 46, w: 8, d: 8, h: 2.25, kind: "column" },
      { id: "col-b", x: 68, z: 52, w: 8, d: 8, h: 2.2, kind: "column" },
    ];
  }
  return [
    { id: "col-l", x: 26, z: 50, w: 11, d: 9, h: 2.3, kind: "column" },
    { id: "col-c", x: 52, z: 40, w: 12, d: 10, h: 2.45, kind: "column" },
    { id: "col-r", x: 78, z: 56, w: 11, d: 8, h: 2.15, kind: "column" },
    { id: "planter", x: 10, z: 74, w: 9, d: 6, h: 0.65, kind: "planter" },
  ];
}

function makePerson(gtId: number, path: PathFn, t0 = 0): Person {
  const pose = path(t0);
  return {
    gtId,
    name: NAMES[(gtId - 1) % NAMES.length]!,
    style: STYLES[(gtId - 1) % STYLES.length]!,
    x: pose.x,
    z: pose.z,
    vx: 0,
    vz: 0,
    facing: 1,
    phase: gtId * 0.7,
    path,
  };
}

export function peopleFor(scenario: ScenarioId): Person[] {
  if (scenario === "cover") {
    return [
      makePerson(1, (t) => {
        const x = pingPong(t, 8, 92, 14, 0);
        return { x: x.p, z: 42 };
      }),
      makePerson(2, (t) => {
        const x = pingPong(t, 90, 10, 12, 1.6);
        return { x: x.p, z: 44 };
      }),
      makePerson(3, (t) => {
        const x = pingPong(t, 12, 88, 10, 3.2);
        return { x: x.p, z: 38 };
      }),
      makePerson(4, (t) => {
        const x = pingPong(t, 20, 80, 9, 0.4);
        return { x: x.p, z: 70 };
      }),
      makePerson(5, (t) => {
        const z = pingPong(t, 28, 82, 8, 2.1);
        return { x: 64, z: z.p };
      }),
    ];
  }
  if (scenario === "crossing") {
    return [
      makePerson(1, (t) => {
        const x = pingPong(t, 6, 94, 16, 0);
        return { x: x.p, z: 48 };
      }),
      makePerson(2, (t) => {
        const x = pingPong(t, 94, 6, 15, 0.2);
        return { x: x.p, z: 52 };
      }),
      makePerson(3, (t) => {
        const x = pingPong(t, 10, 90, 13, 1.4);
        return { x: x.p, z: 36 };
      }),
      makePerson(4, (t) => {
        const z = pingPong(t, 22, 84, 11, 0.8);
        return { x: 40, z: z.p };
      }),
      makePerson(5, (t) => {
        const z = pingPong(t, 80, 24, 11, 0.8);
        return { x: 60, z: z.p };
      }),
      makePerson(6, (t) => {
        const x = pingPong(t, 18, 82, 9, 2.8);
        return { x: x.p, z: 68 };
      }),
      makePerson(7, (t) => {
        const x = pingPong(t, 88, 14, 10, 3.5);
        return { x: x.p, z: 30 };
      }),
      makePerson(8, (t) => {
        const x = pingPong(t, 30, 70, 7, 1.1);
        return { x: x.p, z: 58 };
      }),
    ];
  }
  return [
    makePerson(1, (t) => {
      const x = pingPong(t, 6, 94, 13, 0);
      return { x: x.p, z: 36 };
    }),
    makePerson(2, (t) => {
      const x = pingPong(t, 92, 8, 11, 1.8);
      return { x: x.p, z: 48 };
    }),
    makePerson(3, (t) => {
      const x = pingPong(t, 14, 86, 9, 3.4);
      return { x: x.p, z: 46 };
    }),
    makePerson(4, (t) => {
      const x = pingPong(t, 24, 76, 8, 0.6);
      return { x: x.p, z: 72 };
    }),
    makePerson(5, (t) => {
      const z = pingPong(t, 26, 80, 8, 2.2);
      const x = 40 + Math.sin(t * 0.35) * 6;
      return { x, z: z.p };
    }),
    makePerson(6, (t) => {
      const x = linearPass(t, 4, 96, 12, 0.3);
      const z = 44 + Math.sin(t * 0.5) * 4;
      return { x: x.p, z };
    }),
  ];
}

export function stepPeople(people: Person[], t: number, dt: number) {
  for (const person of people) {
    const next = person.path(t);
    person.vx = (next.x - person.x) / Math.max(dt, 1 / 60);
    person.vz = (next.z - person.z) / Math.max(dt, 1 / 60);
    if (Math.abs(person.vx) > 0.4) person.facing = person.vx > 0 ? 1 : -1;
    person.x = next.x;
    person.z = next.z;
    const speed = Math.hypot(person.vx, person.vz);
    person.phase += dt * (1.7 + speed * 0.08);
  }
}

export function detectPeople(
  people: Person[],
  pillars: Pillar[],
  map: ScreenMap,
  frame: number,
): Detection[] {
  const dets: Detection[] = [];
  for (const person of people) {
    const vis = visibilityOf(person, pillars, map);
    if (vis < 0.42) continue;
    const missChance = vis < 0.62 ? 0.28 : 0.03;
    const seed = Math.abs(Math.sin(frame * 12.9898 + person.gtId * 78.233));
    if (seed < missChance) continue;
    const box = personBox(person, map);
    const jitter = 1.6;
    const jx = ((seed * 13) % 1) * 2 * jitter - jitter;
    const jy = ((seed * 29) % 1) * 2 * jitter - jitter;
    const shrink = vis < 0.7 ? 0.12 : 0.02;
    const w = box.w * (1 - shrink);
    const h = box.h * (1 - shrink);
    dets.push({
      x: box.x + jx + (box.w - w) / 2,
      y: box.y + jy + (box.h - h) * 0.15,
      w,
      h,
      score: Math.min(0.98, 0.42 + vis * 0.55 + (seed - 0.5) * 0.08),
      gtId: person.gtId,
    });
  }
  return dets;
}

export type PlazaWorld = {
  scenario: ScenarioId;
  people: Person[];
  pillars: Pillar[];
  time: number;
};

export function createWorld(scenario: ScenarioId): PlazaWorld {
  return {
    scenario,
    people: peopleFor(scenario),
    pillars: pillarsFor(scenario),
    time: 0,
  };
}

export function stepWorld(world: PlazaWorld, dt: number) {
  world.time += dt;
  stepPeople(world.people, world.time, dt);
}
