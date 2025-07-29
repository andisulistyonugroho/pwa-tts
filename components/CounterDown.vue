<script setup lang="ts">
const emit = defineEmits(['timesup'])
const countdown = ref(0)
const theInterval = ref()

const doCount = () => {
  clearInterval(theInterval.value)
  countdown.value = 10
  if (countdown.value > 0) {
    theInterval.value = setInterval(() => {
      if (countdown.value <= 0) {
        clearInterval(theInterval.value)
        emit('timesup')
      } else {
        countdown.value--
      }
    }, 1000)
  }
}

const pauseCount = () => {
  clearInterval(theInterval.value)
}

const resumeCount = () => {
  theInterval.value = setInterval(() => {
    if (countdown.value <= 0) {
      clearInterval(theInterval.value)
    } else {
      countdown.value--
    }
  }, 1000)
}

const addTime = () => {
  countdown.value += 10
}

defineExpose({
  doCount, pauseCount, resumeCount, addTime
})

doCount()  
</script>
<template>
  <v-avatar size="62" :color="countdown < 11 ? 'pink' : 'black'" class="text-h5">
    <span :class="`${countdown > 0 && countdown < 11 ? 'blink-me' : ''}`">
      {{ countdown }}
    </span>
  </v-avatar>
</template>