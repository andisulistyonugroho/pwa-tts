<script setup lang="ts">
const props = defineProps({
  startFrom: { type: Number, default: 60 }
})
const countdown = ref(props.startFrom)
const theInterval = ref()
const doCount = () => {
  clearInterval(theInterval.value)
  if (countdown.value > 0) {
    theInterval.value = setInterval(() => {
      if (countdown.value <= 0) {
        clearInterval(theInterval.value)
      } else {
        countdown.value--
      }
    }, 1000)
  }
}

doCount()
</script>
<template>
  <v-avatar size="62" :color="countdown < 11 ? 'pink' : 'black'" class="text-h5">
    <span :class="`${countdown > 0 && countdown < 11 ? 'blink-me' : ''}`">
      {{ countdown }}
    </span>
  </v-avatar>
</template>