import type { StorybookConfig } from "@storybook-vue/nuxt";

const config: StorybookConfig = {
  stories: [
    // "../components/**/*.mdx",
    "../app/components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [],
  framework: {
    name: "@storybook-vue/nuxt",
    options: {},
  },
  core: {
    // disableTelemetry: true, // 👈 Disables telemetry
  },
};
export default config;
