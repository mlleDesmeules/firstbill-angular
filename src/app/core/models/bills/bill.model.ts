import { IBill } from './bill.interface';

import { STATUS_UNPAID } from '@core/models/bills/status';
import { FREQUENCY_MONTHLY, find as findFrequency } from '@core/models/bills/frequency';

import * as moment from 'moment';

export class Bill implements IBill {
	public id: number;
	public name = ``;
	public dueDate = ``;
	public frequency = FREQUENCY_MONTHLY;
	public status = STATUS_UNPAID;
	public amount = 0;
	public previousBillId: number;
	public autoPay = 0;

	constructor(data: Partial<Bill>) {
		this.id = Number(data.id || 0);

		this.update(data);
	}

	changeStatus(status: string) {
		this.status = status;
	}

	getNextBill() {
		const nextBill = new Bill(this);

		nextBill.id = 0;
		nextBill.previousBillId = this.id;
		nextBill.changeStatus(STATUS_UNPAID);
		nextBill.setNextDueDate();

		return nextBill;
	}

	update(data: Partial<Bill>) {
		Object.assign(this, data);
	}

	setNextDueDate() {
		const frequency = findFrequency(this.frequency);
		const dueDate 	= moment(this.dueDate).toISOString();

		this.dueDate = moment(dueDate).add(frequency.duration).toISOString();
	}
}
