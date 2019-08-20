import { Component, OnInit } from '@angular/core';

import { Bill } from '@core/models/bills/bill.model';
import { BillService } from '@core/services/bills/bill.service';

@Component({
    selector   : `app-list`,
    templateUrl: `./list.component.html`,
    styleUrls  : [ `./list.component.scss` ],
})
export class ListComponent implements OnInit {

    public list = [];

    constructor(private service: BillService) { }

    ngOnInit() {
        this.getList();
    }

    private getList() {
        this.list = this.service.get();
    }

    public updateList() {
        this.getList();
    }
}
