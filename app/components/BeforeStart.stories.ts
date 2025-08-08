import type { Meta, StoryObj } from "@nuxtjs/storybook";
import BeforeStart from "./BeforeStart.vue";

const meta = {
  title: "BeforeStart",
  component: BeforeStart,
} satisfies Meta<typeof BeforeStart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TheBeforeStart: Story = {
  args: {},
};
