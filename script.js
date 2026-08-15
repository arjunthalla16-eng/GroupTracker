// ======================================================
// FIREBASE IMPORTS
// ======================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    setDoc
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

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ======================================================
// PAGES
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
// BUTTONS
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

    document.getElementById("yourName").value = "";

    document.getElementById("eventName").value = "";

    document.getElementById("destination").value = "";

    document.getElementById("eventDate").value = "";

    document.getElementById("eventTime").value = "";

}


// ======================================================
// CLEAR JOIN FORM
// ======================================================

function clearJoinForm() {

    document.getElementById("joinCode").value = "";

    document.getElementById("joinName").value = "";

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

        clearJoinForm();

        showPage(joinPage);

    }
);


// ======================================================
// BACK BUTTON
// ======================================================

backBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


// ======================================================
// JOIN BACK
// ======================================================

joinBackBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


// ======================================================
// TRACKING HOME
// ======================================================

trackingHomeBtn.addEventListener(
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


// ======================================================
// CREATE EVENT
// ======================================================

generateBtn.addEventListener(
    "click",
    async function () {

        const yourName =
            document.getElementById(
                "yourName"
            )
            .value
            .trim();


        const eventName =
            document.getElementById(
                "eventName"
            )
            .value
            .trim();


        const destination =
            document.getElementById(
                "destination"
            )
            .value
            .trim();


        const eventDate =
            document.getElementById(
                "eventDate"
            )
            .value;


        const eventTime =
            document.getElementById(
                "eventTime"
            )
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


        // GENERATE EVENT CODE

        const eventCode =
            generateEventCode();


        generateBtn.disabled = true;

        generateBtn.textContent =
            "Creating Event...";


        try {

            // ==========================================
            // CREATE FIRESTORE DOCUMENT
            // ==========================================

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

                        // CREATOR IS FIRST MEMBER

                        members:
                            [
                                yourName
                            ],

                        createdAt:
                            new Date()

                    }
                );


            console.log(
                "EVENT CREATED:",
                docRef.id
            );


            // ==========================================
            // STORE CURRENT EVENT
            // ==========================================

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
                    eventTime,

                members:
                    [
                        yourName
                    ]

            };


            // ==========================================
            // SHOW EVENT DETAILS
            // ==========================================

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


            // ==========================================
            // TRACKING DETAILS
            // ==========================================

            document.getElementById(
                "trackingEventName"
            ).textContent =
                eventName;


            document.getElementById(
                "trackingDestination"
            ).textContent =
                destination;


            // ==========================================
            // SHOW CREATED PAGE
            // ==========================================

            showPage(
                eventCreatedPage
            );


            alert(
                "🎉 Event created successfully!\n\n" +
                "Event Code: " +
                eventCode
            );


            clearCreateForm();

        }

        catch (error) {

            console.error(
                "CREATE EVENT ERROR:",
                error
            );


            alert(
                "❌ Firebase Error:\n\n" +
                error.message
            );

        }


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
                "Event Code:\n\n" +
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


        displayMembers(
            currentEvent.members
        );


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
    async function () {

        // ==========================================
        // GET USER INPUT
        // ==========================================

        const joinCode =
            document.getElementById(
                "joinCode"
            )
            .value
            .trim()
            .toUpperCase();


        const joinName =
            document.getElementById(
                "joinName"
            )
            .value
            .trim();


        // ==========================================
        // VALIDATION
        // ==========================================

        if (joinCode === "") {

            alert(
                "Please enter the event code."
            );

            return;

        }


        if (joinName === "") {

            alert(
                "Please enter your name."
            );

            return;

        }


        if (joinCode.length !== 6) {

            alert(
                "Event code must contain 6 characters."
            );

            return;

        }


        joinSubmitBtn.disabled = true;

        joinSubmitBtn.textContent =
            "Joining...";


        try {

            // ==========================================
            // SEARCH EVENT
            // ==========================================

            console.log(
                "Searching event:",
                joinCode
            );


            const eventsRef =
                collection(
                    db,
                    "events"
                );


            const eventQuery =
                query(
                    eventsRef,
                    where(
                        "code",
                        "==",
                        joinCode
                    )
                );


            const querySnapshot =
                await getDocs(
                    eventQuery
                );


            // ==========================================
            // EVENT NOT FOUND
            // ==========================================

            if (
                querySnapshot.empty
            ) {

                alert(
                    "❌ Event not found!\n\n" +
                    "Check your event code."
                );

                return;

            }


            // ==========================================
            // GET EVENT DOCUMENT
            // ==========================================

            const eventDoc =
                querySnapshot.docs[0];


            const eventData =
                eventDoc.data();


            console.log(
                "EVENT FOUND:",
                eventDoc.id
            );


            // ==========================================
            // GET CURRENT MEMBERS
            // ==========================================

            let currentMembers = [];


            if (
                Array.isArray(
                    eventData.members
                )
            ) {

                currentMembers =
                    eventData.members;

            }


            console.log(
                "OLD MEMBERS:",
                currentMembers
            );


            // ==========================================
            // ADD NEW MEMBER
            // ==========================================

            const updatedMembers = [
                ...new Set(
                    [
                        ...currentMembers,
                        joinName
                    ]
                )
            ];


            console.log(
                "NEW MEMBERS:",
                updatedMembers
            );


            // ==========================================
            // EVENT DOCUMENT REFERENCE
            // ==========================================

            const eventRef =
                doc(
                    db,
                    "events",
                    eventDoc.id
                );


            // ==========================================
            // SAVE MEMBERS TO FIRESTORE
            // ==========================================

            await setDoc(
                eventRef,
                {

                    members:
                        updatedMembers

                },
                {

                    merge:
                        true

                }
            );


            console.log(
                "🔥 FIREBASE UPDATED SUCCESSFULLY"
            );


            // ==========================================
            // CURRENT EVENT
            // ==========================================

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

                members:
                    updatedMembers,

                joinedAs:
                    joinName

            };


            // ==========================================
            // TRACKING PAGE
            // ==========================================

            document.getElementById(
                "trackingEventName"
            ).textContent =
                eventData.eventName;


            document.getElementById(
                "trackingDestination"
            ).textContent =
                eventData.destination;


            // ==========================================
            // DISPLAY MEMBERS
            // ==========================================

            displayMembers(
                updatedMembers
            );


            // ==========================================
            // OPEN TRACKING PAGE
            // ==========================================

            showPage(
                trackingPage
            );


            alert(
                "✅ Successfully joined!\n\n" +
                joinName +
                " added to the group."
            );

        }

        catch (error) {

            console.error(
                "JOIN/FIREBASE ERROR:",
                error
            );


            alert(
                "❌ Firebase Error:\n\n" +
                error.message
            );

        }


        joinSubmitBtn.disabled = false;

        joinSubmitBtn.textContent =
            "Join Event 👥";

    }
);


// ======================================================
// DISPLAY MEMBERS
// ======================================================

function displayMembers(
    members
) {

    const membersList =
        document.getElementById(
            "membersList"
        );


    if (!membersList) {

        return;

    }


    membersList.innerHTML = "";


    if (
        !Array.isArray(members) ||
        members.length === 0
    ) {

        membersList.innerHTML = `

            <div class="member">

                <span>
                    👥 No members yet
                </span>

            </div>

        `;

        return;

    }


    members.forEach(
        function (name) {

            const member =
                document.createElement(
                    "div"
                );


            member.className =
                "member";


            member.innerHTML = `

                <span>
                    👤 ${escapeHTML(name)}
                </span>

                <span>
                    🟢 Online
                </span>

            `;
            membersList.appendChild(
                member
            );

        }
    );

}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


            me
