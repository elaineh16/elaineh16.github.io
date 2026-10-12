// Places Elaine has been, shown on the Map tab in Singleplayer.
// Add a place with its name, region and latitude/longitude (look it up on any map site).

export type PlaceKind = "spawn" | "base" | "visited"

export interface Place {
  name: string
  region: string
  country: "Canada" | "United States" | "Mexico"
  lat: number
  lon: number
  kind?: PlaceKind
}

export const PLACES: Place[] = [
  { name: "Toronto", region: "ON", country: "Canada", lat: 43.65, lon: -79.38, kind: "spawn" },
  { name: "Ithaca", region: "NY", country: "United States", lat: 42.44, lon: -76.5, kind: "base" },

  { name: "Vancouver", region: "BC", country: "Canada", lat: 49.28, lon: -123.12 },
  { name: "Saskatoon", region: "SK", country: "Canada", lat: 52.13, lon: -106.67 },
  { name: "Montreal", region: "QC", country: "Canada", lat: 45.5, lon: -73.57 },
  { name: "Quebec City", region: "QC", country: "Canada", lat: 46.81, lon: -71.21 },
  { name: "Ottawa", region: "ON", country: "Canada", lat: 45.42, lon: -75.7 },
  { name: "Prince Edward Island", region: "PE", country: "Canada", lat: 46.25, lon: -63.13 },

  { name: "San Francisco", region: "CA", country: "United States", lat: 37.77, lon: -122.42 },
  { name: "San Jose", region: "CA", country: "United States", lat: 37.34, lon: -121.89 },
  { name: "Phoenix", region: "AZ", country: "United States", lat: 33.45, lon: -112.07 },
  { name: "Salt Lake City", region: "UT", country: "United States", lat: 40.76, lon: -111.89 },
  { name: "Fort Worth", region: "TX", country: "United States", lat: 32.76, lon: -97.33 },
  { name: "Kansas City", region: "MO", country: "United States", lat: 39.1, lon: -94.58 },
  { name: "Minneapolis", region: "MN", country: "United States", lat: 44.98, lon: -93.27 },
  { name: "St. Louis", region: "MO", country: "United States", lat: 38.63, lon: -90.2 },
  { name: "Chicago", region: "IL", country: "United States", lat: 41.88, lon: -87.63 },
  { name: "Evanston", region: "IL", country: "United States", lat: 42.05, lon: -87.69 },
  { name: "Detroit", region: "MI", country: "United States", lat: 42.33, lon: -83.05 },
  { name: "Louisville", region: "KY", country: "United States", lat: 38.25, lon: -85.76 },
  { name: "Cincinnati", region: "OH", country: "United States", lat: 39.1, lon: -84.51 },
  { name: "Columbus", region: "OH", country: "United States", lat: 39.96, lon: -83.0 },
  { name: "Cleveland", region: "OH", country: "United States", lat: 41.5, lon: -81.69 },
  { name: "Charlotte", region: "NC", country: "United States", lat: 35.23, lon: -80.84 },
  { name: "Raleigh", region: "NC", country: "United States", lat: 35.78, lon: -78.64 },
  { name: "Orlando", region: "FL", country: "United States", lat: 28.54, lon: -81.38 },
  { name: "Washington", region: "DC", country: "United States", lat: 38.91, lon: -77.04 },
  { name: "Philadelphia", region: "PA", country: "United States", lat: 39.95, lon: -75.17 },
  { name: "Atlantic City", region: "NJ", country: "United States", lat: 39.36, lon: -74.42 },
  { name: "Buffalo", region: "NY", country: "United States", lat: 42.89, lon: -78.88 },
  { name: "New Haven", region: "CT", country: "United States", lat: 41.31, lon: -72.92 },
  { name: "Providence", region: "RI", country: "United States", lat: 41.82, lon: -71.41 },
  { name: "Boston", region: "MA", country: "United States", lat: 42.36, lon: -71.06 },

  { name: "Cancún", region: "QR", country: "Mexico", lat: 21.16, lon: -86.85 },
]
