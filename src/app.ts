import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { GeoJSONController } from './controllers/geojson.controller';

dotenv.config();

export class App {
  public app: Application;
  public geoJSONController: GeoJSONController;
  
  constructor() {
    this.app = express();
    this.geoJSONController = new GeoJSONController();
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.app.get('/geojson', (req: Request, res: Response) => this.geoJSONController.getGeoJSON(req, res));
  }
  
  public start() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

const app = new App();
app.start();
