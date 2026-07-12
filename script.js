
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
    `GK`, `FB`, `CB`,
    `DM`, `CM`, `AM`,
    `AI`, `BU`
];

let prefFoot = [
    `R`, `L`, `Ambidexter`
]

function randomAge() {
    let age = 16 + (Math.random() * 25);
    return Math.floor(age);
}

let firstName = ``;
let lastName = ``;
let age = randomAge();