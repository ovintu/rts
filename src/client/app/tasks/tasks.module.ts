/**
 * Created by Everest on 9/23/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TasksComponent],
    exports: [TasksComponent]
})

export class TasksModule { }
