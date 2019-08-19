import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Bill } from '@core/models/bills/bill.model';
import { BillService } from '@core/services/bills/bill.service';

@Component({
    selector   : `app-bills-form`,
    templateUrl: `./form.component.html`,
    styleUrls  : [ `./form.component.scss` ],
})
export class FormComponent implements OnInit {

    public form;

    constructor(private service: BillService) { }

    ngOnInit() {
        this._createForm();
    }

    private _createForm() {
        this.form = new FormGroup({
            name: new FormControl(),
            dueDate: new FormControl(),
        });
    }

    public save() {
        const bill = new Bill(this.form.getRawValue());

        this.service.add(bill);
    }
}
