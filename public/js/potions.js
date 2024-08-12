function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getArticle(word) {
    return /^[aeiou]/i.test(word) ? 'an' : 'a';
}

let currentPotion = {};

function generatePotion() {
    const titles = ["Potion", "Elixir", "Draught", "Vial", "Philter", "Tonic", "Brew", "Ichor", "Juice", "Concoction"];
    const effects = [
        'Healing. It instantly regenerates some health when drank.',
        'Vigor. Gives temporary health when drank.',
        'Vitality. It slowly regenerates health over a period of some hours.',
        'Might. It gives a bonus to attack rolls after drinking.',
        'Courage. Gives immunity to fear and some temporary inspiration.',
        'Giant Strength. It gives the user much more strength.',
        'Flame Resistance. It gives resistance to fire damage.',
        'Cold Resistance. It gives resistance to cold damage.',
        'Necro Resistance. Gives resistance to necrotic damage.',
        'Radiant Resistance. Gives resistance to radiant damage.',
        'Stoneskin. Gives resistance to martial damage.',
        'Acid Resistance. Gives resistance to acid.',
        'Lightning Resistance. Gives resistance to lightning damage.',
        'Succubus Charm. Makes the drinker irresistible to nearby people.',
        'Shielding. Gives the user a magical shield of energy.',
        'Flame Breath. Gives the user fire breath for a short time.',
        'Growth. Makes the user double in size.',
        'Shrinking. Makes the user half in size.',
        'Comprehension. Lets the user understand all languages.',
        'Fertility. Makes the user very fertile, almost certain to make a baby under its effects!',
        'Intimidation. Gives the user a huge booming voice that terrifies those around.',
        'Luck. It gives the user a temporary boost to luck.',
        'Mana. Gives the user more magical power to cast with.',
        'Arcane. Gives the user more powerful spells.',
        'Animal form. Makes the user turn into a random animal.',
        'Dreams. Makes the user get lost in a hallucinary dream world of their perfect dream.',
        'Nightmares. Makes the user get lost in a hallucinary dream world of their worst nightmares.',
        'Stamina. Gives the user more stamina and constitution.',
        'Fleet foot. Makes the user have more speed.',
        'Knowledge. Increases the users intelligence temporarily.',
        'The Bard. Increases the users charisma temporarily.',
        'Disguise. Changes the users form to a disguised form of any race and appeance.',
        'Feast. Removes all hunger and thirst from the target.',
        'Youth. Makes the user grow some years younger.',
        'Age. Makes the user grow some years older.',
        'Furnace. Makes the user radiate with a damaging aura.',
        'Eagle Sight. Gives the user strong vision and a bonus to perception.',
        'Health. Cures all diseases and illnesses.',
        'Invulnerability. Freezes the user in stasis that makes them immune to damage but they cannot move or act.',
        'Riddle me gone. Gives the user the cure to a single riddle.',
        'Horrifying appearance. Makes the user look more ugly for a time.',
        'Beautiful appearance. Makes the user appear more attractive for a time.',
        'Swordsmanship. Makes the user more effective and versatile with a blade.',
        'Bowmanship. Makes the user more effective with a bow or ranged weapon.',
        'Nymph Breath. Gives water breathing.',
        'Midas. Makes the user turn things to gold.',
        'Berserker. Makes the user rage with great strength.',
        'Utter Hatred. Makes the user have bonuses against a particular type of enemy.',
        'Oracle. Lets the user divinate the future.',
        'Demonic Leech. Heals a portion of all damage the user deals.',
        'Fey Nature. Lets the user become one with animals and nature around them.',
        'Tracelessness. Makes the user very hard to follow.',
        'Gracefulness. Makes the user have a better acrobatics skill.',
        'Goblin Climb. Gives the user a bonus to climbing.',
        'Dead Ringer. Makes the user appear completely dead to all magic.',
        'One Leafed Clover. Gives the user worst luck.',
        'Possession. Lets the user gain control of a nearby creature, their body comatosed while they do.',
        'Owls Wake. Makes the user need no sleep for a time.',
        'Hawks Flight. Lets the user fly.',
        'Peace. Makes the user very calm and unable to harm others.',
        'Rejuvenation. Heals a single scar or bad injury on the user such as a missing arm.',
        'Sphinxes Truth. Makes the user tell the truth.',
        'Serpent Tongue. Makes the user only able to lie.',
        'Navigation. Makes the user unable to get lost and find where they need.',
        'Hook Horror. The users hands become sharp weaponised blades.',
        'Schaffensfreude. Makes the enemies take damage as they deal it to the user.',
        'Invisibility. Makes the user invisible.',
        'Wild magic. Taps into wild magic making an absolutely random thing happen.',
        'Fame. Makes the user more famous.',
        'Goats Trek. Makes the user immune to the toils of long travels and bad weather.',
        'Gargoyle Toughness. Increases the users constitution.',
        'Atomic Clock. Lets the user know the exact tme and date.',
        'Transmutation. Lets the user have the ability to change somethings properties.',
        'Iron Skin. Turns the users skin to metal giving them many resistances.',
        'Sex Change. Changes the users gender.',
        'Race Change. Changes the users race.',
        'Musical Breath. Makes the user say everything in song, and fey music follows them in the air.',
        'Utter Understanding. Makes the user know very intimately about one exact thing. Random, or they can decide.',
        'Split Form. The user turns into two or three tiny versions of themselves and controls them all.',
        'Flavour. Makes anything and everything taste amazing!',
        'Glimmer. Makes the user and its gear instantly clean and as good looking as possible.',
        'Love. Makes the user and someone else fall in love.',
        'Poison. Poisons the user, weakening them.',
        'Rebirth. Resurrects the user if they die soon after drinking.',
        'Elemental form. Turns the user to an elemental form relevant to their personality.',
        'True form. Turns the user into a familiar like creature similar to their personality.',
        'Gods Touch. Gives the user a holy connection to their god or fiendish deity.',
        'Antidepressant. Does what it says on the tin.',
        'Ghostly Form. Makes the user intangible and able to phase through objects.',
        'Artisans Skill. Gives the user skill in a particular art temporarily.',
        'Godly form. Improves all stats.',
        'Bless Weapon. Makes the users weapons do more damage.',
        'Euphoria. Makes the user feel amazing and trip out.',
        'Bodyguard. Creates a spectral bodyguard for a short time who obeys orders.',
        'Babelfish. Lets the user speak any language but not understand it.',
        'Preservation. Stops whatever its poured on from rotting or degrading.',
        'Fear. Makes the user terrified.',
        'Night vision. Gives the ability to see in the dark.',
        'Tracking. Lets the user track an enemy.',
        'Cure-all. Cures any status effects.'
       

    ];
    const strengths = [
        'Regular with a slight side effect.',
        'Regular with no side effect.',
        'Regular with a strong side effect.',
        'Minor with a strong side effect.',
        'Minor with a slight side effect.',
        'Major with a strong side effect.',
        'Major with a small side effect.',
        'A poison. Almost no positive affect all side effect.',
        'Temporary but strong and wears off quickly.',
        'Seemingly permanent.'
    ];
    const sideEffects = [
        'Nothing bad at all!',
        'Puts the user to sleep.',
        'Rapid hair growth all over the body.',
        'Bleeding from the eyes.',
        'Vivid hallucinations.',
        'Flashbacks of your own eventual demise.',
        'The skin to crack and appear distorted.',
        'Spots to grow on the skin.',
        'Diarrhoea.',
        'Vomiting.',
        'Blurred Vision.',
        'Blindness.',
        'Deafness.',
        'Mutism.',
        'Health loss via rapid bleeding.',
        'A sudden horrific accent.',
        'The irresistible urge to dance.',
        'The hearing of demons.',
        'Loss of balance.',
        'Everything tasting like dirt for some time.',
        'Excessive drooling.',
        'Loss of intelligence.',
        'Loss of strength.',
        'Loss of speed.',
        'Loss of charisma.',
        'Genuine happiness.',
        'Hunger.',
        'Thirst.',
        'Trouble breathing.',
        'Sudden Moustache.',
        'Poisoning.',
        'Petrification.',
        'Stunning.',
        'Immobilisation.',
        'Increased libido.',
        'Fidgeting.',
        'Itchiness.',
        'Rashes.',
        'Attracts bears.',
        'Magically covers in dirt.',
        'Horrifying stench.',
        'Baldness.',
        'Swelling.',
        'Loss of a random item.',
        'Curses.',
        'Damage.',
        'Weakness to a magical damage type.'
    ];
    const containers = [
        'A conical smooth glass bottle.',
        'A square glass bottle.',
        'A not quite watertight leather waterskin.',
        'A stone flask.',
        'A metal thermos.',
        'A glass syringe.',
        'A small medical vial.',
        'A small shot sized bottle.',
        'A large metal bottle.',
        'A capped horn.',
        'An ornate very decorated glass bottle.',
        'A geometric diamond shaped bottle.',
        'A translucent long wine bottle.',
        'A translucent beer bottle.',
        'A leather pouch.',
        'An inhaler like spray bottle.',
        'A coloured bottle.',
        'A bone flask.',
        'A small metal vial.',
        'A large bottle that can be swigged several times.',
    ];
    const appearances = [
        'Clear',
        'Blue',
        'Green',
        'Red',
        'Pale Green',
        'Pink',
        'Light Blue',
        'White',
        'Black',
        'Dark Grey',
        'Light grey',
        'Yellow',
        'Orange',
        'Gold',
        'Orange',
        'Bronze',
        'Metallic',
        'Purple',
        'Brown',
        'Dark Red'
    ];
    const appearances2 = [
        'Flecks of colour.',
        'Swirls of colour.',
        'Fizzing bubbles.',
        'Bubbles suspended in it.',
        'Some kind of bone floating in it.',
        'Leaves and flowers in it.',
        'Two separating liquids.',
        'A bright glow.',
        'A soft glow.',
        'Stripes of colour.',
        'Translucency.',
        'A cloudy murkiness.',
        'Blood within it.',
        'Dirt floating in it.',
        'Chunks of metal in it.',
        'Some type of gore from a slain creature.',
        'Steam coming from it.',
        'A face in the liquid.',
        'Constantly moving and shifting liquid.',
        'A constant heat.'
    ];
    const textures = [
        'Thick and sludgy.',
        'Thin and watery.',
        'Airy and bubbly.',
        'Slimey.',
        'Almost solid.',
        'Oily.',
        'Chunky.',
        'Bitty.',
        'Milky.',
        'Almost gaseous.'
    ];
    const tastes = [
        'Nothing at all.',
        'Sulphur.',
        'Fresh air.',
        'Baking cookies.',
        'Flowers.',
        'Rotting meat.',
        'Egg.',
        'Rotten eggs.',
        'Fresh bread.',
        'Blood.',
        'Home.',
        'Vomit.',
        'Garlic.',
        'Fruit.',
        'Chocolate.',
        'Beer.',
        'Smoke.',
        'Wood.',
        'Death.',
        'Orc.',
        'Wet dog.',
        'Wet goblin.',
        'Perfume.',
        'Cheap perfume.',
        'Musk.',
        'Garbage.',
        'Sand.',
        'The Forest.',
        'Nuts.',
        'Acidic.af',
        'Spicy.',
        'Minty.',
        'Of chemicals.',
        'Dirt.',
        'Of something bad flavoured to taste better.',
        'Alcohol.',
        'Sugar.',
        'A damp cave.',
        'Strange.',
        'Indescribable but nice.',
        'Indescribable but horrid.',
        'Rain.',
        'Medical.',
        'Bacon.',
        'Coffee.',
        'Cut grass.',
        'Vanilla.',
        'The sea.',
        'Roast meat.',
        'Festive.',
        'Lavender.',
        'Lilac and Gooseberries.',
        'A fresh baby.',
        'A new car.',
        'Cirtrus.',
        'Leather.',
        'Metal.',
        'A forge.',
        'Fresh Cake.',
        'Paint.',
        'Wine.',
        'Polish.',
        'Cheese.',
        'Fish.',
        'Compost.',
        'The sewers.',
        'Apples.',
        'Holy oils.',
        'Massage oil.',
        'A brothel.',
        'Old fruit.',
        'Roses.',
        'Something that stirs memories.',
        'Gingerbread.',
        'Cinnamon.',
        'Candy.',
        'Fumes.',
        'Bark.',
        'Chicken.',
        'Beef.',
        'Human Flesh.',
        'Gunpowder.',
        'A storm.',
        'Success.',
        'Gold.',
        'Mayonnaise.',
        'Barbeque.',
        'Salt.',
        'Pepper.',
        'Aromatic spices.',
        'Fruit punch.',
        'Water.',
        'Fresh water.',
        'Stagnant water.',
        'Mud.',
        'A colour.',
        'Music.',
        'The end of the world.',
        'Magically the worst thing to you',
        'Magically the most desirable thing to you.'
    ];
    const labels = [
        'Its name and title in bold letters.',
        'Its description in ornate elvish.',
        'Its description in elvish with a relevant mythic story.',
        'Its description on dwarven.',
        'Dwarven runes.',
        'Its description in Gnomish.',
        'Gnomish diagrams for its use.',
        'The words "USE ONLY IN EMERGANCIES" scrawled on it.',
        'A mass produced label claiming the company has no fault for any side effects.',
        'A mass produced label saying it’s a new flavour.',
        'Very tiny print describing how the potion was made in great detail, around 1000 words.',
        'Its name in Bold words in Giant.',
        'Its title scrawled off.',
        'Has faded beyond reading.',
        'Doesn’t seem to have one.',
        'Its description and a random fact.',
        'Its description and a small compliment to make your day better.',
        'Its description and a joke.',
        'Its description in Infernal.',
        'Its description in some ancient language.',
        'Its description in some kind of symbols.',
        'Its description in Braile.',
        'Its description in elemental languages.',
        'Its name and flavour.',
        'Its name with a warning about side effects.',
        'Its name and its recommended buying price.',
        'Bloody prints all over it.',
        'Name engraved into the container.',
        'Its name glowing with minor magic.',
        'A cartoony mascot.',
        'A warning of an ancient curse.',
        'Its name and description in invisible ink.',
        'Its description in Draconic.',
        'Several different names and descriptions plastered over eachother.',
        'A name of a completely different potion to what it does.',
        'A title describing the exact opposite.',
        'A money back guarantee.',
        'A coupon for a free potion.',
        'A living face looking around.',
        'Its name and recipe for other alchemists.',
        'A heartfelt love letter for someone.',
        'A heartfelt hate letter for someone.',
        'A persons name. The potion wont work unless asked by its name to do so.',
        'A strange prophecy.',
        'A small doodle.',
        'A note saying DO NOT DRINK.',
        'A passive aggressive note about other people drinking potions that don’t belong to them.',
        'Brightly glowing letters.',
        'That plays a very quiet sing song till the bottle is empty.',
        'Ornate and beautiful designs.',
        'Very practical designs.',
        'Holy symbols.',
        'Unholy symbols.',
        'Fey symbols and Sylvan writing.',
        'A riddle, the lid not opening unless the riddle is solved.',
        'Saying its designed for babies.',
        'Saying that it shouldn’t be drank by anyone under 18.',
        'A note saying its illegal contraband being confiscated.',
        'A note saying the alchemist thinks it is its greatest work.',
        'A note saying the alchemist is sorry for ever creating it.',
        'A note saying that it never should have been made and there are copius blood stains all over the bottle.',
        'It says you’re being watched. When the person checks it, the description changes to Just Kidding.',
        'Its description in Druidic.',
        'Its description in Orcish',
        'Its description in Goblin.',
        'Its description in Halfling.',
        'Its description in Celestial.',
        'Its description in Undercommon.',
        'Its description in Deep speech.',
        'Its description in strange arcane symbols.',
        'A map of where the potion was made.',
        'A small puzzle for kids.',
        'A list of ingredients in their chemical forms.',
        'A list of possible side effects as long as the bottle is.',
        'A red X.',
        'A sad face.',
        'An angry face.',
        'A happy face.',
        'A healing symbol.',
        'A cheesy pun potion name.',
        'Growing with vines.',
        'Growing with flowers.',
        'Growing with crystals.',
        'Growing with rock.',
        'Shamanistic symbols and shavings.',
        'No words just a single color.',
        'Water damage but a just legible label.',
        'A label as if it was some kind of present.',
        'A label showing how many calories it is.',
        'A warning about potion abuse and to only take in moderation.',
        'A label with warnings and side effects all scribbled out.',
        'That only shows the side effects.',
        'A mysterious number.',
        'A code name in theives cant.',
        'A few unrelated letters.',
        'The name of one of the party members.',
        'The name of the BBEG.',
        'Crawling with bugs.',
        'Covered in something unspeakable.',
        'Covered in glitter. It gets everywhere.'
    ];

    const title = randomItem(titles);
    const strength = randomItem(strengths);

    currentPotion = {
        title,
        label: randomItem(labels),
        container: randomItem(containers),
        appearance: randomItem(appearances),
        appearanceDetail: randomItem(appearances2),
        texture: randomItem(textures),
        smell: randomItem(tastes),
        taste: randomItem(tastes),
        strength,
        effect: randomItem(effects),
        sideEffect: (strength !== "Regular with no side effect.") ? randomItem(sideEffects) : "None"
    };

    let potionDescription = `
        <p>The type is: <strong>${getArticle(title)} ${title}</strong></p>
        <p>The ${title.toLowerCase()} has a label showing: <strong>${currentPotion.label}</strong></p>
        <p>The ${title.toLowerCase()} is in: <strong>${currentPotion.container}</strong></p>
        <p>The ${title.toLowerCase()} looks: <strong>${currentPotion.appearance}</strong> with <strong>${currentPotion.appearanceDetail}</strong></p>
        <p>The ${title.toLowerCase()}'s texture is: <strong>${currentPotion.texture}</strong></p>
        <p>The ${title.toLowerCase()} smells like: <strong>${currentPotion.smell}</strong></p>
        <p>The ${title.toLowerCase()} tastes like: <strong>${currentPotion.taste}</strong></p>
        <p>The ${title.toLowerCase()}'s strength is: <strong>${strength}</strong></p>
        <p>The ${title.toLowerCase()}'s effect is: <strong>${currentPotion.effect}</strong></p>
    `;

    if (currentPotion.sideEffect !== "None") {
        potionDescription += `<p>The ${title.toLowerCase()}'s side effect is: <strong>${currentPotion.sideEffect}</strong></p>`;
    } else {
        potionDescription += `<p>The ${title.toLowerCase()} has no side effects.</p>`;
    }

    document.getElementById('potion-description').innerHTML = potionDescription;
    document.getElementById('image-prompt').classList.add('hidden');
    document.getElementById('generate-image').classList.add('hidden');
    document.getElementById('generated-image').classList.add('hidden');
    document.getElementById('save-potion').classList.remove('hidden');
}

