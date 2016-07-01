var saveKey = {health: 100, hunger: 100, wood: 0, twigs: 0, tools: {axe: 0, tape: 10}};

function reset() {
    var resetConfirm = confirm("Are you sure you want to reset? (All progress will be lost forever.)");
    if (resetConfirm == true) {
        saveKey = {health: 100, hunger: 100, wood: 0};
        addText("name");
        localStorage.removeItem("save");
        notify("Reset Complete");
    } else {
        notify("Reset Averted");
    }
}

function start_clock() {
    setTimeout(function() {
        var clock = timeItself();
        clock.done(function(newTime){
            saveKey.time = newTime;
            $("#time").text("Time: " + newTime);
        });
        start_clock();
    }, 50);
}

function notify(message) {
    $("#sidebar").append("<p class='side'>" + message + "</p>");
    $(".side").fadeOut(3000);
}

function functionLoad(func) {
    switch (func) {
        case "save":
            var functionDone = saveDown();
            break;
    }
    functionDone.done(function(message){
        notify(message);
    });
    functionDone.fail(function(){
        notify(message)
    });
}

function randomChance(material) {
    switch (material) {
        case "wood":
            return Math.floor((Math.random() * 7) + 1);
            break;
        default:
            return Math.round(Math.random()) * 100;
    }
}

function timeItself() {
    var dfd = new $.Deferred();
    var date = new Date();
    var hour = date.getHours()
    var minute = date.getMinutes().toString();
    if (hour > 12) {
        hour -= 12;
        hour = hour.toString();
        var after = "P.M.";
    } else {
        var after = "A.M.";
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    var time = hour + ":" + minute + " " + after;
    dfd.resolve(time);
    return dfd.promise();
}

function saveDown() {
    var dfd = new $.Deferred();
    var saveTemp = btoa(JSON.stringify(saveKey));
    localStorage.setItem("save", saveTemp);
    $("#load").show();
    dfd.resolve("Save successful!");
    return dfd.promise();
}

function load() {
    var saveTemp = atob(localStorage.getItem("save"));
    saveKey = JSON.parse(saveTemp);
    addText(saveKey.progress);
    set_health(saveKey.health);
    set_hunger(saveKey.hunger);
    set_wood(saveKey.wood);
    start_clock();
    $("#saving").show();
    if (saveKey.progress != "intro1" && saveKey.progress != "intro2") {
        $("#hunger").show();
        $("#health").show();
        $("#time").show();
    }
}

function nameSubmit() {
    saveKey.name = $("#nameValue").val();
    $("#name").hide();
    $("#saving").show();
    addText("intro1");
}