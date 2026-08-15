document.getElementById("createBtn").addEventListener("click", function () {
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("createPage").classList.remove("hidden");
});

document.getElementById("joinBtn").addEventListener("click", function () {
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("joinPage").classList.remove("hidden");
});
