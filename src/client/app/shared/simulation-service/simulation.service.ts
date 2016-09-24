/**
 * Created by Everest on 9/24/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Config } from '../index';

/**
 * This class provides the Simulation service with methods to start and stop simulation.
 */
@Injectable()
export class SimulationService {

    /**
     * Creates a new SimulationService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    constructor(private http: Http) {}

    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {"success" or "fail"} The Observable for the HTTP request.
     */
    start(): Observable<string> {
        return this.http.get(`${Config.API}/api/simulation/start`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {"success" or "fail"} The Observable for the HTTP request.
     */
    stop(): Observable<string> {
        return this.http.get(`${Config.API}/api/simulation/stop`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Handle HTTP error
     */
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}


