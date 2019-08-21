import { Component, OnInit } from '@angular/core';

import { BillListService } from '@core/services/bills/bill-list.service';
import { BillService } from '@core/services/bills/bill.service';

@Component({
    selector   : `app-list`,
    templateUrl: `./list.component.html`,
    styleUrls  : [ `./list.component.scss` ],
})
export class ListComponent implements OnInit {

    public list = [];

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
    }

    public updateList() {
        this.getList();
    }
}
