/*
Parameters: holiday (string)
Constraints: param must be a holiday ID from the holiday selection drop-down menu, or an empty string representing the default state.

Converts string date (holiday) from the currently-selected drop down item into a raw numeric value.
*/
const getTargetDate = (holiday) =>
{
    let targetDate = 0;

    switch(holiday)
    {
        case "":
            targetDate = "";
            break;
        case "new-year":
            targetDate = new Date("Jan 01, 2023 00:00:00").getTime();
            break;
        case "memorial-day":
            targetDate = new Date("May 30, 2022 00:00:00").getTime();
            break;
        case "independence-day":
            targetDate = new Date("Jul 04, 2022 00:00:00").getTime();
            break;
        case "labor-day":
            targetDate = new Date("Sept 5, 2022 00:00:00").getTime();
            break;
        case "thanksgiving-day":
            targetDate = new Date("Nov 24, 2022 00:00:00").getTime();
            break;
        case "christmas-day":
            targetDate = new Date("Dec 25, 2022 00:00:00").getTime();
            break;
        default:
            console.error("Bad data passed into getTargetDate");
    }
    return targetDate;
}

/*
Parameters: targetDate (numeric)
Constraints: param must be a valid raw numeric date.

Determines the number of days, hours, minutes and seconds until targetDate, and displays them.
*/
const displayCountdown = (targetDate) =>
{
    if (typeof(targetDate) == 'number')
    {
        let currentDateTime = new Date().getTime();
        let timeDuration = targetDate - currentDateTime;

        let days = Math.floor(timeDuration / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDuration % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDuration % (1000 * 60)) / 1000);

        // Display the values on the page
        document.getElementById("timer-days").innerHTML = formatTime(days) + " : ";
        document.getElementById("timer-hours").innerHTML = formatTime(hours) + " : ";
        document.getElementById("timer-minutes").innerHTML = formatTime(minutes) + " : ";
        document.getElementById("timer-seconds").innerHTML = formatTime(seconds);
    }
}

/*
Parameters: time (integer)
Constraints: Value must be numeric/

Helper function that adds leading zeros to the timer for any number < 10.
*/
const formatTime = (time) =>
{
    return time < 10 ? "0" + time : time; 
}

/*
Parameters: none
Constraints: none

Helper function that clears displayed timer data
*/
const clearContent = () =>
{
    // Clear timer values
    document.getElementById("timer-days").innerHTML = "";
    document.getElementById("timer-hours").innerHTML = "";
    document.getElementById("timer-minutes").innerHTML = "";
    document.getElementById("timer-seconds").innerHTML = "";
}

/*
Parameters: holiday (string)
Constraints: Must be a valid holiday from the drop-down menu or an empty string.

Changes the background image based on the holiday selected by the user.
*/

const switchBackground = (holiday) =>
{
    switch(holiday)
    {
        case "":
            document.body.style.backgroundImage = "none";
            document.body.style.backgroundColor = 'black';
            break;
        case "new-year":
            document.body.style.backgroundImage = "url('../../dist/img/new-year.jpg')";
            break;
        case "memorial-day":
            document.body.style.backgroundImage = "url('../../dist/img/memorial-day.jpg')";
            break;
        case "independence-day":
            document.body.style.backgroundImage = "url('../../dist/img/independence-day.jpg')";
            break;
        case "labor-day":
            document.body.style.backgroundImage = "url('../../dist/img/labor-day.jpg')";
            break;
        case "thanksgiving-day":
            document.body.style.backgroundImage = "url('../../dist/img/thanksgiving-day.jpg')";
            break;
        case "christmas-day":
            document.body.style.backgroundImage = "url('../../dist/img/christmas-day.jpg')";
            break;
        default:
            console.error("Bad data passed into switchBackground");
    }
}

// Main function
const initApp = () =>
{
    let holidayMenu = document.getElementById("holiday-menu");
    let intervalID;
    let targetDate;

    holidayMenu.addEventListener("change", (event) =>
    {
        clearInterval(intervalID);
        clearContent();
        targetDate = getTargetDate(event.target.value);
        switchBackground(event.target.value);

        intervalID = setInterval(function ()
        {
            console.log(targetDate);
            displayCountdown(targetDate);
        }, 1000);

        if (targetDate === "")
        {
            clearInterval(intervalID);
        }
        
    });
}

// End function defs

document.addEventListener("readystatechange", (event) =>
{
    if(event.target.readyState === "complete")
    {
        console.log("readystate: complete");
        initApp();
    }
});