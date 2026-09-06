import { useSyncExternalStore } from "react";

export type BroadcastState = "open_day" | "night_owl" | "collab" | "in_the_area";

/**
 * Shared CRCLE broadcast mood across Profile ↔ Radar ↔ Messaging (tabs remount).
 * Night Owl activates the NOC Signal Radar layout.
 */
let broadcastState: BroadcastState = "open_day";
let incognitoState = false;
let pendingMoodSwitch = false;
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

export function getCrcleIncognito(): boolean {
  return incognitoState;
}

export function setCrcleIncognito(next: boolean) {
  if (next === incognitoState) return;
  incognitoState = next;
  emit();
}

/** Profile mood control: jump to Messaging Hub with Mood Switch open. */
export function requestMoodSwitchOnMessaging() {
  pendingMoodSwitch = true;
  emit();
}

export function consumeMoodSwitchOnMessaging() {
  const pending = pendingMoodSwitch;
  pendingMoodSwitch = false;
  return pending;
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

export function useCrcleIncognito(): [boolean, (next: boolean) => void] {
  const state = useSyncExternalStore(
    subscribeCrcleBroadcast,
    getCrcleIncognito,
    getCrcleIncognito,
  );
  return [state, setCrcleIncognito];
}
