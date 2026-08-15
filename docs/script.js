import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs
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

const copyBtn =
    document.getElementById("copyBtn");

const trackingBtn =
    document.getElementById("trackingBtn");

const homeBtn =
    document.getElementById("homeBtn");

const joinSubmitBtn =
    document.getElementById("joinSubmitBtn");

const joinBackBtn =
    document.getElementById("joinBackBtn");

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
// CREATE EVENT BUTTON
// ========================================

createBtn.addEventListener(
    "click",
    function () {

        showPage(createPage);

    }
);


// ========================================
// JOIN EVENT BUTTON
// ========================================

joinBtn.addEventListener(
    "click",
    function () {

        showPage(joinPage);

    }
);


// ========================================
// BACK BUTTON
// ========================================

backBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


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


        // CHECK ALL FIELDS

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


        // GENERATE CODE

        const eventCode =
            generateEventCode();


        try {

            // SAVE EVENT TO FIRESTORE

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


            // OPEN SUCCESS PAGE

            showPage(eventCreatedPage);


            alert(
                "🎉 Event successfully created!"
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Firebase Error:\n\n" +
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
            document
                .getElementById("eventCode")
                .textContent;


        try {

            await navigator.clipboard.writeText(
                code
            );

            alert(
                "Event code copied! 📋"
            );

        }

        catch (error) {

            alert(
                "Event Code:\n\n" +
                code
            );

        }

    }
);


// ========================================
// JOIN EVENT
// ========================================

joinSubmitBtn.addEventListener(
    "click",
    async function () {

        const code =
            document
                .getElementById("joinCode")
                .value
                .trim()
                .toUpperCase();


        const name =
            document
                .getElementById("joinName")
                .value
                .trim();


        // CHECK INPUT

        if (
            code === "" ||
            name === ""
        ) {

            alert(
                "Please enter your name and event code."
            );

            return;
        }


        try {

            // EVENTS COLLECTION

            const eventsRef =
                collection(
                    db,
                    "events"
                );


            // SEARCH FOR EVENT CODE

            const eventQuery =
                query(
                    eventsRef,
                    where(
                        "code",
                        "==",
                        code
                    )
                );


            const snapshot =
                await getDocs(
                    eventQuery
                );


            // EVENT NOT FOUND

            if (snapshot.empty) {

                alert(
                    "❌ Event not found!\n\n" +
                    "Please check the event code."
                );

                return;
            }


            // GET EVENT DOCUMENT

            const eventDoc =
                snapshot.docs[0];


            const eventData =
                eventDoc.data();


            // STORE EVENT

            currentEvent = {

                id:
                    eventDoc.id,

                code:
                    eventData.code,

                creator:
                    eventData.creator,

                eventName:
                    eventData.eventName,

                destination:
                    eventData.destination,

                date:
                    eventData.date,

                time:
                    eventData.time,

                memberName:
                    name
            };


            // DISPLAY EVENT NAME

            document.getElementById(
                "trackingEventName"
            ).textContent =
                eventData.eventName;


            // DISPLAY DESTINATION

            document.getElementById(
                "trackingDestination"
            ).textContent =
                eventData.destination;


            // OPEN TRACKING PAGE

            showPage(trackingPage);


            alert(
                "✅ Successfully joined the event!"
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Could not join event.\n\n" +
                error.message
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
// HOME BUTTON
// ========================================

homeBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


// ========================================
// JOIN BACK BUTTON
// ========================================

joinBackBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


// ========================================
// TRACKING HOME BUTTON
// ========================================

trackingHomeBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);
