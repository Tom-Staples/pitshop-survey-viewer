<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as Chartjs, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { watchEffect } from 'vue'
import useCalculateSurveyResults from '../composables/useCalculateSurveyResults'

Chartjs.register(BarElement, Tooltip, CategoryScale, LinearScale)
const props = defineProps(['surveyResults'])

const { chartData, calculateResults } = useCalculateSurveyResults()

const chartOptions = {
  responsive: true
}

watchEffect(() => {
  calculateResults(props.surveyResults)
})
</script>

<template>
  <div v-if="surveyResults && chartData" class="pieContainer">
    <h2>{{ surveyResults.question }}</h2>
    <Bar :options="chartOptions" :data="chartData" />
  </div>
</template>

<style>
.pieContainer {
  width: 40%;
  background-color: #ffffff;
  margin: 10px 10px;
  padding: 10px;
  border-radius: 10px;
}
</style>
