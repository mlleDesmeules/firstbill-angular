import { Component, ElementRef, forwardRef, HostListener, Input, OnInit } from '@angular/core';
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

	private originalDate: any = null;

	pickerOpen = false;
	dateInput: FormControl;
	activeMonth: any;

	// tslint:disable-next-line:variable-name
	@Input() _selectedDate: any;

	get selectedDate() {
		return this._selectedDate ? moment(this._selectedDate) : ``;
	}

	set selectedDate(value: any) {
		this._selectedDate = value;
		this.dateInput.setValue(this.formatDate(this._selectedDate, `DD/MM/YYYY`));

		if (!this.originalDate) {
			this.originalDate = value;
		}

		this.propagateChange(this._selectedDate);
	}

	propagateChange = (_: any) => {};

	@HostListener(`document:click`, [`$event.target`])
	close(targetElement) {
		if (targetElement === null) {
			this.pickerOpen = false;
			return;
		}

		if (this.elementRef.nativeElement.contains(targetElement)) {
			return;
		}

		let insideDatepicker = false;

		Object.keys(targetElement.parentNode.classList).forEach((key) => {
			const classes = targetElement.parentNode.classList;

			if (classes[key].indexOf(`datepicker`) > -1 || classes[key].indexOf(`datetimepicker`) > -1) {
				insideDatepicker = true;
				return;
			}
		});

		if (this.pickerOpen && !insideDatepicker) {
			this.pickerOpen = false;
		}
	}

	constructor(private elementRef: ElementRef) { }

	ngOnInit() {
		this.activeMonth   = moment();
		this.dateInput = new FormControl(``);
	}

	writeValue(value: any): void {
		this.selectedDate = value;
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched() {}

	/**
	 * Change active month
	 *
	 * This method will change the active month which will trigger a change in the
	 * list of days to be displayed.
	 */
	changeActiveMonth(num: number) {
		this.activeMonth.add(num, `month`);
	}

	/**
	 * Format date
	 *
	 * This method will get the date passed as argument and format it to get it either
	 * in the proper format or only a part of the date.
	 */
	formatDate(date: any, format?: string): string {
		if (!date) {
			return ``;
		}

		return moment(date).format(format);
	}

	getDays(): {date: string, available: boolean}[] {
		const firstDay  = moment(this.activeMonth).startOf(`month`);
		const lastDay   = moment(this.activeMonth).endOf(`month`);

		const startEmpty = firstDay.weekday();
		const lastEmpty  = 6 - lastDay.weekday();

		const gridSize = startEmpty + lastEmpty + moment(this.activeMonth).daysInMonth();

		const list = [];

		for (let i = 0; i < gridSize; i++) {
			let day = null;

			if (i < startEmpty) {
				const lastMonth = moment(this.activeMonth).subtract(1, `months`);

				day = lastMonth.endOf(`month`).subtract(startEmpty - i - 1, `days`);
			} else if (i >= gridSize - lastEmpty) {
				const nextMonth = moment(this.activeMonth).add(1, `months`);

				day = nextMonth.startOf(`month`).add(i - (gridSize - lastEmpty), `days`);
			} else {
				day = moment(this.activeMonth).date(i - startEmpty + 1);
			}

			list.push({
				date : day.toISOString(),
				available: true,
			});
		}

		return list;
	}

	/**
	 * Get weekdays
	 *
	 * This method will get every weekday abbreviation and in the correct order depending
	 * on the locale.
	 */
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
		return moment(date).isSame(this.activeMonth, `month`);
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

	/**
	 * Select date
	 *
	 * This method will set the date passed as argument as the selected date.
	 */
	selectDate(date: string) {
		this.selectedDate = moment(date);

		const monthDiff = this.selectedDate.get(`month`) - this.activeMonth.get(`month`);

		this.changeActiveMonth(monthDiff);
	}

	/**
	 * Select today
	 *
	 * This method will set today as the selected date.
	 */
	selectToday() {
		this.selectDate(moment().toISOString());
	}

	/**
	 * Clear selection
	 *
	 * This method will remove any date from the selection.
	 */
	clearSelection() {
		this.selectedDate = null;
	}

	/**
	 * Cancel changes
	 *
	 * This method will close the picker and set the selected date back to it's original value.
	 */
	cancelChanges() {
		this.selectedDate = this.originalDate;
		this.close(null);
	}
}
