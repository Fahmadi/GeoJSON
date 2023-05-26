import request from 'supertest';
import { App } from '../../src/app';
import { OSMService } from '../../src/services/osm.service';
import { StatusCode, ErrorMessage } from '../../src/enums/error-codes.enum';

describe('GeoJSONController', () => {
  let app: App;

  beforeAll(() => {
    app = new App();
  });

  describe('GET /geojson', () => {
    it('should return GeoJSON data when valid bbox is provided(http call included)', async () => {
      const response = await request(app.app)
        .get('/geojson')
        .query({minLong:'7.505549', minLat:'6.482084', maxLong:'7.511999', maxLat : '6.488254'})
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.type).toBe('FeatureCollection');
    });

    it('should return an error when bbox is not provided', async () => {
      const response = await request(app.app)
        .get('/geojson')
        .expect(StatusCode.BAD_REQUEST);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBe(ErrorMessage.BAD_REQUEST);
    });
    it('should return 400 status when invalid coordinates are provided (-90<lat>90 -180<long>180)', async () => {
      const response = await request(app.app)
      .get('/geojson')
      .query({minLong:'190', minLat:'100', maxLong:'7.511999', maxLat : '6.488254'})

      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect(response.body).toEqual({ error: ErrorMessage.INVALID_LATITUDE_LONGITUDE });
    });
    it('should return 500 status when failed to fetch data from OpenStreetMap', async () => {
      const mockError = new Error('Failed to fetch data from OpenStreetMap');
     const mockGetOSMData = jest.spyOn(OSMService.prototype, 'getOSMData').mockRejectedValue(mockError);

      const response = await request(app.app).get('/geojson')
      .query({minLong:'7.505549', minLat:'6.482084', maxLong:'7.511999', maxLat : '6.488254'});

      expect(response.status).toBe(StatusCode.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({ error: ErrorMessage.RETRIEVING_DATA_ERROR });
      expect(mockGetOSMData).toHaveBeenCalledWith('7.505549,6.482084,7.511999,6.488254');
    });

    // it('should return GeoJSON data when valid osm data is provided(without http call)', async () => {

    //   const mockOSMData = `<?xml version="1.0" encoding="UTF-8"?>
    //   <osm version="0.6" generator="OpenStreetMap server" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">
    //     <bounds minlat="6.4820840" minlon="7.5055490" maxlat="6.4882540" maxlon="7.5119990"/>
    //     <node id="2482699834" visible="true" version="2" changeset="59810611" timestamp="2018-06-13T13:02:42Z" user="yusha5" uid="7918503" lat="6.4822960" lon="7.5061311"/>
    //   </osm>`
    //   const mockGetGeoJSON = jest.spyOn(OSMService.prototype, 'getOSMData').mockResolvedValue(mockOSMData);

    //   const response = await request(app.app)
    //     .get('/geojson')
    //     .query({minLong:'7.505549', minLat:'6.482084', maxLong:'7.511999', maxLat : '6.488254'})
    //     .expect(StatusCode.SUCCESS);

    //   expect(response.body).toBeDefined();
    //   expect(response.body.type).toBe('FeatureCollection');
    // });
  });
});
