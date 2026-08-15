// ========================================
// PAGES
// ========================================

const homePage = document.getElementById("homePage");
const createPage = document.getElementById("createPage");
const eventCreatedPage = document.getElementById("eventCreatedPage");
const joinPage = document.getElementById("joinPage");
const trackingPage = document.getElementById("trackingPage");


// ========================================
// BUTTONS
// ========================================

const createBtn = document.getElementById("createBtn");
const joinBtn = document.getElementById("joinBtn");

const generateBtn = document.getElementById("generateBtn");

const backBtn = document.getElementById("backBtn");
const joinBackBtn = document.getElementById("joinBackBtn");

const copyBtn = document.getElementById("copyBtn");

const trackingBtn = document.getElementById("trackingBtn");

const homeBtn = document.getElementById("homeBtn");

const joinSubmitBtn =
    document.getElementById("joinSubmitBtn");

const trackingHomeBtn =
    document.getElementById("trackingHomeBtn");


// ========================================
// CURRENT EVENT
// ========================================

let currentEvent = null;


// ========================================
// SHOW PAGE
// ========================================

function showPage(page) {

    homePage.classList.add("hidden");
    createPage.classList.add("hidden");
    eventCreatedPage.classList.add("hidden");
    joinPage.classList.add("hidden");
    trackingPage.classList.add("hidden");

    page.classList.remove("hidden");
}


// ========================================
// HOME → CREATE
// ========================================

createBtn.addEventListener("click", function () {

    showPage(createPage);

});


// ========================================
// HOME → JOIN
// ========================================

joinBtn.addEventListener("click", function () {

    showPage(joinPage);

});


// ========================================
// CREATE → HOME
// ========================================

backBtn.addEventListener("click", function () {

    showPage(homePage);

});


// ========================================
// JOIN → HOME
// ========================================

joinBackBtn.addEventListener("click", function () {

    showPage(homePage);

});


// ========================================
// GENERATE EVENT CODE
// ========================================

function generateEventCode() {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        code += characters[randomIndex];

    }

    return code;
}


// ========================================
// CREATE EVENT
// ========================================

generateBtn.addEventListener("click", function () {

    const yourName =
        document.getElementById("yourName").value.trim();

    const eventName =
        document.getElementById("eventName").value.trim();

    const destination =
        document.getElementById("destination").value.trim();

    const eventDate =
        document.getElementById("eventDate").value;

    const eventTime =
        document.getElementById("eventTime").value;


    // CHECK FIELDS

    if (
        yourName === "" ||
        eventName === "" ||
        destination === "" ||
        eventDate === "" ||
        eventTime === ""
    ) {

        alert("Please fill all the fields.");

        return;
    }


    // GENERATE CODE

    const eventCode =
        generateEventCode();


    // SAVE TEMPORARILY IN BROWSER

    currentEvent = {

        code: eventCode,

        creator: yourName,

        eventName: eventName,

        destination: destination,

        date: eventDate,

        time: eventTime

    };


    // DISPLAY EVENT NAME

    document.getElementById(
        "displayEventName"
    ).textContent = eventName;


    // DISPLAY DESTINATION

    document.getElementById(
        "displayDestination"
    ).textContent = destination;


    // DISPLAY CODE

    document.getElementById(
        "eventCode"
    ).textContent = eventCode;


    // SHOW EVENT CREATED PAGE

    showPage(eventCreatedPage);


    alert(
        "🎉 Event created successfully!"
    );

});


// ========================================
// COPY EVENT CODE
// ========================================

copyBtn.addEventListener("click", function () {

    const code =
        document.getElementById("eventCode").textContent;


    if (navigator.clipboard) {

        navigator.clipboard.writeText(code)
            .then(function () {

                alert("📋 Event code copied!");

            })
            .catch(function () {

                alert(
                    "Your Event Code is:\n\n" +
                    code
                );

            });

    } else {

        alert(
            "Your Event Code is:\n\n" +
            code
        );

    }

});


// ========================================
// OPEN TRACKING
// ========================================

trackingBtn.addEventListener("click", function () {

    if (!currentEvent) {

        alert("No event found.");

        return;
    }


    document.getElementById(
        "trackingEventName"
    ).textContent =
        currentEvent.eventName;


    document.getElementById(
        "trackingDestination"
    ).textContent =
        currentEvent.destination;


    showPage(trackingPage);

});


// ========================================
// EVENT CREATED → HOME
// ========================================

homeBtn.addEventListener("click", function () {

    showPage(homePage);

});


// ========================================
// JOIN EVENT
// ========================================

joinSubmitBtn.addEventListener("click", function () {

    const code =
        document.getElementById("joinCode")
            .value
            .trim()
            .toUpperCase();

    const name =
        document.getElementById("joinName")
            .value
            .trim();


    if (code === "" || name === "") {

        alert(
            "Please enter your name and event code."
        );

        return;
    }


    // TEMPORARY DEMO

    alert(
        "👥 Join button is working!\n\n" +
        "Name: " + name +
        "\nCode: " + code
    );

});


// ========================================
// TRACKING → HOME
// ========================================

trackingHomeBtn.addEventListener("click", function () {

    showPage(homePage);

});
