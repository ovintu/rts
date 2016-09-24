import * as express from 'express';
import { nameList } from './name.list';
import { simulationService } from "./simulation.service";

export function init(app: express.Application) { 
    nameList(app);
    simulationService(app);
}
