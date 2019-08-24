import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector   : `app-pagination`,
	templateUrl: `./pagination.component.html`,
	styleUrls  : [ `./pagination.component.scss` ],
})
export class PaginationComponent implements OnInit {

	static PAGES_TO_SHOW = 3;

	@Input() totalItems: number;
	@Input() currentPage: number;
	@Input() perPage = 15;

	@Output() goPage = new EventEmitter<number>();

	constructor() { }

	ngOnInit() {
	}

	getCurrentPage(): number {
		if (this.currentPage < 1) {
			return 1;
		} else if (this.currentPage > this.getTotalPages()) {
			return this.getTotalPages();
		}

		return Number(this.currentPage);
	}

	getPages() {
		const totalPages  = this.getTotalPages();
		const currentPage = this.getCurrentPage();
		const range = [];

		const pageBefore = (currentPage === totalPages) ? currentPage - 2 : currentPage - 1;
		const pageAfter  = (currentPage === 1) ? currentPage + 2 : currentPage + 1;

		for (let i = 1; i <= totalPages; i ++) {
			if (i === 1 || i === totalPages || i === currentPage || (i >= pageBefore && i <= pageAfter)) {
				range.push(i);
			} else if (i === (pageBefore - 1) || i === (pageAfter + 1)) {
				range.push(`\&hellip;`);
			}
		}

		return range;
	}

	getTotalPages(): number {
		return Math.ceil(this.totalItems / this.perPage) || 0;
	}

	goToPage(page) {
		this.goPage.emit(page);
	}

	isNumber(name): boolean {
		return (typeof name === `number`);
	}
}
