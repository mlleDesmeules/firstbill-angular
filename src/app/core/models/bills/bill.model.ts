import { IBill } from './bill.interface';

export class Bill implements IBill {
    public id;
    public name;
    public dueDate;
    public status;
    public amount;

    constructor(data = null) {
        if (data === null) {
            return;
        }

        this.id = Number(data.id || 0);
        this.name = data.name;
        this.amount = Number(data.amount || 0);
        this.dueDate = data.dueDate;
        this.status = data.status || `unpaid`;
    }
}
