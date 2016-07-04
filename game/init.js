var items =     ["health", "hunger", "tape", "twigs", "wood"      , "dirt"         , "water"        , "muds"];
var itemTools = [""      , ""      , ""    , ""     , "wooden_axe", "wooden_shovel", "wooden_bucket", ""];
var tools = ["wooden_axe", "wooden_shovel", "wooden_bucket"];

function initGame(mode, data) {
    switch (mode) {
        case undefined:
            for (var i = 0; i < items.length; i++) {
                var t = itemTools[i];
                saveKey[items[i]] = new Item(items[i], t);
                saveKey[items[i]].set_object(0);
                console.log("created " + items[i]);
            }
            for (var i = 0; i < tools.length; i++) {
                saveKey.tools[tools[i]] = new Tool(tools[i]);
                console.log("created " + tools[i]);
            }
            saveKey.tape.set_object(15);
            saveKey.health.set_object(100);
            saveKey.hunger.set_object(100);
            break;
        case "save":
            var returnValue = {tools: {}};
            for (var i = 0; i < items.length; i++) {
                returnValue[items[i]] = saveKey[items[i]].amount;
            }
            for (var i = 0; i < tools.length; i++) {
                returnValue.tools[tools[i]] = saveKey.tools[tools[i]].durability;
            }
            returnValue.progress = saveKey.progress;
            returnValue.progressNum = saveKey.progressNum;
            return returnValue;
            break;
        case "load":
            console.log("starting initGame()");
            initGame();
            console.log("initGame() completed");
            console.log("starting save load");
            console.log("starting items load");
            for (var i in data) {
                if (i == "progress" || i == "progressNum") {
                    console.log("loading " + i);
                    saveKey[i] = data[i];
                    console.log("good");
                } else if (i == "tools") {
                    console.log("loading " + i);
                    console.log("wait for tools load");
                } else {
                    console.log("loading " + i);
                    saveKey[i].set_object(data[i]);
                    console.log("good");
                }
            }
            console.log("items load completed");
            console.log("starting tools load");
            for (var t in data.tools) {
                console.log("loading " + t);
                saveKey.tools[t].set_object(data.tools[t]);
                console.log("good");
            }
            console.log("tools load completed");
            console.log("save load completed");
            break;
    }
}