import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
	selector   : `app-datepicker`,
	templateUrl: `./datepicker.component.html`,
	styleUrls  : [ `./datepicker.component.scss` ],
})
export class DatepickerComponent implements OnInit {

	selectedDate: any;
	navDate: any;

	constructor() { }

	ngOnInit() {
		this.navDate = moment();

		this.getDays();
	}

	changeNavMonth(num: number) {
		this.navDate.add(num, `month`);
	}

	getDays(): any[] {
		const firstDay  = moment(this.navDate).startOf(`month`);
		const lastDay   = moment(this.navDate).endOf(`month`);

		const startEmpty = firstDay.weekday();
		const lastEmpty  = 6 - lastDay.weekday();

		const gridSize = startEmpty + lastEmpty + moment(this.navDate).daysInMonth();

		const list = [];

		for (let i = 0; i < gridSize; i++) {
			let day = null;

			if (i < startEmpty || i >= gridSize - lastEmpty) {
				day = null;
			} else {
				day = (i - startEmpty + 1);
			}

			const date = moment(moment(this.navDate).date(day));

			list.push({
				value    : day,
				available: (day !== null),
				isToday  : date.isSame(moment(), `day`),
				fullDate : date.toISOString(),
			});
		}

		return list;
	}

	getWeekdays(): string[] {
		const list: number[]   = [0, 1, 2, 3, 4, 5, 6];
		const result: string[] = [];

		list.forEach((day) => {
			result.push(moment().weekday(day).format(`ddd`));
		});

		return result;
	}

	isSelected(date: string): boolean {
		return (date === moment(this.selectedDate).toISOString());
	}

	selectDate(date: string) {
	  	this.selectedDate = moment(date);
	}
}
