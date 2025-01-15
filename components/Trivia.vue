<script setup lang="ts">
const baseTime = 25
const countdown = ref(0)
const theInterval = ref()

countdown.value = baseTime

const countDon = (() => {
  clearInterval(theInterval.value)
  if (countdown.value > 0) {
    theInterval.value = setInterval(() => {
      if (countdown.value <= 0) {
        clearInterval(theInterval.value)
        return
      }
      countdown.value = countdown.value - 1
    }, 1000)
  }
})

countDon()
</script>
<template>
  <v-card class="text-center" color="cyan-lighten-5">
    <v-card-text>
      <div>
        <v-icon icon="mdi-medal" color="black" size="x-large" />
        <span class="text-h5 text-teal mx-3">Poin: 50</span>
        <v-icon icon="mdi-medal" color="red" size="x-large" />
      </div>
      <v-container class="px-0 fill-height">
        <v-row wrap>
          <v-col cols="12">
            <div class="greenboard pa-5">
              <div>
                <v-avatar size="62" :color="countdown < 11 ? 'pink' : 'black'" style="margin-top:-70px;"
                  class="text-h5">
                  {{ countdown }}
                </v-avatar>
              </div>
              <div class="text-h6">
                asdfaldkfj alsdkfjaldfjk alsdkfjaldfjk alsdkfjaldfjk alsdkfjaldfjk alsdkfjaldfjk alsdkfjaldfjk
                alsdkfjaldfjk alsdkfjaldfjk alsdkfjaldfjk alsdkfjaldfjk
              </div>
            </div>
            <div class="pt-1 pb-6">
              Pertanyaan ke x dari n
            </div>
            <div>
              <v-radio-group>
                <v-radio v-for="i in 4" class="bg-yellow-darken-1 rounded-xl py-1 mb-2">
                  <template v-slot:label>
                    <span class="text-left text-h6">{{ String.fromCharCode(64 + i) }}: Satu dua tiga empat lima enam
                      tujuh
                      delapan sembilan
                      sepuluh</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn size="large" variant="elevated" color="info" prepend-icon="mdi-exit-run" class="ma-3"
        @click="$emit('closeit')">Keluar</v-btn>
      <v-spacer></v-spacer>
      <v-btn size="large" variant="elevated" color="info" append-icon="mdi-car-emergency" class="ma-3">Bantuan</v-btn>
    </v-card-actions>
  </v-card>
</template>