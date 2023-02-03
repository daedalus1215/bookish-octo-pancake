import { determineSubs, filterUsers, isDateWithinMonth, lastDay } from "../helpers";

export interface IUser {
    id: number;
    name: string;
    active: Date;
    deactive?: Date;
    customerId: number;
}

export interface ISub {
    id: number;
    cusId: number;
    price: number;
}


export const charges = (yearMonth: string, subscription: ISub, users: IUser[]): number => {
    const subscribers = users
        .filter(user => filterUsersInMonthAndSubscription(user, yearMonth, subscription));
    return (subscribers.length > 0) ? +determineSubscriptionFeeForUsers(subscribers, subscription).toFixed(2) : 0;
}


const filterUsersInMonthAndSubscription: filterUsers = (user, yearMonth, subscription) => (user.customerId === subscription.cusId)
    && (isDateWithinMonth(yearMonth, user.active));


const determineSubscriptionFeeForUsers: determineSubs = (billableUsers, subscription) => {
    return billableUsers.reduce((interval, user) => {
        if (!user.deactive) {
            return subscription.price + interval;
        }
        return calculateProRate(user.deactive, subscription); //@TODO: this is temporary
    }, 0)
};

const calculateProRate = (deactive: Date, subscription: ISub) => {
    const terminationDay = deactive.getDate() + 1;
    return +Number((subscription.price / lastDay(deactive).getDate()).toPrecision(8)).toFixed(2) * terminationDay;
}