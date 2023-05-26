import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export class OSMService {
  async getOSMData(bbox: string): Promise<string> {
    const openStreetMapUrl = process.env.OPENSTREETMAP_URL;
    const response = await axios.get(`${openStreetMapUrl}?bbox=${bbox}`);
    return response.data;
  }

  convertToGeoJSON(osmData: string):FeatureCollection<Geometry, GeoJsonProperties> {
    const geojsonData = osmtogeojson(osmData);
    return geojsonData;
  }
}
