<script setup>
import { useRoute } from 'vue-router'
import useFetchData from '../composables/useFetchData'
import { SERVER_ENDPOINT, SURVEY_QUESTIONS } from '../constants'
import { ref, watch } from 'vue'
import BarSurvey from './BarSurvey.vue'

const route = useRoute()
const surveyId = route.params.survey
const surveyQuestions = SURVEY_QUESTIONS[surveyId]
const organisedData = ref({})

// fetch data from survey
const { data, error } = useFetchData(SERVER_ENDPOINT + surveyId)

// Computed values
const organiseData = () => {
  if (data.value && surveyQuestions) {
    surveyQuestions.forEach((question, index) => {
      const questionKey = `Q${index + 1}`
      organisedData.value[questionKey] = { question, answers: [] }
    })

    data.value.forEach((result) => {
      const { __v, _id, ...rest } = result // eslint-disable-line no-unused-vars

      // Extract the answers from the survey
      const entries = Object.entries(rest)

      entries.forEach((entry, index) => {
        const questionKey = `Q${index + 1}`
        if (Array.isArray(entry[1])) {
          organisedData.value[questionKey].answers.push(...entry[1])
        } else {
          organisedData.value[questionKey].answers.push(entry[1])
        }
      })
    })
  }
}

watch([data], () => {
  organiseData()
})
</script>

<template>
  <main v-if="error" class="mainContent">
    <p>{{ error }}</p>
  </main>
  <main v-else class="mainContent">
    <BarSurvey
      v-for="(survey, index) in surveyQuestions"
      :key="survey"
      :surveyResults="organisedData[`Q${index + 1}`]"
    />
  </main>
</template>

<style>
.mainContent {
  display: flex;
  flex-wrap: wrap;
}
</style>
