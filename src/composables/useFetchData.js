import { onMounted, ref } from 'vue'

const useFetchData = (url, params = undefined) => {
  const data = ref(null),
    error = ref(''),
    loading = ref(false)

  onMounted(async () => {
    loading.value = true
    try {
      const response = await fetch(url, params)
      const result = await response.json()

      if (response.ok) {
        data.value = result
      } else {
        error.value = result.message
      }
      loading.value = false
    } catch (err) {
      error.value = err
      loading.value = false
    }
  })
  return { data, error, loading }
}

export default useFetchData