function showImagePrompt() {
    const { title, label, container, appearance, appearanceDetail, texture } = currentPotion;

    const imagePrompt = `
    Create an image of ${getArticle(title)} ${title} in ${container.toLowerCase()}
It looks ${appearance.toLowerCase()} with ${appearanceDetail.toLowerCase()} And its' texture is ${texture.toLowerCase()} 
The ${title.toLowerCase()}'s label is ${label.toLowerCase()}
    `;

    document.getElementById('image-prompt').innerHTML = `<pre>${imagePrompt.trim()}</pre>`;
    document.getElementById('image-prompt').classList.remove('hidden');
    document.getElementById('generate-image').classList.remove('hidden');
    document.getElementById('generated-image').classList.remove('hidden');
}

async function generateImage() {
    const apiKey = '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';
    const promptText = document.querySelector('#image-prompt pre').innerText;

    // Show loading spinner
    document.getElementById('loading-spinner').classList.remove('hidden');

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model:"dall-e-3",
                prompt: promptText,
                n: 1,
                size: '1024x1024'
            })
        });

        const data = await response.json();
        if (response.ok) {
            const imageUrl = data.data[0].url;
            const imageElement = document.getElementById('generated-image');
            imageElement.src = imageUrl;
            imageElement.classList.add('loaded');
            document.getElementById('save-potion').classList.remove('hidden');

            currentPotion.image = imageUrl;
        } else {
            console.error('Error generating image:', data);
            alert('Failed to generate image.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating the image.');
    } finally {
        // Hide loading spinner
        document.getElementById('loading-spinner').classList.add('hidden');
    }
}

