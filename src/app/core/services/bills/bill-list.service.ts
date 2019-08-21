import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BillListService {
    private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    public updateList(): Observable<any> {
        return this.subject.asObservable();
    }

    public triggerUpdate() {
        this.subject.next(true);
    }
}
