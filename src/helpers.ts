import { ISub, IUser } from "./sub";

type isDateInRange = (yearMonth: string, userDate: Date) => boolean;
export const isDateWithinMonth: isDateInRange = (yearMonth, userDate) => {
    const targetDate = firstDay(new Date(`${yearMonth}`));

    const subYear = userDate.getUTCFullYear();
    const subMonth = getCorrectMonthOrdinal(userDate.getUTCMonth());

    let minimumDate = firstDay(new Date(`${subYear}-${subMonth}`))
    let maximumDate = lastDay(new Date(`${subYear}-${subMonth}`))
    
    if (targetDate >= minimumDate
        && targetDate <= maximumDate) {
        return true;
    }
    return false;
}

const getCorrectMonthOrdinal = (month: number) =>  month === 0 ? '01' : month === 11 ? '12' : month;

type dateGetters = (date: Date) => Date;
export const firstDay: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth() + 1);
export const lastDay: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth() + 2, 0);
export const next: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);


// interfaces
export type filterUsers = (user: IUser, yearMonth: string, subscription: ISub) => boolean;
export type determineSubs = (users: IUser[], subscription: ISub) => number;
