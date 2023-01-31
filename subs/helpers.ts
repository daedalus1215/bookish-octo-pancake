import { ISub, IUser } from "./sub";

type filterUsers = (user: IUser, yearMonth: string, subscription: ISub) => boolean;

export const filterUsersInMonthAndSubscription: filterUsers = (user, yearMonth, subscription) => (isDateWithinMonth(yearMonth, user.active))
// && user.customerId === subscription.cusId);

type isDateInRange = (yearMonth: string, userDate: Date) => boolean;
export const isDateWithinMonth: isDateInRange = (yearMonth, userDate) => {
    const targetDate = new Date(yearMonth);
    
    let minimumDate = firstDay(userDate)
    let maximumDate = lastDay(userDate);
    console.log('minimumDate', minimumDate.getTime());
    
    const minDate = minimumDate.setHours(0,0,0, 0);
    console.log('minDate', minDate);
    const maxDate = maximumDate.setHours(0,0,0, 0);

    if (targetDate.getTime() >= minDate
        && targetDate.getTime() <= maxDate) {
        console.log('true')
        return true;
    }

    return false;
}

type dateGetters = (date: Date) => Date;
export const firstDay: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const lastDay: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
export const next: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
