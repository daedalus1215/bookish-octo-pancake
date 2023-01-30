import { charges } from "../sub";


const users = [
    {
        id: 1,
        name: 'E1',
        activatedOn: new Date('2019-01-01'),
        deactivatedOn: null,
        customerId: 1,
    },
    {
        id: 2,
        name: 'E2',
        activatedOn: new Date('2019-01-01'),
        deactivatedOn: null,
        customerId: 1,
    },
    {
        id: 3,
        name: 'E3',
        activatedOn: new Date('2020-12-31'),
        deactivatedOn: null,
        customerId: 1,
    },
    {
        id: 3,
        name: 'E4',
        activatedOn: new Date('2020-12-31'),
        deactivatedOn: null,
        customerId: 1,
    }
];

const plan = {
    id: 1,
    customerId: 1,
    monthlyPriceInCents: 5000,
};

console.log('works when no users are active', charges('2018-10', plan, users) === 0)
const expectedUserCount = 2;
// I created a plan for customers with id of 3 to fullfill this requirement. 
const planForCustomer3 = {
    id: 2,
    customerId: 3,
    monthlyPriceInCents: 5000,
}
console.log('works when the active users are active the entire month', charges('2020-12', planForCustomer3, users) === expectedUserCount * 5000);

