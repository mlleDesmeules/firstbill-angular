import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Notification } from './models/notification.model';
import { NotificationService } from './services/notification.service';

@Component({
    selector   : `app-notification`,
    templateUrl: `./notification.component.html`,
    styleUrls  : [ `./notification.component.scss` ],
})
export class NotificationComponent implements OnInit, OnDestroy {

    @Input() id: string;

    notifications: Notification[] = [];
    subscription: Subscription;

    constructor(private service: NotificationService) { }

    ngOnInit() {
        this.listenForNotifications();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private listenForNotifications() {
        this.subscription = this.service.onNotify(this.id)
            .subscribe((notification) => {
                if (!notification.message) {
                    this.notifications = [];
                    return;
                }

                this.notifications.push(notification);
            });
    }

    public remove(notification: Notification) {
        this.notifications = this.notifications.filter((x) => x !== notification);
    }
}
