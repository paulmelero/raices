// Simplified boundary of Huesca province.
// ~40 vertices, clockwise winding (suitable as a GeoJSON polygon hole).
// [lng, lat] pairs.
export const HUESCA_BOUNDARY: [number, number][] = [
  // NW — Valle de Ansó / Navarra border
  [-0.725, 42.8],
  // North — Pyrenees (French border), west to east
  [-0.64, 42.87],
  [-0.52, 42.84],
  [-0.4, 42.805],
  [-0.27, 42.82],
  [-0.15, 42.795],
  [-0.02, 42.805],
  [0.1, 42.785],
  [0.2, 42.74],
  [0.32, 42.755],
  [0.43, 42.72],
  [0.55, 42.785],
  [0.65, 42.8],
  [0.73, 42.7],
  // NE — heading south along Lleida border
  [0.75, 42.58],
  [0.72, 42.45],
  [0.65, 42.3],
  [0.55, 42.15],
  [0.5, 42.0],
  [0.47, 41.92],
  [0.44, 41.84],
  // SE — Monegros / Fraga area
  [0.38, 41.72],
  [0.32, 41.6],
  [0.22, 41.52],
  // South — Zaragoza border, heading west
  [0.1, 41.54],
  [0.0, 41.57],
  [-0.12, 41.6],
  [-0.22, 41.65],
  [-0.32, 41.7],
  [-0.42, 41.76],
  [-0.52, 41.82],
  // SW — heading north along Zaragoza / Navarra border
  [-0.62, 41.88],
  [-0.69, 41.94],
  [-0.74, 42.05],
  [-0.79, 42.2],
  [-0.81, 42.35],
  [-0.79, 42.5],
  [-0.76, 42.65],
  // Close
  [-0.725, 42.8],
];
