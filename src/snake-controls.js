/**
 * 🐍🕹️ Puffin Snake — Multi-Modal Mouse & Mobile Touch Control Resolvers (`src/snake-controls.js`)
 *
 * Implements the 4 complementary playability modes requested by Riccardo:
 * 1. Continuous 4-direction drag/swipe (mouse & finger) with mid-stroke anchor reset
 * 2. N / S / W / E perimeter zone click/tap on the game board
 * 3. Spring-back Virtual Thumbstick ("cerchietto con pallino che torna centrale")
 * 4. Unrecognized / neutral zone click or tap -> 90° clockwise turn (`UP -> RIGHT -> DOWN -> LEFT -> UP`)
 */

export const CARDINAL_VECTORS = Object.freeze({
  UP: Object.freeze({ x: 0, y: -1 }),
  RIGHT: Object.freeze({ x: 1, y: 0 }),
  DOWN: Object.freeze({ x: 0, y: 1 }),
  LEFT: Object.freeze({ x: -1, y: 0 }),
});

/**
 * Converts a `{ x, y }` direction vector to `'UP' | 'RIGHT' | 'DOWN' | 'LEFT'`.
 */
export function directionVecToName(vec = { x: 1, y: 0 }) {
  const x = Number(vec?.x) || 0;
  const y = Number(vec?.y) || 0;
  if (Math.abs(x) >= Math.abs(y)) {
    return x < 0 ? 'LEFT' : 'RIGHT';
  }
  return y < 0 ? 'UP' : 'DOWN';
}

/**
 * Rotates a 2D grid direction vector by 90 degrees clockwise in screen coordinates (`+y` is DOWN):
 * - UP    (0, -1) -> RIGHT (1, 0)
 * - RIGHT (1,  0) -> DOWN  (0, 1)
 * - DOWN  (0,  1) -> LEFT  (-1, 0)
 * - LEFT  (-1, 0) -> UP    (0, -1)
 */
export function rotateDirectionClockwise(vec = { x: 1, y: 0 }) {
  const name = typeof vec === 'string' ? vec.toUpperCase() : directionVecToName(vec);
  switch (name) {
    case 'UP':
      return { x: 1, y: 0 };
    case 'RIGHT':
      return { x: 0, y: 1 };
    case 'DOWN':
      return { x: -1, y: 0 };
    case 'LEFT':
    default:
      return { x: 0, y: -1 };
  }
}

/**
 * Resolves a continuous pointer/touch drag delta `(dx, dy)` into a cardinal direction.
 * Returns `null` until movement reaches `thresholdPx` (default `20px`), then returns
 * `{ direction: 'UP'|'DOWN'|'LEFT'|'RIGHT', resetAnchor: true }` so continuous multi-turn
 * strokes work without lifting the finger or releasing the mouse button.
 */
export function resolveDragDirection(dx = 0, dy = 0, thresholdPx = 20) {
  const dist = Math.hypot(dx, dy);
  if (dist < thresholdPx) return null;
  const direction =
    Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'RIGHT' : 'LEFT') : dy > 0 ? 'DOWN' : 'UP';
  return {
    direction,
    distance: dist,
    resetAnchor: true,
  };
}

/**
 * Classifies a tap/click at normalized canvas coordinates `(normX, normY)` in `[0, 1]`:
 * - Outer `borderRatio` (default `0.28`) perimeter bands trigger `'UP'`, `'DOWN'`, `'LEFT'`, `'RIGHT'`.
 * - Inner central neutral zone (`[0.28..0.72]`) triggers `'CLOCKWISE_90'` (90° clockwise rotation).
 */
export function resolveCanvasZoneTap(normX = 0.5, normY = 0.5, borderRatio = 0.28) {
  const x = Math.max(0, Math.min(1, Number(normX) || 0));
  const y = Math.max(0, Math.min(1, Number(normY) || 0));
  const b = Math.max(0.1, Math.min(0.45, Number(borderRatio) || 0.28));

  const inCenterX = x >= b && x <= 1 - b;
  const inCenterY = y >= b && y <= 1 - b;
  if (inCenterX && inCenterY) {
    return 'CLOCKWISE_90';
  }

  const distTop = y;
  const distBottom = 1 - y;
  const distLeft = x;
  const distRight = 1 - x;
  const minDist = Math.min(distTop, distBottom, distLeft, distRight);

  if (minDist === distTop) return 'UP';
  if (minDist === distBottom) return 'DOWN';
  if (minDist === distLeft) return 'LEFT';
  return 'RIGHT';
}

/**
 * Computes the clamped knob position `(clampedX, clampedY)` for the spring-back Virtual Thumbstick
 * ("cerchietto con pallino") and resolves the cardinal direction when deflection >= `deadzone`.
 */
export function resolveJoystickVector(dx = 0, dy = 0, maxRadius = 42, deadzone = 10) {
  const dist = Math.hypot(dx, dy);
  const scale = dist > maxRadius && dist > 0 ? maxRadius / dist : 1;
  const clampedX = Math.round(dx * scale * 100) / 100;
  const clampedY = Math.round(dy * scale * 100) / 100;

  if (dist < deadzone) {
    return {
      clampedX,
      clampedY,
      distance: dist,
      direction: null,
    };
  }

  const direction =
    Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'RIGHT' : 'LEFT') : dy > 0 ? 'DOWN' : 'UP';
  return {
    clampedX,
    clampedY,
    distance: Math.min(dist, maxRadius),
    direction,
  };
}
