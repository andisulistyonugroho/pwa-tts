// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const usePointStore = defineStore('point',() => {
  const quizPoint = reactive([{
    quizId: 1,
    level: 1,
    correctAnswer: 0,
    attempt: 0,
    numOfQuestion: 1
  }])
  
  const setQuizPoint = ((payload:any) => {
    const editqIndex = quizPoint.findIndex(obj => obj.quizId === payload.quizId && obj.level === payload.level)
    if (editqIndex < 0) {
      quizPoint.push({
        quizId: payload.quizId, 
        level: payload.level, 
        correctAnswer: payload.correctAnswer, 
        attempt: 1, 
        numOfQuestion: payload.numOfQuestion
      })
    } else {
      quizPoint[editqIndex].correctAnswer = payload.correctAnswer
      quizPoint[editqIndex].level = payload.level
      quizPoint[editqIndex].attempt++
      quizPoint[editqIndex].numOfQuestion = payload.numOfQuestion
    }
  })

  
  return {setQuizPoint, quizPoint}
})