import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BillService } from '@core/services/bills/bill.service';
import { Bill } from '@core/models/bills/bill.model';
import { Observable } from 'rxjs';

@Injectable()
export class BillDetailResolve implements Resolve<Bill> {

    constructor(private service: BillService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Bill> | Promise<Bill> | Bill {
        return this.service.get(route.paramMap.get(`id`));
    }
}
