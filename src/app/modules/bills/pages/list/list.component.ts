import { Component, OnInit } from '@angular/core';

import { BillListService } from '@core/services/bills/bill-list.service';
import { BillService } from '@core/services/bills/bill.service';

@Component({
	selector   : `app-list`,
	templateUrl: `./list.component.html`,
	styleUrls  : [ `./list.component.scss` ],
})
export class ListComponent implements OnInit {

	public perPage 	   = 2;
	public currentPage = 1;

	public list = [];
	public partialList = [];

	constructor(private service: BillService,
				private listService: BillListService) { }

	ngOnInit() {
		this.getList();

		this.listService
			.updateList()
			.subscribe(() => {
				this.getList();
			});
	}

	private getList() {
		this.list = this.service.get();
		this.getPartialList();
	}

	private getPartialList() {
		const firstItem = (this.currentPage - 1) * this.perPage;
		const lastItem  = firstItem + this.perPage;

		this.partialList = this.list.filter((val, idx) => {
			return (idx >= firstItem && idx < lastItem);
		});
	}

	public goToPage(pageNumber) {
		this.currentPage = pageNumber;
		this.getPartialList();
	}

	public updateList() {
		this.getList();
	}
}
