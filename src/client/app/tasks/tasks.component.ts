/**
 * Created by Everest on 9/23/2016.
 */
import { Component } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-ng2/main';
import { GridOptions } from 'ag-grid/main';

/**
 * This class represents the lazy loaded TasksComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-tasks',
    templateUrl: 'tasks.component.html',
    styleUrls: ['tasks.component.css']
})
export class TasksComponent { 

    private gridOptions:GridOptions;
    private showGrid:boolean;
    private rowData:any[];
    private columnDefs:any[];
    private rowCount:string;

    constructor(){
        this.columnDefs = [
            {headerName: "Make", field: "make"},
            {headerName: "Model", field: "model"},
            {
                headerName: "Price",
                field: "price",
                cellClass: 'rightJustify',
                cellRenderer: function (params: any) {
                    return '$' + params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //thanks http://stackoverflow.com/users/28324/elias-zamaria
                }
            }
        ];
        // put data directly onto the controller
        this.rowData = [
            {make: "Toyota", model: "Celica", price: 35000},
            {make: "Ford", model: "Mondeo", price: 32000},
            {make: "Porsche", model: "Boxter", price: 72000}
        ];
        this.gridOptions = <GridOptions>{};
        
        }
    }
