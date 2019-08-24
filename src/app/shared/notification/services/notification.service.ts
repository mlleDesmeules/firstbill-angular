import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Notification, NotificationPosition, NotificationType } from '../models/notification.model';

@Injectable({
    providedIn: `root`,
})
export class NotificationService {
    private subject = new Subject<Notification>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    //  should ony keep alert for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        });
    }

    public clear(notificationID?: string) {
        this.subject.next(new Notification({ id: notificationID }));
    }

    public error(message: string, notificationID?: string, position: NotificationPosition = NotificationPosition.BOTTOM_RIGHT) {
        this.notify(new Notification({ message, type: NotificationType.error, id: notificationID, position }));
    }

    public info(message: string, notificationID?: string, position: NotificationPosition = NotificationPosition.BOTTOM_RIGHT) {
        this.notify(new Notification({ message, type: NotificationType.info, id: notificationID, position }));
    }

    public notify(notification: Notification) {
        this.keepAfterRouteChange = notification.keepAfterRouteChange;
        this.subject.next(notification);
    }

    public onNotify(notificationID?: string): Observable<Notification> {
        return this.subject.asObservable().pipe(filter((x) => x && x.id === notificationID));
    }

    public success(message: string, notificationID?: string, position: NotificationPosition = NotificationPosition.BOTTOM_RIGHT) {
        this.notify(new Notification({ message, type: NotificationType.success, id: notificationID, position }));
    }

    public warn(message: string, notificationID?: string, position: NotificationPosition = NotificationPosition.BOTTOM_RIGHT) {
        this.notify(new Notification({ message, type: NotificationType.warning, id: notificationID, position }));
    }
}
