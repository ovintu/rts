import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Ng2Highcharts } from 'ng2-highcharts';
import { SimulationService } from '../shared/index';
import { Point } from './index'

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
    time1: Array<Point>;
    time2: Array<Point>;
    time3: Array<Point>;
    time4: Array<Point>;
    chartOptions : any;

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
        this.time1 = new Array<Point>();
        this.time2 = new Array<Point>();
        this.time3 = new Array<Point>();
        this.time4 = new Array<Point>();
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
        var that = this;
        this.init();
        this.socket.on('Task data',function(msg: any){
            try {
                this.json = JSON.parse(msg);
                var name = this.json['Task'];
                console.log(name);
                if (name == 'Task 1'){
                    var point = new Point();
                    point.x = new Date(this.json['Started']);
                    point.y = this.json['Ran'];
                    that.time1.push(point);
                }else if (name == 'Task 2'){
                    var point = new Point();
                    point.x = new Date(this.json['Started']);
                    point.y = this.json['Ran'];
                    that.time2.push(point);
                }else if (name == 'Task 3'){
                    var point = new Point();
                    point.x = new Date(this.json['Started']);
                    point.y = this.json['Ran'];
                    that.time3.push(point);
                }else if (name == 'Task 4'){
                    var point = new Point();
                    point.x = new Date(this.json['Started']);
                    point.y = this.json['Ran'];
                    that.time4.push(point);
                }
            } catch (e) {
                console.log(e);
            }
        });
    }

    ngOnInit(): any {
    }

    init(){
        var that = this;
        this.chartOptions = {
                title:{
                    text: 'Rts'
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    line: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                yAxis: [{
                    title: {
                        text: 'Period'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                }],
                xAxis: [{
                    title: {
                        text: 'Execution time'
                    },
                    lineWidth: 2,
                    type: 'datetime',
                        tickPixelInterval: 150
                    }],
                chart: {
                    renderTo: 'container',
                    zoomType: 'x',
                    type: 'line',
                    events: {
                        load: function () {
                            var count = 0;
                            // set up the updating of the chart each second
                            var series1 = this.series[0];
                            var series2 = this.series[1];
                            var series3 = this.series[2];
                            var series4 = this.series[3];
                            setInterval(function () {
                                if (that.time1 != null){
                                    while(that.time1.length > 0){
                                        var p = that.time1.pop();
                                        if (p != null){
                                            var x =  new Date(p.x + p.y), 
                                            y = 10;
                                            series1.addPoint([x, y], true, true);
                                            series2.addPoint([x,10], true, true);
                                            series3.addPoint([x,20], true, true);
                                            series4.addPoint([x,30], true, true);
                                        }   
                                    }
                                } 
                                if (that.time2 != null){
                                    while(that.time2.length > 0){
                                        var p = that.time2.pop();
                                        if (p != null){
                                            var x =  new Date(p.x + p.y), 
                                            y = 20;
                                            series1.addPoint([x, 0], true, true);
                                            series2.addPoint([x, y], true, true);
                                            series3.addPoint([x, 20], true, true);
                                            series4.addPoint([x, 30], true, true);
                                        }   
                                    }
                                } 
                                if (that.time3 != null){
                                    while(that.time3.length > 0){
                                        var p = that.time3.pop();
                                        if (p != null){
                                            var x =  new Date(p.x + p.y), 
                                            y = 30;
                                            series1.addPoint([x, 0], true, true);
                                            series2.addPoint([x, 10], true, true);
                                            series3.addPoint([x, y], true, true);
                                            series4.addPoint([x, 30], true, true);
                                        }   
                                    }
                                }
                                if (that.time4 != null){
                                    while(that.time4.length > 0){
                                        var p = that.time4.pop();
                                        if (p != null){
                                            var x =  new Date(p.x + p.y), 
                                            y = 40;
                                            series1.addPoint([x, 0], true, true);
                                            series2.addPoint([x, 10], true, true);
                                            series3.addPoint([x, 20], true, true);
                                            series4.addPoint([x, y], true, true);
                                        }   
                                    }
                                }
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
                        // generate an array of random data
                        var data :any = [],
                        i :any;
                        var count = 0;
                        for (i = -100; i <= 0; i += 1) {
                            data.push([
                                0,
                                0
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
                        // generate an array of random data
                        var data :any = [],
                        i :any;
                        var count = 0;
                        for (i = -100; i <= 0; i += 1) {
                            data.push([
                                0,
                                10
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
                        // generate an array of random data
                        var data :any = [],
                        i :any;
                        var count = 0;
                        for (i = -100; i <= 0; i += 1) {
                            data.push([
                                0,
                                20
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
                        // generate an array of random data
                        var data :any = [],
                        i :any;
                        var count = 0;
                        for (i = -100; i <= 0; i += 1) {
                            data.push([
                                0,
                                30
                            ]);
                        }
                        return data;
                    }())
                }]
            };
    }
}