function savePotion() {
    let savedPotions = JSON.parse(localStorage.getItem('savedPotions')) || [];
    const potionData = {};

    // Save description
    potionData.description = document.getElementById('potion-description').innerHTML;

    // Save prompt if visible
    if (!document.getElementById('image-prompt').classList.contains('hidden')) {
        potionData.prompt = document.getElementById('image-prompt').innerHTML;
    }

    // Save image URL if visible
    const imageElement = document.getElementById('generated-image');
    if (!imageElement.classList.contains('hidden') && imageElement.src) {
        potionData.image = imageElement.src;
    }

    // Check if a potion with the same description already exists
    const existingPotionIndex = savedPotions.findIndex(potion => potion.description === potionData.description);

    if (existingPotionIndex !== -1) {
        // Update existing potion with new data
        savedPotions[existingPotionIndex] = { ...savedPotions[existingPotionIndex], ...potionData };
    } else {
        // Add new potion if it doesn't exist
        savedPotions.push(potionData);
    }

    // Save updated potions to localStorage
    localStorage.setItem('savedPotions', JSON.stringify(savedPotions));

    // Display the saved potions
    displaySavedPotions();
}

window.onload = function() {
    displaySavedPotions();
};

function displaySavedPotions() {
    const savedPotions = JSON.parse(localStorage.getItem('savedPotions')) || [];
    const potionsList = document.getElementById('potions-list');
    potionsList.innerHTML = '';

    savedPotions.forEach((potion, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('saved-potion');
        listItem.innerHTML = `
            <div class="saved-potion-description">${potion.description}</div>
            ${potion.prompt ? `<div class="saved-potion-prompt">${potion.prompt}</div>` : ''}
            ${potion.image ? `<img src="${potion.image}" alt="Potion Image" />` : ''}
            <br>
            <button class="outerBtn" onclick="deletePotion(${index})">Delete</button>
        `;
        potionsList.appendChild(listItem);
    });

    // Ensure the saved potions section is visible if there are any saved potions
    const savedPotionsContainer = document.getElementById('saved-potions');
    if (savedPotions.length > 0) {
        savedPotionsContainer.classList.remove('hidden');
    } else {
        savedPotionsContainer.classList.add('hidden');
    }
}

function deletePotion(index) {
    let savedPotions = JSON.parse(localStorage.getItem('savedPotions')) || [];
    savedPotions.splice(index, 1);
    localStorage.setItem('savedPotions', JSON.stringify(savedPotions));
    displaySavedPotions();
}

function toggleSavedPotions() {
    const potionsList = document.getElementById('potions-list');
    const isHidden = potionsList.classList.toggle('hidden');
    
    // Change the arrow direction based on visibility
    const titleElement = document.querySelector('#saved-potions h2');
    titleElement.textContent = isHidden ? 'Saved Potions ▲' : 'Saved Potions ▼';
}
