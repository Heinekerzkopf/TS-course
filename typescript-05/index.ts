// request for type

const dataFromControl = {
    water: 200,
    el: 350,
}

function checkReadings(data: typeof dataFromControl): boolean { /* we can ask for a TYPE of some object or array, so we dont have to create interface
    we do this only if we know that we wont use it again in our code */
    const dataFromUser = {
        water: 200,
        el: 350,
    };

    if (data.el === dataFromUser.el && data.water === dataFromUser.water) {
        return true;
    } else {
        return false;
    }

}

/** interesting example */
const pi = 3.14;
let piClone: typeof pi;

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// PRACTICING

// Перечисление с названием TypesOfMedia, которое включает строчные типы video, audio

enum TypesOfMedia {
    video = "video",
    audio = "audio"
}

// Перечисление с названием FormatsOfMedia, которое включает строчные видео-форматы: .mp4, .mov, .mkv, .flv, .webM

enum FormatsOfMedia {
    mp4 = ".mp4",
    mov = ".mov",
    mkv = ".mkv",
    flv = ".flv",
    webM = ".webM"
}

// Описание интерфейса, в котором:
// name - строка
// type - один из перечисления выше
// format = один из перечисления выше
// subtitles - необязательное поле типа строка
// marks - необязательное поле неизвестного типа

interface Media {
    name: string;
    type: TypesOfMedia;
    format: FormatsOfMedia;
    subtitle?: string;
    marks?: unknown;
}

function playMedia(
    { name, type, format, subtitle, marks }: Media = {
        name: "example",
        type: TypesOfMedia.audio,
        format: FormatsOfMedia.mp4,
    }
): string {
    let marksLog: string;

    // Создать функционал, что если marks - это массив, то "сложить" все эелементы в одну строку и поместить в marksLog
    // Если это строка, то просто поместить её в marksLog
    // Если что-то другое - то marksLog = "Unsupported type of marks"
    // Не допускайте any!

    if (Array.isArray(marks)) {
        marksLog = marks.join(", ");
    } else if (typeof marks === "string") {
        marksLog = marks;
    } else {
        marksLog = "Unsupported type of marks"
    }

    console.log(`Media ${name}${format} is ${type}
    Marks: ${marksLog}
    Subtitles: ${subtitle ?? "none"}`);
    // помните что это за оператор ??

    return "Media started";
}

playMedia({
    name: "WoW",
    format: FormatsOfMedia.mp4,
    type: TypesOfMedia.audio,
    subtitle: "hmhmhm hmhmhm doh",
    marks: ["4:30", "5:40"],
});

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Type Assertions


const requestOptions = {
    url: 'https://someurl.com',
    method: "POST",
} /* as const */

const fetchData = (url: string, method: "GET" | "POST"): void => {
    console.log(method);
}

// fetchData('qqq', 'GET');
fetchData(requestOptions.url, requestOptions.method as "GET" || "POST");

//========================================================================================================================================================
// another syntaxis <>

fetchData(requestOptions.url, /* HERE */<"GET">requestOptions.method);

//========================================================================================================================================================

// const box = document.querySelector('.box') as HTMLElement;
// const input = document.querySelector('input') as HTMLInputElement;

// const someNumber: number = +input.value;
// console.log(someNumber);


let a = 'value' as const;

const object = {
    number: "number",
} as const

let array = [] as const;

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Lesson 35

let num: Number = new Number(5);
let num2: number = 5;
let num3 = Number(3);

num = num2;
// num2 = num; - cant , not assignable

const numm = 5;
const strNum: string = numm.toString();
const str = '5';
const numStr: number = +str;

//========================================================================================================================================================

// objects

interface Department {
    name: string;
    budget: number;
}

interface Project {
    name: string;
    projectBudget: number;
}

const department: Department = {
    name: 'web-dev',
    budget: 500000,
}

// const mainProject: Project = {
//     ...departments,
//     projectBudget: 5000
// }

function transformDepartment(department: Department, amount: number): Project {
    return {
        name: department.name,
        projectBudget: amount,
    }
}

const mainProject: Project = transformDepartment(department, 4000);

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Type Guard

function isNumber(number: /* string[] | number | boolean */ unknown): number is number {
    return typeof number === "number";
}


function printMsg(msg: string[] | number | boolean): void {

    if (Array.isArray(msg)) {
        msg.forEach(msg => console.log(msg));
    } else if (isNumber(msg)) {
        console.log(`Number ${msg}`);
    } else {
        console.log(msg);
    }

}

interface Car {
    engine: string;
    wheels: {
        number: number,
        type: string,
    };
}

interface Ship {
    engine: string;
    sail: string;
}

function repairVehicle(vehicle: Car | Ship): void {
    if (isCar(vehicle)) {
        vehicle.wheels;
    } else if (isShip(vehicle)) {
        vehicle.sail;
    } else {
        vehicle; // never
    }
}

function isCar(car: Car | Ship): car is Car {
    // return "wheels" in car;  -- works same, but not with objects in OBJECTS
    return (car as Car).wheels.number !== undefined;
}

function isShip(ship: Car | Ship): ship is Ship {
    // return "sail" in ship;   -- works same
    return (ship as Ship).sail !== undefined;
}

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// never - use case


interface CarTwo {
    name: 'car';
    engine: string;
    wheels: {
        number: number,
        type: string,
    };
}

interface ShipTwo {
    name: 'ship'
    engine: string;
    sail: string;
}

interface Airplane {
    name: 'airplane'
    engine: string;
    wings: string;
}

interface SuperAirplane {
    name: 'smth';
    engine: string;
    wings: string;
}

type Vehicle = CarTwo | ShipTwo | Airplane | SuperAirplane;

function isCarTwo(car: Vehicle): car is CarTwo {
    // return "wheels" in car;  -- works same, but not with objects
    return (car as CarTwo).wheels.number !== undefined;
}

function isShipTwo(ship: Vehicle): ship is ShipTwo {
    // return "sail" in ship;   -- works same
    return (ship as ShipTwo).sail !== undefined;
}

function isAirplane(airplane: Vehicle): airplane is Airplane {
    // return "sail" in ship;   -- works same
    return (airplane as Airplane).wings !== undefined;
}


function repairVehicleTwo(vehicle: Vehicle): void {

    switch (vehicle.name) {
        case 'car':
            console.log(vehicle.wheels);
            break;
        case 'ship':
            console.log(vehicle.sail);
            break;
        case 'airplane':
            console.log(vehicle.wings);
            break;
        case 'smth':
            console.log(vehicle.wings);
            break;
        default:
            const smth: never = vehicle;
    }

}

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// function overload

interface Square {
    side: number;
    area: number;
}

interface Rect {
    a: number;
    b: number;
    area: number;
}

function calculateArea(side:number) : Square;
function calculateArea(a:number, b:number) : Rect;
function calculateArea(a: number, b?: number): Square | Rect {

    if (b) {
        const rect: Rect = {
            a, b, /* its same as: a: b, b: b, */
            area: a * b,
        }
        return rect;
    } else {
        const square: Square = {
            side: a,
            area: a * a
        };
        return square;
    }

}

calculateArea(1);
calculateArea(1, 2);