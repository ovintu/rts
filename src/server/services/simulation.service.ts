/**
 * Created by Everest on 9/24/2016.
 */
import * as express from 'express';
import {Simulation} from "./simulation";

export function simulationService(app: express.Application) {

    /**
     * Start simulation.
     */
    app.get('/api/simulation-service/start',
        (req:any, res:any, next:any) => {
            var simulation = new Simulation();
            simulation.start(__dirname + '/inputTasks.json');
            console.log("****Server Simulation Start");
            res.sendStatus(204);
        });

    /**
     * Stop simulation.
     */
    app.get('/api/simulation-service/stop',
        (req:any, res:any, next:any) => {

            console.log("****Server Simulation Stop");
            res.sendStatus(204);
        });
}

