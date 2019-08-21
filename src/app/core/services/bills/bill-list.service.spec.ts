import { TestBed } from '@angular/core/testing';

import { BillListService } from './bill-list.service';

describe(`BillListService`, () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it(`should be created`, () => {
    const service: BillListService = TestBed.get(BillListService);
    expect(service).toBeTruthy();
  });
});
