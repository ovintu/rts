import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Ng2Highcharts, Ng2Highmaps, Ng2Highstocks} from 'ng2-highcharts';
import { SimulationService } from '../shared/index';
/**
 * This class represents the lazy loaded SimulationComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-simulation',
    templateUrl: 'simulation.component.html',
    styleUrls: ['simulation.component.css']
})

export class SimulationComponent implements OnInit {

    socket: any;

  /**
   * Creates an instance of the SimulationComponent with the injected
   * SimulationService.
   *
   * @param {Http} http - The injected Http.
   * @param {SimulationService} simulationService - The injected SimulationService.
   */
    constructor(private http: Http, public simulationService: SimulationService) {
        this.socket = io();
        this.receiveData();
     }

    start(){
        this.simulationService.start()
            .subscribe(
                res => {
                    let status = Number(res["status"]);
                    if (status == 201) {
                        console.log("****Simulation started: receiving");
                    } else{
                         console.log("Http Error: " + status);
                    }
                },
                err => console.log(err));
    }

    stop(){
         this.simulationService.stop()
            .subscribe(
                res => {
                    let status = Number(res["status"]);
                    if (status == 201) {
                        console.log("****Simulation stoped");
                    } else{
                        console.log("Http Error: " + status);
                    }
                });
    }

    receiveData(){
        this.socket.on('Task data',function(msg: any){
            console.log(msg);
        });
    }

    chartOptions = {
        title:{
            text: 'Rts'
        },
        chart: {
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series1 = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = 200;
                        series1.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        series: [{
            name: 'Task1',
            data: (function () {
                // generate an array of random data
                var data :any[];
                var time :any;
                var i: any;
                data = [],
                time = (new Date()).getTime(),
                i;

                for (i = -999; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                        200
                    ]);
                }
                return data;
            }())
        }]
    };

    ngOnInit(): any {
        this.init();
    }

    init(){
        this.chartOptions = {
                title:{
                    text: 'Rts'
                },
                chart: {
                    events: {
                        load: function () {

                            // set up the updating of the chart each second
                            var series = this.series[0];
                            setInterval(function () {
                                var x = (new Date()).getTime(), // current time
                                    y = Math.round(Math.random() * 100);
                                    series.addPoint([x, y], true, true);
                            }, 1000);
                        }
                    }
                },
                series: [{
                    name: 'Task1',
                    data: (function () {
                        // generate an array of random data
                        var data :any[];
                        var time :any;
                        var i: any;
                        data = [],
                        time = (new Date()).getTime(),
                        i;

                        for (i = -999; i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                Math.round(Math.random() * 100)
                            ]);
                        }
                    return data;
                    }())
                }]
            };
    }
}

