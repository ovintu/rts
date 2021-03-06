/**
 * Created by Everest on 1/4/2016.
 */
'use strict';
import fs = require('fs');
import Log = require('./RTSLog')
import RtsIo = require('./io')
import Scheduler = require('../lib/Scheduler')
import TestTask = require('../lib/TestTask')
import HyperScheduler = require('../lib/HyperScheduler')
import {Tasks} from "./tasks";

export class Simulation {

    start(path:string) {
        Log.log.info('Scheduler test started');

        var tasks = new Tasks();
        tasks.getTasks(__dirname + '/inputTasks.json', function(data :any) {
            var json :any;
            try {
                json = JSON.parse(data);
            } catch (e) {
                console.log(e);
            }

            var scheduler = new HyperScheduler.HyperScheduler();
            json["tasks"].forEach(function(result: any, index: any) {
                var name = result['name'];
                var period = result['period'];
                var duration = result['executionTime'];
                if (!isNaN(period) && !isNaN(duration)){
                    var testTask = new TestTask.TestTask(name, duration);
                    scheduler.AddPeriodicTask(testTask, period);
                }
            });
            RtsIo.io.emit('scheduler started', 100);
            scheduler.Run(100)
            setTimeout(()=>{
                scheduler.Stop();
            },100000)
        });
    }

    stop() {
    }
}
