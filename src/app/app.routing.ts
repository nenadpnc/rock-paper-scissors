import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CompVsCompComponent } from './compVsComp/compVsComp.component';

const routes: Routes = [
  { path: 'humanVsComp', component: HomeComponent },
  { path: 'compVsComp', component: CompVsCompComponent },
  { path: '', redirectTo: 'humanVsComp', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);
