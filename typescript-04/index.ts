//========================================================================================================================================================
// type or interface?

// via Lesson number 24 - https://coursehunter.net/course/polnyy-kurs-po-sovremennomu-typescript?lesson=24


//========================================================================================================================================================
// TYPES & INTERFACES praciticng

// структура данных склада с одеждой

type ValidAmount = "empty" | number;

interface ClothesWarehouse {
    jackets: ValidAmount;
    hats: ValidAmount;
    socks: ValidAmount;
    pants: ValidAmount;
}

// структура данных склада с канцтоварами

interface StationeryWarehouse {
    scissors: ValidAmount;
    paper: "empty" | boolean;
}

// структура данных склада с бытовой техникой

interface AppliancesWarehouse {
    dishwashers: ValidAmount;
    cookers: ValidAmount;
    mixers: ValidAmount;
}

// общая структура данных, наследует все данные из трех выше
// + добавляет свои

interface TotalWarehouse extends ClothesWarehouse, StationeryWarehouse, AppliancesWarehouse {
    deficit: boolean;
    date: Date;
}

// главный объект со всеми данными, должен подходить под формат TotalWarehouse

const totalData: TotalWarehouse = {
    jackets: 5,
    hats: "empty",
    socks: "empty",
    pants: 15,
    scissors: 15,
    paper: true,
    dishwashers: 3,
    cookers: "empty",
    mixers: 14,
    deficit: false,
    date: new Date(),
};

// Реализуйте функцию, которая принимает в себя главный объект totalData нужного формата
// и возвращает всегда строку
// Функция должна отфильтровать данные из объекта и оставить только те названия товаров, у которых значение "empty"
// и поместить их в эту строку. Если таких товаров нет - возвращается другая строка (см ниже)

// С данным объектом totalData строка будет выглядеть:
// "We need this items: hats, socks, cookers"
// Товары через запятую, в конце её не должно быть. Пробел после двоеточия, в конце строки его нет.

function printReport(data: TotalWarehouse): String {

    const objValues = Object.entries(totalData);
    const newArray: string[] = [];

    for (let i: number = 0; i < objValues.length; i++) {
        if (objValues[i][1] === "empty") {
            newArray.push(objValues[i][0]);
        }
    }

    if (newArray.length === 0) {
        return `Everything is fine!`;
    } else {
        return `We need this items: ${newArray.join(", ")}`;
    }

    /*

        code from lesson

        const result: string = Object.entries(data)
            .filter((item) => item[1] === "empty")
            .reduce((res, item) => `${res} ${item[0]},`, "");

        if (result.trim().length) {
            return `We need this items:${result.slice(0, -1)}`;
        } else {
            return "Everything fine";
        }
    */

}

const result = printReport(totalData);

console.log(result);

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Type inference

// https://coursehunter.net/course/polnyy-kurs-po-sovremennomu-typescript?lesson=26

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Optional Property Modifiers

interface User {
    login: string;
    password: string;
    age: number;
    // adress?: string;   /* ? - means that its optional parametr */
    address: string | undefined;
    parents?: {
        mother?: string;
        father?: string;
    }
}

const user: User = {
    login: "ervin123",
    password: "qwerty",
    age: 20,
    address: undefined,
};

const dataBaseName = '1235';

function sendUserData(obj: User, db?: string): void {

    console.log(obj.parents?.father?.toLocaleLowerCase(), db?.toLocaleLowerCase());

}

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Non-Null & Non-Undefined

let dbName: string;
// sendUserDataTwo(user, 'sakpdf');

console.log(dbName!);

function sendUserDataTwo(obj: User, db?: string): void {
    dbName = '12345';
    console.log(obj.parents!.father?.toLocaleLowerCase(), db!.toLocaleLowerCase()); /* using ! */

}

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// readonly (Property Modifiers);


interface UserTwo {
    readonly login: string;
    readonly password: string;
    age: number;
    // adress?: string;   /* ? - means that its optional parametr */
    address: string | undefined;
    parents?: {
        mother?: string;
        father?: string;
    }
}

const userTwo: UserTwo = {
    login: "ervin123",
    password: "qwerty",
    age: 20,
    address: undefined,
}

// userTwo.login = 'ervin1240'; - getting error - readonly parametr

class Animal {
    readonly name: string = 'name';
}

const basicPorts: readonly number[] = [3000, 3001, 5555];

// basicPorts[0] = 5; -> getting error - cant modify

const cortegeArray: readonly [number, ...string[]] = [1, 'stijr', 'kasf'];

// cortegeArray.push('skad'); = getting error as well

const userFreeze: Readonly<UserTwo> = {
    login: "ervin123",
    password: "qwerty",
    age: 20,
    address: undefined,
}

// Readonly<UserTwo> - generic - makes all the parametrs readonly

const basicPortsTwo: ReadonlyArray<number> = [3000, 3001, 5555];

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Enums

enum Directions {
    TOP,
    RIGHT,
    LEFT,
    BOTTOM
}

enum TimingFunction {
    EASE = 'ease',
    EASE_IN = 'ease-in',
    LINEAR = 'linear',
}

function frame(elem: string, dir: Directions, timingFunc: TimingFunction): void {

    if (dir = Directions.RIGHT) {
        console.log(timingFunc);
    }


}

frame('id', Directions.RIGHT, TimingFunction.EASE);

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Type Unknown

let smth: unknown;

smth = 'str';

// let data: string[] = smth; - error
// data.find(e => e);

const someValue: unknown = 10;
// someValue.method(); - error

function fetchData(data: unknown): void {

    if (typeof data === 'string') {
        console.log(data.toLowerCase());
    }

}

const userData = '{"isBirthdayData": true, "ageData": 40, "userNameData": "John"}';

function safeParse(str: string): unknown {
    return JSON.parse(str);
}

const data = safeParse(userData);

function transferData(d:unknown) {
    if (typeof d === 'string') {
        console.log(d.toLocaleLowerCase());
    } else if (typeof d === 'object' && d) {
        console.log(data);
    } else {
        console.log('ERROR');
    }
}

transferData(data);

//---------------

type T0 = any | unknown;
type T1 = number | unknown;

type T2 = any & unknown;
type T3 = number & unknown;