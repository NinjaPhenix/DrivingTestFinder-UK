function ab_sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

let real = window.wrappedJSObject;
let ab_pageDelay = 1000;
let ab_refreshDelay = 5 * 60 * 1000;
let defaultChoice = "2021-02-01"
let ab_counter = ab_refreshDelay;
let divEl = real.document.createElement("div");
let delayPromise = () => {}
delayPromise = () =>
{
    ab_counter -= 1000;
    divEl.innerText = "Waiting for " + (ab_counter / 1000);
    if(ab_counter !== 0) { ab_sleep(1000).then(delayPromise); }
}
let datePromise = () =>
{
    let dates = real.document.getElementsByClassName("BookingCalendar-dateLink");
    if (dates != null) {
        let chosen;
        for (const d of dates) { if (d.classList.contains("is-chosen")) { chosen = d.dataset["date"]; } }
        if (chosen == null) { chosen = defaultChoice; }
        let chosenList = chosen.split("-")
        let newDate = "";
        for (const d of dates) 
        {
            if (d.parentElement.parentElement.classList.contains("BookingCalendar-date--unavailable")) { continue; }
            let dataSplit = d.dataset["date"].split("-")
            if (dataSplit[0] < chosenList[0]) { newDate = d.dataset["date"]; break; } 
            else if (dataSplit[0] === chosenList[0])
            {
                if (dataSplit[1] < chosenList[1]) { newDate = d.dataset["date"]; break; } 
                else if (dataSplit[1] === chosenList[1])
                {
                    if (dataSplit[2] < chosenList[2]) { newDate = d.dataset["date"]; break; }
                }
            }
        }
        if (newDate !== "") {  real.alert("Found an earlier book date: " + newDate); }
        else 
        {
            ab_counter = ab_refreshDelay;
            divEl.style.backgroundColor = "red";
            divEl.style.padding = "1em";
            divEl.style.position = "absolute";
            divEl.style.top = "1px";
            divEl.style.zIndex = "200000";
            divEl.innerText = "Waiting for " + (ab_counter / 1000);
            real.document.body.lastChild.insertAdjacentElement("afterend", divEl);
            ab_sleep(1000).then(delayPromise);
            ab_sleep(ab_refreshDelay).then(() => 
            {
                let returnToFront = real.document.getElementById("return-original-booking-link");
                if (returnToFront != null) { returnToFront.click(); }
                else { real.alert("Could not find return to main page link!"); }
            })
        }
    } else { real.alert("Could not determine which page were on :/"); }
};

let testChoicePromise = () =>
{
    let showEarliest = real.document.getElementById("test-choice-earliest");
    if (showEarliest != null) 
    {
        showEarliest.click();
        let nextPage = real.document.getElementById("driving-licence-submit");
        if (nextPage != null) { nextPage.click(); }
        else { real.alert("Selected earliest avaliable booking but couldn't find next page button!"); }
    } else { ab_sleep(ab_pageDelay).then(datePromise); }
};

let mainPromise = () =>
{
    let header = real.document.getElementById("header-title");
    if (header != null && header.childElementCount === 2)
    {
        if (header.children[0].innerText === "View booking")
        {
            let button = real.document.getElementById("date-time-change");
            if (button != null) { button.click(); }
            else { real.alert("Could not find booking button!"); }
        }
        else { real.alert("Thought we was on main page, apparently not."); }
    }
    else { ab_sleep(ab_pageDelay).then(testChoicePromise); }
};

ab_sleep(ab_pageDelay).then(mainPromise);
