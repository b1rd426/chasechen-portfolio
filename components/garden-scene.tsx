"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { TempleRenderer } from "@/lib/garden/temple-renderer";
import { useGardenChoreography } from "@/components/use-garden-choreography";

const chapters = [
  { id: "arrival", label: "序 · 初见" },
  { id: "about", label: "壹 · 关于" },
  { id: "work", label: "贰 · 作品" },
  { id: "journal", label: "叁 · 手记" },
  { id: "contact", label: "肆 · 下一程" },
];

export function GardenScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enabledRef = useRef(false);
  const requestFrame = useRef<() => void>(() => {});
  const [enabled, setEnabled] = useState(false);
  const [loadScene, setLoadScene] = useState(false);
  const [state, setState] = useState("still");
  const [active, setActive] = useState(0);
  useGardenChoreography(enabled);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let savedPause = false;
    try { savedPause = localStorage.getItem("chase-garden-paused") === "true"; } catch {}
    const start = !preference.matches && !savedPause;
    setEnabled(start);
    setLoadScene(start);
    const onPreference = () => { if (preference.matches) setEnabled(false); };
    preference.addEventListener("change", onPreference);
    return () => preference.removeEventListener("change", onPreference);
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
    requestFrame.current();
  }, [enabled]);

  useEffect(() => {
    const elements = chapters.map(({ id }) => document.getElementById(id));
    let pending = 0;
    const update = () => {
      pending = 0;
      let current = 0;
      elements.forEach((element, index) => {
        if (element && element.getBoundingClientRect().top <= innerHeight * 0.48) current = index;
      });
      setActive(current);
    };
    const onScroll = () => { if (!pending) pending = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { cancelAnimationFrame(pending); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loadScene) return;
    let renderer: TempleRenderer | undefined;
    let disposed = false;
    let frame = 0;
    let observer: ResizeObserver | undefined;
    let anchors: number[] = [];

    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      anchors = chapters.map(({ id }, index) => {
        const el = document.getElementById(id);
        if (!el || index === 0) return 0;
        if (index === chapters.length - 1) return max;
        return Math.min(max, Math.max(0, el.offsetTop + el.offsetHeight / 2 - innerHeight / 2));
      });
      for (let i = 1; i < anchors.length; i++) anchors[i] = Math.max(anchors[i], anchors[i - 1] + 1);
      renderer?.resize();
      schedule();
    };
    const progress = () => {
      for (let i = 0; i < anchors.length - 1; i++) {
        if (scrollY <= anchors[i + 1]) return i + Math.max(0, scrollY - anchors[i]) / (anchors[i + 1] - anchors[i]);
      }
      return 4;
    };
    const render = (time: number) => {
      frame = 0;
      if (!renderer || disposed || document.hidden) return;
      renderer.setProgress(progress());
      renderer.render(time, enabledRef.current);
      if (enabledRef.current) schedule();
    };
    function schedule() {
      if (!disposed && renderer && !document.hidden && !frame) frame = requestAnimationFrame(render);
    }
    const pointer = (event: PointerEvent) => {
      if (!enabledRef.current || event.pointerType !== "mouse") return;
      renderer?.setPointer(event.clientX / innerWidth * 2 - 1, 1 - event.clientY / innerHeight * 2);
      schedule();
    };
    const clearPointer = () => { renderer?.setPointer(0, 0, false); schedule(); };
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else schedule();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      frame = 0;
      renderer?.dispose();
      renderer = undefined;
      setState("unavailable");
      setEnabled(false);
    };
    requestFrame.current = schedule;
    setState("loading");
    const timer = window.setTimeout(async () => {
      try {
        const { createTempleNightRenderer } = await import("@/lib/garden/temple-renderer");
        if (disposed) return;
        renderer = createTempleNightRenderer(canvas);
        if (disposed) { renderer.dispose(); return; }
        measure();
        setState("ready");
        observer = new ResizeObserver(measure);
        observer.observe(document.body);
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("pointermove", pointer, { passive: true });
        window.addEventListener("blur", clearPointer);
        document.addEventListener("pointerleave", clearPointer);
        document.addEventListener("visibilitychange", visibility);
        canvas.addEventListener("webglcontextlost", contextLost);
      } catch {
        if (!disposed) { setState("unavailable"); setEnabled(false); }
      }
    }, 100);

    return () => {
      disposed = true;
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("blur", clearPointer);
      document.removeEventListener("pointerleave", clearPointer);
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("webglcontextlost", contextLost);
      requestFrame.current = () => {};
      renderer?.dispose();
    };
  }, [loadScene]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    if (next) setLoadScene(true);
    try { localStorage.setItem("chase-garden-paused", String(!next)); } catch {}
  };

  return (
    <>
      <div className="garden-world" data-state={state} aria-hidden="true">
        <div className="garden-world-fallback" />
        <canvas ref={canvasRef} className="garden-canvas" />
        <div className="garden-world-shade" />
      </div>
      <nav className="garden-chapters" aria-label="首页章节">
        {chapters.map((chapter, index) => (
          <a key={chapter.id} href={`#${chapter.id}`} aria-label={chapter.label}
            aria-current={active === index ? "location" : undefined}>
            <span>{chapter.label}</span><i />
          </a>
        ))}
      </nav>
      {state !== "unavailable" && (
        <button type="button" className="garden-motion focus-ring" onClick={toggle}
          aria-label={enabled ? "暂停庭院动态" : "播放庭院动态"} aria-pressed={!enabled}>
          {enabled ? <Pause size={12} /> : <Play size={12} />}
          <span>{enabled ? "暂停动态" : "播放动态"}</span>
        </button>
      )}
    </>
  );
}
