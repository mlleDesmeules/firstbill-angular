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
	navDate: any;

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
		this.navDate   = moment();
		this.dateInput = new FormControl(``);
	}

	writeValue(value: any): void {
		this.selectedDate = value;
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched() {}

	changeNavMonth(num: number) {
		this.navDate.add(num, `month`);
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

			list.push({
				value    : day.date(),
				available: true,
				fullDate : day.toISOString(),
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

	/**
	 * Is Current Month
	 *
	 * This method will check if the date passed as argument is a date of the current month. This
	 * is necessary since the calendar shown will contain dates for the previous and/or next month
	 * and those numbers should be displayed a bit differently.
	 */
	isCurrentMonth(date: string): boolean {
		return moment(date).isSame(this.navDate, `month`);
	}

	/**
	 * Is Selected
	 *
	 * This method will return if the date passed as argument is the selected date. So it will
	 * compare the date, the month and the year to make sure they match, no need to check the
	 * time since we only care about the date.
	 */
	isSelected(date: string): boolean {
		if (!this.selectedDate) {
			return false;
		}

		const day   = moment(date).isSame(this.selectedDate, `day`);
		const month = moment(date).isSame(this.selectedDate, `month`);
		const year  = moment(date).isSame(this.selectedDate, `year`);

		return (day && month && year);
	}

	/**
	 * Is Today
	 *
	 * This method will return if the date passed as argument is today. So it will compare the
	 * date, the month and the year. This type of comparison is necessary since we don't care
	 * about the specific time.
	 */
	isToday(date: string): boolean {
		const today = moment();

		const day   = moment(date).isSame(today, `day`);
		const month = moment(date).isSame(today, `month`);
		const year  = moment(date).isSame(today, `year`);

		return (day && month && year);
	}

	selectDate(date: string) {
		this.selectedDate = moment(date);
	}

	selectToday() {
		this.selectDate(moment().toISOString());
	}

	clearSelection() {
		this.selectedDate = null;
	}

	cancelChanges() {
		// TODO revert selectedDate to original value
	}
}
