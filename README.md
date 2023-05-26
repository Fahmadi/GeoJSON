# GeoJSON API

This is a RESTful API built with TypeScript and Express.js that provides GeoJSON features for a given location based on a geolocation box (bounding box) input. The application makes use of the OpenStreetMap API to gather information in OSM format and converts it to GeoJSON format using the osmtogeojson library.

## Prerequisites

- Node.js (v14 or above)
- npm package manager

## Getting Started

1. Clone the repository:

```shell
git clone https://github.com/Fahmadi/GeoJSON.git
```

2. Install the dependencies:
```shell 
cd GeoJSON
npm install
```

3. Build the TypeScript code:
```shell
npm run build
```

4. Start the server:
```shell
npm run start
```
The server will start running on http://localhost:3000.

## API Endpoints
### GET /geojson
This endpoint retrieves the GeoJSON features for a given location based on a geolocation box (bounding box) input. The bounding box should be provided as query parameters:

`minLat`: The minimum latitude of the bounding box.
`minLong`: The minimum longitude of the bounding box.
`maxLat`: The maximum latitude of the bounding box.
`maxLong`: The maximum longitude of the bounding box.
Example Request:

```shell
GET localhost:3000/geojson?minLong=40.712776&minLat=-74.005974&maxLong=40.748817&maxLat=-73.985428
```

Example Response:
```json
{
  "type": "FeatureCollection",
  "features": [
    // GeoJSON features...
  ]
}
```

### Running Tests
To run the unit tests for the project, you can use the following command:
```shell
npm run test
```
make sure you used node v14 or above.
before running test make sure that you builded the codes.
The tests are located in the tests directory and are written using the Jest testing framework.

