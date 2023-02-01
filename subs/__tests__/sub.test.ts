import { charges, ISub, IUser } from "../sub";


const users: IUser[] = [
    {
        id: 1,
        name: 'E1',
        active: new Date('2019-01-01'),
        customerId: 1,
    },
    {
        id: 2,
        name: 'E2',
        active: new Date('2019-01-01'),
        customerId: 1,
    },
    {
        id: 3,
        name: 'E3',
        active: new Date('2020-12-31'),
        customerId: 1,
    },
    {
        id: 3,
        name: 'E4',
        active: new Date('2020-12-31'),
        customerId: 1,
    },
    {
        id: 4,
        name: 'E5',
        active: new Date('2021-12-01'),
        deactive: new Date('2021-12-14'),
        customerId: 1,
    }
];

const plan: ISub = {
    id: 1,
    cusId: 1,
    price: 5000,
};

console.log('works when no users are active', charges('2018-10', plan, users) === 0)
const expectedUserCount = 2;
console.log('works when the active users are active the entire month', charges('2020-12', plan, users) === expectedUserCount * 5000);

