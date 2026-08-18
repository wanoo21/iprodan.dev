import { For, createSignal } from "solid-js";

const PINS = [
  ["1", "Ceramic glaze", "3 / 4", "#c45c26"],
  ["2", "Trail hut", "1 / 1", "#3d5a45"],
  ["3", "Night market", "4 / 5", "#1f2937"],
  ["4", "Linen chair", "2 / 3", "#b08968"],
  ["5", "Studio light", "1 / 1", "#7c3aed"],
  ["6", "Coast path", "3 / 5", "#0e7490"],
  ["7", "Ramen bowl", "5 / 4", "#b45309"],
  ["8", "Window plant", "4 / 3", "#365314"],
  ["9", "Film still", "9 / 16", "#44403c"],
  ["10", "Tile sample", "1 / 1", "#be123c"],
  ["11", "Desk setup", "16 / 9", "#1e3a5f"],
  ["12", "Wool throw", "3 / 4", "#9a3412"],
];

export default function GridLanesDemo() {
  const [mode, setMode] = createSignal("columns");

  return (
    <>
      <div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-6">
        <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Pinterest board
          </h2>
          <span class="text-xs px-2.5 py-1 rounded-full font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 shrink-0 ml-2">
            interactive
          </span>
        </div>

        <p class="grid-lanes-unsupported-alert text-sm text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/40 border border-rose-200 dark:border-rose-700 rounded-lg px-3 py-2">
          This browser has no <code class="font-mono">grid-lanes</code>. You’re seeing the <code class="font-mono">columns:</code> fallback. Try Safari 26.4+.
        </p>

        <div class="grid-lanes-demo-toggle flex flex-wrap gap-2">
          {["columns", "grid-lanes"].map((value) => (
            <button
              type="button"
              onClick={() => setMode(value)}
              class={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer ${
                mode() === value
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <div class="p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
          <div
            class={mode() === "columns" ? "grid-lanes-demo-columns" : "grid-lanes-demo-lanes"}
          >
            <For each={PINS}>
              {([n, title, ratio, color]) => (
                <article>
                  <div
                    class="relative w-full overflow-hidden rounded-2xl"
                    style={{ "aspect-ratio": ratio, background: color }}
                  >
                    <span class="absolute top-2 left-2 text-[11px] font-mono font-semibold text-white/90 bg-black/35 rounded-md px-1.5 py-0.5">
                      {n}
                    </span>
                  </div>
                  <p class="mt-2 px-1 text-sm font-medium text-gray-800 dark:text-gray-100">
                    {title}
                  </p>
                </article>
              )}
            </For>
          </div>
        </div>

        <div class="rounded-lg bg-gray-950 border border-gray-800 p-4 font-mono text-xs leading-6 overflow-x-auto">
          {mode() === "columns" ? (
            <>
              <div class="text-gray-500">.blog {"{"}</div>
              <div class="pl-4">
                <span class="text-sky-400">columns</span>
                <span class="text-gray-300">: </span>
                <span class="text-emerald-400">180px</span>
                <span class="text-gray-300">;</span>
              </div>
              <div class="pl-4">
                <span class="text-sky-400">gap</span>
                <span class="text-gray-300">: </span>
                <span class="text-emerald-400">1rem</span>
                <span class="text-gray-300">;</span>
              </div>
              <div class="text-gray-500">{"}"}</div>
              <div class="text-gray-500 mt-2">.blog &gt; * {"{"}</div>
              <div class="pl-4">
                <span class="text-sky-400">break-inside</span>
                <span class="text-gray-300">: </span>
                <span class="text-emerald-400">avoid</span>
                <span class="text-gray-300">;</span>
              </div>
              <div class="text-gray-500">{"}"}</div>
            </>
          ) : (
            <>
              <div class="text-gray-500">.blog {"{"}</div>
              <div class="pl-4">
                <span class="text-sky-400">display</span>
                <span class="text-gray-300">: </span>
                <span class="text-emerald-400">grid-lanes</span>
                <span class="text-gray-300">;</span>
              </div>
              <div class="pl-4">
                <span class="text-sky-400">grid-template-columns</span>
                <span class="text-gray-300">: </span>
                <span class="text-emerald-400">repeat(auto-fill, minmax(180px, 1fr))</span>
                <span class="text-gray-300">;</span>
              </div>
              <div class="pl-4">
                <span class="text-sky-400">gap</span>
                <span class="text-gray-300">: </span>
                <span class="text-emerald-400">1rem</span>
                <span class="text-gray-300">;</span>
              </div>
              <div class="text-gray-500">{"}"}</div>
            </>
          )}
        </div>
      </div>
      <style>
        {`
          .grid-lanes-demo-columns {
            columns: 180px;
            gap: 1rem;
          }
          .grid-lanes-demo-columns > * {
            break-inside: avoid;
            margin-bottom: 1rem;
          }
          .grid-lanes-demo-lanes {
            display: grid-lanes;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1rem;
          }
          @supports not (display: grid-lanes) {
            .grid-lanes-demo-toggle {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
}
