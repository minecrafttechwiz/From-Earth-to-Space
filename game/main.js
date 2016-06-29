saveKey = {health: 100, hunger: 100, time: 0};

function loadFurther() {
    set_health(saveKey.health);
    set_hunger(saveKey.hunger);
}

function set_health(newHealth) {
    saveKey.health = newHealth;
    $("#health").text("Health: " + newHealth);
}

function set_hunger(newHunger) {
    saveKey.hunger = newHunger;
    $("#hunger").text("Hunger: " + newHunger);
}

function notify(message) {
    $("#sidebar").append("<p class='side'>" + message + "</p>");
    $(".side").fadeOut(3000);
}

function functionLoad(func) {
    switch (func) {
        case "load":
            var functionDone = load();
            break;
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

function addText(gameEvent) {
    $("#name").hide();
    $("#display").empty();
    switch (gameEvent) {
        case "intro1":
            saveKey.progress = "intro1";
            $("#saving").show();
            $("#hunger").show();
            $("#health").show();
            $("#time").show();
            $("#display").append(
                "<h2>Introductions</h2>"
                + "<p>Ah, right. My name is " + saveKey.name + " and I'm an aerospace engineer. Or used to be. After I became a whistleblower, the company ousted me, unconcious, into the depths of space hell.</p>"
                + "<button onclick=\"addText('intro2')\">Next</button>"
            );
            break;
        case "intro2":
            saveKey.progress = "intro2";
            $("#display").append(
                "<h2>Introductions</h2>"
                + "<p>I just woke up on this planet. I think this planet looks a lot like Earth, and if I try hard enough...</p>"
                + "<button onclick=\"addText('options1')\">Next</button>"
            );
            break;
        case "options1":
            saveKey.progress = "options1";
            $("#display").append(
                "<h2>An Island</h2>"
                + "<h3>Pick an option</h3>"
                + "<p><a href=\"#\" onclick=\"addText('check1')\">Check Your Surroundings</a></p>"
            );
            break;
        case "check1":
            saveKey.progress = "check1";
            saveKey.wood = 0;
            $("#display").append(
                "<h2>An Island</h2>"
                + "<p>There are a lot of trees.</p>"
                + "<button onclick=\"addText('home1')\">Next</button>"
            );
            break;
        case "home1":
            saveKey.progress = "home1";
            $("#display").append(
                "<h2>An Island</h2>"
                + "<p><a href=\"#\" onclick=\"wood()\">Chop Some Wood</a></p>"
            );
            break;
    }
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
    var dfd = new $.Deferred();
    var saveTemp = atob(localStorage.getItem("save"));
    saveKey = JSON.parse(saveTemp);
    addText(saveKey.progress);
    loadFurther();
    $("#display").show();
    dfd.resolve("Load successful!");
    return dfd.promise();
}

function nameSubmit() {
    saveKey.name = $("#nameValue").val();
    $("#name").hide();
    $("#saving").show();
    addText("intro1");
    $("#display").show();
}