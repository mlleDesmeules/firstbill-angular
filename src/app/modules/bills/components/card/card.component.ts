import { Component, Input, OnInit } from '@angular/core';

import { IBill } from '@core/models/bills/bill.interface';

@Component({
    selector   : `app-bills-card`,
    templateUrl: `./card.component.html`,
    styleUrls  : [ `./card.component.scss` ],
})
export class CardComponent implements OnInit {

    @Input(`bill`) bill: IBill;

    constructor() { }

    ngOnInit() {
    }

}
