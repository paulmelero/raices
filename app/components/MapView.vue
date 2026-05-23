<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Post, PostType } from '~~/shared/types';
import { HUESCA_BOUNDARY } from '~~/shared/huesca-boundary';

const props = defineProps<{
  posts: Post[];
  center: { lat: number; lng: number };
}>();

const emit = defineEmits<{
  'select-post': [post: Post];
}>();

const mapContainer = ref<HTMLElement>();
let map: InstanceType<typeof import('maplibre-gl').Map> | null = null;
let mgl: typeof import('maplibre-gl') | null = null;
const markers: InstanceType<typeof import('maplibre-gl').Marker>[] = [];

function getTypeColor(type: PostType): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-marker-${type}`)
    .trim();
  return raw || '#9C9083';
}

function getHuescaBorderColor(): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--color-huesca-border')
    .trim() || '#A0522D';
}

function clearMarkers() {
  for (const marker of markers) {
    marker.remove();
  }
  markers.length = 0;
}

function renderMarkers() {
  if (!map || !mgl) return;
  clearMarkers();

  for (const post of props.posts) {
    const loc = post.locations[0];
    if (!loc) continue;

    const el = document.createElement('div');
    el.style.width = '28px';
    el.style.height = '28px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = getTypeColor(post.type);
    el.style.cursor = 'pointer';
    el.className = 'map-marker-ring';

    const marker = new mgl.Marker({ element: el })
      .setLngLat([loc.lng, loc.lat])
      .addTo(map);

    el.addEventListener('click', () => {
      emit('select-post', post);
    });

    markers.push(marker);
  }
}

function addHuescaHighlight() {
  if (!map) return;

  map.addSource('huesca-mask', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-180, -90],
            [180, -90],
            [180, 90],
            [-180, 90],
            [-180, -90],
          ],
          HUESCA_BOUNDARY,
        ],
      },
    },
  });

  map.addLayer({
    id: 'huesca-mask',
    type: 'fill',
    source: 'huesca-mask',
    paint: {
      'fill-color': '#000000',
      'fill-opacity': 0.25,
    },
  });

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
  });

  map.addLayer({
    id: 'huesca-border',
    type: 'line',
    source: 'huesca-border',
    paint: {
      'line-color': getHuescaBorderColor(),
      'line-width': 2,
      'line-opacity': 0.5,
    },
  });
}

watch(() => props.posts, renderMarkers, { deep: true });

watch(
  () => props.center,
  (c) => {
    if (map) {
      map.flyTo({ center: [c.lng, c.lat], zoom: 10 });
    }
  },
);

let darkQuery: MediaQueryList | null = null;

function onSchemeChange() {
  renderMarkers();
  if (map?.getLayer('huesca-border')) {
    map.setPaintProperty('huesca-border', 'line-color', getHuescaBorderColor());
  }
}

onMounted(async () => {
  if (!mapContainer.value) return;

  const maplibregl = await import('maplibre-gl');
  mgl = maplibregl;

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
    zoom: 8,
  });

  map.addControl(new maplibregl.NavigationControl(), 'top-right');

  map.on('load', () => {
    addHuescaHighlight();
    renderMarkers();
  });

  darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkQuery.addEventListener('change', onSchemeChange);
});

onUnmounted(() => {
  darkQuery?.removeEventListener('change', onSchemeChange);
  clearMarkers();
  map?.remove();
  map = null;
});
</script>

<template>
  <div
    ref="mapContainer"
    style="position: absolute; inset: 0; width: 100%; height: 100%"
  />
</template>
