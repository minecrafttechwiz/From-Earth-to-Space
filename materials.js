function set_object(object, amount) {
    switch (object) {
        case health:
            saveKey.health = amount;
            $("#health").text("Health: " + amount);
            break;
        case hunger:
            saveKey.hunger = amount;
            $("#hunger").text("Hunger: " + amount);
            break;
        case wood:
            saveKey.wood = amount;
            $("#wood").text("Wood: " + amount);
            break;
        case twigs:
            saveKey.twigs = amount;
            $("#twigs").text("Twigs: " + amount);
            break;
    }
}

function twigs() {
    var twigsFound = randomChance("twigs");
    set_object(saveKey.twigs + twigsFound);
    notify("Found " + twigsFound + " twigs.");
}

function wood() {
    if (saveKey.tools.axe == 0) {
        notify("You don't have an axe.")
    } else {
        var woodFound = randomChance("wood");
        set_object(saveKey.wood + woodFound);
        notify("Found " + woodFound + " piece of wood.");
    }
}