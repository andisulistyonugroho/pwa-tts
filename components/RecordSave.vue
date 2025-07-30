<script setup lang="ts">
const props = defineProps({
  dialog: { type: Boolean, default: false },
  point: { type: Number, default: 0 }
})
const { $debounce } = useNuxtApp()

const emit = defineEmits(['closeit'])
const { DoSaveRecord } = useRankinStore()

const form = ref()
const username = ref('')

const doSave = $debounce(async () => {
  try {
    await DoSaveRecord()
  } catch (error) {
    alert(error)
  }
}, 1000, { leading: true, trailing: false })
</script>
<template>
  <v-dialog v-model="props.dialog" persistent max-width="300">
    <v-card>
      <v-card-title>Rekor kamu</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field readonly label="Poin" v-model="props.point" />
          <v-text-field label="Nama pemain" v-model="username" :rules="[(v: any) => !!v || 'Harus diisi']" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="emit('closeit')">tutup</v-btn>
        <v-btn @click="doSave()">simpan</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>