// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions
import { Dayjs } from "dayjs";
export const usePointStore = defineStore(
  "point",
  () => {
    const { chapterOpened } = storeToRefs(useRankinStore());
    const userPoint = ref<UserPoint[]>([]);
    const { topicDetail, chapters, chapter } = storeToRefs(useChapterStore());

    const totalPoint = ref(0);

    const InitializePointForTopic = (input: {
      topic_id: number;
      topic_title: string;
      chapters: Chapter[];
    }) => {
      const up = userPoint.value;
      if (up.length === 0 && input.topic_id >= 1) {
        const firstchapters = input.chapters[0];
        chapterOpened.value.push(firstchapters.id);
        userPoint.value = [
          {
            topic_id: input.topic_id,
            topic_title: input.topic_title,
            chapter_point: [
              {
                chapter_id: firstchapters ? firstchapters.id : 0,
                num_of_question: 0,
                correct_answer: 0,
                total_point: 0,
                total_time: 0,
              },
            ],
          },
        ];
      }
    };

    const AddPoint = (chapter_id: number) => {
      totalPoint.value += 1;
      chapterPointUpdate(chapter_id, "add");
    };

    const DeductPoint = (chapter_id: number, qty: number) => {
      totalPoint.value -= 1;
      const point = getPointInChapters(chapter_id);

      if (point) {
        const prevState = point;
        point.total_point = prevState.total_point - qty;
      }
    };

    const Skip = (chapter_id: number) => {
      chapterPointUpdate(chapter_id, "skip");
    };

    const chapterPointUpdate = (chapter_id: number, action: string) => {
      const point = getPointInChapters(chapter_id);

      if (point) {
        const prevState = point;
        if (action === "add") {
          point.total_point = prevState.total_point + 1;
          point.correct_answer = prevState.correct_answer + 1;
        } else if (action === "deduct") {
          point.total_point = prevState.total_point - 1;
        }

        point.correct_answer = prevState.correct_answer;
        point.num_of_question = prevState.num_of_question + 1;
      }
    };

    const chaptersTotalTimeUpdate = (startTime: Dayjs, endTime: Dayjs) => {
      if (!chapter.value) return;

      const point = getPointInChapters(chapter.value.id);
      if (point) {
        const totalTime = endTime.diff(startTime); //in milliseconds
        point.total_time = totalTime;
      }
    };

    const ResetChapterPoint = () => {
      if (!chapter.value) return;

      const point = getPointInChapters(chapter.value.id);

      if (point) {
        point.correct_answer = 0;
        point.num_of_question = 0;
        point.total_point = 0;
        point.total_time = 0;
      }
    };

    const NewChapterPoint = () => {
      const topic = userPoint.value.find(
        (obj) => obj.topic_id === topicDetail.value.id,
      );
      if (topic) {
        const chapterId = getNextChapterId();

        if (chapterId > 0) {
          chapterOpened.value.push(chapterId);
          topic.chapter_point.push({
            chapter_id: chapterId,
            num_of_question: 0,
            correct_answer: 0,
            total_point: 0,
            total_time: 0,
          });
        }
      }
    };

    const getNextChapterId = () => {
      if (!chapter.value) {
        return 0;
      }

      const chapterid = chapter.value.id;
      const theindex = chapters.value.findIndex((obj) => obj.id === chapterid);
      const nextIndex = theindex + 1;

      const c = chapters.value[nextIndex];
      return c ? c.id : 0;
    };

    const getPointInChapters = (chapter_id: number) => {
      const found = userPoint.value?.find(
        (obj) => obj.topic_id === topicDetail.value.id,
      );
      const point = found?.chapter_point.find(
        (obj) => obj.chapter_id === chapter_id,
      );
      return point;
    };

    return {
      AddPoint,
      DeductPoint,
      ResetChapterPoint,
      NewChapterPoint,
      InitializePointForTopic,
      chaptersTotalTimeUpdate,
      Skip,
      totalPoint,
      userPoint,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
);
