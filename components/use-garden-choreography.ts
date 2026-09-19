"use client";

import { useEffect } from "react";

/** Progressive enhancement: server-rendered copy is always readable. */
export function useGardenChoreography(enabled: boolean) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".garden-home");
    if (!root || !enabled || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.dataset.motion = "on";
    const animations = new Set<Animation>();
    const reveal = new IntersectionObserver((entries) => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        reveal.unobserve(element);
        if (element.dataset.revealed) continue;
        element.dataset.revealed = "true";
        const animation = element.animate([
          { opacity: 0, transform: "translate3d(0, 22px, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" },
        ], { duration: 950, delay: Math.min(order++ * 95, 285), easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.12 });
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => reveal.observe(element));

    // Only decoration moves with scrolling; text retains a stable reading baseline.
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    let bounds: { layer: HTMLElement; top: number; height: number; speed: number }[] = [];
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".garden-work-card"));
    let frame = 0;
    const updateLayers = () => {
      frame = 0;
      if (document.hidden) return;
      const y = scrollY;
      const viewportHeight = innerHeight;
      for (const { layer, top, height, speed } of bounds) {
        if (top + height < y - 100 || top > y + viewportHeight + 100) continue;
        const distance = y + viewportHeight / 2 - top - height / 2;
        const offset = Math.max(-52, Math.min(52, distance * speed));
        layer.style.setProperty("--travel", `${offset.toFixed(2)}px`);
      }
    };
    const measure = () => {
      const y = scrollY;
      // Batch layout reads on actual size changes, never interleave reads and
      // style writes in the scroll loop.
      bounds = layers.flatMap((layer) => {
        const section = layer.closest("section");
        if (!section) return [];
        const box = section.getBoundingClientRect();
        return [{ layer, top: box.top + y, height: box.height, speed: Number(layer.dataset.parallax) }];
      });
      onScroll();
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateLayers); };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>(".garden-work-card");
      if (!card) return;
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      card.style.setProperty("--image-x", `${((x - .5) * -14).toFixed(2)}px`);
      card.style.setProperty("--image-y", `${((y - .5) * -12).toFixed(2)}px`);
      card.style.setProperty("--light-x", `${x * 100}%`);
      card.style.setProperty("--light-y", `${y * 100}%`);
    };
    const resetCard = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      card.style.removeProperty("--image-x");
      card.style.removeProperty("--image-y");
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      // Keyboard focus must never land in copy that is still fading in.
      for (const animation of Array.from(animations)) {
        const target = (animation.effect as KeyframeEffect | null)?.target;
        if (target instanceof Element && target.contains(event.target)) animation.finish();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    root.addEventListener("pointermove", pointer, { passive: true });
    root.addEventListener("focusin", onFocus);
    cards.forEach((card) => card.addEventListener("pointerleave", resetCard));
    measure();

    return () => {
      delete root.dataset.motion;
      reveal.disconnect();
      observer.disconnect();
      cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
      layers.forEach((layer) => layer.style.removeProperty("--travel"));
      cards.forEach((card) => {
        card.removeEventListener("pointerleave", resetCard);
        ["--image-x", "--image-y", "--light-x", "--light-y"].forEach((name) => card.style.removeProperty(name));
      });
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      root.removeEventListener("pointermove", pointer);
      root.removeEventListener("focusin", onFocus);
    };
  }, [enabled]);
}
