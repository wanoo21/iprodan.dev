import { createSignal } from "solid-js";

// Migrated from src/pages/interpolate-size/migrate-from.tsx (Angular)

interface ChatDemoProps {
  useInterpolateSize?: boolean;
}

export default function ChatDemo(props: ChatDemoProps) {
  const useInterpolateSize = () => props.useInterpolateSize ?? false;
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <style>
        {`.chat-demo-interpolate-size {
  interpolate-size: allow-keywords;
}

.chat-demo-message-container {
  height: 0;
  overflow: hidden;
  transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-demo-message-container.open {
  height: auto;
}`}
      </style>
      <div
        class="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm flex flex-col gap-6"
        classList={{ "chat-demo-interpolate-size": useInterpolateSize() }}
      >
        <div class="flex justify-between items-center border-b border-gray-100 pb-3">
          <h2 class="text-lg font-semibold text-gray-800">
            {useInterpolateSize()
              ? "With interpolate-size"
              : "Without interpolate-size"}
          </h2>
          <span
            class="text-xs px-2.5 py-1 rounded-full font-medium"
            classList={{
              "bg-emerald-100": useInterpolateSize(),
              "text-emerald-800": useInterpolateSize(),
              "bg-rose-100": !useInterpolateSize(),
              "text-rose-800": !useInterpolateSize(),
            }}
          >
            {useInterpolateSize() ? "Smooth" : "Snaps"}
          </span>
        </div>

        {/* User Message */}
        <div class="flex gap-3 items-start">
          <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
            <span class="text-blue-600 font-medium text-sm">U</span>
          </div>
          <div class="bg-blue-50 text-blue-900 px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">
            Can you explain how the new CSS <code>interpolate-size</code>{" "}
            property works?
          </div>
        </div>

        {/* AI Message */}
        <div class="flex gap-3 items-start">
          <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1">
            <span class="text-purple-600 font-medium text-sm">AI</span>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              class="self-start text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100 px-4 py-2 rounded-full transition-colors font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {isOpen() ? "Hide Response" : "Show Response"}
            </button>

            <div
              class="chat-demo-message-container bg-gray-50 text-gray-800 rounded-2xl rounded-tl-none text-sm border border-gray-100"
              classList={{ open: isOpen() }}
            >
              <div class="p-4 space-y-3">
                <p>
                  The <code>interpolate-size</code> CSS property allows
                  animations and transitions to and from intrinsic sizing
                  keywords like <code>auto</code>, <code>min-content</code>, and{" "}
                  <code>max-content</code>.
                </p>
                <p>
                  Previously, animating from <code>height: 0</code> to{" "}
                  <code>height: auto</code> would instantly snap to the final
                  size because browsers couldn't interpolate between a length and
                  a keyword.
                </p>
                <div class="bg-gray-800 text-gray-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
