import { Request, Response } from 'express';
import { OSMService } from '../services/osm.service';
import { isValidLatitude, isValidLongitude } from '../utils/validation.utils';
import { StatusCode, ErrorMessage } from '../enums/error-codes.enum'

export class GeoJSONController {
  private osmService: OSMService;

  constructor() {
    this.osmService = new OSMService();
  }

  getGeoJSON(req: Request, res: Response): Response<any, Record<string, any>> | void {
    const { minLong, minLat, maxLong, maxLat } = req.query;

    if (!minLong || !minLat || !maxLong || !maxLat) {
      return res.status(StatusCode.BAD_REQUEST).json({ error: ErrorMessage.BAD_REQUEST });
    }

    if (!isValidLatitude(Number(minLat)) || !isValidLatitude(Number(maxLat)) || !isValidLongitude(Number(minLong)) || !isValidLongitude(Number(maxLong))) {
      return res.status(StatusCode.BAD_REQUEST).json({ error: ErrorMessage.INVALID_LATITUDE_LONGITUDE });
    }
    const bbox = minLong+','+minLat+','+maxLong+','+maxLat
    this.osmService.getOSMData(bbox)
      .then(osmData => {
        const geojsonData = this.osmService.convertToGeoJSON(osmData);
        res.json(geojsonData);
      })
      .catch(error => {
        console.error('Error retrieving OSM data:', error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: ErrorMessage.RETRIEVING_DATA_ERROR });
      });
  }
}
