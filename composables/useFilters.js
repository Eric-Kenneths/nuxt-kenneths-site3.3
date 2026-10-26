export function useFilters() {

    function filterCurrency(value) {
        if (typeof (value) !== "number") {
            return value;
        }

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        return formatter.format(value);
    }

    function filter2DigitDecimal(value) {
        if (typeof (value) !== "number") {
            return value;
        }

        var formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2
        });

        return formatter.format(value);
    }

    function filterDateTimeToDate(dateTime) {
        if (dateTime !== undefined) {
            let date = dateTime.split('T')[0];

            let parts = date.split('-');

            date = parts[1] + '/' + parts[2] + '/' + parts[0];

            return date;
        }
    }

    function filterDateToLongDateString(date) {
        if (date !== undefined) {
            return date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate() + ', ' + date.getFullYear();
        }
    }

    function filterMilitaryToRegularTime(value) {
        if (typeof (value) !== "string") {
            return value;
        }

        let hour = Number(value.slice(0, 2));
        let minute = value.slice(2, 5);
        let period = '';

        if (hour > 12) {
            hour -= 12;
            period = 'pm';

            if (hour === 0) {
                hour = 12;
                period = 'am';
            }
        } else {
            period = 'am';
        }

        return String(hour) + '' + String(minute) + ' ' + period;
    }

    function filterLocationCodeToLocationName(locationCode) {
        switch (locationCode) {
            case 'AT':
                return 'Academy Training';

            case 'AV':
                return 'Avery';

            case 'GR':
                return 'Grove City';

            case 'KD':
                return 'Kingsdale';

            case 'MR':
                return 'Hilliard';

            case 'NG':
                return 'New Albany';

            case 'OF':
                return 'Office';

            case 'PL':
                return 'Polaris';

            case 'PW':
                return 'Powell';

            case 'TS':
                return 'Taylor Square';

            case 'WS':
                return 'Westerville';
        }
    }

    function filterDisplayFormattedDateTime(dateTime) {
        if (dateTime !== undefined) {
            let parts = dateTime.split('T');

            let dateParts = parts[0].split('-');
            let time = parts[1];

            let date = dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0];

            time = filterMilitaryToRegularTime(time);

            return date + ' ' + time;
        }
    }

    function filterDisplayStringCamelCase(input) {
        let words = input.split(' ');

        let response = '';

        words.forEach((word) => {
            word = word.charAt(0).toUpperCase() + word.slice(1);

            response += word + ' ';
        })

        return response.trim();
    }

    function filterDowAbv(date) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayIndex = date.getDay();
        return days[dayIndex];
    }

    function filterAbbreviateName(fullName) {
        if (!fullName || typeof fullName !== "string") return "";

        // Remove extra spaces
        const parts = fullName.trim().split(/\s+/);

        // If only one name, return as-is
        if (parts.length === 1) return parts[0];

        // Keep first name full
        const firstName = parts[0];

        // Abbreviate everything after first name
        const abbreviated = parts
            .slice(1)
            .map(name => name.charAt(0).toUpperCase() + ".");

        return `${firstName} ${abbreviated.join(" ")}`;
    }


    return {
        filterCurrency,
        filter2DigitDecimal,
        filterDateTimeToDate,
        filterDateToLongDateString,
        filterMilitaryToRegularTime,
        filterLocationCodeToLocationName,
        filterDisplayFormattedDateTime,
        filterDisplayStringCamelCase,
        filterDowAbv,
        filterAbbreviateName
    }
}