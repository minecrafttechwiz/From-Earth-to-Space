function addText(gameEvent) {
    $("#name").hide();
    $("#display").empty();
    switch (gameEvent) {
        case "name": {
            $("#name").show();
            $("#saving").show();
        }
        case "intro1":
            saveKey.progress = "intro1";
            $("#saving").show();
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
            $("#hunger").show();
            $("#health").show();
            $("#time").show();
            start_clock();
            $("#display").append(
                "<h2>An Island</h2>"
                + "<h3>Pick an option</h3>"
                + "<p><a href=\"#\" onclick=\"addText('home1')\">Check Your Surroundings</a></p>"
            );
            break;
        case "home1":
            if (saveKey.progress != "home1") {
                notify("Found some trees.");
                notify("Some twigs lay scattered.");
            }
            saveKey.progress = "home1";
            $("#wood").show();
            $("#display").append(
                "<h2>An Island</h2>"
                + "<p><a href=\"#\" onclick=\"wood()\">Chop Some Wood</a></p>"
            );
            break;
    }
}