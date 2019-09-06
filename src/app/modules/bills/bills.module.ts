import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BillsRoutingModule } from './bills-routing.module';
import { BillService } from '@core/services/bills/bill.service';
import { BillListService } from '@core/services/bills/bill-list.service';

import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';

import { FormComponent } from './components/form/form.component';
import { CardComponent } from './components/card/card.component';

import { PaginationModule } from '@shared/pagination/pagination.module';
import { DatepickerComponent } from '@shared/datepicker/datepicker.component';

@NgModule({
	declarations   : [
		ListComponent,
		FormComponent,
		DetailsComponent,
		CardComponent,
		DatepickerComponent,
	],
	imports        : [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		BillsRoutingModule,
		PaginationModule,
	],
	entryComponents: [ ListComponent ],
	providers      : [
		BillService,
		BillListService,
	],
})
export class BillsModule {}
