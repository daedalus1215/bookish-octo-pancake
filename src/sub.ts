import { filterUsersInMonthAndSubscription } from "./helpers";

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

type determineSubs = (users: IUser[], subscription: ISub) => number;

const determineSubscriptionFeeForUsers: determineSubs = (billableUsers, subscription) => {
    return billableUsers.reduce((interval, user) => {
        if (!user.deactive) {
            return subscription.price + interval;
        }
        // we need to pro-rate
        return calculateProRate(user.deactive, subscription); //@TODO: this is temporary
    }, 0)
};

const calculateProRate = (deactive: Date, subscription: ISub) => {
    // assume 31 days in a month at first to make life easier
    const daysInThisMonth = 31;
    const terminationDay = deactive.getDate() + 1;
    return +Number((subscription.price / daysInThisMonth).toPrecision(8)).toFixed(2) * terminationDay;
}




