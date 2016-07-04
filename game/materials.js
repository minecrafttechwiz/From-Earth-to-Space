function Tool(name) {
    this.name = name;
    this.durability = 0;
    var toolWords = this.name.split("_");
    this.displayName = toolWords[0].charAt(0).toUpperCase() + toolWords[0].slice(1) + " " + toolWords[1].charAt(0).toUpperCase() + toolWords[1].slice(1);
    this.set_object = function(durability) {
        this.durability = durability;
        $("#" + this.name + "_display").text(this.displayName + ": " + durability + " Durability");
    }
}

function Item(name, tool) {
    this.name = name;
    if (tool) {
        this.tool = tool;
    }
    this.amount = 0;
    this.displayName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    this.set_object = function(amount) {
        this.amount = amount;
        $("#" + this.name + "_display").text(this.displayName + ": " + amount);
    }
    this.getItem = function() {
        if (this.tool) {
            if (saveKey.tools[tool].durability > 0) {
                saveKey.tools[tool].set_object(saveKey.tools[tool].durability - randomChance(tool));
                if (saveKey.tools[tool].durability <= 0) {
                    saveKey.tools[tool].set_object(0);
                    notify("Your " + saveKey.tools[tool].displayName +" broke.");
                }
            } else {
                notify("You don't have a " + saveKey.tools[tool].displayName + ".");
                return;
            }
        }
        var found = randomChance(this.name);
        this.set_object(this.amount + found);
        notify("You found " + found + " " + this.name + "!");
    }
}