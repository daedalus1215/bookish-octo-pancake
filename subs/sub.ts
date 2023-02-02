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

    return (subscribers.length > 1) ? determineSubscriptionFeeForUsers(subscribers, subscription) : 0;
}

type determineSubs = (users: IUser[], subscription: ISub) => number;

const determineSubscriptionFeeForUsers: determineSubs = (billableUsers, subscription: ISub) => {

    return billableUsers.reduce((interval, user) => {
        if(!user.deactive) {
            return subscription.price + interval;
        }
        // we need to pro-rate
        return interval; //@TODO: this is temporary
    }, 0)
};




