import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '@shared/pagination/pagination.module';

import { BillsRoutingModule } from './bills-routing.module';
import { BillService } from '@core/services/bills/bill.service';
import { BillListService } from '@core/services/bills/bill-list.service';

import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';

import { FormComponent } from './components/form/form.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
    declarations   : [
        ListComponent,
        FormComponent,
        DetailsComponent,
        CardComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BillsRoutingModule,
        PaginationModule,
    ],
    entryComponents: [ ListComponent ],
    providers: [
        BillService,
        BillListService,
    ],
})
export class BillsModule {}
