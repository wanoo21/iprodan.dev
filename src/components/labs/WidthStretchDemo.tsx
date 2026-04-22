import { createMemo, createSignal } from "solid-js";

type WidthMode = "100%" | "stretch";

const MODES: { value: WidthMode; label: string }[] = [
  { value: "100%", label: "100%" },
  { value: "stretch", label: "stretch" },
];

export default function WidthStretchDemo() {
  const [mode, setMode] = createSignal<WidthMode>("100%");
  const [margin, setMargin] = createSignal(24);

  const overflows = createMemo(() => mode() === "100%" && margin() > 0);

  return (
    <>
      <div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-6">
        <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            margin-box vs content-box
          </h2>
          <span class="text-xs px-2.5 py-1 rounded-full font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 shrink-0 ml-2">
            interactive
          </span>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed -mt-2">
          Adjust the horizontal margin and compare <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">100%</code> to{" "}
          <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">stretch</code>{" "}
          (the live preview uses the real declaration pair: prefixed fill-available first, then the standard keyword).
        </p>

        <div class="flex flex-col gap-4">
          <div>
            <p class="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">width</p>
            <div class="flex flex-wrap gap-2">
              {MODES.map(({ value, label }) => (
                <button
                  type="button"
                  onClick={() => setMode(value)}
                  class={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                    mode() === value
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              for="stretch-margin"
              class="text-xs font-semibold text-gray-600 dark:text-gray-300 flex justify-between mb-1.5"
            >
              <span>Horizontal margin</span>
              <span class="tabular-nums font-mono">{margin()}px each side</span>
            </label>
            <input
              id="stretch-margin"
              type="range"
              min={0}
              max={48}
              step={4}
              value={margin()}
              onInput={(e) => setMargin(Number(e.currentTarget.value))}
              class="w-full accent-purple-600"
            />
          </div>
        </div>

        <div>
          <p class="text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1.5">
            Result
          </p>
          <div class="relative overflow-x-auto overscroll-x-contain rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900/50 py-3">
            <div
              class="pointer-events-none absolute left-0 top-0 bottom-0 bg-emerald-200/70 dark:bg-emerald-900/50 z-10"
              style={{ width: `${margin()}px` }}
              aria-hidden="true"
            />
            <div
              class="pointer-events-none absolute right-0 top-0 bottom-0 bg-emerald-200/70 dark:bg-emerald-900/50 z-10"
              style={{ width: `${margin()}px` }}
              aria-hidden="true"
            />

            <div
              class="width-stretch-demo-box relative h-12 rounded-md bg-purple-500/85 dark:bg-purple-500 flex items-center justify-center text-white ring-2 ring-white/20 shrink-0 min-w-[3rem]"
              classList={{ "width-stretch-demo-stack": mode() === "stretch" }}
              style={{
                ...(mode() === "100%" ? { width: "100%" } : {}),
                "margin-left": `${margin()}px`,
                "margin-right": `${margin()}px`,
              }}
            >
              <span class="text-[11px] font-mono whitespace-nowrap px-2">content box</span>
            </div>
          </div>

          <p
            class={`mt-2 text-xs text-center ${
              overflows()
                ? "text-red-600 dark:text-red-400"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {overflows()
              ? "Overflows — scroll right to see the clipped end"
              : margin() === 0
                ? "No margin set — both values behave the same here"
                : "Margin box fills the container exactly (no overflow)"}
          </p>
        </div>

        <div class="rounded-lg bg-gray-950 border border-gray-800 p-4 font-mono text-xs leading-6">
          <div class="text-gray-500">.element {"{"}</div>
          {mode() === "100%" ? (
            <div class="pl-4">
              <span class="text-sky-400">width</span>
              <span class="text-gray-300">: </span>
              <span class="text-emerald-400">100%</span>
              <span class="text-gray-300">;</span>
            </div>
          ) : (
            <>
              <div class="pl-4">
                <span class="text-sky-400">width</span>
                <span class="text-gray-300">: </span>
                <span class="text-emerald-400">-webkit-fill-available</span>
                <span class="text-gray-300">;</span>
              </div>
              <div class="pl-4">
                <span class="text-sky-400">width</span>
                <span class="text-gray-300">: </span>
                <span class="text-emerald-400">stretch</span>
                <span class="text-gray-300">;</span>
              </div>
            </>
          )}
          {margin() > 0 && (
            <div class="pl-4">
              <span class="text-sky-400">margin</span>
              <span class="text-gray-300">{": 0 "}</span>
              <span class="text-emerald-400">{margin()}px</span>
              <span class="text-gray-300">;</span>
            </div>
          )}
          <div class="text-gray-500">{"}"}</div>
        </div>
      </div>
      <style>
        {`
          .width-stretch-demo-stack {
            width: -webkit-fill-available;
            width: stretch;
          }
        `}
      </style>
    </>
  );
}
