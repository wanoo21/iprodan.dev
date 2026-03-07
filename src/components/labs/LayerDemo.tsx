interface LayerDemoProps {
  useLayers?: boolean;
}

export default function LayerDemo(props: LayerDemoProps) {
  const useLayers = () => props.useLayers ?? false;

  return (
    <div
      class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-6"
      classList={{ "layer-demo-with-layers": useLayers(), "layer-demo-with-important": !useLayers() }}
    >
      <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {useLayers() ? "With @layer" : "With !important"}
        </h2>
        <span
          class="text-xs px-2.5 py-1 rounded-full font-medium"
          classList={{
            "bg-emerald-100": useLayers(),
            "text-emerald-800": useLayers(),
            "dark:bg-emerald-900/60": useLayers(),
            "dark:text-emerald-200": useLayers(),
            "bg-rose-100": !useLayers(),
            "text-rose-800": !useLayers(),
            "dark:bg-rose-900/60": !useLayers(),
            "dark:text-rose-200": !useLayers(),
          }}
        >
          {useLayers() ? "Maintainable" : "Override war"}
        </span>
      </div>

      <div class="space-y-4">
        {useLayers() ? (
          <>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Layer order controls precedence. Rules in later layers win over earlier ones—regardless of selector specificity. No <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">!important</code> needed.
            </p>
            <div class="layer-demo-card layer-demo-card--danger">
              .card.card--danger
            </div>
            <div class="bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-gray-200 p-3 rounded-lg font-mono text-xs overflow-x-auto">
              <pre>
                <code>{`@layer base, overrides;

@layer base {
  .card {
    background: #e0e7ff;
    padding: 1rem;
  }
}

@layer overrides {
  .card--danger {
    background: #fecaca;
  }
}`}</code>
              </pre>
            </div>
          </>
        ) : (
          <>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              To override a style that uses <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">!important</code>, you need another <code class="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded">!important</code>. This leads to specificity escalation and hard-to-maintain CSS.
            </p>
            <div class="layer-demo-card-important layer-demo-card-important--danger">
              .card.card--danger
            </div>
            <div class="bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-gray-200 p-3 rounded-lg font-mono text-xs overflow-x-auto">
              <pre>
                <code>{`/* Escalation begins */
.card {
  background: #e0e7ff !important;
}

.card--danger {
  background: #fecaca !important;
}`}</code>
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
