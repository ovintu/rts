/**
 * Created by Everest on 9/24/2016.
 */
import * as express from 'express';

export function simulationService(app: express.Application) {
    /**
     * Start simulation.
     */
    app.get('/api/simulation/start',
        (req:any, res:any, next:any) => {
            res.sendStatus(204);
        });

    /**
     * Stop simulation.
     */
    app.get('/api/simulation/stop',
        (req:any, res:any, next:any) => {
            res.sendStatus(204);
        });
}

