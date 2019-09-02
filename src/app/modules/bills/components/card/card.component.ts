import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Bill } from '@core/models/bills/bill.model';
import { STATUS_PAID, STATUS_UNPAID } from '@core/models/bills/status';

import { BillService } from '@core/services/bills/bill.service';
import { BillListService } from '@core/services/bills/bill-list.service';
import { NotificationService } from '@shared/notification/services/notification.service';

@Component({
	selector   : `app-bills-card`,
	templateUrl: `./card.component.html`,
	styleUrls  : [ `./card.component.scss` ],
})
export class CardComponent implements OnInit {

	@Input(`bill`) bill: Bill;

	@Output() remove = new EventEmitter();

	public statusList;

	constructor(private service: BillService,
				private listService: BillListService,
				private notificationService: NotificationService,
				private router: Router) { }

	ngOnInit() {
		this._getStatusList();
	}

	private _getStatusList() {
		this.statusList = {
			paid  : STATUS_PAID,
			unpaid: STATUS_UNPAID,
		};
	}

	public changeStatus(status: string) {
		this.bill.changeStatus(status);

		if (status === STATUS_PAID) {
			this.service.markPaid(this.bill.id, this.bill);
		} else {
			this.service.update(this.bill.id, this.bill);
		}

		this.listService.triggerUpdate();
		this.notificationService.success(`The ${this.bill.name} bill was successfully marked as ${status}`);
	}

	public removeBill() {
		this.service.delete(this.bill.id);
		this.remove.emit();
	}

	public seeDetails() {
		this.router.navigate([ `/${this.bill.id}` ]);
	}
}
