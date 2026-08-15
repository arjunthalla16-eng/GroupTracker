// ======================================================
// FIREBASE IMPORTS
// ======================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ======================================================
// FIREBASE CONFIG
// ======================================================

const firebaseConfig = {

    apiKey:
        "AIzaSyBNjGzWkElpvkcT2AzAg_lRGYRNlAjrZbA",

    authDomain:
        "grouptracker-16b46.firebaseapp.com",

    projectId:
        "grouptracker-16b46",

    storageBucket:
        "grouptracker-16b46.firebasestorage.app",

    messagingSenderId:
        "327640725117",

    appId:
        "1:327640725117:web:88971ecf02a3949fa62314"

};


// ======================================================
// INITIALIZE FIREBASE
// ======================================================

const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);


// ======================================================
// PAGE ELEMENTS
// ======================================================

const homePage =
    document.getElementById("homePage");

const createPage =
    document.getElementById("createPage");

const eventCreatedPage =
    document.getElementById("eventCreatedPage");

const joinPage =
    document.getElementById("joinPage");

const trackingPage =
    document.getElementById("trackingPage");


// ======================================================
// BUTTON ELEMENTS
// ======================================================

const createBtn =
    document.getElementById("createBtn");

const joinBtn =
    document.getElementById("joinBtn");

const generateBtn =
    document.getElementById("generateBtn");

const backBtn =
    document.getElementById("backBtn");

const joinBackBtn =
    document.getElementById("joinBackBtn");

const copyBtn =
    document.getElementById("copyBtn");

const trackingBtn =
    document.getElementById("trackingBtn");

const homeBtn =
    document.getElementById("homeBtn");

const joinSubmitBtn =
    document.getElementById("joinSubmitBtn");

const trackingHomeBtn =
    document.getElementById("trackingHomeBtn");


// ======================================================
// CURRENT EVENT
// ======================================================

let currentEvent = null;


// ======================================================
// SHOW PAGE
// ======================================================

function showPage(page) {

    homePage.classList.add("hidden");

    createPage.classList.add("hidden");

    eventCreatedPage.classList.add("hidden");

    joinPage.classList.add("hidden");

    trackingPage.classList.add("hidden");

    page.classList.remove("hidden");

}


// ======================================================
// CLEAR CREATE FORM
// ======================================================

function clearCreateForm() {

    document.getElementById(
        "yourName"
    ).value = "";

    document.getElementById(
        "eventName"
    ).value = "";

    document.getElementById(
        "destination"
    ).value = "";

    document.getElementById(
        "eventDate"
    ).value = "";

    document.getElementById(
        "eventTime"
    ).value = "";

}


// ======================================================
// HOME → CREATE
// ======================================================

createBtn.addEventListener(
    "click",
    function () {

        clearCreateForm();

        showPage(createPage);

    }
);


// ======================================================
// HOME → JOIN
// ======================================================

joinBtn.addEventListener(
    "click",
    function () {

        showPage(joinPage);

    }
);


// ======================================================
// CREATE → HOME
// ======================================================

backBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


// ======================================================
// JOIN → HOME
// ======================================================

joinBackBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


// ======================================================
// GENERATE EVENT CODE
// ======================================================

function generateEventCode() {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );

        code +=
            characters[randomIndex];

    }

    return code;

}


// ======================================================
// CREATE EVENT
// ======================================================

