import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

@Component({
	selector   : `app-datepicker`,
	templateUrl: `./datepicker.component.html`,
	styleUrls  : [ `./datepicker.component.scss` ],
	providers  : [
		{
			provide    : NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DatepickerComponent),
			multi      : true,
		},
	],
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {

	pickerOpen = false;
	dateInput: FormControl;
	days: any[] = [];
	weekdays: string[] = [];

	displayedMonth: any;

	@Input()
	_selectedDate: any;

	get selectedDate() {
		return this._selectedDate ? moment(this._selectedDate) : ``;
	}

	set selectedDate(value: any) {
		this._selectedDate = value;
		this.dateInput.setValue(this.formatSelectedDate());
		this.propagateChange(this._selectedDate);
	}

	propagateChange = (_: any) => {};

	constructor() { }

	ngOnInit() {
		this.displayedMonth = moment();
		this.dateInput 		= new FormControl(``);

		this.weekdays = this.getWeekdays();
		this.days 	  = this.getDays();
	}

	writeValue(value: any): void {
		this.selectedDate = value;
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched() {}

	cancelChanges() {
		// TODO revert selectedDate to original value
		this.pickerOpen = false;
	}

	changeNavMonth(num: number) {
		this.displayedMonth.add(num, `month`);
		this.days = this.getDays();
	}

	clearSelection() {
		this.selectedDate = null;
	}

	formatSelectedDate(format?: string): string {
		if (!this.selectedDate) {
			return format === `date` ? `-` : ``;
		}

		switch (format) {
			case `date`:
				return this.selectedDate.format(`DD`);
			case `month`:
				return this.selectedDate.format(`MMMM YYYY`);
			case `day`:
				return this.selectedDate.format(`dddd`);
			default:
				return this.selectedDate.format(`DD/MM/YYYY`);
		}
	}

	getDays(): any[] {
		const firstDay  = moment(this.displayedMonth).startOf(`month`);
		const lastDay   = moment(this.displayedMonth).endOf(`month`);

		const startEmpty = firstDay.weekday();
		const lastEmpty  = 6 - lastDay.weekday();

		const gridSize = startEmpty + lastEmpty + moment(this.displayedMonth).daysInMonth();

		const list = [];

		for (let i = 0; i < gridSize; i++) {
			let day = null;

			if (i < startEmpty) {
				const lastMonth = moment().utc(this.displayedMonth).subtract(1, `months`);

				day = lastMonth.endOf(`month`).subtract(startEmpty - i - 1, `days`);
			} else if (i >= gridSize - lastEmpty) {
				const nextMonth = moment().utc(this.displayedMonth).add(1, `months`);

				day = nextMonth.startOf(`month`).add(i - (gridSize - lastEmpty), `days`);
			} else {
				day = moment().utc(this.displayedMonth).date(i - startEmpty + 1);
			}

			console.log('here');

			list.push({
				value       : day.date(),
				available   : true,
				fullDate    : day.toISOString(),
				isToday     : day.isSame(moment(), `day`) && day.isSame(moment(), `month`),
				currentMonth: day.isSame(this.displayedMonth, `month`),
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
		if (!this.selectedDate) {
			return false;
		}

		const day   = moment(date).isSame(this.selectedDate, `day`);
		const month = moment(date).isSame(this.selectedDate, `month`);
		const year  = moment(date).isSame(this.selectedDate, `year`);

		return (day && month && year);
	}

	selectDate(date: string) {
	  	this.selectedDate = moment(date).toISOString();
	}

	selectToday() {
		this.selectDate(moment().toISOString());
	}
}
