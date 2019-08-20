import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Bill } from '@core/models/bills/bill.model';
import { FREQUENCIES, FREQUENCY_MONTHLY } from '@core/models/bills/frequency.model';
import { BillService } from '@core/services/bills/bill.service';

@Component({
    selector   : `app-bills-form`,
    templateUrl: `./form.component.html`,
    styleUrls  : [ `./form.component.scss` ],
})
export class FormComponent implements OnInit {

    public form;
    public frequencyList = [];

    constructor(private builder: FormBuilder,
                private service: BillService) { }

    ngOnInit() {
        this._createForm();
        this._getFrequencyList();
    }

    private _createForm() {
        this.form = this.builder.group({
            name     : [`Test`],
            amount   : [`120`],
            frequency: [ FREQUENCY_MONTHLY ],
            dueDate  : [`2019/09/02`],
        });
    }

    private _getFrequencyList() {
        this.frequencyList = FREQUENCIES;

        this.frequencyList.sort((a, b) => Number(a.order > b.order));
    }

    public save() {
        const data = {
            name: this.form.get(`name`).value,
            amount: this.form.get(`amount`).value,
            dueDate: this.form.get(`dueDate`).value,
            frequency: this.form.get(`frequency`).value,
        };

        console.log(data);

        const bill = new Bill(data);

        this.service.add(bill);
    }
}
