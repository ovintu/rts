/**
 * Created by Everest on 9/24/2016.
 */
import * as express from 'express';

export function simulationService(app: express.Application) {
    /**
     * Start simulation.
     */
    app.get('/api/startSimulation',
        (req:any, res:any, next:any) => {
            res.sendStatus(200);
        });

    /**
     * Stop simulation.
     */
    app.get('/api/stopSimulation',
        (req:any, res:any, next:any) => {
            res.sendStatus(200);
        });
}

