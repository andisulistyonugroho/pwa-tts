// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions
import { Dayjs } from 'dayjs'
export const usePointStore = defineStore('point', () => {
  const userPoint = ref<UserPoint[]>()
  const { topicDetail, selectedQuiz, quizzes } = storeToRefs(useQuizStore())

  const totalPoint = ref(0)

  const InitializePointForTopic = (input: { topic_id: number, topic_title: string, quizzes: Quiz[] }) => {
    const up = userPoint.value
    if (!up && input.topic_id >= 1) {
      const firstQuiz = input.quizzes[0]
      userPoint.value = [{
        topic_id: input.topic_id,
        topic_title: input.topic_title,
        quiz_point: [{
          quiz_id: firstQuiz.id,
          num_of_question: 0,
          correct_answer: 0,
          total_point: 0,
          total_time: 0
        }]
      }]
    }
  }

  const AddPoint = (quiz_id: number) => {
    totalPoint.value += 1
    quizPointUpdate(quiz_id, 'add')
  }

  const DeductPoint = (quiz_id: number) => {
    totalPoint.value -= 1
    quizPointUpdate(quiz_id, 'deduct')
  }

  const quizPointUpdate = (quiz_id: number, action: string) => {
    const found = userPoint.value?.find(obj => obj.topic_id === topicDetail.value.id)
    const point = found?.quiz_point.find(obj => obj.quiz_id === quiz_id)

    if (point) {
      const prevState = point
      if (action === 'add') {
        point.total_point = prevState.total_point + 1
        point.correct_answer = prevState.correct_answer + 1
      } else if (action === 'deduct') {
        point.total_point = prevState.total_point - 1
      }

      point.correct_answer = prevState.correct_answer
      point.num_of_question = prevState.num_of_question + 1

    }
  }

  const QuizTotalTimeUpdate = (startTime: Dayjs, endTime: Dayjs) => {
    const found = userPoint.value?.find(obj => obj.topic_id === topicDetail.value.id)
    const point = found?.quiz_point.find(obj => obj.quiz_id === selectedQuiz.value?.id)

    if (point) {
      const totalTime = endTime.diff(startTime) //in milliseconds
      point.total_time = totalTime
    }
  }

  const ResetQuizesPoint = () => {
    if (!selectedQuiz.value) return

    const topic = userPoint.value?.find(obj => obj.topic_id === topicDetail.value.id)
    const point = topic?.quiz_point.find(obj => obj.quiz_id === selectedQuiz.value?.id)

    if (point) {
      point.correct_answer = 0
      point.num_of_question = 0
      point.total_point = 0
      point.total_time = 0
    }
  }

  const NewQuizPoint = () => {
    const topic = userPoint.value?.find(obj => obj.topic_id === topicDetail.value.id)
    if (topic) {

      const quizId = getNextQuizId()
      if (quizId > 0) {
        topic.quiz_point.push({
          quiz_id: quizId,
          num_of_question: 0,
          correct_answer: 0,
          total_point: 0,
          total_time: 0
        })
      }
    }
  }

  const getNextQuizId = () => {
    let quizId = 0
    const theIndex = quizzes.value.findIndex(obj => obj.id === selectedQuiz.value?.id)

    if (theIndex >= 0) {
      const nextIndex = theIndex + 1
      if (quizzes.value.length >= theIndex) {
        quizId = quizzes.value[nextIndex].id
      }
    }

    return quizId
  }


  return {
    AddPoint, DeductPoint, ResetQuizesPoint, NewQuizPoint,
    InitializePointForTopic, QuizTotalTimeUpdate,
    totalPoint, userPoint
  }
})