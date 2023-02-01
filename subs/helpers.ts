import { ISub, IUser } from "./sub";

type filterUsers = (user: IUser, yearMonth: string, subscription: ISub) => boolean;

export const filterUsersInMonthAndSubscription: filterUsers = (user, yearMonth, subscription) => (isDateWithinMonth(yearMonth, user.active))
    && user.customerId === subscription.cusId;

type isDateInRange = (yearMonth: string, userDate: Date) => boolean;
export const isDateWithinMonth: isDateInRange = (yearMonth, userDate) => {
    const targetDate = lastDay(new Date(`${yearMonth}-05`));

    let minimumDate = firstDay(userDate)
    let maximumDate = lastDay(userDate);

    if (targetDate >= minimumDate
        && targetDate <= maximumDate) {
        return true;
    }
    return false;
}

type dateGetters = (date: Date) => Date;
export const firstDay: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const lastDay: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
export const next: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
