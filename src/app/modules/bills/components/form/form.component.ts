import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Bill } from '@core/models/bills/bill.model';
import { FREQUENCIES, FREQUENCY_MONTHLY } from '@core/models/bills/frequency';
import { BillService } from '@core/services/bills/bill.service';

@Component({
    selector   : `app-bills-form`,
    templateUrl: `./form.component.html`,
    styleUrls  : [ `./form.component.scss` ],
})
export class FormComponent implements OnInit, OnChanges {

    @Input() bill: Bill;

    public form;
    public frequencyList = [];

    constructor(private builder: FormBuilder,
                private service: BillService) { }

    ngOnInit() {
        this._createForm();
        this._getFrequencyList();
    }

    ngOnChanges() {
        this._createForm();
    }

    /**
     * Create form
     *
     * This method will create the form object and set all of its possible attributes, with the
     * appropriate values as default (when necessary).
     */
    private _createForm() {
        this.form = this.builder.group({
            name     : [this.bill.name],
            amount   : [this.bill.amount],
            frequency: [this.bill.frequency || FREQUENCY_MONTHLY],
            dueDate  : [this.bill.dueDate],
        });
    }

    /**
     * Get frequency list
     *
     * This method will get the list of possible frequencies and sort them in the display
     * order.
     */
    private _getFrequencyList() {
        this.frequencyList = FREQUENCIES;

        this.frequencyList.sort((a, b) => Number(a.order > b.order));
    }

    /**
     * Save form
     *
     * This method will get the form's data, create an Bill object with it and then calling the
     * bill service to save the Bill. The Bill model is created before sending the object to
     * make sure that all of the attributes that can have default values have them.
     */
    public save() {
        const data = {
            name: this.form.get(`name`).value,
            amount: this.form.get(`amount`).value,
            dueDate: this.form.get(`dueDate`).value,
            frequency: this.form.get(`frequency`).value,
        };

        const bill = new Bill(data);

        this.service.add(bill);
    }

    /**
     * Reset form
     *
     * This method will call the method creating the form to reset all of it's value to what it
     * was on page load.
     */
    public reset() {
        this._createForm();
    }
}
