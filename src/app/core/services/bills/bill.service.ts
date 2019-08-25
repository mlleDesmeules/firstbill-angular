import { Injectable } from '@angular/core';
import { Bill } from '@core/models/bills/bill.model';

@Injectable()
export class BillService {

	private static STORAGE_KEY = `listBills`;

	constructor() { }

	static _updateStorage(data) {
		localStorage.setItem(BillService.STORAGE_KEY, JSON.stringify(data));
	}

	public add(bill: Bill) {
		bill.id = this._getNextID();

		const list = this.get();

		list.push(bill);

		BillService._updateStorage(list);
	}

	public delete(id) {
		const list = this.get();
		const result = list.filter((item) => item.id !== id);

		BillService._updateStorage(result);
	}

	public get(id: number | string = null) {
		let result = JSON.parse(localStorage.getItem(BillService.STORAGE_KEY)) || [];
		result = result.map((item) => new Bill(item));

		if (id) {
			result = result.filter((val) => val.id === Number(id));
			result = result[ 0 ] || null;
		}

		return result;
	}

	public update(id: number, bill: Bill) {
		const update = this.get().map((item: Bill) => {
			if (item.id === id) {
				return bill;
			} else {
				return item;
			}
		});

		BillService._updateStorage(update);
	}

	/**
	 * Get next ID
	 *
	 * This method will find the highest ID existing in the list of bills and return the
	 * next possible ID.
	 */
	private _getNextID(): number {
		const list = this.get();
		const ids = list.map((item) => item.id);

		//  if there is no IDs
		if (ids.length === 0) {
			ids.push(0);
		}

		return Math.max(...ids) + 1;
	}
}
