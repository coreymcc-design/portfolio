"use client";

/**
 * BirdCompanion — React port of bird-test/index.html.
 *
 * Anchors to the bottom edge of its nearest positioned ancestor. Enters
 * from off-screen (left or right per `entry` prop), hops onto the page,
 * then cycles randomly through idle actions (blink, coo, peck,
 * excited_bounce, hop_walk). Click/tap to tickle — usually dances,
 * occasionally gets irritated.
 *
 * Honors prefers-reduced-motion: when reduced motion is requested the bird
 * is not rendered at all (the character is decorative).
 */

import React, { useEffect, useRef } from "react";
import { useA11y } from "@/context/AccessibilityContext";

// ───────────────────────── constants (ported) ─────────────────────────────

const FRAME_WIDTH = 128;
const FRAME_HEIGHT = 128;

type SheetKey =
  | "walk"
  | "walk_bob"
  | "little_dance"
  | "irritated"
  | "blink"
  | "coo_left"
  | "coo_right"
  | "peck"
  | "excited_bounce";

const SHEETS: Record<SheetKey, { src: string; frames: number; fps: number }> = {
  walk:           { src: "/bird/bird_walk_spritesheet.png",      frames: 12, fps: 16 },
  walk_bob:       { src: "/bird/walk_bob_spritesheet.png",       frames:  8, fps: 16 },
  little_dance:   { src: "/bird/little_dance_spritesheet.png",   frames:  4, fps: 16 },
  irritated:      { src: "/bird/irritated_spritesheet.png",      frames:  8, fps: 16 },
  blink:          { src: "/bird/blink_spritesheet.png",          frames:  3, fps: 16 },
  coo_left:       { src: "/bird/coo_left_spritesheet.png",       frames: 10, fps: 16 },
  coo_right:      { src: "/bird/coo_right_spritesheet.png",      frames: 10, fps: 16 },
  peck:           { src: "/bird/peck_spritesheet.png",           frames:  9, fps: 16 },
  excited_bounce: { src: "/bird/excited_bounce_spritesheet.png", frames:  8, fps: 16 },
};

type IdleAction = "blink" | "coo" | "peck" | "excited_bounce" | "hop_walk";
const IDLE_ACTIONS: IdleAction[] = ["blink", "coo", "peck", "excited_bounce", "hop_walk"];

// Sheets that are already authored with their correct facing direction
// baked in — do not apply the directional flip when drawing these.
const DIRECTIONAL_SHEETS: SheetKey[] = ["coo_left", "coo_right"];

// Walk sheet semantics: frames 7–10 are airborne (where horizontal motion
// happens); frames 1–6 are takeoff; frame 11 is landing.
const IDLE_FRAME = 1;
const MOVING_FRAMES = [7, 8, 9, 10];
const PIXELS_PER_HOP = 80;
const HOPS_TO_ARRIVE = 3;

// Idle-action cycling timing.
const MIN_ACTION_GAP_MS       = 4000;
const MAX_ACTION_GAP_MS       = 10000;
const MIN_SAME_ACTION_PAUSE_F = 4;
const MAX_SAME_ACTION_PAUSE_F = 8;
const MIN_ROUNDS_PER_ACTION   = 1;
const MAX_ROUNDS_PER_ACTION   = 2;
const MIN_BOUNCE_LOOPS        = 2;
const MAX_BOUNCE_LOOPS        = 4;
const MIN_IDLE_HOPS           = 1;
const MAX_IDLE_HOPS           = 3;

const DANCE_LOOPS      = 3;
const IRRITATED_CHANCE = 0.25;
const IRRITATED_LOOPS  = 4;

// Walk_bob (arrow-key walking) is unused on the portfolio page but kept so
// the state machine ports cleanly and future keyboard driving can be enabled.
const WALK_SPEED_PX_S        = 110;
const WALK_BOB_MOVING_FRAMES = [0, 1, 2, 3, 4, 5, 6];

// How far off the edge the bird starts before hopping in.
const START_OFFSET_HOPS = HOPS_TO_ARRIVE;
// Resting distance from the nearer edge of the host container.
const REST_EDGE_MARGIN = 40;
// How far from the far edge the bird can roam (keeps it out of text).
const FAR_EDGE_PADDING = 24;

