<script setup lang="ts">
definePageMeta({
  layout: "empty",
});

const { $debounce, $dayjs } = useNuxtApp();
const route = useRoute();

const { getQuestionsByLevel } = useQuestionStore();
const { questions } = storeToRefs(useQuestionStore());
const { AddPoint, Skip, chaptersTotalTimeUpdate, ResetChapterPoint } =
  usePointStore();
const { totalPoint } = storeToRefs(usePointStore());
const { chapters, chapterStartTime, chapterEndTime } =
  storeToRefs(useChapterStore());

const querychapterId = route.query.chapterid;
let chapterId = 0;
if (typeof querychapterId === "string") {
  chapterId = parseInt(querychapterId);
}

const numberOfQuestion = ref(0);
const randomQuestion = ref<Question[]>([]);
const questionIndex = ref(0);
const answerBox = ref(false);
const answerState = ref(false);
const timesupD = ref(false);
const selectedOpt = ref(0);
const counter = ref();
const wrongOptionId = ref(-1);

const randomizeQuestion = () => {
  if (questions.value.length <= 0) {
    navigateTo("/topics", { replace: true });
    return;
  }

  const y = [...questions.value];
  numberOfQuestion.value = y.length;
  randomQuestion.value = [];
  for (let i = y.length; i > 0; i--) {
    const x = Math.floor(Math.random() * i);
    if (y[x]) {
      const rand = y[x];
      randomQuestion.value.push(rand);
    }
    y.splice(x, 1);
  }
};

const checkTheAnswer = $debounce(
  (id: number) => {
    // pause counter
    counter.value.pauseCount();

    selectedOpt.value = id;
    const index = theOptions.value.findIndex(
      (obj) => obj.id === id && obj.is_correct === true,
    );
    if (index >= 0) {
      AddPoint(questions.value[0].chapter_id);
    } else {
      wrongOptionId.value = id;
    }
    answerState.value = index >= 0;
    answerBox.value = true;

    checkChaptersEndTime();
  },
  300,
  { leading: false, trailing: true },
);

const nextQuestion = $debounce(
  async () => {
    if (!chapters.value) return;

    answerBox.value = false;
    selectedOpt.value = 0;

    if (questionIndex.value < numberOfQuestion.value - 1) {
      questionIndex.value += 1;
    } else {
      const nextLevel = questions.value[0].the_level + 1;
      if (nextLevel > chapters.value.num_of_level) {
        navigateTo("/chapterCompleted", { replace: true });
        return;
      }

      await getQuestionsByLevel(chapters.value.id, nextLevel);
      randomizeQuestion();
      questionIndex.value = 0;
    }

    counter.value.doCount();
  },
  1000,
  { leading: true, trailing: false },
);

const exitchapters = $debounce(
  () => {
    ResetChapterPoint();
    totalPoint.value = 0;
    navigateTo("/chapter", { replace: true });
  },
  1000,
  { leading: true, trailing: false },
);

const checkChaptersEndTime = () => {
  if (!chapters.value) return;

  const nextLevel = questions.value[0].the_level + 1;
  if (
    questionIndex.value === numberOfQuestion.value - 1 &&
    nextLevel > chapters.value.num_of_level
  ) {
    chapterEndTime.value = $dayjs();

    chaptersTotalTimeUpdate(chapterStartTime.value, chapterEndTime.value);
  }
};

const question = computed<Question>(() => {
  const rq = randomQuestion.value[questionIndex.value];
  const q: Question = {
    id: rq ? rq.id : 0,
    chapter_id: rq ? rq.chapter_id : 0,
    question_text: rq ? rq.question_text : "",
    the_level: rq ? rq.the_level : 0,
    options: rq ? rq.options : [],
  };
  return q;
});

