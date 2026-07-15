
// ================ Data =================================
// for generation and formulas
let firstNames = [
    "Amina", "Santiago", "Mei", "Olga", "Kwame", "Priya",
    "Noor", "Diego", "Yuki", "Chloe", "Amara", "Liam",
    "Nia", "Hana", "Mateo", "Anaya", "Jamal", "Lena",
    "Sofia", "Finn", "Imani", "Aria", "Kai", "Zara",
    "Maya", "Lucas", "Nina", "Ravi", "Aya", "Jonah"
];

let lastNames = [
    "Garcia", "Kim", "Patel", "Smith", "Nguyen", "Johnson",
    "Chen", "Martinez", "Ali", "Brown", "Singh", "Lopez",
    "Hassan", "Davis", "Rodriguez", "Khan", "Miller", "Gonzalez",
    "Ahmed", "Wilson", "Santos", "Taylor", "Hernandez", "Anderson",
    "Park", "Thomas", "Ramirez", "White", "Murphy", "Young"
];

let countries = [
    `England`, `Switzerland`, `France`, `Kosovo`,
    `Brazil`, `Colombia`, `Puerto Rico`, `USA`,
    `DR Congo`, `Libya`, `Kenya`, `Rwanda`,
    `Japan`, `Korea`, `Iran`, `Russia`
]

let positions = [
    `GK`, `FB`, `CB`, `DM`, `CM`, `AM`, `AI`, `BU`
];

let prefFoot = [
    `R`, `L`, `Ambidexter`
];

const weightPos = [
    [5, 1, 10, 4, 5, 15, 60],
    [20, 10, 20, 9, 25, 15, 1],
    [10, 5, 15, 4, 40, 25, 1],
    [10, 8, 25, 6, 30, 20, 1],
    [12, 15, 30, 9, 15, 18, 1],
    [15, 20, 30, 17, 5, 12, 1],
    [28, 18, 20, 16, 5, 12, 1],
    [18, 35, 15, 10, 3, 18, 1]
]

const attributes = [
    `PAC`, `SHO`, `PAS`, `DRI`, `DEF`, `PHY`, `GK`
];

const abilities = [
    [`acceleration`, `velocity`],
    [`finishing`, `longShoot`, `powerShoot`, `volley`, `penalties`],
    [`vista`, `shortPass`, `longPass`, `cross`, `effect`],
    [`dribbles`, `control`, `balance`, `calm`, `agility`],
    [`interceptions`, `slidingTackle`, `standingTackle`, `marking`, `aggressive`],
    [`strength`, `stamina`, `jumping`],
    [`diving`, `handling`, `kicking`, `reflexes`, `placement`],
];

let attrVal = [0, 0, 0, 0, 0, 0, 0, 0];

let abiVal = [
    [0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0],
    [0, 0, 0, 0, 0]
]
// ----------------------------------------------------------------------------------------------------

// ==================== DOM picks =============================
const startButton = document.querySelector(`#start`);
const resetButton = document.querySelector(`#reset`);
const info1 = document.querySelectorAll(`.iPlayer`);
const info2 = document.querySelectorAll(`.ab`);
const ovrDisplay = document.querySelector(`.ovr-display`);
info1.forEach((elem) => {
    elem.appendChild(document.createElement(`span`));
})
info2.forEach((elem) => {
    elem.appendChild(document.createElement(`span`));
})
const infoOne = document.querySelectorAll(`.iPlayer span`);
const infoTwo = document.querySelectorAll(`.ab span`);
// --------------------------------------------------------------------------------------------------------

// ========================= Utils functions =====================================
function randomNumber(start, range) {
    let num = start + (Math.random() * range);
    return Math.floor(num);
}

function randomInList(list) {
    let size = list.length;
    let popOne = Math.floor(Math.random() * size);

    let pick = list[popOne];

    return pick;
}

function generatePlayer() {
    let playerFirstName = randomInList(firstNames);
    let playerLastName = randomInList(lastNames);

    let playerAge = randomNumber(16, 25);
    let playerHeight = randomNumber(160, 35);
    let playerWeight = randomNumber(50, 35);
    let playerFoot = randomInList(prefFoot);

    let playerNationality = randomInList(countries);
    let playerPosition = randomInList(positions);
    const positionOfPlayer = positions.indexOf(playerPosition);;
    let playerSpecWeight = weightPos[positionOfPlayer];

    let playerSpecAbs = abiVal.map((part, num) =>
        part.map((ab) => {
            if (playerSpecWeight[num] <= 1) return randomNumber(10, 20);
            else if (playerSpecWeight[num] > 1 && playerSpecWeight[num] < 10) return randomNumber(35, 40);
            else if (playerSpecWeight[num] >= 10 && playerSpecWeight[num] <= 20) return randomNumber(75, 22);
            else if (playerSpecWeight[num] > 20 && playerSpecWeight[num] < 30) return randomNumber(65, 25);
            else return randomNumber(85, 10);
        }));

    let playerAttributes = playerSpecAbs.map((part) => {
        return Math.floor(part.reduce((a, b) => a + b) / part.length);
    })
    let playerOvr = playerAttributes.reduce((fAttr, sAttr, index) => {
        let calc = Math.floor(fAttr + sAttr * (playerSpecWeight[index] / 100))
        return calc;
    }, 0);


    return {
        identity: [
            playerFirstName, 
            playerLastName, playerAge,
            playerNationality, playerPosition, 
            playerHeight, playerWeight, 
            playerFoot
        ],
        
        attributes: playerAttributes,
        ovr: playerOvr,
    }
}

function displayPlayer(player) {
    infoOne.forEach((element, index) => {
        element.textContent = player.identity[index];
    });
    infoTwo.forEach((element, index) => {
        element.textContent = `${player.attributes[index]}`
    });
    ovrDisplay.textContent = player.ovr;
}

function reset() {
    infoOne.forEach((span) => span.textContent = ``)
    infoTwo.forEach((span) => span.textContent = ``)
    ovrDisplay.textContent = ``;
}

function updateUiForPlayerData() {
    infoTwo.forEach((span) => {
        if (span.textContent === ``) return;
        if (isNaN(+span.textContent)) return;

        let note = +span.textContent;
        let colorNote = Math.floor(note * 1.2);

        span.style.color = `hsl(${colorNote}, 100%, 50%)`
    });

    let noteOvr = ovrDisplay.textContent
    if (noteOvr === ``) return;
    if (isNaN(+noteOvr)) return;
    let colorOvr = Math.floor(noteOvr * 1.2);

    ovrDisplay.style.color = `hsl(${colorOvr}, 100%, 50%)`
    let mainDiv = document.querySelector(`.principal`);
    mainDiv.style.border = `2px solid hsl(${colorOvr}, 100%, 30%)` 
}
// ---------------------------------------------------------------------------------------------------

// =========== Event Listeners ===============
startButton.addEventListener(`click`, () => {
    let playerGenerated = generatePlayer();
    displayPlayer(playerGenerated);
    updateUiForPlayerData();
})
resetButton.addEventListener(`click`, () => {
    reset();
})
// -----------------------------------------------------------------------------------------------------