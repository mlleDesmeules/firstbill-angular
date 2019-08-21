import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Bill } from '@core/models/bills/bill.model';

@Component({
    selector   : `app-details`,
    templateUrl: `./details.component.html`,
    styleUrls  : [ `./details.component.scss` ],
})
export class DetailsComponent implements OnInit {

    public bill: Bill;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this._getBill();
    }

    private _getBill() {
        this.route.data
            .subscribe((data: { bill: Bill }) => {
                this.bill = data.bill || new Bill({});
            });
    }
}
