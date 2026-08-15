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
    updateDoc,
    arrayUnion
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
// BACK BUTTONS
// ======================================================

backBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


joinBackBtn.addEventListener(
    "click",
    function () {

        showPage(homePage);

    }
);


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


        // CHECK FIELDS

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


        generateBtn.disabled = true;

        generateBtn.textContent =
            "Creating Event...";


        try {

            // SAVE EVENT

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

                        // IMPORTANT
                        // Creator is the first member

                        members:
                            [yourName],

                        createdAt:
                            new Date()

                    }
                );


            console.log(
                "EVENT CREATED:",
                docRef.id
            );


            // SAVE CURRENT EVENT

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
                    [yourName]

            };


            // DISPLAY EVENT

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


            // TRACKING

            document.getElementById(
                "trackingEventName"
            ).textContent =
                eventName;


            document.getElementById(
                "trackingDestination"
            ).textContent =
                destination;


            clearCreateForm();


            showPage(
                eventCreatedPage
            );


            alert(
                "🎉 Event created successfully!\n\n" +
                "Event Code: " +
                eventCode
            );

        }

        catch (error) {

            console.error(
                "CREATE ERROR:",
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

        catch {

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

        showPage(homePage);

    }
);


// ======================================================
// JOIN EVENT
// ======================================================

joinSubmitBtn.addEventListener(
    "click",
    async function () {

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


        // VALIDATION

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


        // LOADING

        joinSubmitBtn.disabled = true;

        joinSubmitBtn.textContent =
            "Joining...";


        try {

            // ==========================================
            // FIND EVENT
            // ==========================================

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


            // EVENT NOT FOUND

            if (
                querySnapshot.empty
            ) {

                alert(
                    "❌ Event not found!\n\n" +
                    "Please check the event code."
                );

                return;

            }


            // ==========================================
            // GET EVENT
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
            // UPDATE EVENT
            // ==========================================

            const eventRef =
                doc(
                    db,
                    "events",
                    eventDoc.id
                );


            await updateDoc(
                eventRef,
                {

                    members:
                        arrayUnion(joinName)

                }
            );


            console.log(
                "MEMBER SAVED:",
                joinName
            );


            // ==========================================
            // UPDATE CURRENT EVENT
            // ==========================================

            const existingMembers =
                Array.isArray(
                    eventData.members
                )
                    ? eventData.members
                    : [];


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
                    [
                        ...new Set(
                            [
                                ...existingMembers,
                                joinName
                            ]
                        )
                    ],

                joinedAs:
                    joinName

            };


            // ==========================================
            // UPDATE TRACKING PAGE
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
            // SHOW MEMBERS
            // ==========================================

            displayMembers(
                currentEvent.members
            );


            // ==========================================
            // OPEN TRACKING
            // ==========================================

            showPage(
                trackingPage
            );


            alert(
                "✅ Successfully joined!\n\n" +
                joinName +
                " was added to the group."
            );

        }

        catch (error) {

            console.error(
                "JOIN ERROR:",
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
        !members ||
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
// SAFE HTML
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
