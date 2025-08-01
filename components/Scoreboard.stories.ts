import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Scoreboard from './Scoreboard.vue'

const meta = {
  title: 'Scoreboard',
  component: Scoreboard
} satisfies Meta<typeof Scoreboard>

export default meta
type Story = StoryObj<typeof meta>

export const TheScoreboard: Story = {
  args: {},
}