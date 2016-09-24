/**
 * Created by Everest on 9/23/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SimulationComponent } from './simulation.component';

import { Ng2HighchartsModule } from 'ng2-highcharts';

@NgModule({
    imports: [CommonModule, SharedModule, Ng2HighchartsModule],
    declarations: [SimulationComponent],
    exports: [SimulationComponent]
})

export class SimulationModule { }
