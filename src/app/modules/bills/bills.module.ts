import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    BillsRoutingModule,
  ],
  entryComponents: [ListComponent],
})
export class BillsModule { }
