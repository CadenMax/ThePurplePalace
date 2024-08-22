let items = [];

// Load and parse the CSV file
function loadCSV() {
    Papa.parse("../public/data/Items.csv", {
        download: true,
        header: true,  // Assumes the CSV has headers matching your column names
        complete: function (results) {
            items = results.data;  // Store the parsed items
            console.log("Items loaded from CSV:", items);  // Log the loaded items
        },
        error: function (err) {
            console.error("Error loading CSV: ", err);
        }
    });
}

// Call this function on page load
window.onload = function () {
    loadCSV();  // Load the CSV when the page loads
};

const rarityColors = {
    "MUNDANE": "#999999",  // Gray
    "COMMON": "#02e002",   // Green
    "UNCOMMON": "#82bbcf", // Light Blue
    "RARE": "#FF69B4",     // Pink
    "VERY_RARE": "#8A2BE2", // Purple
    "LEGENDARY": "#FFD700"  // Gold
};

// Default images for categories
const defaultImages = {
    "Weapon": "default-weapon.png",
    "Armor": "default-armor.png",
    "Potion": "default-potion.png"
};

// List of modifiers for items
const modifiers = ["Shiny", "Rusty", "Ancient", "Enchanted", "Gleaming"];

// Convert copper pieces to gold, silver, copper
function convertCopperToCurrency(copper) {
    const gold = Math.floor(copper / 100);
    copper %= 100;
    const silver = Math.floor(copper / 10);
    copper %= 10;
    return `${gold > 0 ? gold + ' gold, ' : ''}${silver > 0 ? silver + ' silver, ' : ''}${copper > 0 ? copper + ' copper' : ''}`.trim();
}

// Generate random modifier
function addRandomModifier(name) {
    if (name.includes("{modifier}")) {
        const randomModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        return name.replace("{modifier}", randomModifier);
    }
    return name;
}

function toggleFilters() {
    const filters = document.getElementById("filters");
    filters.style.display = filters.style.display === "none" ? "block" : "none";
}

function generateLoot() {
    const selectedFilter = document.querySelector('input[name="filter-type"]:checked').value;
    const isItemCountFilterActive = document.getElementById("item-count-filter").checked;
    let filteredItems = [];
    let itemCount = 10; // Default to 10 items

    console.log("Selected filter: ", selectedFilter);
    console.log("Is item count filter active: ", isItemCountFilterActive);

    // Apply the appropriate filter based on the selected option
    if (selectedFilter === "party-level") {
        const partyLevel = parseInt(document.getElementById("party-level").value, 10);
        filteredItems = filterByPartyLevel(partyLevel);
        itemCount = getItemCountByPartyLevel(partyLevel);
        console.log("Party level filter applied. Items found: ", filteredItems.length);
    } else if (selectedFilter === "wealth-level") {
        const wealthLevel = document.getElementById("wealth-level").value;
        filteredItems = filterByWealthLevel(wealthLevel);
        itemCount = getItemCountByWealthLevel(wealthLevel);
        console.log("Wealth level filter applied. Items found: ", filteredItems.length);
    } else if (selectedFilter === "no-filter") {
        // No filter selected, so use all items and default to 10 items
        filteredItems = items.slice(); // Clone the entire items array
        console.log("No filter applied. Defaulting to 10 items.");
    }

    // Apply the item count filter if active and if there are filtered items
    if (isItemCountFilterActive && filteredItems.length > 0) {
        const itemCountInputValue = document.getElementById("item-count").value;
        console.log("Item count input value (raw):", itemCountInputValue);

        const requestedItemCount = parseInt(itemCountInputValue, 10);
        console.log("Parsed item count:", requestedItemCount);

        // Ensure valid item count input
        if (!isNaN(requestedItemCount) && requestedItemCount > 0) {
            itemCount = Math.min(requestedItemCount, filteredItems.length); // Limit item count to available filtered items
            console.log("Item count override active. Requested item count: ", itemCount);
        } else {
            console.warn("Invalid or zero item count entered. Defaulting to available items count.");
            itemCount = filteredItems.length; // Use all filtered items if the count is invalid
        }
    }

    // Log to verify the final item count before proceeding
    console.log("Final item count after applying filters: ", itemCount);

    // Ensure filteredItems is populated before proceeding
    if (filteredItems.length > 0 && itemCount > 0) {
        // Shuffle items and limit to the determined itemCount
        const shuffledItems = filteredItems.sort(() => 0.5 - Math.random()).slice(0, itemCount);
        console.log("Shuffled and selected items: ", shuffledItems);

        // Chance to get gold or gems
        const extraLoot = getRandomGoldOrGems();
        if (extraLoot) {
            shuffledItems.push(extraLoot);
            console.log("Extra loot added: ", extraLoot);
        }

        displayLoot(shuffledItems);
    } else {
        console.error("No items found for the selected filter or invalid item count. Filtered items: ", filteredItems);
        alert("No items found for the selected filter or invalid item count.");
    }
}

