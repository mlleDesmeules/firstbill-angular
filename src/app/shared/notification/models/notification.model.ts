export class Notification {
    public id: string;
    public type: NotificationType;
    public position: NotificationPosition;
    public message: string;
    public keepAfterRouteChange: boolean;

    constructor(init?: Partial<Notification>) {
        Object.assign(this, init);
    }

    public getCSSType() {
        switch (this.type) {
            case NotificationType.error:
                return `is-error`;

            case NotificationType.info:
                return `is-info`;

            case NotificationType.success:
                return `is-success`;

            case NotificationType.warning:
                return `is-warning`;
        }

        return ``;
    }

    public getCSSPosition() {
        switch (this.position) {
            case NotificationPosition.BOTTOM_LEFT:
                return `is-bottom-left`;

            case NotificationPosition.BOTTOM_RIGHT:
                return `is-bottom-right`;

            case NotificationPosition.TOP_LEFT:
                return `is-top-left`;

            case NotificationPosition.TOP_RIGHT:
                return `is-top-right`;
        }

        return ``;
    }
}

export enum NotificationType {
    success,
    error,
    info,
    warning,
}

export enum NotificationPosition {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
}
