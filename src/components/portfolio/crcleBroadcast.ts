import { useSyncExternalStore } from "react";

export type BroadcastState = "open_day" | "night_owl" | "collab" | "in_the_area";

/**
 * Shared CRCLE broadcast mood across Profile ↔ Radar (tabs remount).
 * Night Owl activates the NOC Signal Radar layout.
 */
let broadcastState: BroadcastState = "open_day";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function getCrcleBroadcast(): BroadcastState {
  return broadcastState;
}

export function setCrcleBroadcast(next: BroadcastState) {
  if (next === broadcastState) return;
  broadcastState = next;
  emit();
}

export function subscribeCrcleBroadcast(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useCrcleBroadcast(): [
  BroadcastState,
  (next: BroadcastState) => void,
] {
  const state = useSyncExternalStore(
    subscribeCrcleBroadcast,
    getCrcleBroadcast,
    getCrcleBroadcast,
  );
  return [state, setCrcleBroadcast];
}
