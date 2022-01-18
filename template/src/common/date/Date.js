/**
 * Return number of days in month
 */
export function NumberOfDaysInMonth(month = (new Date()).getMonth() + 1, fullYear = (new Date()).getFullYear()) {
    let d = new Date(fullYear, month, 0);
    let numberOfDays = d.getDate();
    return numberOfDays;
}
/**
 * Return number of days between 2 date.
 *                                               "dd/mm/yyy"
 */
export function NumberOfDaysBetween2Date(date1 = "1/2/2022", date2 = "1/3/2022") {
    try {
        date1 = date1.split("/");
        const d1 = new Date();
        d1.setDate(Number(date1[0]));
        d1.setMonth(Number(date1[1]) - 1);
        d1.setFullYear(Number(date1[2]));

        date2 = date2.split("/");
        const d2 = new Date();
        d2.setDate(Number(date2[0]));
        d2.setMonth(Number(date2[1]) - 1);
        d2.setFullYear(Number(date2[2]));

        return Math.round((d2 - d1) / (24 * 60 * 60 * 1000));
    } catch (error) {
        return "error"
    }
}

/**
 * Return total number of seconds between 2 date
 *                                                       "dd/mm/yyyy hh:mm:ss"
 */
export function TotalNumberOfSecondsBetween2Date(date1 = "01/02/2022 00:00:00", date2 = "1/02/2022 1:00:00") {
    try {
        //1
        const time1 = date1.split(" ")[1].split(":");
        date1 = date1.split(" ")[0].split("/");

        const year1 = Number(date1[2]);
        const month1 = Number(date1[1]) - 1;
        const day1 = Number(date1[0]);

        const hours1 = Number(time1[0]);
        const minutes1 = Number(time1[1]);
        const second1 = Number(time1[2]);
        const d1 = new Date(year1, month1, day1, hours1, minutes1, second1, 0);

        //2
        const time2 = date2.split(" ")[1].split(":");
        date2 = date2.split(" ")[0].split("/");

        const year2 = Number(date2[2]);
        const month2 = Number(date2[1]) - 1;
        const day2 = Number(date2[0]);

        const hours2 = Number(time2[0]);
        const minutes2 = Number(time2[1]);
        const second2 = Number(time2[2]);
        const d2 = new Date(year2, month2, day2, hours2, minutes2, second2, 0)

        return ((d2 - d1) / 1000) / 1; //units of   seconds
        //                        / 60;             minutes
        //                        / (60 * 60);      hours
        //                        / (60 * 60 * 24); day
    } catch (error) {
        return "error"
    }
}