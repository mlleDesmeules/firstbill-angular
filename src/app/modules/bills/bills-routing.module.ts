import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillDetailResolve } from '@core/services/bills/bill-detail.resolve';

import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
	{
		path     : ``,
		component: ListComponent,
		children : [
			{
				path     : `create`,
				component: DetailsComponent,
			},
			{
				path     : `:id`,
				component: DetailsComponent,
				resolve  : { bill: BillDetailResolve },
			},
		],
	},
];

@NgModule({
	imports  : [ RouterModule.forChild(routes) ],
	exports  : [ RouterModule ],
	providers: [
		BillDetailResolve,
	],
})
export class BillsRoutingModule {}
