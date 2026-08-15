const homePage = document.getElementById("homePage");
const createPage = document.getElementById("createPage");
const joinPage = document.getElementById("joinPage");

const createBtn = document.getElementById("createBtn");
const joinBtn = document.getElementById("joinBtn");

const backBtn = document.getElementById("backBtn");
const joinBackBtn = document.getElementById("joinBackBtn");


// CREATE EVENT

createBtn.addEventListener("click", function () {

    homePage.classList.add("hidden");
    createPage.classList.remove("hidden");

});


// JOIN EVENT

joinBtn.addEventListener("click", function () {

    homePage.classList.add("hidden");
    joinPage.classList.remove("hidden");

});


// BACK FROM CREATE

backBtn.addEventListener("click", function () {

    createPage.classList.add("hidden");
    homePage.classList.remove("hidden");

});


// BACK FROM JOIN

joinBackBtn.addEventListener("click", function () {

    joinPage.classList.add("hidden");
    homePage.classList.remove("hidden");

});
