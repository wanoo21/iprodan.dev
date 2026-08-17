import { For, createSignal } from "solid-js";

const PRESETS = ["#1a1a2e", "#660066", "#2277d3", "#0f766e", "#f5d76e", "#fafafa"];
const TRAP = "#2277d3";

export default function ContrastColorDemo() {
  const [brand, setBrand] = createSignal("#660066");

  return (
    <>
      <div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-6">
        <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Pick a brand color
          </h2>
          <span class="text-xs px-2.5 py-1 rounded-full font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 shrink-0 ml-2">
            interactive
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <input
            type="color"
            value={brand()}
            onInput={(e) => setBrand(e.currentTarget.value)}
            class="h-9 w-12 cursor-pointer rounded border border-gray-200 dark:border-gray-600 bg-transparent p-0.5"
            aria-label="Brand color"
          />
          <div class="flex flex-wrap gap-2" role="group" aria-label="Preset brand colors">
            <For each={PRESETS}>
              {(hex) => (
                <button
                  type="button"
                  onClick={() => setBrand(hex)}
                  class={`h-9 w-9 rounded-lg border-2 cursor-pointer ${
                    brand() === hex
                      ? "border-purple-600 ring-2 ring-purple-400/50"
                      : "border-white dark:border-gray-700"
                  }`}
                  style={{ background: hex }}
                  aria-label={hex}
                  aria-pressed={brand() === hex}
                />
              )}
            </For>
          </div>
          <span class="font-mono text-xs text-gray-500 dark:text-gray-400 tabular-nums">{brand()}</span>
        </div>

        <div>
          <div
            class="contrast-color-demo-card rounded-xl px-6 py-10 text-center"
            style={{ "--brand": brand() }}
          >
            <p class="text-2xl font-bold">Save changes</p>
            <p class="mt-1 font-mono text-sm opacity-80">{brand()}</p>
          </div>
          {brand().toLowerCase() === TRAP && (
            <p class="mt-2 text-xs text-center text-amber-700 dark:text-amber-300">
              Mid-tone: black wins, small text can still fail.
            </p>
          )}
        </div>

        <div class="rounded-lg bg-gray-950 border border-gray-800 p-4 font-mono text-xs leading-6">
          <div class="text-gray-500">.card {"{"}</div>
          <div class="pl-4">
            <span class="text-sky-400">--brand</span>
            <span class="text-gray-300">: </span>
            <span class="text-emerald-400">{brand()}</span>
            <span class="text-gray-300">;</span>
          </div>
          <div class="pl-4">
            <span class="text-sky-400">background</span>
            <span class="text-gray-300">: </span>
            <span class="text-emerald-400">var(--brand)</span>
            <span class="text-gray-300">;</span>
          </div>
          <div class="pl-4">
            <span class="text-sky-400">color</span>
            <span class="text-gray-300">: </span>
            <span class="text-emerald-400">contrast-color(var(--brand))</span>
            <span class="text-gray-300">;</span>
          </div>
          <div class="text-gray-500">{"}"}</div>
        </div>
      </div>
      <style>
        {`
          .contrast-color-demo-card {
            background: var(--brand);
            color: #fff;
            color: contrast-color(var(--brand));
          }
        `}
      </style>
    </>
  );
}
