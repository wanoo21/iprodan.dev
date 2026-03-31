import { For, createSignal } from "solid-js";

const LABELS = ["A", "B", "C"] as const;

const MIN_VIEWPORT = 96;
const MAX_VIEWPORT = 360;
const DEFAULT_VIEWPORT = MAX_VIEWPORT;
const ITEM_WIDTH = 88;
const ITEM_GAP = 8;
const INNER_PADDING = 16; // p-2 left + right
const REQUIRED_WIDTH = LABELS.length * ITEM_WIDTH + (LABELS.length - 1) * ITEM_GAP + INNER_PADDING;

function StartEdgeMarker() {
  return (
    <div
      class="pointer-events-none absolute left-2 top-2 bottom-2 w-0.5 bg-emerald-500 z-10 rounded-full opacity-90"
      aria-hidden="true"
    />
  );
}

export default function SafeAlignmentDemo() {
  const [viewportPx, setViewportPx] = createSignal(DEFAULT_VIEWPORT);

  const clipBoxClass =
    "relative overflow-x-auto overscroll-x-contain overflow-y-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900/50 p-2 shrink-0";

  const viewportStyle = () => ({ width: `min(100%, ${viewportPx()}px)` as const });

  const row = (
    label: string,
    labelClass: string,
    justifyFlex: string,
    justifyGrid: string,
    caption: string,
  ) => (
    <div class="flex flex-col gap-2 min-w-0">
      <p class={`text-xs font-semibold uppercase tracking-wide ${labelClass}`}>{label}</p>
      <div class="grid sm:grid-cols-2 gap-4 items-start">
        <div class="min-w-0">
          <p class="text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Flex</p>
          <div class="relative">
            <StartEdgeMarker />
            <div
              class={clipBoxClass}
              style={{
                ...viewportStyle(),
                display: "flex",
                "justify-content": justifyFlex,
                gap: `${ITEM_GAP}px`,
              }}
            >
              <For each={LABELS}>
                {(labelItem) => (
                  <div class="min-w-[88px] h-12 shrink-0 rounded-md bg-blue-500/85 dark:bg-blue-500 flex items-center justify-center text-sm font-medium text-white ring-2 ring-white/20">
                    {labelItem}
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
        <div class="min-w-0">
          <p class="text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Grid</p>
          <div class="relative">
            <StartEdgeMarker />
            <div
              class={clipBoxClass}
              style={{
                ...viewportStyle(),
                display: "grid",
                gap: `${ITEM_GAP}px`,
                "grid-template-columns": "repeat(3, 88px)",
                "justify-content": justifyGrid,
              }}
            >
              <For each={LABELS}>
                {(labelItem) => (
                  <div class="h-12 rounded-md bg-violet-500/85 dark:bg-violet-500 flex items-center justify-center text-sm font-medium text-white ring-2 ring-white/20">
                    {labelItem}
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
      <p class="text-[11px] text-gray-500 dark:text-gray-400">{caption}</p>
    </div>
  );

  return (
    <div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-5 max-w-5xl mx-auto">
      <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Flex and grid</h2>
        <span class="text-xs px-2.5 py-1 rounded-full font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200">
          same box-alignment rules
        </span>
      </div>

      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        The alignment container itself is narrower than its items, and each strip is horizontally scrollable so you can inspect overflow behavior.{" "}
        <strong>Row 1</strong> — <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">center</code>{" "}
        (<code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">unsafe center</code> behavior)
        ; <strong>row 2</strong> — <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">safe center</code>
        ; <strong>row 3</strong> — start (<code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">flex-start</code> /{" "}
        <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">start</code>).
      </p>

      <div class="space-y-2">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <label class="text-xs font-semibold text-gray-600 dark:text-gray-300" for="safe-demo-viewport">
            Viewport width: <span class="tabular-nums">{viewportPx()}</span>px
          </label>
          <span class="text-[11px] text-gray-500 dark:text-gray-400">
            Needs ~{REQUIRED_WIDTH}px to fit all items (scroll if smaller)
          </span>
        </div>
        <input
          id="safe-demo-viewport"
          type="range"
          min={MIN_VIEWPORT}
          max={MAX_VIEWPORT}
          step={4}
          value={viewportPx()}
          onInput={(e) => setViewportPx(Number(e.currentTarget.value))}
          class="w-full h-2 accent-teal-600 dark:accent-teal-500 cursor-ew-resize"
        />
      </div>

      <div class="flex flex-col gap-8">
        {row(
          "1 · justify-content: center",
          "text-rose-700 dark:text-rose-300",
          "center",
          "center",
          "Leading gap before “A” at the green line when the window is narrower than the inner track.",
        )}
        {row(
          "2 · justify-content: safe center",
          "text-amber-800 dark:text-amber-200",
          "safe center",
          "safe center",
          "Should match row 3 when the safe fallback applies.",
        )}
        {row(
          "3 · start (reference)",
          "text-emerald-800 dark:text-emerald-200",
          "flex-start",
          "start",
          "Explicit start—flush to the green marker (typical safe fallback).",
        )}
      </div>

      <p class="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
        <strong class="text-emerald-700 dark:text-emerald-400">Green line</strong> = left edge of each clip. Flex uses blue blocks, grid violet—layout rules are the same.
      </p>
    </div>
  );
}
