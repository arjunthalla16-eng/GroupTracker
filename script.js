// ========================================
// FIREBASE
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBNjGzWkElpvkcT2AzAg_lRGYRNlAjrZbA",
    authDomain: "grouptracker-16b46.firebaseapp.com",
    projectId: "grouptracker-16b46",
    storageBucket: "grouptracker-16b46.firebasestorage.app",
    messagingSenderId: "327640725117",
    appId: "1:327640725117:web:88971ecf02a3949fa62314"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ========================================
// PAGES
// ========================================

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


// ========================================
// BUTTONS
// ========================================

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
// BACK
// ========================================

backBtn.addEventListener("click", function () {

    showPage(homePage);

});


joinBackBtn.addEventListener("click", function () {

    showPage(homePage);

});


trackingHomeBtn.addEventListener("click", function () {

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
                Math.random() *
                characters.length
            );

        code += characters[randomIndex];

    }

    return code;
}


// ========================================
// CREATE EVENT
// ========================================

generateBtn.addEventListener(
    "click",
    async function () {

        const yourName =
            document
                .getElementById("yourName")
                .value
                .trim();

        const eventName =
            document
                .getElementById("eventName")
                .value
                .trim();

        const destination =
            document
                .getElementById("destination")
                .value
                .trim();

        const eventDate =
            document
                .getElementById("eventDate")
                .value;

        const eventTime =
            document
                .getElementById("eventTime")
                .value;


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


        try {

            // ====================================
            // SAVE TO FIRESTORE
            // ====================================

            await addDoc(
                collection(db, "events"),
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


            // STORE CURRENT EVENT

            currentEvent = {

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


            // DISPLAY EVENT NAME

            document.getElementById(
                "displayEventName"
            ).textContent =
                eventName;


            // DISPLAY DESTINATION

            document.getElementById(
                "displayDestination"
            ).textContent =
                destination;


            // DISPLAY EVENT CODE

            document.getElementById(
                "eventCode"
            ).textContent =
                eventCode;


            // OPEN CREATED PAGE

            showPage(eventCreatedPage);


            alert(
                "🎉 Event saved to Firebase!\n\n" +
                "Event Code: " +
                eventCode
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "❌ Firebase Error:\n\n" +
                error.message
            );

        }

    }
);


// ========================================
// COPY CODE
// ========================================

copyBtn.addEventListener(
    "click",
    function () {

        const code =
            document
                .getElementById("eventCode")
                .textContent;


        if (navigator.clipboard) {

            navigator.clipboard
                .writeText(code)
                .then(function () {

                    alert(
                        "📋 Event code copied!"
                    );

                })
                .catch(function () {

                    alert(
                        "Event Code:\n\n" +
                        code
                    );

                });

        }

        else {

            alert(
                "Event Code:\n\n" +
                code
            );

        }

    }
);


// ========================================
// OPEN TRACKING
// ========================================

trackingBtn.addEventListener(
    "click",
    function () {

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

    }
);


// ========================================
// HOME
// ========================================

homeBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


// ========================================
// JOIN — TEMPORARY
// ========================================

joinSubmitBtn.addEventListener(
    "click",
    function () {

        alert(
            "Join Firebase search is the next step! 👥"
        );

    }
);
