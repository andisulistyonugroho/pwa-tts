interface QuizPoint {
  quiz_id: number,
  num_of_question: number,
  correct_answer: number,
  total_point: number,
  total_time: number
}

interface UserPoint {
  topic_id: number,
  topic_title: string,
  quiz_point: QuizPoint[]
}