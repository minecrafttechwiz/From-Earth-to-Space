window.saveKey = {tools: {}};

function randomChance(material) {
    switch (material) {
        case "wood":
            return Math.floor((Math.random() * 7) + 2);
        case "twigs":
            return Math.floor((Math.random() * 5) + 2);
        case "dirt":
            do { x = Math.floor((Math.random() * 30) + 1); }
            while (x < 10);
            return x;
        case "water":
            do { x = Math.floor((Math.random() * 15) + 1); }
            while (x < 10);
            return x;
        case "wooden_axe":
            do { x = Math.floor((Math.random() * 20) + 1); }
            while (x < 10);
            return x;
        case "wooden_shovel":
            do { x = Math.floor((Math.random() * 15) + 1); }
            while (x < 5);
            return x;
        case "wooden_bucket":
            do { x = Math.floor((Math.random() * 10) + 1); }
            while (x < 5);
            return x;
        default:
            return Math.floor((Math.random() * 100) + 1);
    }
}

function load() {
    var saveTemp1 = atob(localStorage.getItem("save"));
    saveTemp2 = JSON.parse(saveTemp1);
    initGame("load", saveTemp2)
    addText(saveKey.progress);
    start_clock();
    $("#saving").show();
    $("#items_display").show();
    $("#tools_display").show();
    showItems();
}

function reset(resetConfirmNeeded) {
    if (resetConfirmNeeded) {
        var resetConfirm = confirm("Are you sure you want to reset? (All progress will be lost forever.)");
    } else {
        var resetConfirm = true;
    }
    if (resetConfirm == true) {
        console.log("starting reset");
        initGame();
        addText("name");
        localStorage.removeItem("save");
        $(".all").hide();
        if (resetConfirmNeeded) {
            notify("Reset Complete");
        }
    } else {
        notify("Reset Averted");
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
    } else if (hour == 12) {
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

function saveDown() {
    var dfd = new $.Deferred();
    var saveTemp1 = initGame('save');
    var saveTemp2 = btoa(JSON.stringify(saveTemp1));
    localStorage.setItem("save", saveTemp2);
    $("#load").show();
    dfd.resolve("Save successful!");
    return dfd.promise();
}

function start_clock() {
    setTimeout(function() {
        var clock = timeItself();
        clock.done(function(newTime){
            saveKey.time = newTime;
            $("#time_display").text("Time: " + newTime);
        });
        start_clock();
    }, 50);
}

function nameSubmit() {
    saveKey.name = $("#nameValue").val();
    $("#name").hide();
    $("#saving").show();
    addText("intro1");
}

function showTools() {
    $(".item_display").hide();
    if (saveKey.progressNum > 4) {
        $("#wooden_axe_display").show();
        $("#wooden_shovel_display").show();
        if (saveKey.progressNum > 5) {
            $("#wooden_bucket_display").show();
        }
    }
}

function showItems() {
    $(".tool_display").hide();
    if (saveKey.progressNum > 1) {
        $("#hunger_display").show();
        $("#health_display").show();
        $("#time_display").show();
        $("#tape_display").show();
        if (saveKey.progressNum > 2) {
            $("#wood_display").show();
            $("#twigs_display").show();
            if (saveKey.progressNum > 4) {
                $("#dirt_display").show();
                $("#water_display").show();
                $("#mud_display").show();
            }
        }
    }
}

function notify(message) {
    $("#sidebar").append("<p class='side'>" + message + "</p>");
    $(".side").fadeOut(3000);
}