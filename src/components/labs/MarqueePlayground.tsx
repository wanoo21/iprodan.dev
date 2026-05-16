import { createEffect, createSignal, onMount, onCleanup, Show } from "solid-js";

type Direction = "left" | "right" | "up" | "down";
type Behavior = "scroll" | "slide" | "alternate";

const DIRECTIONS: { value: Direction; label: string }[] = [
  { value: "left", label: "left" },
  { value: "right", label: "right" },
  { value: "up", label: "up" },
  { value: "down", label: "down" },
];

const BEHAVIORS: { value: Behavior; label: string }[] = [
  { value: "scroll", label: "scroll" },
  { value: "slide", label: "slide" },
  { value: "alternate", label: "alternate" },
];

const SCROLL_AMOUNTS = [2, 4, 6, 10, 14, 20] as const;

const MARQUEE_COPY =
  "★ Welcome to my home page !!!";

const MARQUEE_CLASS =
  "block text-gray-800 dark:text-gray-200 font-mono text-sm py-2 px-1";

export default function MarqueePlayground() {
  const [direction, setDirection] = createSignal<Direction>("left");
  const [behavior, setBehavior] = createSignal<Behavior>("scroll");
  const [scrollamount, setScrollamount] = createSignal<number>(6);
  const [previewHost, setPreviewHost] = createSignal<HTMLDivElement | null>(null);
  const [hydrated, setHydrated] = createSignal(false);
  const [reducedMotion, setReducedMotion] = createSignal(false);

  onMount(() => {
    setHydrated(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    onCleanup(() => mq.removeEventListener("change", onChange));
  });

  /** Strip old `<marquee>` from the host, then append a brand-new one (browser reads attributes at creation). */
  createEffect(() => {
    const host = previewHost();
    if (!host) return;

    const dir = direction();
    const beh = behavior();
    const amt = scrollamount();

    host.replaceChildren();
    const marquee = document.createElement("marquee");
    marquee.setAttribute("direction", dir);
    marquee.setAttribute("behavior", beh);
    marquee.setAttribute("scrollamount", String(amt));
    marquee.className = MARQUEE_CLASS;
    marquee.textContent = MARQUEE_COPY;
    host.appendChild(marquee);

    onCleanup(() => {
      host.replaceChildren();
    });
  });

  return (
    <div
      class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-5"
      aria-label="Interactive marquee demo (legacy HTML element)"
    >
      <div class="border-b border-gray-100 dark:border-gray-700 pb-3">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 m-0">
          Try <code class="text-purple-600 dark:text-purple-300">marquee</code>
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-0 leading-relaxed">
          Obsolete and harsh for some readers. This panel respects{" "}
          <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1 rounded">
            prefers-reduced-motion
          </code>
          . The preview removes the old node from the DOM and inserts a new{" "}
          <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1 rounded">
            marquee
          </code>{" "}
          on every change.
        </p>
      </div>

      <Show when={!hydrated()}>
        <p class="text-sm text-gray-500 dark:text-gray-400 m-0">Loading preview…</p>
      </Show>

      <Show when={hydrated() && reducedMotion()}>
        <div class="rounded-lg bg-gray-100 dark:bg-gray-900/50 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong class="text-gray-800 dark:text-gray-200">Motion reduced.</strong> Your system asks for less animation, so the live{" "}
          <code class="text-purple-600 dark:text-purple-300">marquee</code> preview is hidden. The static example in the code block above still
          shows the markup.
        </div>
      </Show>

      <Show when={hydrated() && !reducedMotion()}>
        <div class="flex flex-col gap-5">
          <div class="flex flex-col sm:flex-row flex-wrap gap-4">
            <label class="flex flex-col gap-1 min-w-[140px]">
              <span class="text-xs font-medium text-gray-600 dark:text-gray-400">direction</span>
              <select
                value={direction()}
                onInput={(e) => setDirection(e.currentTarget.value as Direction)}
                class="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {DIRECTIONS.map((d) => (
                  <option value={d.value}>{d.label}</option>
                ))}
              </select>
            </label>
            <label class="flex flex-col gap-1 min-w-[140px]">
              <span class="text-xs font-medium text-gray-600 dark:text-gray-400">behavior</span>
              <select
                value={behavior()}
                onInput={(e) => setBehavior(e.currentTarget.value as Behavior)}
                class="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {BEHAVIORS.map((b) => (
                  <option value={b.value}>{b.label}</option>
                ))}
              </select>
            </label>
            <label class="flex flex-col gap-1 min-w-[140px]">
              <span class="text-xs font-medium text-gray-600 dark:text-gray-400">scrollamount</span>
              <select
                value={String(scrollamount())}
                onInput={(e) => setScrollamount(Number(e.currentTarget.value))}
                class="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {SCROLL_AMOUNTS.map((n) => (
                  <option value={String(n)}>{n}</option>
                ))}
              </select>
            </label>
          </div>

          <div
            class="rounded-lg bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 overflow-hidden"
            ref={(el) => setPreviewHost(el ?? null)}
          />
        </div>
      </Show>
    </div>
  );
}
