import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ========================================
// FIREBASE
// ========================================

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
const joinSubmitBtn = document.getElementById("joinSubmitBtn");
const trackingHomeBtn = document.getElementById("trackingHomeBtn");


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
// CLEAR CREATE FORM
// ========================================

function clearCreateForm() {

    document.getElementById("yourName").value = "";
    document.getElementById("eventName").value = "";
    document.getElementById("destination").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventTime").value = "";

}


// ========================================
// HOME → CREATE
// ========================================

createBtn.addEventListener("click", function () {

    // Clear old information
    clearCreateForm();

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

generateBtn.addEventListener(
    "click",
    async function () {

        const yourName =
            document.getElementById("yourName")
                .value
                .trim();

        const eventName =
            document.getElementById("eventName")
                .value
                .trim();

        const destination =
            document.getElementById("destination")
                .value
                .trim();

        const eventDate =
            document.getElementById("eventDate")
                .value;

        const eventTime =
            document.getElementById("eventTime")
                .value;


        // ====================================
        // CHECK FIELDS
        // ====================================

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


        // ====================================
        // GENERATE NEW CODE
        // ====================================

        const eventCode =
            generateEventCode();


        try {

            // ====================================
            // SAVE NEW EVENT TO FIRESTORE
            // ====================================

            const docRef = await addDoc(
                collection(db, "events"),
                {

                    code: eventCode,

                    creator: yourName,

                    eventName: eventName,

                    destination: destination,

                    date: eventDate,

                    time: eventTime,

                    createdAt: new Date()

                }
            );


            console.log(
                "Event saved with ID:",
                docRef.id
            );


            // ====================================
            // UPDATE CURRENT EVENT
            // ====================================

            currentEvent = {

                id: docRef.id,

                code: eventCode,

                creator: yourName,

                eventName: eventName,

                destination: destination,

                date: eventDate,

                time: eventTime

            };


            // ====================================
            // UPDATE DISPLAY
            // ====================================

            document.getElementById(
                "displayEventName"
            ).textContent = eventName;


            document.getElementById(
                "displayDestination"
            ).textContent = destination;


            document.getElementById(
                "eventCode"
            ).textContent = eventCode;


            // ====================================
            // UPDATE TRACKING PAGE
            // ====================================

            document.getElementById(
                "trackingEventName"
            ).textContent = eventName;


            document.getElementById(
                "trackingDestination"
            ).textContent = destination;


            // ====================================
            // CLEAR FORM
            // ====================================

            clearCreateForm();


            // ====================================
            // SHOW CREATED PAGE
            // ====================================

            showPage(eventCreatedPage);


            alert(
                "🎉 New event created successfully!\n\n" +
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
// COPY EVENT CODE
// ========================================

copyBtn.addEventListener(
    "click",
    async function () {

        const code =
            document.getElementById(
                "eventCode"
            ).textContent;


        try {

            await navigator.clipboard.writeText(
                code
            );

            alert(
                "📋 Event code copied!"
            );

        }

        catch {

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


        showPage(trackingPage);

    }
);


// ========================================
// EVENT CREATED → HOME
// ========================================

homeBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


// ========================================
// JOIN EVENT — TEMPORARY
// ========================================

joinSubmitBtn.addEventListener(
    "click",
    function () {

        alert(
            "Join Event Firebase search is the next step! 👥"
        );

    }
);


// ========================================
// TRACKING → HOME
// ========================================

trackingHomeBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);
