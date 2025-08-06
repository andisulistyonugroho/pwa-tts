import type { Meta, StoryObj } from "@nuxtjs/storybook";
import TimesUp from "./TimesUp.vue";

const meta = {
  title: "TimesUp",
  component: TimesUp,
} satisfies Meta<typeof TimesUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TheTimesUp: Story = {
  args: {},
};
