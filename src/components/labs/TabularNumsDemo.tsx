import { createSignal } from "solid-js";

const MIN = 0;
const MAX = 990_000;
/** Coarse stepping keeps the scrubber usable without extra UI. */
const STEP = 1_000;

const LABEL = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

/** 1ch-spaced stripes; proportional glyphs ignore them, tabular aligns. */
const GRID_GRAY =
  "repeating-linear-gradient(90deg, transparent 0, transparent calc(1ch - 2px), rgb(163 163 163 / 0.38) calc(1ch - 2px), rgb(163 163 163 / 0.38) calc(1ch - 1px), transparent calc(1ch - 1px), transparent 1ch)";

const GRID_PURPLE =
  "repeating-linear-gradient(90deg, transparent 0, transparent calc(1ch - 2px), rgb(147 51 234 / 0.45) calc(1ch - 2px), rgb(147 51 234 / 0.45) calc(1ch - 1px), transparent calc(1ch - 1px), transparent 1ch)";

export default function TabularNumsDemo() {
  const [value, setValue] = createSignal(128_000);

  const valueText = () => LABEL.format(value());

  const railBackdrop = (
    gradient: string,
  ) => (
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0"
      style={{ "background-image": gradient }}
    />
  );

  return (
    <div
      class="w-full rounded-2xl border border-neutral-200 bg-white px-6 py-8 shadow-sm dark:border-neutral-700 dark:bg-neutral-900/35"
      aria-label="tabular-nums comparison"
    >
      <div class="mt-5 space-y-2">
        <label
          class="block text-center text-xs font-semibold text-gray-600 dark:text-gray-300"
          for="tabular-nums-demo-range"
        >
          Slide to change · <span class="tabular-nums font-medium text-purple-700 dark:text-purple-300">{valueText()}</span>
        </label>
        <input
          id="tabular-nums-demo-range"
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={value()}
          aria-valuetext={valueText()}
          onInput={(e) => setValue(Number(e.currentTarget.value))}
          class="w-full h-2 cursor-ew-resize accent-purple-600 dark:accent-purple-500"
        />
      </div>

      <div
        class="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-neutral-200 ring-1 ring-neutral-200 dark:bg-neutral-600 dark:ring-neutral-600"
        role="group"
        aria-live="polite"
        aria-label={`Value ${valueText()}`}
      >
        <figure
          class="bg-neutral-50 px-3 py-8 sm:px-5 sm:py-10 dark:bg-neutral-950/40"
          style={{ "font-variant-numeric": "proportional-nums" }}
        >
          <figcaption class="mb-4 text-center text-[11px] font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 sm:mb-6">
            Default
          </figcaption>
          <div class="relative mx-auto flex w-full justify-end overflow-hidden rounded-r-sm border-r-2 border-neutral-400 pr-5 dark:border-neutral-500">
            {railBackdrop(GRID_GRAY)}
            <p class="relative z-10 min-w-0 px-4 py-4 text-right font-sans text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
              {valueText()}
            </p>
          </div>
        </figure>

        <figure
          class="bg-neutral-50 px-3 py-8 sm:px-5 sm:py-10 dark:bg-neutral-950/40"
          style={{ "font-variant-numeric": "tabular-nums" }}
        >
          <figcaption class="mb-4 text-center text-[11px] font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 sm:mb-6">
            tabular-nums
          </figcaption>
          <div class="relative mx-auto flex w-full justify-end overflow-hidden rounded-r-md border-r-[6px] border-purple-600 bg-purple-500/[0.07] pr-6 shadow-[0_0_0_3px_rgb(147_51_234/0.12),inset_-8px_0_12px_-6px_rgb(147_51_234/0.35)] ring-2 ring-purple-500/35 dark:border-purple-400 dark:bg-purple-500/10 dark:shadow-[0_0_0_3px_rgb(192_132_252/0.15),inset_-8px_0_14px_-6px_rgb(192_132_252/0.4)] dark:ring-purple-400/30">
            {railBackdrop(GRID_PURPLE)}
            <p class="relative z-10 min-w-0 px-5 py-4 text-right font-sans text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
              {valueText()}
            </p>
          </div>
          <p class="mt-4 text-center text-[10px] font-medium uppercase tracking-wide text-purple-700 dark:text-purple-400">
            Bold purple rail — digits stack on 1&nbsp;ch guides
          </p>
        </figure>
      </div>

      <p class="mt-6 text-center text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        Same integer—only{" "}
        <code class="rounded bg-purple-50 px-1.5 py-0.5 font-mono text-[0.7rem] text-purple-600 dark:bg-purple-950/50 dark:text-purple-300">
          font-variant-numeric
        </code>{" "}
        differs. Right: violet grid + glow show where tabular glyphs lock before the{" "}
        <strong class="font-medium text-neutral-700 dark:text-neutral-300">snap rail</strong>. No difference? Likely missing
        OpenType{" "}
        <code class="rounded bg-purple-50 px-1.5 py-0.5 font-mono text-[0.7rem] text-purple-600 dark:bg-purple-950/50 dark:text-purple-300">
          tnum
        </code>
        .
      </p>
    </div>
  );
}
