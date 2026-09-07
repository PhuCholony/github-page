import { Routes } from '@angular/router'

import * as General from './pages/general'

export const routes: Routes = [
  {
    path: '',
    component: General.HomePageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
]
