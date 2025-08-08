<script setup lang="ts">
const { $debounce } = useNuxtApp();
const props = defineProps({
  dialog: Boolean,
});

const emit = defineEmits(["start"]);

const doStart = $debounce(
  () => {
    emit("start");
  },
  1000,
  { leading: true, trailing: false },
);
</script>
<template>
  <v-dialog v-model="props.dialog" persistent max-width="300">
    <v-card>
      <v-card-text>
        <div>
          <div class="text-center font-weight-bold">Aturan permainan:</div>
          <ul class="text-left">
            <li>Waktu 30 detik per soal</li>
            <li>Jawaban benar +1 poin</li>
            <li>Jawaban salah bisa diulang 1 kali, selama waktu tersedia</li>
            <li>Bantuan, hilangkan 2 opsi: 2 poin</li>
            <li>Bantuan, tambah waktu 10 detik: 1 poin</li>
            <li>
              Chapter berikutnya terbuka jika semua pertanyaan terjawab dengan
              benar
            </li>
          </ul>
          <v-btn
            block
            class="mt-5"
            color="purple"
            variant="tonal"
            @click="doStart()"
            >Mulai</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
