/**
 * Created by Home on 1/1/2016.
 */
import Log = require('../services/RTSLog')
import RtsIo = require("../services/io");

export class TestTask {

    public name:string;

    constructor(public inName:string, public duration:number) {
        this.name = inName;
    }

    execute() {
        var time0 = Date.now();
        while (true) {
            var time1 = Date.now();
            var elapsed = time1 - time0;
            if (elapsed >= this.duration)
                break;
        }

        var json = JSON.stringify({Task:this.name, Started:time0, Ran:elapsed}, null, 4);
        console.log(json);
        Log.log.info(json);
        RtsIo.io.emit('Task data',json);
    }
}
