import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';

import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
    { path: ``, component: ListComponent },
    { path: `create`, component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsRoutingModule { }
