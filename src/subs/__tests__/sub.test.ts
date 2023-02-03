import { expect } from 'chai';
import 'mocha';
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
        active: new Date('2023-12-05'),
        deactive: new Date('2021-12-14'),
        customerId: 1,
    },
    {
        id: 5,
        name: 'E5',
        active: new Date('2023-12-05'),
        customerId: 1,
    }
];

const plan: ISub = {
    id: 1,
    cusId: 1,
    price: 5000,
};


describe('sub.test.ts', () => {
    it('should work when no users are active', () => {
        // Arrange
        const expected = 0;

        // Act
        const actual = charges('2018-10', plan, users);

        // Assert
        expect(actual).to.eq(expected);
    });

    it('should work when the active users are active the entire month', () => {
        // Arrange
        const expected = 2 * 5000;

        // Act
        const actual = charges('2020-12', plan, users);

        // Assert
        expect(actual).to.eq(expected);
    });
});

//@TODO: finish here.
// console.log('works when the active users are active, with a deactive month', charges('2023-12', plan, users) === 7258.06);

