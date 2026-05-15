<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Post, PostType } from '~~/shared/types'
import { HUESCA_BOUNDARY } from '~~/shared/huesca-boundary'

const props = defineProps<{
  posts: Post[]
  center: { lat: number; lng: number }
}>()

const emit = defineEmits<{
  'select-post': [post: Post]
}>()

const mapContainer = ref<HTMLElement>()
let map: InstanceType<typeof import('maplibre-gl').Map> | null = null
let mgl: typeof import('maplibre-gl') | null = null
const markers: InstanceType<typeof import('maplibre-gl').Marker>[] = []

const TYPE_COLORS: Record<PostType, string> = {
  give: '#22c55e',
  need: '#f97316',
  lend: '#3b82f6',
  event: '#a855f7',
  test: '#6b7280',
}

function clearMarkers() {
  for (const marker of markers) {
    marker.remove()
  }
  markers.length = 0
}

function renderMarkers() {
  if (!map || !mgl) return
  clearMarkers()

  for (const post of props.posts) {
    const loc = post.locations[0]
    if (!loc) continue

    const el = document.createElement('div')
    el.style.width = '28px'
    el.style.height = '28px'
    el.style.borderRadius = '50%'
    el.style.backgroundColor = TYPE_COLORS[post.type] ?? '#6b7280'
    el.style.border = '3px solid white'
    el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)'
    el.style.cursor = 'pointer'

    const marker = new mgl.Marker({ element: el })
      .setLngLat([loc.lng, loc.lat])
      .addTo(map)

    el.addEventListener('click', () => {
      emit('select-post', post)
    })

    markers.push(marker)
  }
}

function addHuescaHighlight() {
  if (!map) return

  // World polygon with Huesca cut out → dims everything outside the province
  map.addSource('huesca-mask', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]],
          HUESCA_BOUNDARY,
        ],
      },
    },
  })

  map.addLayer({
    id: 'huesca-mask',
    type: 'fill',
    source: 'huesca-mask',
    paint: {
      'fill-color': '#000000',
      'fill-opacity': 0.25,
    },
  })

  // Province border line
  map.addSource('huesca-border', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: HUESCA_BOUNDARY,
      },
    },
  })

  map.addLayer({
    id: 'huesca-border',
    type: 'line',
    source: 'huesca-border',
    paint: {
      'line-color': '#f97316',
      'line-width': 2,
      'line-opacity': 0.5,
    },
  })
}

watch(() => props.posts, renderMarkers, { deep: true })

watch(() => props.center, (c) => {
  if (map) {
    map.flyTo({ center: [c.lng, c.lat], zoom: 10 })
  }
})

onMounted(async () => {
  if (!mapContainer.value) return

  const maplibregl = await import('maplibre-gl')
  mgl = maplibregl

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
      },
      layers: [
        {
          id: 'osm',
          type: 'raster',
          source: 'osm',
        },
      ],
    },
    center: [props.center.lng, props.center.lat],
    zoom: 10,
  })

  map.addControl(new maplibregl.NavigationControl(), 'top-right')

  map.on('load', () => {
    addHuescaHighlight()
    renderMarkers()
  })
})

onUnmounted(() => {
  clearMarkers()
  map?.remove()
  map = null
})
</script>

<template>
  <div
    ref="mapContainer"
    style="position: absolute; inset: 0; width: 100%; height: 100%;"
  />
</template>
