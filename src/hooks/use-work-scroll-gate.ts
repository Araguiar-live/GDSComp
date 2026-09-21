import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** When #work top crosses this fraction of the viewport, auto-commit with smooth scroll. */
const COMMIT_RATIO = 0.52;

export function useWorkScrollGate() {
  const reduceMotion = useReducedMotion();
  const [workCommitted, setWorkCommitted] = useState(false);
  const workCommittedRef = useRef(false);
  const isSnappingRef = useRef(false);

  const getWorkEl = () => document.getElementById("work");

  const getMinScroll = useCallback(() => {
    const work = getWorkEl();
    return work ? work.offsetTop : 0;
  }, []);

  const commitToWork = useCallback(
    (behavior?: ScrollBehavior) => {
      const work = getWorkEl();
      if (!work || isSnappingRef.current || workCommittedRef.current) return;

      const scrollBehavior = behavior ?? (reduceMotion ? "auto" : "smooth");

      workCommittedRef.current = true;
      setWorkCommitted(true);
      isSnappingRef.current = true;

      window.scrollTo({ top: work.offsetTop, behavior: scrollBehavior });

      window.setTimeout(
        () => {
          isSnappingRef.current = false;
        },
        scrollBehavior === "smooth" ? 900 : 0,
      );
    },
    [reduceMotion],
  );

  useEffect(() => {
    workCommittedRef.current = workCommitted;
  }, [workCommitted]);

  useEffect(() => {
    const clampIfNeeded = () => {
      if (!workCommittedRef.current || isSnappingRef.current) return;
      const minScroll = getMinScroll();
      if (window.scrollY < minScroll - 1) {
        window.scrollTo({ top: minScroll, behavior: "auto" });
      }
    };

    const onScroll = () => {
      const work = getWorkEl();
      if (!work) return;

      if (!workCommittedRef.current) {
        const workTop = work.getBoundingClientRect().top;
        if (workTop < window.innerHeight * COMMIT_RATIO) {
          commitToWork();
        }
        return;
      }

      clampIfNeeded();
    };

    const blockBackScroll = (event: WheelEvent) => {
      if (!workCommittedRef.current || isSnappingRef.current) return;
      if (window.scrollY > getMinScroll() + 2) return;
      if (event.deltaY < 0) event.preventDefault();
    };

    let touchStartY = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!workCommittedRef.current || isSnappingRef.current) return;
      if (window.scrollY > getMinScroll() + 2) return;
      const touchY = event.touches[0]?.clientY ?? 0;
      if (touchY - touchStartY > 0) event.preventDefault();
    };

    const onResize = () => clampIfNeeded();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", blockBackScroll, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", blockBackScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
    };
  }, [commitToWork, getMinScroll]);

  return { workCommitted, commitToWork };
}
