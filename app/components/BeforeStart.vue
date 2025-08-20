<script setup lang="ts">
const { $debounce } = useNuxtApp();
const props = defineProps({
  dialog: Boolean,
  topicid: Number,
});

const emit = defineEmits(["start"]);
const opti = ref(0);
const scoreboardDialog = ref(false);

const doStart = $debounce(
  () => {
    emit("start");
  },
  1000,
  { leading: true, trailing: false },
);

const toggleOpt = (id: number) => {
  opti.value = opti.value === id ? 0 : id;
};
</script>
<template>
  <v-dialog v-model="props.dialog" persistent max-width="300">
    <v-card>
      <v-card-text>
        <div>
          <v-btn
            block
            class="mt-5"
            color="purple"
            variant="tonal"
            @click="toggleOpt(1)"
            >Aturan Permainan</v-btn
          >
          <div v-show="opti === 1" class="px-4 py-2">
            <ul class="text-left">
              <li>Jawaban benar +1 poin</li>
              <li>Jawaban salah bisa diulang 1 kali, selagi ada waktu</li>
              <li>50/50: -2 poin</li>
              <li>Tambah 10 detik: -1 poin</li>
              <li>
                Chapter berikutnya terbuka jika semua pertanyaan terjawab dengan
                benar
              </li>
            </ul>
          </div>
          <v-btn
            block
            class="mt-2"
            color="purple"
            variant="tonal"
            @click="scoreboardDialog = true"
            >Top Skor</v-btn
          >
          <v-btn
            block
            class="mt-2"
            color="purple"
            variant="tonal"
            @click="doStart()"
            >Mulai</v-btn
          >
        </div>
      </v-card-text>
      <v-dialog v-model="scoreboardDialog">
        <LazyScoreboard
          :topicid="props.topicid"
          @closeit="scoreboardDialog = false"
        />
      </v-dialog>
    </v-card>
  </v-dialog>
</template>
