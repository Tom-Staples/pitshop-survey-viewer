import { ref } from 'vue'

const useCalculateSurveyResults = () => {
  const chartData = ref(null)

  const calculateResults = (surveyResults) => {
    if (!surveyResults) {
      return
    }
    const { answers } = surveyResults
    const uniqueAnswers = []
    const scores = {}

    answers.forEach((answer) => {
      if (!uniqueAnswers.includes(answer)) {
        uniqueAnswers.push(answer)
      }
    })
    uniqueAnswers.forEach((answer) => {
      const filtAnswers = answers.filter((ans) => ans === answer)
      scores[answer] = filtAnswers.length
    })
    chartData.value = {
      labels: Object.keys(scores),
      datasets: [
        {
          data: Object.values(scores),
          backgroundColor: ['#f8e1d1']
        }
      ]
    }
  }
  return { chartData, calculateResults }
}

export default useCalculateSurveyResults
