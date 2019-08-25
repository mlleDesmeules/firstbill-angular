import { NotificationPositionModel } from './notification-position.model';
import { NotificationType } from './notification-type.model';

export class Notification {
	public id: string;
	public type: NotificationType;
	public position: NotificationPositionModel;
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
			case NotificationPositionModel.BOTTOM_LEFT:
				return `is-bottom-left`;

			case NotificationPositionModel.BOTTOM_RIGHT:
				return `is-bottom-right`;

			case NotificationPositionModel.TOP_LEFT:
				return `is-top-left`;

			case NotificationPositionModel.TOP_RIGHT:
				return `is-top-right`;
		}

		return ``;
	}
}
