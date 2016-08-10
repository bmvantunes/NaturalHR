(function() {

    // variables
    var weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    // Functions
    function createDayEntry(begginingWeek, dayToReport, project) {
        var formData = new FormData();
        formData.append("date", dayToReport); // report day
        formData.append("week_beginning", begginingWeek); // first monday of the week
        formData.append("reference", project); // Project name
        formData.append("start", "0900"); // begin time
        formData.append("end", "1800"); // end time
        formData.append("breaks", "60"); // break is minutes
        formData.append("comments", ""); // nobody need comments
        formData.append("submit", ""); // empty stuff

        var request = new XMLHttpRequest();
        request.open("POST", "https://www.naturalhr.net/hr/self-service/timesheets/timesheet-add");
        request.send(formData);
    }

    function subtractDays(date, days) {
        var result = new Date(date);
        result.setDate(date.getDate() - days);
        return result;
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }

    function getFirstMondayThisWeek() {
        // Sunday - day 0
        // Monday - day 1
        // etc...
        // Friday - day 5

        var mondayDayOfWeek = 1;
        var today = new Date();
        var todayDayWeek = today.getDay();
        var diffFromTodayToMonday = todayDayWeek - mondayDayOfWeek;
        var monday = subtractDays(today, diffFromTodayToMonday);
        return monday;
    }

    function dateToYMD(date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
    }

    function prepareDataForDayEntry(iterator, monday, projectName) {
        var weekdayName = weekdays[iterator];
        var currentDay = addDays(monday, iterator);
        var currentDayToString = weekdayName + dateToYMD(currentDay);
        var mondayToString = dateToYMD(monday);

        console.log(mondayToString);
        console.log(currentDayToString);
        console.log(projectName);
        createDayEntry(mondayToString, currentDayToString, projectName)
    }

    function weekIterator(projectName) {
        // iterate week
        var monday = getFirstMondayThisWeek();

        for (var i = 0; i < 5; i++) {
            setTimeout(function(iterator) {
                prepareDataForDayEntry(iterator, monday, projectName);
            }, 1000 * i, i);
        }
    }

    weekIterator('Rebrand');
})();