export const FREQUENCY_MONTHLY   = `monthly`;
export const FREQUENCY_BIMONTHLY = `bimonthly`;
export const FREQUENCY_WEEKLY    = `weekly`;
export const FREQUENCY_BIWEEKLY  = `biweekly`;

export class Frequency {
	public label: string;
	public value: string;
	public order: number;
	public duration: object;

	constructor(data: Partial<Frequency>) {
		Object.assign(this, data);
	}
}

export const FREQUENCIES = [
	new Frequency({label: `Weekly`, value: FREQUENCY_WEEKLY, order: 1, duration: { weeks: 1 }}),
	new Frequency({label: `Bi-weekly`, value: FREQUENCY_BIWEEKLY, order: 2, duration: { weeks: 2 }}),
	new Frequency({label: `Monthly`, value: FREQUENCY_MONTHLY, order: 3, duration: { months: 1 }}),
	new Frequency({label: `Bi-monthly`, value: FREQUENCY_BIMONTHLY, order: 4, duration: { months: 2 }}),
];

export function find(value: string) {
	const found = FREQUENCIES.filter((item) => item.value === value);

	return found[0];
}
