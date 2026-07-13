

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
    [5, 5, 15, 5, 10, 10, 50],
    [25, 10, 10, 10, 25, 15, 5],
    [15, 10, 10, 10, 30, 20, 5],
    [10, 10, 30, 10, 20, 15, 5],
    [15, 15, 30, 10, 10, 15, 5],
    [15, 25, 25, 15, 5, 10, 5],
    [30, 15, 15, 20, 5, 10, 5],
    [20, 35, 10, 10, 5, 15, 5]
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
            if (playerSpecWeight[num] <= 5) return randomNumber(10, 20);
            else if (playerSpecWeight[num] > 5 && playerSpecWeight[num] <= 15) return randomNumber(35, 50);
            else if (playerSpecWeight[num] > 15 && playerSpecWeight[num] < 25) return randomNumber(40, 50);
            else return randomNumber(60, 40);
        }));

    let playerAttributes = playerSpecAbs.map((part) => {
        return Math.floor(part.reduce((a, b) => a + b) / part.length);
    })
    let playerOvr = playerAttributes.reduce((fAttr, sAttr, index) =>
        Math.floor(fAttr + sAttr * (playerSpecWeight[index] / 100)), 0);


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

startButton.addEventListener(`click`, () => {
    let playerGenerated = generatePlayer();
    displayPlayer(playerGenerated);
})
resetButton.addEventListener(`click`, () => {
    reset();
})

function reset() {
    infoOne.forEach((span) => span.textContent = ``)
    infoTwo.forEach((span) => span.textContent = ``)
    ovrDisplay.textContent = ``;
}