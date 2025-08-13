<script setup lang="ts">
const props = defineProps({
  dialog: { type: Boolean, default: true },
  answerstate: { type: Boolean, default: false },
});
const { DeductPoint } = usePointStore();
const { totalPoint } = storeToRefs(usePointStore());
const { chapter } = storeToRefs(useChapterStore());

const emit = defineEmits(["clicknext", "repeat", "skip", "r2o", "moretime"]);

const repeated = ref(false);
const r2oed = ref(false);
const moreTime = ref(false);

watch(props, (n, o) => {
  if (n.answerstate) {
    repeated.value = false;
    r2oed.value = false;
    moreTime.value = false;
  }
});

const doRepeat = () => {
  repeated.value = true;
  emit("repeat");
};

const doSkip = () => {
  repeated.value = false;
  r2oed.value = false;
  moreTime.value = false;
  emit("skip");
};

const doR2o = () => {
  if (totalPoint.value <= 0) {
    alert("tidak cukup poin");
    return;
  }
  if (!chapter.value) return;

  const poin2deduct = 2;
  DeductPoint(chapter.value.id, poin2deduct);

  r2oed.value = true;
  emit("r2o");
};

const doMoreTime = () => {
  if (totalPoint.value <= 0) {
    alert("tidak cukup poin");
    return;
  }
  if (!chapter.value) return;

  const poin2deduct = 1;
  DeductPoint(chapter.value.id, poin2deduct);

  moreTime.value = true;
  emit("moretime");
};
</script>
<template>
  <v-dialog v-model="props.dialog" persistent max-width="300">
    <v-card>
      <v-card-text class="text-center pa-0">
        <v-icon
          :icon="
            props.answerstate ? 'i-mdi-check-decagram' : 'i-mdi-alert-decagram'
          "
          :color="props.answerstate ? 'green' : 'red'"
          size="250"
          class="ma-0 pa-0"
        ></v-icon>
      </v-card-text>
      <v-card-actions class="pa-5">
        <div class="w-100">
          <template v-if="!props.answerstate">
            <v-btn
              :disabled="repeated"
              prepend-icon="i-mdi-reload"
              block
              :color="repeated ? '' : 'black'"
              variant="flat"
              size="large"
              class="mb-2"
              rounded="xl"
              @click="doRepeat()"
              >Coba lagi</v-btn
            >
            <v-btn
              :disabled="moreTime"
              prepend-icon="i-mdi-timer-plus-outline"
              block
              :color="moreTime ? '' : 'pink'"
              variant="flat"
              rounded="xl"
              class="mb-2"
              size="large"
              @click="doMoreTime()"
              >tambah 10 detik (<v-icon
                icon="i-mdi-star"
                size="x-small"
              />)</v-btn
            >
            <v-btn
              :disabled="r2oed"
              prepend-icon="i-mdi-content-cut"
              block
              :color="r2oed ? '' : 'purple'"
              variant="flat"
              rounded="xl"
              class="mb-2"
              size="large"
              @click="doR2o()"
              >50:50 (<v-icon icon="i-mdi-star" size="x-small" /><v-icon
                icon="i-mdi-star"
                size="x-small"
              />)</v-btn
            >
            <v-btn
              block
              rounded="xl"
              variant="flat"
              size="large"
              color="white"
              class="text-red"
              @click="doSkip()"
              append-icon="i-mdi-arrow-right"
            >
              Skip
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              block
              rounded="xl"
              variant="flat"
              size="large"
              color="white"
              class="text-green"
              @click="emit('clicknext')"
              append-icon="i-mdi-arrow-right"
            >
              Lanjutkan
            </v-btn>
          </template>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
