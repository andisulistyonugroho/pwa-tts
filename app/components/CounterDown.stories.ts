import type { Meta, StoryObj } from "@nuxtjs/storybook";
import CounterDown from "./CounterDown.vue";

const meta = {
  title: "CounterDown",
  component: CounterDown,
} satisfies Meta<typeof CounterDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CountDown: Story = {
  args: {},
};
