/**
 * Created by Everest on 9/23/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';

import {AgGridModule} from 'ag-grid-ng2/main';

@NgModule({
    imports: [CommonModule, AgGridModule],
    declarations: [TasksComponent],
    exports: [TasksComponent]
})

export class TasksModule { }