generateBtn.addEventListener(
    "click",
    async function () {

        // ----------------------------------------------
        // GET FORM VALUES
        // ----------------------------------------------

        const yourName =
            document.getElementById(
                "yourName"
            ).value.trim();


        const eventName =
            document.getElementById(
                "eventName"
            ).value.trim();


        const destination =
            document.getElementById(
                "destination"
            ).value.trim();


        const eventDate =
            document.getElementById(
                "eventDate"
            ).value;


        const eventTime =
            document.getElementById(
                "eventTime"
            ).value;


        // ----------------------------------------------
        // VALIDATE
        // ----------------------------------------------

        if (
            yourName === "" ||
            eventName === "" ||
            destination === "" ||
            eventDate === "" ||
            eventTime === ""
        ) {

            alert(
                "Please fill all the fields."
            );

            return;

        }


        // ----------------------------------------------
        // CREATE UNIQUE CODE
        // ----------------------------------------------

        const eventCode =
            generateEventCode();


        // ----------------------------------------------
        // DISABLE BUTTON
        // ----------------------------------------------

        generateBtn.disabled = true;

        generateBtn.textContent =
            "Creating Event...";


        try {

            // ------------------------------------------
            // SAVE TO FIRESTORE
            // ------------------------------------------

            const docRef =
                await addDoc(
                    collection(
                        db,
                        "events"
                    ),
                    {

                        code:
                            eventCode,

                        creator:
                            yourName,

                        eventName:
                            eventName,

                        destination:
                            destination,

                        date:
                            eventDate,

                        time:
                            eventTime,

                        createdAt:
                            new Date()

                    }
                );


            // ------------------------------------------
            // CONSOLE CONFIRMATION
            // ------------------------------------------

            console.log(
                "Firebase document created:",
                docRef.id
            );


            // ------------------------------------------
            // SAVE CURRENT EVENT
            // ------------------------------------------

            currentEvent = {

                id:
                    docRef.id,

                code:
                    eventCode,

                creator:
                    yourName,

                eventName:
                    eventName,

                destination:
                    destination,

                date:
                    eventDate,

                time:
                    eventTime

            };


            // ------------------------------------------
            // DISPLAY EVENT NAME
            // ------------------------------------------

            document.getElementById(
                "displayEventName"
            ).textContent =
                eventName;


            // ------------------------------------------
            // DISPLAY DESTINATION
            // ------------------------------------------

            document.getElementById(
                "displayDestination"
            ).textContent =
                destination;


            // ------------------------------------------
            // DISPLAY EVENT CODE
            // ------------------------------------------

            document.getElementById(
                "eventCode"
            ).textContent =
                eventCode;


            // ------------------------------------------
            // UPDATE TRACKING
            // ------------------------------------------

            document.getElementById(
                "trackingEventName"
            ).textContent =
                eventName;


            document.getElementById(
                "trackingDestination"
            ).textContent =
                destination;


            // ------------------------------------------
            // CLEAR FORM
            // ------------------------------------------

            clearCreateForm();


            // ------------------------------------------
            // SHOW SUCCESS PAGE
            // ------------------------------------------

            showPage(
                eventCreatedPage
            );


            alert(
                "🎉 Event saved to Firebase!\n\n" +
                "Event Code: " +
                eventCode
            );

        }

        catch (error) {

            console.error(
                "Firebase Error:",
                error
            );

            alert(
                "❌ Firebase Error:\n\n" +
                error.message
            );

        }


        // ----------------------------------------------
        // ENABLE BUTTON AGAIN
        // ----------------------------------------------

        generateBtn.disabled = false;

        generateBtn.textContent =
            "Create Event 🚀";

    }
);


// ======================================================
// COPY EVENT CODE
// ======================================================

copyBtn.addEventListener(
    "click",
    async function () {

        const code =
            document.getElementById(
                "eventCode"
            ).textContent;


        try {

            await navigator.clipboard
                .writeText(code);

            alert(
                "📋 Event code copied!"
            );

        }

        catch (error) {

            alert(
                "Your Event Code is:\n\n" +
                code
            );

        }

    }
);


// ======================================================
// OPEN TRACKING
// ======================================================

trackingBtn.addEventListener(
    "click",
    function () {

        if (!currentEvent) {

            alert(
                "No event found."
            );

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


        showPage(
            trackingPage
        );

    }
);


// ======================================================
// EVENT CREATED → HOME
// ======================================================

homeBtn.addEventListener(
    "click",
    function () {

        showPage(
            homePage
        );

    }
);


// ======================================================
// JOIN EVENT
// ======================================================

joinSubmitBtn.addEventListener(
    "click",
    function () {

        alert(
            "👥 Join Event is ready for Firebase search next!"
        );

    }
);


// ======================================================
// TRACKING → HOME
// ======================================================

trackingHomeBtn.addEventListener(
    "click",
    function () {

        showPage(
            homePage
        );

    }
);
