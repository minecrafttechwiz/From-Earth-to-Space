function addText(gameEvent) {
    if (saveKey.progressNum) {
        $("#name").hide();
        showItems();
    }
    $("#display").empty();
    switch (gameEvent) {
        case "name":
            $("#name").show();
            $("#saving").hide();
            break;
        case "intro1":
            saveKey.progressNum = 1;
            saveKey.progress = "intro1";
            $("#saving").show();
            $("#display").append(
                "<h2>Introductions</h2>"
                + "<p>Ah, right. My name is " + saveKey.name + " and I'm an aerospace engineer. Or used to be. After I became a whistleblower, the company ousted me, unconcious, into the depths of space hell.</p>"
                + "<button onclick=\"addText('intro2')\">Next</button>"
            );
            break;
        case "intro2":
            saveKey.progressNum = 2;
            saveKey.progress = "intro2";
            $("#display").append(
                "<h2>Introductions</h2>"
                + "<p>I just woke up on this planet. I think this planet looks a lot like Earth, and if I try hard enough...</p>"
                + "<button onclick=\"addText('options1')\">Next</button>"
            );
            break;
        case "options1":
            $("#items_display").show();
            $("#tools_display").show();
            saveKey.progressNum = 3;
            saveKey.progress = "options1";
            start_clock();
            $("#display").append(
                "<h2>An Island</h2>"
                + "<h3>Pick an option</h3>"
                + "<p><a href=\"#\" onclick=\"addText('home1')\">Check Your Surroundings</a></p>"
            );
            break;
        case "home1":
            if (saveKey.progressNum == 3) {
                saveKey.progressNum = 4;
                saveKey.progress = "home1";
            }
            if (saveKey.progressNum == 4) {
                saveKey.progressNum = 5;
                notify("Found some trees.");
                notify("Some twigs lay scattered.");
            }
            $("#display").append(
                "<h2>An Island</h2>"
                + "<p><a href=\"#\" onclick=\"saveKey.wood.getItem()\">Chop Some Wood</a></p>"
                + "<p><a href=\"#\" onclick=\"saveKey.twigs.getItem()\">Gather Some Twigs</a></p>"
                + "<p><a href=\"#\" onclick=\"crafting('wood')\">Woodcrafting</a></p>"
            );
            if (saveKey.tools.wooden_shovel.durability != 0) {
                saveKey.progressNum = 6;
                $("#display").append(
                    "<p><a href=\"#\" onclick=\"saveKey.dirt.getItem()\">Dig Some Dirt</a></p>"
                    + "<p><a href=\"#\" onclick=\"saveKey.water.getItem()\">Scoop Some Water</a></p>"
                    + "<p><a href=\"#\" onclick=\"crafting('mix')\">Mix-crafting</a></p>"
                    + "<p><a href=\"#\" onclick=\"upgrade('hut')\">Build a Hut (60 Wood, 30 Mud)</a></p>"
                );
            }
            break;
    }
}