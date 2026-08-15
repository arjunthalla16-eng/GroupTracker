// ========================================
// GET PAGES
// ========================================

const homePage = document.getElementById("homePage");
const createPage = document.getElementById("createPage");
const eventCreatedPage = document.getElementById("eventCreatedPage");
const joinPage = document.getElementById("joinPage");


// ========================================
// GET BUTTONS
// ========================================

const createBtn = document.getElementById("createBtn");
const joinBtn = document.getElementById("joinBtn");

const generateBtn = document.getElementById("generateBtn");

const backBtn = document.getElementById("backBtn");
const joinBackBtn = document.getElementById("joinBackBtn");

const homeBtn = document.getElementById("homeBtn");


// ========================================
// HOME → CREATE
// ========================================

createBtn.addEventListener("click", function () {

    homePage.classList.add("hidden");
    createPage.classList.remove("hidden");

});


// ========================================
// HOME → JOIN
// ========================================

joinBtn.addEventListener("click", function () {

    homePage.classList.add("hidden");
    joinPage.classList.remove("hidden");

});


// ========================================
// CREATE → HOME
// ========================================

backBtn.addEventListener("click", function () {

    createPage.classList.add("hidden");
    homePage.classList.remove("hidden");

});


// ========================================
// JOIN → HOME
// ========================================

joinBackBtn.addEventListener("click", function () {

    joinPage.classList.add("hidden");
    homePage.classList.remove("hidden");

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
// CREATE EVENT BUTTON
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

    const eventCode = generateEventCode();


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


    // HIDE CREATE PAGE

    createPage.classList.add("hidden");


    // SHOW SUCCESS PAGE

    eventCreatedPage.classList.remove("hidden");


    alert(
        "🎉 Event created successfully!\n\n" +
        "Your Event Code: " +
        eventCode
    );

});


// ========================================
// SUCCESS PAGE → HOME
// ========================================

homeBtn.addEventListener("click", function () {

    eventCreatedPage.classList.add("hidden");

    homePage.classList.remove("hidden");

});
