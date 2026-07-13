
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
    `OVR`, `PAC`, `SHO`, `PAS`, `DRI`, `DEF`, `PHY`, `GK`
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

function randomNumber(start, range) {
    let num = start + (Math.random() * range);
    return Math.floor(num);
}

let firstName = randomInList(firstNames);
let lastName = randomInList(lastNames);
let age = randomNumber(16, 25);
let height = randomNumber(160, 45);
let weight = randomNumber(50, 50);

let nationality = randomInList(countries);
let pos = randomInList(positions);
let foot = randomInList(prefFoot);

function randomInList(list) {
    let size = list.length;
    let popOne = Math.floor(Math.random() * size);

    let pick = list[popOne];

    return pick;
}

let data = [
    firstName, lastName, age,
    height, weight, nationality,
    pos, foot
];

let positionOf = positions.indexOf(pos);
let playerSpecWeight = weightPos[positionOf];


let playerSpecAbs = abiVal.map((part, num) =>
    part.map((ab) => {
        if (playerSpecWeight[num] <= 5) return randomNumber(10, 20);
        else if (playerSpecWeight[num] > 5 && playerSpecWeight[num] <= 15) return randomNumber(35, 50);
        else if (playerSpecWeight[num] > 15 && playerSpecWeight[num] < 25) return randomNumber(40, 50);
        else return randomNumber(60, 40);
    }));

console.table(data)
console.table(playerSpecAbs);
console.table(abilities);

let playerAttr = playerSpecAbs.map((part) => {
    return Math.floor(part.reduce((a, b) => a + b) / part.length);
})

console.table(playerAttr);

let playerOvr = playerAttr.reduce((fAttr, sAttr, index) =>
    Math.floor(fAttr + sAttr * (playerSpecWeight[index] / 100)), 0);

console.log(`Player ------------------> ${playerOvr}`);