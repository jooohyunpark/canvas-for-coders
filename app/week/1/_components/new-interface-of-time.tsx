"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const HOUR_COLOR = "#ff0000";
const MINUTE_COLOR = "#00ff00";
const SECOND_COLOR = "#0000ff";

// The disc is nothing but smooth gradients — no text, no hairlines — so a fixed
// 2x buffer looks sharp on a retina display and supersamples on a 1x one. Much
// simpler than tracking devicePixelRatio, and it can never go stale.
const RESOLUTION = 2;

const toChannels = (hex: string) =>
  [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ] as const;

const pad = (value: number) => String(value).padStart(2, "0");

const formatTime = (date: Date) =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

// A hand is the whole disc, not a needle: a conic gradient that is fully opaque
// at the hand's own angle and fades to transparent on the opposite side. The
// three discs are screen-blended, so red, green, and blue mix additively and
// the current time reads as a single colour.
function drawHand(
  ctx: CanvasRenderingContext2D,
  size: number,
  fraction: number,
  hex: string
) {
  const center = size / 2;
  const angle = -Math.PI / 2 + fraction * 2 * Math.PI;
  const [r, g, b] = toChannels(hex);

  const gradient = ctx.createConicGradient(angle, center, center);
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
  gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0)`);
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 1)`);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(center, center, center, 0, 2 * Math.PI);
  ctx.fill();
}

export function NewInterfaceOfTime({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) return;

    let size = 0;
    let frame = 0;
    let label = "";

    const resize = () => {
      const bounds = container.getBoundingClientRect();

      size = Math.min(bounds.width, bounds.height) * 0.75;
      canvas.width = canvas.height = size * RESOLUTION;
      canvas.style.width = canvas.style.height = `${size}px`;

      // Resizing the backing buffer resets the context, so restore both the
      // scale and the blend mode the layers rely on.
      ctx.setTransform(RESOLUTION, 0, 0, RESOLUTION, 0, 0);
      ctx.globalCompositeOperation = "screen";
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);

      const now = new Date();
      const next = formatTime(now);
      if (next !== label) {
        label = next;
        if (timeRef.current) timeRef.current.textContent = next;
      }

      if (size <= 0) return;

      ctx.clearRect(0, 0, size, size);

      const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = (now.getHours() % 12) + minutes / 60;

      drawHand(ctx, size, hours / 12, HOUR_COLOR);
      drawHand(ctx, size, minutes / 60, MINUTE_COLOR);
      drawHand(ctx, size, seconds / 60, SECOND_COLOR);
    };

    resize();
    frame = requestAnimationFrame(draw);

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border bg-black",
        className
      )}
    >
      <canvas ref={canvasRef} className="rounded-full" />

      <span
        ref={timeRef}
        className="absolute right-2 bottom-2 p-1 text-xs leading-none tabular-nums"
      >
        --:--:--
      </span>
    </div>
  );
}
