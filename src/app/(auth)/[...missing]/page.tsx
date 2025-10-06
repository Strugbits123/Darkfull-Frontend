import { notFound } from "next/navigation";

export default function CatchAllAuth() {
  notFound(); // This will trigger (auth)/not-found.tsx
}
