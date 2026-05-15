import { DEFAULT_CENTER } from '~~/shared/towns'

export function useGeolocation() {
  const lat = ref(DEFAULT_CENTER.lat)
  const lng = ref(DEFAULT_CENTER.lng)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(() => {
    if (!navigator.geolocation) {
      loading.value = false
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat.value = position.coords.latitude
        lng.value = position.coords.longitude
        loading.value = false
      },
      () => {
        loading.value = false
        error.value = 'geolocation_denied'
      },
      { timeout: 5000, maximumAge: 300000 },
    )
  })

  return { lat, lng, loading, error }
}
