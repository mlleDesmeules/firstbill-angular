import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Bill } from '@core/models/bills/bill.model';
import { STATUS_PAID, STATUS_UNPAID } from '@core/models/bills/status';

import { BillService } from '@core/services/bills/bill.service';

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

        this.service.update(this.bill.id, this.bill);
    }

    public removeBill() {
        this.service.delete(this.bill.id);
        this.remove.emit();
    }

    public seeDetails() {
        this.router.navigate([`/${this.bill.id}`]);
    }
}
