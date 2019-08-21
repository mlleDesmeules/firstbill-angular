import { IBill } from './bill.interface';

import { STATUS_UNPAID } from '@core/models/bills/status';
import { FREQUENCY_MONTHLY } from '@core/models/bills/frequency';

export class Bill implements IBill {
    public id;
    public name = ``;
    public dueDate = ``;
    public frequency = FREQUENCY_MONTHLY;
    public status = STATUS_UNPAID;
    public amount = 0;

    constructor(data = null) {
        if (data === null) {
            return;
        }

        this.id = Number(data.id || 0);

        this.update(data);
    }

    changeStatus(status: string) {
        this.status = status;
    }

    update(data) {
        this.name = data.name || this.name;
        this.amount = Number(data.amount || this.amount);
        this.dueDate = data.dueDate || this.dueDate;
        this.frequency = data.frequency || this.frequency;
        this.status = data.status || this.status;
    }
}
