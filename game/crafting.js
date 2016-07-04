var craftMaterials = {
    wooden_axe: {
        tape: 5,
        twigs: 10
    },
    wooden_shovel: {
        tape: 5,
        twigs: 10,
        wood: 3
    },
    wooden_bucket: {
        wood: 10,
        tape: 5
    },
    mud: {
        water: 5,
        dirt: 10
    }
}

function crafting(material) {
    $("#display").empty();
    switch (material) {
        case "wood":
            $("#display").append(
                "<h2>An Island</h2>"
                + "<h3>Woodcrafting</h3>"
                + "<p><a href=\"#\" onclick=\"craft('wooden_axe', true)\">Wooden Axe (5 tape, 10 twigs)</a></p>"
                + "<p><a href=\"#\" onclick=\"craft('wooden_shovel', true)\">Wooden Shovel (5 tape, 10 twigs, 3 wood)</a></p>"
            );
            if (saveKey.progressNum > 5) {
                $("#display").append("<p><a href=\"#\" onclick=\"craft('wooden_bucket', true)\">Wooden Bucket (5 tape, 10 wood)</a></p>");
            }
            $("#display").append("<p><a href=\"#\" onclick=\"addText('" + saveKey.progress + "')\">Go Back</a></p>");
            break;
        case "mix":
            $("#display").append(
                "<h2>An Island</h2>"
                + "<h3>Mix-crafting</h3>"
                + "<p><a href=\"#\" onclick=\"craft('mud', false, 10)\">Mud (10 Dirt, 5 Water)</a></p>"
                + "<p><a href=\"#\" onclick=\"addText('" + saveKey.progress + "')\">Go Back</a></p>"
            );
            break;
    }
}

function craft(item, tool, amount) {
    var enough = true;
    var special = craftMaterials[item];
    var specialKeys = Object.keys(special);
    for (var i = 0; i < specialKeys.length; i++) {
        if (!(saveKey[specialKeys[i]].amount >= special[specialKeys[i]])) {
            enough = false;
        }
    }
    var success;
    if (tool) {
        var toolStuff = saveKey.tools[item];
        var toolName = toolStuff.displayName;
        if (toolStuff.durability != 0) {
            success = "You already have a " + toolName;
        } else if (enough) {
            for (var i = 0; i < specialKeys.length; i++) {
                saveKey[specialKeys[i]].set_object(saveKey[specialKeys[i]].amount - special[specialKeys[i]]);
            }
            toolStuff.set_object(100);
            success = "You made a " + toolName + "!";
        } else {
            success = "Not enough materials to make a " + toolName + "!";
        }
    } else {
        if (enough) {
            for (var i = 0; i < specialKeys.length; i++) {
                saveKey[specialKeys[i]].set_object(saveKey[specialKeys[i]].amount - special[specialKeys[i]]);
            }
            saveKey[item].set_object(saveKey[item].amount + amount);
            success = "You made " + amount + " " + item + "!";
        } else {
            success = "Not enough materials to make " + amount + " " + item + "!";
        }
    }
    notify(success);
}