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
        chart: {
            type: 'line'
        },
        title: {
            text: 'Rts',
            style: {
                color: '#CCC'
            }
        },
        yAxis: {
            title: {
                text: 'Period'
            }
        },
        xAxis: {
            categories: ['test']
        },
        series: [{
                    name: 'Task1',
                    data: ['0']
                }, {
                    name: 'Task2',
                    data: ['0']
                }, {
                    name: 'Task3',
                    data: ['0']
                }, {
                    name: 'Task4',
                    data: ['0']
                }]
    };

    ngOnInit(): any {
        this.init();
    }

    init(){
        setInterval(() => {
            this.chartOptions = {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Rts',
                    style: {
                        color: '#CCC'
                    }
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: 'Period'
                    }
                },
                series: [{
                    name: 'Task1',
                    data: [10, 10, 10, 10, 10, 10]
                }, {
                    name: 'Task2',
                    data: [20, 20, 20, 20, 20, 20]
                }, {
                    name: 'Task3',
                    data: [30, 30, 30, 30, 30, 30]
                }, {
                    name: 'Task4',
                    data: [40, 40, 40, 40, 40, 40]
                }]
            };
        }, 3000);
    }
}

