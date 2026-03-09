import { createSignal } from "solid-js";

type DemoVariant = "justify-content" | "justify-items" | "align-items" | "align-content";

interface FlexboxAlignDemoProps {
  variant: DemoVariant;
}

const JUSTIFY_OPTIONS = [
  { value: "flex-start", label: "flex-start" },
  { value: "center", label: "center" },
  { value: "flex-end", label: "flex-end" },
  { value: "space-between", label: "space-between" },
  { value: "space-around", label: "space-around" },
] as const;

const JUSTIFY_ITEMS_OPTIONS = [
  { value: "stretch", label: "stretch" },
  { value: "start", label: "start" },
  { value: "center", label: "center" },
  { value: "end", label: "end" },
] as const;

const ALIGN_ITEMS_OPTIONS = [
  { value: "stretch", label: "stretch" },
  { value: "flex-start", label: "flex-start" },
  { value: "center", label: "center" },
  { value: "flex-end", label: "flex-end" },
] as const;

const ALIGN_CONTENT_OPTIONS = [
  { value: "flex-start", label: "flex-start" },
  { value: "center", label: "center" },
  { value: "flex-end", label: "flex-end" },
  { value: "space-between", label: "space-between" },
  { value: "space-around", label: "space-around" },
] as const;

export default function FlexboxAlignDemo(props: FlexboxAlignDemoProps) {
  const variant = () => props.variant;
  const [justifyValue, setJustifyValue] = createSignal("space-between");
  const [justifyItemsValue, setJustifyItemsValue] = createSignal("center");
  const [alignItemsValue, setAlignItemsValue] = createSignal("center");
  const [alignContentValue, setAlignContentValue] = createSignal("space-between");

  return (
    <div class="h-full border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-6">
      <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {variant() === "justify-content" && "justify-content"}
          {variant() === "justify-items" && "justify-items"}
          {variant() === "align-items" && "align-items"}
          {variant() === "align-content" && "align-content"}
        </h2>
        <span
          class="text-xs px-2.5 py-1 rounded-full font-medium"
          classList={{
            "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200":
              variant() === "justify-content" || variant() === "justify-items",
            "bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200":
              variant() === "align-items" || variant() === "align-content",
          }}
        >
          {variant() === "justify-content" || variant() === "justify-items" ? "Main axis" : "Cross axis"}
        </span>
      </div>

      <div class="space-y-4 flex flex-col h-full">
        {variant() === "justify-content" && (
          <>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong>*-content</strong>: distributes extra space along the main axis. Choose a value to see how space is used.
            </p>
            <select 
              value={justifyValue()}
              onChange={(e) => setJustifyValue(e.currentTarget.value)}
              class="mt-auto text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {JUSTIFY_OPTIONS.map((opt) => (
                <option value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div
              class="flexbox-align-demo-container flex gap-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 min-h-[80px]"
              style={{ "justify-content": justifyValue() }}
            >
              <div class="flexbox-align-demo-item w-12 h-10 rounded bg-blue-500/80 dark:bg-blue-500" />
              <div class="flexbox-align-demo-item w-12 h-10 rounded bg-purple-500/80 dark:bg-purple-500" />
              <div class="flexbox-align-demo-item w-12 h-10 rounded bg-amber-500/80 dark:bg-amber-500" />
            </div>
          </>
        )}

        {variant() === "justify-items" && (
          <>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong>*-items</strong>: aligns each item along the main axis within its grid cell. Uses <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">display: grid</code> (Flexbox doesn't have justify-items).
            </p>
            <select
              value={justifyItemsValue()}
              onChange={(e) => setJustifyItemsValue(e.currentTarget.value)}
              class="mt-auto text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {JUSTIFY_ITEMS_OPTIONS.map((opt) => (
                <option value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div
              class="grid grid-cols-3 gap-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 min-h-[100px]"
              style={{ "justify-items": justifyItemsValue() }}
            >
              <div class="w-10 h-10 rounded bg-blue-500/80 dark:bg-blue-500" />
              <div class="w-10 h-10 rounded bg-purple-500/80 dark:bg-purple-500" />
              <div class="w-10 h-10 rounded bg-amber-500/80 dark:bg-amber-500" />
            </div>
          </>
        )}

        {variant() === "align-items" && (
          <>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong>*-items</strong>: aligns each item within its line along the cross axis. Items have different heights to show the effect.
            </p>
            <select
              value={alignItemsValue()}
              onChange={(e) => setAlignItemsValue(e.currentTarget.value)}
              class="mt-auto text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {ALIGN_ITEMS_OPTIONS.map((opt) => (
                <option value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div
              class="flexbox-align-demo-container flex gap-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 min-h-[100px]"
              style={{ "align-items": alignItemsValue() }}
            >
              <div class="flexbox-align-demo-item w-12 h-8 rounded bg-blue-500/80 dark:bg-blue-500" />
              <div class="flexbox-align-demo-item w-12 h-14 rounded bg-purple-500/80 dark:bg-purple-500" />
              <div class="flexbox-align-demo-item w-12 h-6 rounded bg-amber-500/80 dark:bg-amber-500" />
            </div>
          </>
        )}

        {variant() === "align-content" && (
          <>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong>*-content</strong>: distributes extra space between lines along the cross axis. Only applies when there are multiple lines (flex-wrap).
            </p>
            <select
              value={alignContentValue()}
              onChange={(e) => setAlignContentValue(e.currentTarget.value)}
              class="mt-auto text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {ALIGN_CONTENT_OPTIONS.map((opt) => (
                <option value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div
              class="flexbox-align-demo-container flex flex-wrap gap-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 h-[140px] w-full"
              style={{
                "align-content": alignContentValue(),
                "flex-direction": "row",
              }}
            >
              <div class="flexbox-align-demo-item w-14 h-8 rounded bg-blue-500/80 dark:bg-blue-500" />
              <div class="flexbox-align-demo-item w-14 h-8 rounded bg-purple-500/80 dark:bg-purple-500" />
              <div class="flexbox-align-demo-item w-14 h-8 rounded bg-amber-500/80 dark:bg-amber-500" />
              <div class="flexbox-align-demo-item w-14 h-8 rounded bg-emerald-500/80 dark:bg-emerald-500" />
              <div class="flexbox-align-demo-item w-14 h-8 rounded bg-rose-500/80 dark:bg-rose-500" />
              <div class="flexbox-align-demo-item w-14 h-8 rounded bg-cyan-500/80 dark:bg-cyan-500" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
