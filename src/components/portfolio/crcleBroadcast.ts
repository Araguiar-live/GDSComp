import { useSyncExternalStore } from "react";

export type BroadcastState = "open_day" | "night_owl" | "collab" | "in_the_area";

/**
 * Shared CRCLE broadcast mood across Profile ↔ Radar ↔ Messaging (tabs remount).
 * Night Owl activates the NOC Signal Radar layout.
 */
let broadcastState: BroadcastState = "open_day";
let incognitoState = false;
let pendingMoodSwitch = false;
let pendingAreaInbox = false;
let pendingAreaNotification = false;
let areaNearbyBadgeActive = false;
let areaInboxOpen = false;
let verifyOpen = false;
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

/** Dock radar+pin control: jump to Messaging Hub with In The Area inbox. */
export function requestAreaInboxOnMessaging() {
  pendingAreaInbox = true;
  emit();
}

export function consumeAreaInboxOnMessaging() {
  const pending = pendingAreaInbox;
  pendingAreaInbox = false;
  return pending;
}

/** Mood Switch → In The Area: show nearby notification sheet on Messaging Hub. */
export function requestAreaNearbyNotification() {
  pendingAreaNotification = true;
  emit();
}

export function consumeAreaNearbyNotification() {
  const pending = pendingAreaNotification;
  pendingAreaNotification = false;
  return pending;
}

/** Green heart badge on the dock radar control while a nearby alert is unread. */
export function getAreaNearbyBadgeActive(): boolean {
  return areaNearbyBadgeActive;
}

export function setAreaNearbyBadgeActive(next: boolean) {
  if (next === areaNearbyBadgeActive) return;
  areaNearbyBadgeActive = next;
  emit();
}

export function useAreaNearbyBadgeActive(): boolean {
  return useSyncExternalStore(
    subscribeCrcleBroadcast,
    getAreaNearbyBadgeActive,
    getAreaNearbyBadgeActive,
  );
}

/** True while the In The Area overlay is on the Messaging Hub prototype. */
export function getCrcleAreaInboxOpen(): boolean {
  return areaInboxOpen;
}

export function setCrcleAreaInboxOpen(next: boolean) {
  if (next === areaInboxOpen) return;
  areaInboxOpen = next;
  emit();
}

export function useCrcleAreaInboxOpen(): boolean {
  return useSyncExternalStore(
    subscribeCrcleBroadcast,
    getCrcleAreaInboxOpen,
    getCrcleAreaInboxOpen,
  );
}

/** True while the Profile KYC / verification drawer is open. */
export function getCrcleVerifyOpen(): boolean {
  return verifyOpen;
}

export function setCrcleVerifyOpen(next: boolean) {
  if (next === verifyOpen) return;
  verifyOpen = next;
  emit();
}

export function useCrcleVerifyOpen(): boolean {
  return useSyncExternalStore(
    subscribeCrcleBroadcast,
    getCrcleVerifyOpen,
    getCrcleVerifyOpen,
  );
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
