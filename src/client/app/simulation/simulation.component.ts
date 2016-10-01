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
    json :any;
    time: number[] = [];

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
                    let status = res["status"];
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
                    let status = res["status"];
                    if (status == 201) {
                        console.log("****Simulation stoped");
                    } else{
                        console.log("Http Error: " + status);
                    }
                });
    }

    receiveData(){
        this.socket.on('Task data',function(msg: any){
            try {
                this.json = JSON.parse(msg);
                this.list.push(this.json['Started']);
                console.log(this.json['Started']);
            } catch (e) {
                console.log(e);
            }
        });
    }

    chartOptions = {
        title:{
            text: 'Rts'
        },
        yAxis: [{
            title: {
                text: 'Period'
            },
            //height: 400,
            lineWidth: 2
        }],
        xAxis: [{
            title: {
                text: 'Execution time'
            },
            lineWidth: 2
        }],
        chart: {
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                    }
                }
            },
            showAxes:true,
            marginRight: 200,
            events: {
                load: function () {

                    console.log(this.json['Started']);

                    // set up the updating of the chart each second
                    var series1 = this.series[0];
                    setInterval(function () {
                        var x = 0, 
                            y = 0;
                        series1.addPoint([x, y], true, true);
                    }, 1000);

                    var series2 = this.series[1];
                    setInterval(function () {
                        var x = 0, 
                            y = 0;
                        series2.addPoint([x, y], true, true);
                    }, 1000);

                    var series3 = this.series[2];
                    setInterval(function () {
                        var x = 0, 
                            y = 0;
                        series3.addPoint([x, y], true, true);
                    }, 1000);

                    var series4 = this.series[3];
                    setInterval(function () {
                        var x = 0, 
                            y = 0;
                        series4.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        series: [{
            name: 'Task1',
            marker: {
                enabled: false
            },
            data: (function () {
                var data :any[];
                return data;
            }())
        },
        {
            name: 'Task2',
            marker: {
                enabled: false
            },
            data: (function () {
                var data :any[];
                return data;
            }())
        },
        {
            name: 'Task3',
            marker: {
                enabled: false
            },
            data: (function () {
                var data :any[];
                return data;
            }())
        },
        {
            name: 'Task4',
            marker: {
                enabled: false
            },
            data: (function () {
                var data :any[];
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
                yAxis: [{
                    title: {
                        text: 'Period'
                    },
                    //height: 400,
                    lineWidth: 1
                }],
                xAxis: [{
                    title: {
                        text: 'Execution time'
                    },
                    lineWidth: 2
                }],
                chart: {
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: false,
                            }
                        }
                    },
                    showAxes:true,
                    marginRight: 0,
                    events: {
                        load: function () {
                            var count = 10;
                            // set up the updating of the chart each second
                            var series1 = this.series[0];
                            setInterval(function () {
                                var x = count++, 
                                    y = 100;
                                    series1.addPoint([x, y], true, true);
                            }, 1000);

                            var series2 = this.series[1];
                            setInterval(function () {
                                var x = count++, 
                                    y = 200;
                                    series2.addPoint([x, y], true, true);
                            }, 1000);

                            var series3 = this.series[2];
                            setInterval(function () {
                                var x = count++, 
                                    y = 300;
                                    series3.addPoint([x, y], true, true);
                            }, 1000);

                            var series4 = this.series[3];
                            setInterval(function () {
                                var x = count++, 
                                    y = 400;
                                    series4.addPoint([x, y], true, true);
                            }, 1000);
                        }
                    }
                },
                series: [{
                    name: 'Task1',
                    marker: {
                        enabled: false
                    },
                    data: (function () {
                        var data :any[];
                        var time :any;
                        var i: any;
                        data = [],
                        i;

                        var count = 0;
                        for (i = -10; i <= 0; i += 1) {
                            data.push([
                                count++,
                                100
                            ]);
                        }
                    return data;
                    }())
                },
                {
                    name: 'Task2',
                    marker: {
                        enabled: false
                    },
                    data: (function () {
                        var data :any[];
                        var time :any;
                        var i: any;
                        data = [],
                        i;

                        var count = 0;
                        for (i = -10; i <= 0; i += 1) {
                            data.push([
                                count++,
                                200
                            ]);
                        }
                    return data;
                    }())
                },
                {
                    name: 'Task3',
                    marker: {
                        enabled: false
                    },
                    data: (function () {
                        var data :any[];
                        var time :any;
                        var i: any;
                        data = [],
                        i;

                        var count = 0;
                        for (i = -10; i <= 0; i += 1) {
                            data.push([
                                count++,
                                300
                            ]);
                        }
                    return data;
                    }())
                },
                {
                    name: 'Task4',
                    marker: {
                        enabled: false
                    },
                    data: (function () {
                        var data :any[];
                        var time :any;
                        var i: any;
                        data = [],
                        i;

                        var count = 0;
                        for (i = -10; i <= 0; i += 1) {
                            data.push([
                                count++,
                                400
                            ]);
                        }
                    return data;
                    }())
                }]
            };
    }
}

