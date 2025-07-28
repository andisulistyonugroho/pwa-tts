import type { Meta, StoryObj } from '@nuxtjs/storybook'
import AnswerDialog from './AnswerDialog.vue'

const meta = {
  title: 'AnswerDialog',
  component: AnswerDialog
} satisfies Meta<typeof AnswerDialog>

export default meta
type Story = StoryObj<typeof meta>

export const TheAnswerDialog: Story = {
  args: {},
}