import { createFileRoute } from "@tanstack/react-router";
import { LoomApp } from "@/components/loom-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <LoomApp />;
}