type State =
  | "loading"
  | "walking-in"
  | "idle"
  | "performing"
  | "dance"
  | "irritated"
  | "walking";

type ActionPhase = "playing" | "pausing-between-rounds" | null;

export interface BirdCompanionProps {
  /**
   * Which side the bird enters (and rests) on.
   * - "right" (default): enters from the right edge, faces left.
   * - "left": enters from the left edge, faces right.
   */
  entry?: "left" | "right";
}

export function BirdCompanion({ entry = "right" }: BirdCompanionProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { reduceMotion } = useA11y();

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    // Respect reduced motion — either the OS-level setting or the in-app
    // accessibility toggle. The bird is purely decorative, so we skip the
    // whole sprite pipeline rather than try to freeze it on a single frame.
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches || reduceMotion) {
      host.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    // ───────── load sheets ─────────
    const images: Partial<Record<SheetKey, HTMLImageElement>> = {};
    const sheetKeys = Object.keys(SHEETS) as SheetKey[];
    let sheetsRemaining = sheetKeys.length;
    let disposed = false;

    // ───────── state ─────────
    // Direction conventions (relative to resting position):
    //   entry === "right" → rest is at the right edge. hostX grows positive
    //     when the bird moves off-screen to the right (entry start). Bounds:
    //     walkMinX (negative, toward the left of the container), walkMaxX = 0.
    //   entry === "left"  → rest is at the left edge. hostX grows negative
    //     when the bird moves off-screen to the left. Bounds: walkMinX = 0,
    //     walkMaxX (positive, toward the right of the container).
    const entryRight = entry === "right";

    let state: State = "loading";
    let activeSheet: SheetKey = "walk";
    let frame = 0;
    let lastStep = 0;
    let lastT = 0;
    let hostX = 0;
    let danceLoopsRemaining = 0;
    let irritatedLoopsRemaining = 0;
    let shouldRestOnIdle = false;
    // Entering from the right means the bird moves leftward → faces left.
    // Entering from the left means the bird moves rightward → faces right.
    let facingLeft = entryRight;

    // performing sub-state
    let currentAction: IdleAction | null = null;
    let actionRoundsRemaining = 0;
    let bounceLoopsRemaining = 0;
    let hopsRemaining = 0;
    let hopDirection: 1 | -1 = 1;
    let actionPhase: ActionPhase = null;
    let pauseUntilT = 0;
    let lastAction: IdleAction | null = null;

    // scheduling
    let nextActionTimer: number | null = null;

    // bounds (measured from host's rest origin; see direction conventions above)
    let walkMinX = -2000;
    let walkMaxX = 0;

    function measureBounds() {
      if (!host) return;
      const parent = host.parentElement;
      if (!parent) return;
      const parentW = parent.clientWidth;
      // Usable span for the bird's left edge given the container width.
      // The bird is FRAME_WIDTH wide and at rest sits REST_EDGE_MARGIN
      // from its anchor edge. The far-edge limit keeps FAR_EDGE_PADDING
      // away from the opposite edge.
      if (entryRight) {
        // Rest at right → leftward range is negative.
        const restLeft = parentW - FRAME_WIDTH - REST_EDGE_MARGIN;
        walkMinX = FAR_EDGE_PADDING - restLeft; // negative
        walkMaxX = 0;
      } else {
        // Rest at left → rightward range is positive.
        const restLeft = REST_EDGE_MARGIN;
        walkMinX = 0;
        walkMaxX = (parentW - FRAME_WIDTH - FAR_EDGE_PADDING) - restLeft;
      }
    }

    function setHostTransform() {
      if (!host) return;
      host.style.transform = `translateX(${hostX}px)`;
    }

    function drawCurrentFrame() {
      const img = images[activeSheet];
      if (!img) return;
      ctx!.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);

      // Some sheets (coo_left, coo_right) are already oriented correctly
      // and must be drawn without the directional flip.
      const isDirectional = DIRECTIONAL_SHEETS.includes(activeSheet);
      const flip = facingLeft && !isDirectional;

      if (flip) {
        ctx!.save();
        ctx!.scale(-1, 1);
        ctx!.drawImage(
          img,
          frame * FRAME_WIDTH,
          0,
          FRAME_WIDTH,
          FRAME_HEIGHT,
          -FRAME_WIDTH,
          0,
          FRAME_WIDTH,
          FRAME_HEIGHT
        );
        ctx!.restore();
      } else {
        ctx!.drawImage(
          img,
          frame * FRAME_WIDTH,
          0,
          FRAME_WIDTH,
          FRAME_HEIGHT,
          0,
          0,
          FRAME_WIDTH,
          FRAME_HEIGHT
        );
      }
    }

    // ───────── helpers ─────────
    const randInt = (lo: number, hi: number) =>
      lo + Math.floor(Math.random() * (hi - lo + 1));
    const randFloat = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

    function clearActionTimer() {
      if (nextActionTimer !== null) {
        clearTimeout(nextActionTimer);
        nextActionTimer = null;
      }
    }

    function pickNextAction(): IdleAction {
      const pool = IDLE_ACTIONS.filter((a) => a !== lastAction);
      const list = pool.length ? pool : IDLE_ACTIONS;
      return list[Math.floor(Math.random() * list.length)];
    }

    function sheetForAction(action: IdleAction): SheetKey {
      if (action === "coo") return facingLeft ? "coo_left" : "coo_right";
      if (action === "hop_walk") return "walk";
      return action as SheetKey;
    }

    function scheduleNextAction() {
      clearActionTimer();
      const delay = randFloat(MIN_ACTION_GAP_MS, MAX_ACTION_GAP_MS);
      nextActionTimer = window.setTimeout(() => {
        nextActionTimer = null;
        if (state === "idle") enter("performing");
      }, delay);
    }

    function enter(next: State) {
      state = next;
      clearActionTimer();
      lastStep = 0;

      if (next === "walking-in") {
        activeSheet = "walk";
        frame = 0;
        // Start off-screen on the entry side of the rest position.
        // entryRight: positive offset (further right). entryLeft: negative.
        const entrySign = entryRight ? 1 : -1;
        hostX = entrySign * START_OFFSET_HOPS * PIXELS_PER_HOP;
        facingLeft = entryRight;
        shouldRestOnIdle = false;
        setHostTransform();
        drawCurrentFrame();
      } else if (next === "idle") {
        activeSheet = "walk";
        frame = IDLE_FRAME;
        currentAction = null;
        actionPhase = null;
        setHostTransform();
        drawCurrentFrame();
        scheduleNextAction();
      } else if (next === "performing") {
        currentAction = pickNextAction();
        lastAction = currentAction;
        actionRoundsRemaining =
          currentAction === "hop_walk"
            ? 0
            : randInt(MIN_ROUNDS_PER_ACTION, MAX_ROUNDS_PER_ACTION) - 1;
        startActionRound();
      } else if (next === "dance") {
        activeSheet = "little_dance";
        frame = 0;
        danceLoopsRemaining = DANCE_LOOPS;
        drawCurrentFrame();
      } else if (next === "irritated") {
        activeSheet = "irritated";
        frame = 0;
        irritatedLoopsRemaining = IRRITATED_LOOPS;
        drawCurrentFrame();
      } else if (next === "walking") {
        activeSheet = "walk_bob";
        frame = 0;
        drawCurrentFrame();
      }
    }

    function startActionRound() {
      if (currentAction === "hop_walk") {
        const desired = randInt(MIN_IDLE_HOPS, MAX_IDLE_HOPS);
        const leftRoom = Math.floor((hostX - walkMinX) / PIXELS_PER_HOP);
        const rightRoom = Math.floor((walkMaxX - hostX) / PIXELS_PER_HOP);
        if (leftRoom < 1 && rightRoom < 1) {
          hopsRemaining = 0;
          enter("idle");
          return;
        }
        const leftFits = leftRoom >= desired;
        const rightFits = rightRoom >= desired;
        if (leftFits && rightFits) hopDirection = Math.random() < 0.5 ? -1 : 1;
        else if (leftFits) hopDirection = -1;
        else if (rightFits) hopDirection = 1;
        else hopDirection = leftRoom > rightRoom ? -1 : 1;
        const room = hopDirection < 0 ? leftRoom : rightRoom;
        hopsRemaining = Math.max(1, Math.min(desired, room));
        facingLeft = hopDirection < 0;
      }

      if (!currentAction) return;
      activeSheet = sheetForAction(currentAction);
      frame = 0;
      actionPhase = "playing";
      if (currentAction === "excited_bounce") {
        bounceLoopsRemaining = randInt(MIN_BOUNCE_LOOPS, MAX_BOUNCE_LOOPS);
      } else {
        bounceLoopsRemaining = 0;
      }
      drawCurrentFrame();
    }

    function onActionRoundComplete() {
      if (actionRoundsRemaining > 0) {
        actionRoundsRemaining--;
        actionPhase = "pausing-between-rounds";
        const pauseFrames = randInt(MIN_SAME_ACTION_PAUSE_F, MAX_SAME_ACTION_PAUSE_F);
        pauseUntilT = performance.now() + pauseFrames * (1000 / 16);
        activeSheet = "walk";
        frame = IDLE_FRAME;
        drawCurrentFrame();
      } else {
        enter("idle");
      }
    }

    // ───────── main loop ─────────
    let rafId = 0;
    function loop(t: number) {
      if (disposed) return;
      rafId = requestAnimationFrame(loop);
      if (state === "loading") return;

      if (!lastT) lastT = t;
      const dt = t - lastT;
      lastT = t;

      if (state === "performing" && actionPhase === "pausing-between-rounds") {
        if (performance.now() >= pauseUntilT) startActionRound();
        return;
      }

      const meta = SHEETS[activeSheet];
      const interval = 1000 / meta.fps;

      if (state !== "idle") {
        if (t - lastStep >= interval) {
          const prev = frame;
          frame = (frame + 1) % meta.frames;
          drawCurrentFrame();
          lastStep = t;

          const wrapped = frame < prev;

          if (state === "performing" && wrapped) {
            if (currentAction === "excited_bounce") {
              bounceLoopsRemaining--;
              if (bounceLoopsRemaining <= 0) {
                onActionRoundComplete();
                return;
              }
            } else if (currentAction === "hop_walk") {
              hopsRemaining--;
              if (hopsRemaining <= 0) {
                onActionRoundComplete();
                return;
              }
            } else {
              onActionRoundComplete();
              return;
            }
          }

          if (state === "dance" && wrapped) {
            danceLoopsRemaining--;
            if (danceLoopsRemaining <= 0) {
              enter("idle");
              return;
            }
          }

          if (state === "irritated" && wrapped) {
            irritatedLoopsRemaining--;
            if (irritatedLoopsRemaining <= 0) {
              enter("idle");
              return;
            }
          }

          if (state === "walking-in" && shouldRestOnIdle && frame === IDLE_FRAME) {
            enter("idle");
            return;
          }
        }

        // walking-in: move toward rest position during airborne frames.
        // Direction depends on entry side.
        if (state === "walking-in" && MOVING_FRAMES.includes(frame)) {
          const stillTraveling = entryRight ? hostX > 0 : hostX < 0;
          if (stillTraveling) {
            const airborneMs = MOVING_FRAMES.length * interval;
            const velocity = PIXELS_PER_HOP / airborneMs;
            if (entryRight) {
              hostX = Math.max(0, hostX - velocity * dt);
            } else {
              hostX = Math.min(0, hostX + velocity * dt);
            }
            setHostTransform();
            if (hostX === 0) shouldRestOnIdle = true;
          }
        }

        // hop_walk: same airborne motion model, direction set per-relocation
        if (
          state === "performing" &&
          currentAction === "hop_walk" &&
          MOVING_FRAMES.includes(frame)
        ) {
          const airborneMs = MOVING_FRAMES.length * interval;
          const velocity = PIXELS_PER_HOP / airborneMs;
          hostX = Math.max(
            walkMinX,
            Math.min(walkMaxX, hostX + hopDirection * velocity * dt)
          );
          setHostTransform();
        }

        // walk_bob driven motion (arrow keys — not wired on the site)
        if (state === "walking" && WALK_BOB_MOVING_FRAMES.includes(frame)) {
          const dutyScale =
            SHEETS.walk_bob.frames / WALK_BOB_MOVING_FRAMES.length;
          const dir = facingLeft ? -1 : 1;
          const step = dir * ((WALK_SPEED_PX_S * dutyScale) / 1000) * dt;
          hostX = Math.max(walkMinX, Math.min(walkMaxX, hostX + step));
          setHostTransform();
        }
      }
    }

    // ───────── click tickle ─────────
    let bounceTimeout: number | null = null;
    function playBounce() {
      if (!canvas) return;
      if (canvas.classList.contains("bird-bounce")) return;
      canvas.classList.add("bird-bounce");
      if (bounceTimeout !== null) clearTimeout(bounceTimeout);
      bounceTimeout = window.setTimeout(() => {
        canvas.classList.remove("bird-bounce");
        bounceTimeout = null;
      }, 420);
    }

    function tickle() {
      if (state === "loading" || state === "walking-in") return;
      if (state === "dance") {
        playBounce();
        danceLoopsRemaining = DANCE_LOOPS;
        return;
      }
      if (state === "irritated") {
        irritatedLoopsRemaining = IRRITATED_LOOPS;
        return;
      }
      if (Math.random() < IRRITATED_CHANCE) {
        enter("irritated");
      } else {
        playBounce();
        enter("dance");
      }
    }

    const onClick = () => tickle();
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      tickle();
    };
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });

    // ───────── resize observer ─────────
    const onResize = () => {
      measureBounds();
      // clamp current position to new bounds
      if (state !== "walking-in") {
        hostX = Math.max(walkMinX, Math.min(walkMaxX, hostX));
        setHostTransform();
      }
    };
    window.addEventListener("resize", onResize);

    // ───────── load sheets ─────────
    sheetKeys.forEach((key) => {
      const img = new Image();
      img.onload = () => {
        images[key] = img;
        if (--sheetsRemaining === 0 && !disposed) {
          measureBounds();
          rafId = requestAnimationFrame(loop);
          enter("walking-in");
        }
      };
      img.onerror = () => {
        // fail silently — bird just won't appear
        sheetsRemaining--;
      };
      img.src = SHEETS[key].src;
    });

    return () => {
      disposed = true;
      clearActionTimer();
      if (bounceTimeout !== null) clearTimeout(bounceTimeout);
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("resize", onResize);
    };
  }, [entry, reduceMotion]);

  // Position host on the correct edge. The initial transform offsets the
  // bird off-screen so it doesn't flash at rest before the effect kicks in.
  const anchorStyle =
    entry === "left"
      ? { left: `${REST_EDGE_MARGIN}px` }
      : { right: `${REST_EDGE_MARGIN}px` };
  const initialOffset =
    entry === "left"
      ? -START_OFFSET_HOPS * PIXELS_PER_HOP
      : START_OFFSET_HOPS * PIXELS_PER_HOP;

  return (
    <>
      <div
        ref={hostRef}
        aria-hidden="true"
        className="bird-host"
        style={{
          position: "absolute",
          ...anchorStyle,
          bottom: 0,
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          zIndex: 5,
          pointerEvents: "none",
          willChange: "transform",
          transform: `translateX(${initialOffset}px)`,
        }}
      >
        <canvas
          ref={canvasRef}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          aria-label="Pixel bird companion"
          className="bird-canvas"
          style={{
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            imageRendering: "pixelated",
            cursor: "pointer",
            pointerEvents: "auto",
            transformOrigin: "50% 85%",
            userSelect: "none",
            WebkitUserSelect: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        />
      </div>
      <style jsx>{`
        .bird-canvas {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
        :global(.bird-canvas.bird-bounce) {
          animation: birdBounce 380ms cubic-bezier(0.3, 0.9, 0.3, 1.1);
        }
        @keyframes birdBounce {
          0%   { transform: scale(1, 1)       translateY(0); }
          18%  { transform: scale(1.15, 0.88) translateY(0); }
          46%  { transform: scale(0.9, 1.18)  translateY(-14px); }
          72%  { transform: scale(1.08, 0.95) translateY(-2px); }
          100% { transform: scale(1, 1)       translateY(0); }
        }
      `}</style>
    </>
  );
}
