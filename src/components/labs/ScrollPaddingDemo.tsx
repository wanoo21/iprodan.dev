import { For, createSignal } from "solid-js";

/** Height of the simulated fixed header (overlay) on both panes — “real” chrome height. */
const HEADER_PX = 48;

const SECTION_KEYS = ["a", "b", "c", "d"] as const;
type SectionKey = (typeof SECTION_KEYS)[number];

const SECTION_LABELS: Record<SectionKey, string> = {
  a: "Section A",
  b: "Section B",
  c: "Section C",
  d: "Section D",
};

const PADDING_MAX = 72;

/** Mirrors `block: "start"` + `scroll-padding-top` on this container only — does not scroll ancestor scrollports or the document. */
function scrollPaneToSection(
  container: HTMLDivElement | undefined,
  section: HTMLElement | null,
  scrollPaddingTop: number,
  behavior: ScrollBehavior,
) {
  if (!container || !section) return;
  const c = container.getBoundingClientRect();
  const s = section.getBoundingClientRect();
  const relativeTop = s.top - c.top + container.scrollTop;
  const rawTop = relativeTop - scrollPaddingTop;
  const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
  const top = Math.min(Math.max(0, rawTop), maxScroll);
  container.scrollTo({ top, behavior });
}

export default function ScrollPaddingDemo() {
  const [smoothScroll, setSmoothScroll] = createSignal(false);
  /** Right pane only: scroll-padding-top; left pane is always 0. */
  const [padTopPx, setPadTopPx] = createSignal(HEADER_PX);

  let nopadScrollEl: HTMLDivElement | undefined;
  let padScrollEl: HTMLDivElement | undefined;

  const scrollBothTo = (key: SectionKey) => {
    const behavior: ScrollBehavior = smoothScroll() ? "smooth" : "auto";
    const pad = padTopPx();
    scrollPaneToSection(nopadScrollEl, document.getElementById(`sp-nopad-${key}`), 0, behavior);
    scrollPaneToSection(padScrollEl, document.getElementById(`sp-pad-${key}`), pad, behavior);
  };

  const pane = (side: "nopad" | "pad") => {
    const pad = () => (side === "nopad" ? 0 : padTopPx());
    const title = () =>
      side === "nopad" ? (
        <>
          No <code class="text-purple-600 dark:text-purple-300">scroll-padding</code>
        </>
      ) : (
        <>
          With{" "}
          <code class="text-purple-600 dark:text-purple-300">scroll-padding-top</code> (right)
        </>
      );

    const calloutClass =
      side === "nopad"
        ? "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800"
        : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800";

    const calloutText =
      side === "nopad"
        ? "After a jump: heading aligns to the scrollport top — under the bar. (Section A’s title is hidden on purpose here; body text may still peek below.)"
        : "After a jump: heading lines up at the violet mark — readable below the bar when slider ≥ header height.";

    return (
      <div class="flex flex-col gap-2 min-w-0">
        <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">{title()}</p>
        <p class={`text-[11px] font-medium leading-snug px-2.5 py-1.5 rounded-lg border ${calloutClass}`}>{calloutText}</p>
        <div class="relative rounded-xl border-2 border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-900/50">
          <div
            class="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center px-3 border-b border-white/10 text-[11px] font-medium text-white bg-neutral-900/90 dark:bg-neutral-950/95"
            style={{ height: `${HEADER_PX}px` }}
            aria-hidden="true"
          >
            Fixed header ({HEADER_PX}px)
          </div>

          {/* Left: where reading starts below chrome; block-start still uses y=0 of the scrollport (under the bar). */}
          {side === "nopad" ? (
            <div
              class="pointer-events-none absolute left-0 right-0 z-[15] border-t border-dashed border-amber-500/90 dark:border-amber-400/90"
              style={{ top: `${HEADER_PX}px` }}
              aria-hidden="true"
              title="Eye line below fixed chrome"
            />
          ) : null}

          {/* Right: where block-start lands given scroll-padding-top (matches slider). */}
          {side === "pad" && pad() > 0 ? (
            <div
              class="pointer-events-none absolute left-0 right-0 z-[15] h-px bg-violet-500 shadow-[0_0_0_1px_rgba(139,92,246,0.35)] dark:bg-violet-400"
              style={{ top: `${pad()}px` }}
              aria-hidden="true"
            />
          ) : null}

          <div
            class="overflow-y-auto h-[280px]"
            ref={(el) => {
              if (side === "nopad") {
                nopadScrollEl = el ?? undefined;
              } else {
                padScrollEl = el ?? undefined;
              }
            }}
            style={{ scrollPaddingTop: `${pad()}px` }}
            aria-label={
              side === "nopad"
                ? "Demo: scroll area without scroll-padding (only this box scrolls)"
                : "Demo: scroll area with scroll-padding-top (only this box scrolls)"
            }
            tabindex="0"
          >
            {/* Spacer = scroll-padding-top so the first section can reach the inset (else scroll clamps at 0). */}
            {side === "pad" ? (
              <div class="shrink-0" style={{ height: `${pad()}px` }} aria-hidden="true" />
            ) : null}
            <For each={SECTION_KEYS}>
              {(key) => (
                <section
                  id={`sp-${side}-${key}`}
                  class="min-h-[9rem] px-4 py-5 border-b border-gray-200/80 dark:border-gray-700/80 last:border-b-0 scroll-mt-0"
                >
                  <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {SECTION_LABELS[key]}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Same content in both columns. The dark bar only paints over this viewport — it is not in the layout
                    flow, like site-wide sticky navigation.
                  </p>
                </section>
              )}
            </For>
          </div>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
          {side === "nopad" ? (
            <>
              <code class="text-purple-600 dark:text-purple-300">scroll-padding-top: 0</code> — the scrollport’s logical
              top is flush with the content; a jump aligns the section’s start there, so the heading tucks under the
              overlay.
            </>
          ) : (
            <>
              <code class="text-purple-600 dark:text-purple-300">scroll-padding-top: {padTopPx()}px</code> — the
              scrollport’s logical top is inset (violet line). Jumps use the same geometry browsers apply for hash
              navigation and <code class="text-purple-600 dark:text-purple-300">scrollIntoView(&#123; block: &quot;start&quot; &#125;)</code>, but here they are scoped to{" "}
              <strong class="text-gray-700 dark:text-gray-200">this pane only</strong> so the rest of the page does not
              move.
            </>
          )}
        </p>
      </div>
    );
  };

  return (
    <div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-5 max-w-5xl mx-auto">
      <div class="flex flex-col gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Compare scroll padding side by side</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Two identical in-page scroll boxes (only these boxes scroll — not the lab page). Same fixed header overlay.
          Only the right box sets{" "}
          <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">
            scroll-padding-top
          </code>
          . Use the buttons to jump both columns to the same section and compare where the title ends up relative to the
          bar.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 px-4 py-3">
        <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer select-none">
          <input
            type="checkbox"
            class="rounded border-gray-300 dark:border-gray-600 text-violet-600 focus:ring-violet-500"
            checked={smoothScroll()}
            onChange={(e) => setSmoothScroll(e.currentTarget.checked)}
          />
          Smooth jump (off = instant, easiest to compare)
        </label>
        <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:ml-auto min-w-[min(100%,16rem)] flex-1">
          <label class="text-xs font-medium text-gray-600 dark:text-gray-300 shrink-0" for="scroll-padding-top-slider">
            Right pane <code class="text-purple-600 dark:text-purple-300">scroll-padding-top</code>
          </label>
          <input
            id="scroll-padding-top-slider"
            type="range"
            min="0"
            max={PADDING_MAX}
            step="1"
            value={padTopPx()}
            onInput={(e) => setPadTopPx(Number(e.currentTarget.value))}
            class="w-full accent-violet-600 h-2 cursor-pointer"
            aria-valuemin={0}
            aria-valuemax={PADDING_MAX}
            aria-valuenow={padTopPx()}
            aria-label="Adjust scroll-padding-top in pixels for the right pane only"
          />
          <span class="text-xs tabular-nums font-semibold text-violet-700 dark:text-violet-300 w-10 text-right shrink-0">
            {padTopPx()}px
          </span>
        </div>
      </div>

      <div class="flex flex-wrap gap-2" role="group" aria-label="Jump both panes to a section">
        <For each={SECTION_KEYS}>
          {(key) => (
            <button
              type="button"
              class="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/80 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              onClick={() => scrollBothTo(key)}
            >
              Jump both to {SECTION_LABELS[key]}
            </button>
          )}
        </For>
      </div>

      <div class="grid md:grid-cols-2 gap-6 items-start" aria-label="Side-by-side scroll-padding comparison">
        {pane("nopad")}
        {pane("pad")}
      </div>

      <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
        Tip: set the slider to <strong class="font-medium text-gray-700 dark:text-gray-200">{HEADER_PX}px</strong> to
        match this <strong class="font-medium text-gray-700 dark:text-gray-200">{HEADER_PX}px</strong> header. On a
        real document you might use{" "}
        <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1 py-0.5 rounded">
          html &#123; scroll-padding-top: var(--header-height); &#125;
        </code>{" "}
        so the <em>viewport</em> scroll aligns targets below global navigation.
      </p>
    </div>
  );
}
