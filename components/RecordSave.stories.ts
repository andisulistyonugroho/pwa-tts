import type { Meta, StoryObj } from '@nuxtjs/storybook'
import RecordSave from './RecordSave.vue'

const meta = {
  title: 'RecordSave',
  component: RecordSave
} satisfies Meta<typeof RecordSave>

export default meta
type Story = StoryObj<typeof meta>

export const TheRecordSave: Story = {
  args: {},
}