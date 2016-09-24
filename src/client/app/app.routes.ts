import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { SimulationRoutes } from './simulation/index';
import { TasksRoutes } from './tasks/index'
import { HomeRoutes } from './home/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...TasksRoutes,
  ...SimulationRoutes,
  ...AboutRoutes
];
