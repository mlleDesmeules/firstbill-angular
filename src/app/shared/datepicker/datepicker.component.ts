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

			if (i < startEmpty) {
				const lastMonth = moment(this.navDate).subtract(1, `months`);

				day = lastMonth.endOf(`month`).subtract(startEmpty - i - 1, `days`);
			} else if (i >= gridSize - lastEmpty) {
				const nextMonth = moment(this.navDate).add(1, `months`);

				day = nextMonth.startOf(`month`).add(i - (gridSize - lastEmpty), `days`);
			} else {
				day = moment(this.navDate).date(i - startEmpty + 1);
			}

			console.log(this._getDayObject(day));

			list.push(this._getDayObject(day));
		}

		return list;
	}

	_getDayObject(day) {
		return {
			value       : day.date(),
			available   : true,
			fullDate    : day.toISOString(),
			isToday     : day.isSame(moment(), `day`) && day.isSame(moment(), `month`),
			currentMonth: day.isSame(this.navDate, `month`),
		};
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
