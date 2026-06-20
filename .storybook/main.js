export default {
  stories: ["../src/**/*.stories.@(js|mjs)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-vitest"],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  staticDirs: [
    {
      from: "../assets",
      to: "/assets",
    },
  ],
};
