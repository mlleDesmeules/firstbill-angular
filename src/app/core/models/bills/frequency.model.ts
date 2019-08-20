export const FREQUENCY_MONTHLY   = `monthly`;
export const FREQUENCY_BIMONTHLY = `bimonthly`;
export const FREQUENCY_WEEKLY    = `weekly`;
export const FREQUENCY_BIWEEKLY  = `biweekly`;

export const FREQUENCIES = [
    {
        order: 1,
        value: FREQUENCY_WEEKLY,
        label: `Weekly`,
    }, {
        order: 2,
        value: FREQUENCY_BIWEEKLY,
        label: `Bi-weekly`,
    }, {
        order: 3,
        value: FREQUENCY_MONTHLY,
        label: `Monthly`,
    }, {
        order: 4,
        value: FREQUENCY_BIMONTHLY,
        label: `Bi-monthly`,
    },
];
