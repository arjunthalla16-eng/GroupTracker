content://com.android.externalstorage.documents/tree/primary%3ADownload%2FRC24::primary:Download/RC24/05BJ/GroupTracker/script.jsimport { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,

where,

getDocs
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ============================
// FIREBASE
// ============================

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


// ============================
// PAGES
// ============================

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


// ============================
// BUTTONS
// ============================

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

const joinBackBtn =
    document.getElementById("joinBackBtn");

const trackingHomeBtn =
    document.getElementById("trackingHomeBtn");


// ============================
// SHOW PAGE
// ============================

function showPage(page) {

    homePage.classList.add("hidden");
    createPage.classList.add("hidden");
    eventCreatedPage.classList.add("hidden");
    joinPage.classList.add("hidden");
    trackingPage.classList.add("hidden");

    page.classList.remove("hidden");
}


// ============================
// HOME → CREATE
// ============================

content://com.android.externalstorage.documents/tree/primary%3ADownload%2FRC24::primary:Download/RC24/05BJ/GroupTracker/script.jscreateBtn.addEventListener("click", function () {

    showPage(createPage);

});


// ============================
// HOME → JOIN
// ============================

joinBtn.addEventListener("click", function () {

    showPage(joinPage);

});


// ============================
// BACK
// ============================

backBtn.addEventListener("click", function () {

    showPage(homePage);

});


// ============================
// GENERATE CODE
// ============================

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


// ============================
// CREATE EVENT
// ============================

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


        // Check fields

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


        // Generate event code

        const eventCode =
            generateEventCode();


        try {

            // SAVE TO FIRESTORE

            await addDoc(
                collection(db, "events"),
                {

                    code: eventCode,

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


            // Show event information

            document.getElementById(
                "displayEventName"
            ).textContent =
                eventName;


            document.getElementById(
                "displayDestination"
            ).textContent =
                destination;


            document.getElementById(
                "eventCode"
            ).textContent =
                eventCode;


            // Open success page

            showPage(eventCreatedPage);


            alert(
                "🎉 Event successfully saved to Firebase!"
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


// ============================
// COPY CODE
// ============================

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
                "Event code copied! 📋"
            );

        }

        catch {

            alert(
                "Your Event Code is:\n\n" +
                code
            );

        }

    }
);


// ============================
// TRACKING
// ============================

trackingBtn.addEventListener(
    "click",
    function () {

        const eventName =
            document.getElementById(
                "displayEventName"
            ).textContent;

        const destination =
            document.getElementById(
                "displayDestination"
            ).textContent;


        document.getElementById(
            "trackingEventName"
        ).textContent =
            eventName;


        document.getElementById(
            "trackingDestination"
        ).textContent =
            destination;


        showPage(trackingPage);

    }
);


// ============================
// HOME
// ============================

homeBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


// ============================
// JOIN BACK
// ============================

joinBackBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


// ============================
// TRACKING HOME
// ============================

trackingHomeBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);
