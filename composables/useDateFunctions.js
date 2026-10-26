export function useDateFunctions() {
    //These are functions for working with dates.

    //Whatever data type is passed in is the data type that
    //will be returned (most likely a string). There is a confirmDateType() at the beginning to make 
    //sure the date passed is of type date, and sets the returnType. There is a confirmReturnType() at the 
    //end to make sure we are returning the correct data type. This excludes the conversion functions.

    //This is needed for certain calculations
    const millisecondsInDay = 86400000;

    let returnType = '';

    function confirmInputType(date) {
        let type = (date instanceof Date ? "date" : "string");

        if (type === 'date') {
            returnType = 'date';

            return date;
        } else {
            returnType = 'string';

            return convertStringToDate(date);
        }
    }

    function confirmReturnType(date) {
        let type = (date instanceof Date ? "date" : "string");

        if (returnType === 'date') {
            if (type === 'date') {
                return date;
            } else {
                return convertStringToDate(date);
            }
        } else {
            if (type === 'date') {
                return convertDateToApiString(date);
            } else {
                return date;
            }
        }
    }

    //#region functions
    function addDay(date, amount) {
        let returnDate = new Date(date);

        returnDate.setDate(returnDate.getDate() + amount);

        return returnDate;
    }

    function subtractDay(date, amount) {
        let returnDate = new Date(date);

        returnDate.setDate(returnDate.getDate() - amount);

        return returnDate;
    }

    function addMonth(date, amount) {
        let returnDate = new Date(date);

        returnDate.setMonth(returnDate.getMonth() + amount);

        return returnDate;
    }

    function subtractMonth(date, amount) {
        let returnDate = new Date(date);

        returnDate.setMonth(returnDate.getMonth() - amount);

        return returnDate;
    }

    function addYear(date, amount) {
        let returnDate = new Date(date);
 
        returnDate.setYear(returnDate.getYear() + amount);

        return returnDate;
    }

    function subtractYear(date, amount) {
        let returnDate = new Date(date);

        returnDate.setYear(returnDate.getYear() - amount);

        return returnDate;
    }

    function dateDifference(startDate, endDate) {
        startDate = confirmInputType(startDate);

        endDate = confirmInputType(endDate);

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        return confirmReturnType((endDate.getTime() - startDate.getTime()) / millisecondsInDay);
    }

    function minutesDifference(startDate, endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        return (((endDate.getTime()) - startDate.getTime()) / (1000 * 60) % 60);
    }

    function getDayOfWeek(date) {

        let dayString = '';

        let dayNumber = date.getDay();

        switch (dayNumber) {
            case 0:
                dayString = 'Sunday';
                break;
            case 1:
                dayString = 'Monday';
                break;
            case 2:
                dayString = 'Tuesday';
                break;
            case 3:
                dayString = 'Wednesday';
                break;
            case 4:
                dayString = 'Thursday';
                break;
            case 5:
                dayString = 'Friday';
                break;
            case 6:
                dayString = 'Saturday';
                break;
        }

        return dayString;
    }

    function getEndOfWeek(date) {
        let returnDate = new Date(date);

        returnDate.setDate(returnDate.getDate() + (6 - returnDate.getDay()));

        return returnDate;
    }

    function getBeginningOfWeek(date) {
        let returnDate = new Date(date);

        returnDate.setDate(returnDate.getDate() - (returnDate.getDay()));

        return returnDate;
    }

    function getEndOfMonth(date) {
        let returnDate = new Date(date);

        returnDate = new Date(returnDate.getFullYear(), returnDate.getMonth() + 1, 0);

        return returnDate;
    }

    function getBeginningOfMonth(date) {
        let returnDate = new Date(date);

        returnDate = new Date(returnDate.getFullYear(), returnDate.getMonth(), 1);

        return returnDate;
    }

    function getMonthOfYear(date) {
        date = confirmInputType(date);

        let monthString = '';
        let monthNumber = date.getMonth();

        switch (monthNumber) {
            case 0:
                monthString = 'January';
                break;
            case 1:
                monthString = 'February';
                break;
            case 2:
                monthString = 'March';
                break;
            case 3:
                monthString = 'April';
                break;
            case 4:
                monthString = 'May';
                break;
            case 5:
                monthString = 'June';
                break;
            case 6:
                monthString = 'July';
                break;
            case 7:
                monthString = 'August';
                break;
            case 8:
                monthString = 'September';
                break;
            case 9:
                monthString = 'October';
                break;
            case 10:
                monthString = 'November';
                break;
            case 11:
                monthString = 'December';
        }

        return monthString;
    }

    function getWeekOfYear(date) {

        let firstOfYear = new Date(date.getFullYear(), 0, 1);

        let days = Math.floor((date - firstOfYear) / millisecondsInDay);

        let weekOfYear = Math.ceil((date.getDay() + 1 + days) / 7);

        return weekOfYear;
    }
    //#endregion functions

    //#region conversions
    function convertDateToDateNoTime(date) {
        var dd = date.getDate();
        var mm = date.getMonth(); //January is 0!
        var yyyy = date.getFullYear();

        let returnDate = new Date(yyyy, mm, dd, 0, 0, 0, 0)

        return returnDate;
    }

    function convertDateToApiString(date) {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        let returnDate = yyyy + '-' + mm + '-' + dd;

        return returnDate;
    }

    function convertDateToString(date) {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        let returnDate = mm + '/' + dd + '/' + yyyy;

        return returnDate;
    }

    function convertStringToDate(date) {
        let parts = [];

        if (date.includes('-')) {
            parts = date.split('-');
        }

        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function convertFullStringToDate(date) {
        let parts = [];

        if (date.includes('-') || date.includes('/')) {
            parts = date.split(/[-/T]/);
        }

        return new Date(parts[0], parts[1] - 1, parts[2].substring(0, 2));
    }
    //#endregion conversions

    function canCancelBaseOnAppointmentTime(inputDate, militaryTime) {
        // Get current date for comparison
        const now = new Date();
        // Create a Date object for the start of today (ignoring time)
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // Create a Date object for the start of the input date (ignoring time)
        const inputDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

        // If input date is the next day or later, return true
        if (inputDay > today) {
            return true;
        }

        // Create a Date object for the input date and time
        const inputYear = inputDate.getFullYear();
        const inputMonth = inputDate.getMonth();
        const inputDayOfMonth = inputDate.getDate();
        const hours = parseInt(militaryTime.substring(0, 2));
        const minutes = parseInt(militaryTime.substring(2, 4));
        const inputDateTime = new Date(inputYear, inputMonth, inputDayOfMonth, hours, minutes);

        // Get current time and subtract 15 minutes
        const nowPlus15 = new Date(now.getTime() + 15 * 60 * 1000);

        // Compare and return true if input time is greater than now minus 15 minutes
        return inputDateTime.getTime() > nowPlus15.getTime();
    }


    return {
        addDay,
        subtractDay,
        addMonth,
        subtractMonth,
        addYear,
        subtractYear,
        dateDifference,
        minutesDifference,
        getDayOfWeek,
        getEndOfWeek,
        getBeginningOfWeek,
        getEndOfMonth,
        getBeginningOfMonth,
        getMonthOfYear,
        getWeekOfYear,
        convertDateToDateNoTime,
        convertDateToApiString,
        convertDateToString,
        convertStringToDate,
        convertFullStringToDate,
        canCancelBaseOnAppointmentTime
    }
}