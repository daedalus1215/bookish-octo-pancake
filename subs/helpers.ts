export const isDateInRange = (yearMonth: string, userDate: Date) => {
    const targetDate = new Date(yearMonth);

    var minDate = firstDay(userDate)
    var maxDate = lastDay(userDate);

    if (targetDate >= minDate && targetDate <= maxDate) {
        return true;
    }

    return false;
}

type dateGetters = (date: Date) => Date;
export const firstDay: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const lastDay: dateGetters = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
export const next:dateGetters = (date)=> new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);