function filterByPartyLevel(partyLevel) {
    const rarityChances = {
        "MUNDANE": 100,   // Always included
        "COMMON": 100,    // Always included
        "UNCOMMON": 0,    // Base chance for UNCOMMON items
        "RARE": 0,        // Base chance for RARE items
        "VERY_RARE": 0,   // Base chance for VERY_RARE items
        "LEGENDARY": 0    // Base chance for LEGENDARY items
    };

    // Adjust the rarity chances based on the party level
    if (partyLevel <= 5) {
        // Low-level party: very low chance for rare items
        rarityChances.UNCOMMON = 20;
        rarityChances.RARE = 5;
        rarityChances.VERY_RARE = 1;
        rarityChances.LEGENDARY = 0;
    } else if (partyLevel > 5 && partyLevel <= 10) {
        // Mid-level party: moderate chance for rare items
        rarityChances.UNCOMMON = 50;
        rarityChances.RARE = 20;
        rarityChances.VERY_RARE = 5;
        rarityChances.LEGENDARY = 1;
    } else if (partyLevel > 10 && partyLevel <= 15) {
        // High-level party: good chance for rare items
        rarityChances.UNCOMMON = 70;
        rarityChances.RARE = 40;
        rarityChances.VERY_RARE = 20;
        rarityChances.LEGENDARY = 5;
    } else {
        // Very high-level party: high chance for rare items
        rarityChances.UNCOMMON = 90;
        rarityChances.RARE = 60;
        rarityChances.VERY_RARE = 40;
        rarityChances.LEGENDARY = 20;
    }

    // Filter items based on the party level and rarity
    return items.filter(item => {
        const rarity = item.rarity || "COMMON";  // Default to COMMON if rarity is not defined
        const chance = rarityChances[rarity];
        const roll = Math.random() * 100;
        return roll < chance;
    });
}

function filterByItemCount(itemCount) {
    return items.slice(0, itemCount);
}

function filterByWealthLevel(wealthLevel) {
    const thresholds = {
        "poor": { min: 0, max: 0.1 },           
        "average": { min: 0, max: 10 },      
        "wealthy": { min: 0, max: 200 },      
        "epic": { min: 0, max: 2000 },        
        "legendary": { min: 10, max: 1000000 } 
    };

    console.log("Filtering by wealth level:", wealthLevel, "Threshold:", thresholds[wealthLevel]);

    const result = items.filter(item => {
        // Ensure that the cost is parsed as a number and handle invalid values
        let itemCostInCopper = parseInt(item.cost, 10);

        // Default to 0 if the cost is not a valid number
        if (isNaN(itemCostInCopper)) {
            itemCostInCopper = 0;
        }

        // Convert the item cost to gold
        const itemCostInGold = Math.floor(itemCostInCopper / 100);

        const { min, max } = thresholds[wealthLevel];

        // Return true if item falls within the min and max threshold in gold
        return itemCostInGold >= min && itemCostInGold <= max;
    });

    console.log("Items after filtering by wealth level:", result);
    return result;
}

function displayLoot(items) {
    const lootDisplay = document.getElementById("loot-display");
    lootDisplay.innerHTML = ""; // Clear previous loot

    items.forEach(item => {
        const itemName = addRandomModifier(item.name);
        const itemCost = convertCopperToCurrency(item.cost);
        const itemImage = item.image || defaultImages[item.category] || "default.png";
        const itemRarity = item.rarity || "COMMON"; // Default to COMMON if rarity is not defined
        const itemColor = rarityColors[itemRarity]; // Get the color based on rarity

        let itemDescription = `<p>${item.description}</p>`;
        if (item.rarity) itemDescription += `<p><strong>Rarity:</strong> ${item.rarity}</p>`.toLowerCase();
        if (item.classification) itemDescription += `<p><strong>Classification:</strong> ${item.classification}</p>`;
        if (item.damage) itemDescription += `<p><strong>Damage:</strong> ${item.damage}</p>`;
        if (item.ac) itemDescription += `<p><strong>Armor Class:</strong> ${item.ac}</p>`;
        if (item.properties) itemDescription += `<p><strong>Properties:</strong> ${item.properties}</p>`;
        if (itemCost) itemDescription += `<p><strong>Cost:</strong> ${itemCost}</p>`;

        const lootItem = document.createElement("div");
        lootItem.classList.add("item");

        // Apply color to the item name based on its rarity
        lootItem.innerHTML = `
        <div class="innerBtn" id="descriptionText" onclick="toggleDescription('${itemName}')" style="color: ${itemColor};">
             ${itemName} - Cost: ${itemCost}
         </div>
         <div class="loot-description" id="${itemName}" style="display: none;">
             ${itemDescription}
         </div>
    `;

        lootDisplay.appendChild(lootItem);
    });
}

// Toggle item description display
function toggleDescription(id) {
const description = document.getElementById(id);
description.style.display = description.style.display === "none" ? "block" : "none";
}

function getItemCountByPartyLevel(partyLevel) {
    if (partyLevel <= 5) {
        return 5; // Low-level party generates 5 items
    } else if (partyLevel > 5 && partyLevel <= 10) {
        return 6; // Mid-level party generates 6 items
    } else if (partyLevel > 10 && partyLevel <= 15) {
        return 8; // High-level party generates 8 items
    } else {
        return 10; // Very high-level party generates 10 items
    }
}

function getItemCountByWealthLevel(wealthLevel) {
    const itemCounts = {
        "poor": 5,
        "average": 5,
        "wealthy": 5,
        "epic": 8,
        "legendary": 10
    };
    return itemCounts[wealthLevel];
}

function getRandomGoldOrGems() {
    const roll = Math.floor(Math.random() * 100);
    if (roll < 10) {
        return {
            name: "A small pouch of gold pieces",
            cost: Math.floor(Math.random() * 1000) + 100
        };
    } else if (roll < 20) {
        return {
            name: "A small pouch of valuable gems ",
            cost: Math.floor(Math.random() * 1000) + 100
        };
    }
    return null;
}