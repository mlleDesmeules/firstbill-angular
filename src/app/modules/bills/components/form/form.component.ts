import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Bill } from '@core/models/bills/bill.model';
import { FREQUENCIES, FREQUENCY_MONTHLY } from '@core/models/bills/frequency';

import { BillListService } from '@core/services/bills/bill-list.service';
import { BillService } from '@core/services/bills/bill.service';
import { NotificationService } from '@shared/notification/services/notification.service';

import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';


@Component({
	selector   : `app-bills-form`,
	templateUrl: `./form.component.html`,
	styleUrls  : [ `./form.component.scss` ],
})
export class FormComponent implements OnInit, OnChanges {

	@Input() bill: Bill;

	public form;
	public frequencyList = [];
	private calendars: any[];

	constructor(private builder: FormBuilder,
				private listService: BillListService,
				private notificationService: NotificationService,
				private service: BillService) { }

	ngOnInit() {
		this._getFrequencyList();
	}

	ngOnChanges() {
		this._createForm();
	}

	private _attachCalendar() {
		this.calendars = bulmaCalendar.attach(`[type="date"]`);
	}

	/**
	 * Create form
	 *
	 * This method will create the form object and set all of its possible attributes, with the
	 * appropriate values as default (when necessary).
	 */
	private _createForm() {
		this.form = this.builder.group({
			name     : [ this.bill.name ],
			amount   : [ this.bill.amount ],
			frequency: [ this.bill.frequency || FREQUENCY_MONTHLY ],
			dueDate  : [ this.bill.dueDate ],
		});

		this._attachCalendar();
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
			name     : this.form.get(`name`).value,
			amount   : this.form.get(`amount`).value,
			dueDate  : this.calendars[0].value(),
			frequency: this.form.get(`frequency`).value,
		};

		let message = `Changes to the bill were correctly saved`;

		if (this.bill.id) {
			this.bill.update(data);

			this.service.update(this.bill.id, this.bill);
		} else {
			const bill = new Bill(data);
			message = `A new bill has just been created`;

			this.service.add(bill);
			this.reset();
		}

		this.listService.triggerUpdate();
		this.notificationService.success(message);
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