const theOptions = computed<Option[]>(() => {
  const opt: Option[] = [];
  const y = [...question.value.options];
  for (let i = y.length; i > 0; i--) {
    const x = Math.floor(Math.random() * i);
    const selected = y[x];
    const randomOpt: Option = {
      id: selected ? selected.id : 0,
      the_text: selected ? selected.the_text : "",
      is_correct: selected ? selected.is_correct : false,
    };
    opt.push(randomOpt);
    y.splice(x, 1);
  }

  return opt;
});

const repeatQuestion = () => {
  answerBox.value = false;
  counter.value.resumeCount();
};

const skipQuestion = () => {
  if (!chapters.value) return;

  answerBox.value = timesupD.value = false;
  Skip(chapters.value.id);
  nextQuestion();
};

const timesUp = () => {
  timesupD.value = true;
};

const timesupRepeat = () => {
  timesupD.value = false;
  counter.value.doCount();
};

const remove2Option = () => {
  const theQuestion = randomQuestion.value[questionIndex.value];
  const correctOne = theQuestion.options.find((obj) => obj.is_correct === true);
  const wrongOne = theQuestion.options.find(
    (obj) => obj.id === wrongOptionId.value,
  );

  let arrIndexes = theQuestion.options.map((obj) => obj.id);
  arrIndexes = arrIndexes.filter(
    (obj) => obj !== correctOne?.id && obj !== wrongOne?.id,
  );

  const one = correctOne;
  const two = theQuestion.options.find((obj) => obj.id === arrIndexes[0]);

  if (!one || !two) return;

  randomQuestion.value[questionIndex.value].options = [one, two];
  repeatQuestion();
};

const addMoreTime = () => {
  answerBox.value = false;
  counter.value.addTime();
};

randomizeQuestion();
chapterStartTime.value = $dayjs();
</script>
<template>
  <v-container v-if="question" fluid class="px-2 h-100 bg-yellow-lighten-5">
    <v-row>
      <v-col cols="12" class="text-h5 text-center"></v-col>
    </v-row>
    <v-row align-self="start">
      <v-col cols="12" class="text-center">
        <div class="text-h5">Total Poin: {{ totalPoint }}</div>
        <div class="pb-2 text-center">
          {{ questionIndex + 1 }}/{{ numberOfQuestion }} (Level
          {{ question.the_level }})
        </div>
      </v-col>
      <v-col cols="12">
        <div class="greenboard pa-5">
          <div class="mt-n13 text-center">
            <CounterDown ref="counter" @timesup="timesUp()" />
          </div>
          <div class="text-h6 text-center">
            {{ question.question_text }}
          </div>
        </div>
      </v-col>
      <v-col v-for="(row, i) in theOptions" :key="row.id" cols="12">
        <div
          :class="`${selectedOpt === row.id ? 'bg-orange' : 'bg-yellow'} pa-2 text-center text-h6 border-thin rounded-xl`"
          @click="checkTheAnswer(row.id)"
        >
          {{ String.fromCharCode(65 + i) }}: {{ row.the_text }}
        </div>
      </v-col>
    </v-row>
    <v-footer v-if="questions.length" color="yellow-lighten-5">
      <v-btn
        size="large"
        variant="elevated"
        color="pink"
        prepend-icon="i-mdi-exit-run"
        class="ma-3"
        @click="exitchapters()"
        >Keluar</v-btn
      >
      <v-spacer />
      <v-btn
        disabled
        size="large"
        variant="elevated"
        append-icon="i-mdi-car-emergency"
        class="ma-3"
        >Bantuan</v-btn
      >
    </v-footer>
    <AnswerDialog
      :dialog="answerBox"
      :answerstate="answerState"
      @clicknext="nextQuestion()"
      @repeat="repeatQuestion()"
      @r2o="remove2Option()"
      @skip="skipQuestion()"
      @moretime="addMoreTime()"
    />
    <TimesUp
      :dialog="timesupD"
      @skip="skipQuestion()"
      @repeat="timesupRepeat()"
    />
  </v-container>
</template>
