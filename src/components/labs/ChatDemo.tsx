import { createSignal } from "solid-js";

interface ChatDemoProps {
  useInterpolateSize?: boolean;
}

export default function ChatDemo(props: ChatDemoProps) {
  const useInterpolateSize = () => props.useInterpolateSize ?? false;
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-6"
        classList={{ "chat-demo-interpolate-size": useInterpolateSize() }}
      >
        <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {useInterpolateSize()
              ? "With interpolate-size"
              : "Without interpolate-size"}
          </h2>
          <span
            class="text-xs px-2.5 py-1 rounded-full font-medium"
            classList={{
              "bg-emerald-100": useInterpolateSize(),
              "text-emerald-800": useInterpolateSize(),
              "dark:bg-emerald-900/60": useInterpolateSize(),
              "dark:text-emerald-200": useInterpolateSize(),
              "bg-rose-100": !useInterpolateSize(),
              "text-rose-800": !useInterpolateSize(),
              "dark:bg-rose-900/60": !useInterpolateSize(),
              "dark:text-rose-200": !useInterpolateSize(),
            }}
          >
            {useInterpolateSize() ? "Smooth" : "Snaps"}
          </span>
        </div>

        {/* User Message */}
        <div class="flex gap-3 items-start">
          <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center shrink-0 mt-1">
            <span class="text-blue-600 dark:text-blue-200 font-medium text-sm">U</span>
          </div>
          <div class="bg-blue-50 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">
            {useInterpolateSize() ? (
              <>
                How can I smoothly animate to <code>height: auto</code> in modern CSS?
              </>
            ) : (
              <>
                Why does my height animation snap when animating to <code>auto</code>?
              </>
            )}
          </div>
        </div>

        {/* AI Message */}
        <div class="flex gap-3 items-start">
          <div class="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center shrink-0 mt-1">
            <span class="text-purple-600 dark:text-purple-200 font-medium text-sm">AI</span>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              class="self-start text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100 dark:bg-purple-900/50 dark:text-purple-200 dark:hover:bg-purple-800/60 dark:border-purple-700 px-4 py-2 rounded-full transition-colors font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-purple-400"
            >
              {isOpen() ? "Hide Response" : "Show Response"}
            </button>

            <div
              class="chat-demo-message-container bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-none text-sm border border-gray-100 dark:border-gray-600"
              classList={{ open: isOpen() }}
            >
              <div class="p-4 space-y-3">
                {useInterpolateSize() ? (
                  <>
                    <p>
                      You can now use the <code>interpolate-size</code> CSS property! By setting it to <code>allow-keywords</code> on the root, you enable smooth animations and transitions to and from intrinsic sizing keywords like <code>auto</code>, <code>min-content</code>, and <code>max-content</code>.
                    </p>
                    <div class="bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-gray-200 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                      <pre>
                        <code>{`:root {
  interpolate-size: allow-keywords;
}

.element {
  height: 0;
  transition: height 0.5s ease;
}

.element.open {
  height: auto;
}`}</code>
                      </pre>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      Historically, browsers couldn't interpolate between a fixed length (like <code>0px</code>) and an intrinsic size keyword (like <code>auto</code> or <code>max-content</code>).
                    </p>
                    <p>
                      Because of this, any transition to <code>height: auto</code> instantly snaps to the final size instead of smoothly animating.
                    </p>
                    <div class="bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-gray-200 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                      <pre>
                        <code>{`/* The Old Way */
.element {
  height: 0;
  transition: height 0.5s ease;
}

.element.open {
  height: auto; /* Snaps! */
}`}</code>
                      </pre>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
