import { button } from "../components/button.js";
import { renderHtml } from "./render.js";

function buttonStory(options, surface = "light") {
  const surfaceClass = surface === "dark" ? "bg-[#17212b]" : "bg-white";

  return renderHtml(
    `<div class="flex min-h-[260px] items-center justify-center ${surfaceClass} p-10">
      ${button(options)}
    </div>`,
    { init: false },
  );
}

export default {
  title: "Groov/Components/Button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Reusable Groov button template. All size tokens currently share the same anatomy: h-10 px-6 text-sm.",
      },
    },
  },
  render: () => buttonStory({ label: "Get the App" }),
};

export const PrimaryDefault = {
  name: "Primary (default)",
};

export const Secondary = {
  render: () => buttonStory({ label: "Take our quiz", variant: "secondary" }, "dark"),
};

export const Tertiary = {
  render: () => buttonStory({ label: "Learn more", variant: "tertiary" }),
};

export const Text = {
  render: () => buttonStory({ label: "Contact us", variant: "text" }),
};

export const TextUnderline = {
  name: "Text Underline",
  render: () => buttonStory({ label: "Read the story", variant: "textUnderline" }),
};

export const Small = {
  render: () => buttonStory({ label: "Small", size: "sm" }),
};

export const Medium = {
  render: () => buttonStory({ label: "Medium", size: "md" }),
};

export const Large = {
  render: () => buttonStory({ label: "Large", size: "lg" }),
};

export const Responsive = {
  render: () =>
    renderHtml(
      `<div class="flex min-h-[260px] items-center justify-center bg-white p-6">
        <div class="flex w-full max-w-[720px] flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          ${button({ label: "Get the App", className: "w-full sm:w-auto" })}
          ${button({ label: "Take our quiz", variant: "secondary", className: "w-full sm:w-auto" })}
          ${button({ label: "Learn more", variant: "tertiary", className: "w-full sm:w-auto" })}
        </div>
      </div>`,
      { init: false },
    ),
};
