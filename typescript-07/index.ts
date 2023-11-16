//========================================================================================================================================================
//========================================================================================================================================================
// GENERICS - PRACTICING

// Создать Generic-интерфейс PlayerData, который подходил бы для создания таких объектов:

// Создать Generic-интерфейс PlayerData, который подходил бы для создания таких объектов:

interface PlayerData<Game, Hours> {
    game: Game;
    hours: Hours;
    server: string;
}

const player1: PlayerData<string, number> = {
    game: "CS:GO",
    hours: 300,
    server: "basic",
};

const player2: PlayerData<number, string> = {
    game: 2048,
    hours: "300 h.",
    server: "arcade",
};

const player3: PlayerData<string, object> = {
    game: "Chess",
    hours: {
        total: 500,
        inMenu: 50,
    },
    server: "chess",
};

// Массив данных с фигурами содержит объекты, у каждого из которых обязательно есть свойство name
// Каждый объект может еще содержать дополнительные свойства в случайном виде
// Свойство name может иметь только 4 варианта
// Функция calculateAmountOfFigures должна принимать массив с объектами, у которых обязательно должно быть свойство name
// Возвращает она объект-экземпляр AmountOfFigures
// Внутри себя подсчитывает сколько каких фигур было в массиве и записывает результаты в AmountOfFigures
// С текущими данными в консоль должно попадать:
// { squares: 3, circles: 2, triangles: 2, others: 1 }

enum FigureNames {
    RECT = "rect",
    TRIANGLE = "triangle",
    CIRCLE = "circle",
    LINE = "line",
}

interface Figure {
    name: FigureNames;
}

interface AmountOfFigures {
    squares: number;
    circles: number;
    triangles: number;
    others: number;
}

function calculateAmountOfFigures<T extends Figure>(figures: T[]): AmountOfFigures {

    const FiguresAmount: AmountOfFigures = {
        squares: 0,
        circles: 0,
        triangles: 0,
        others: 0,
    };

    figures.forEach((figure) => {
        switch (figure.name) {
            case FigureNames.RECT:
                FiguresAmount.squares++;
                break;
            case FigureNames.CIRCLE:
                FiguresAmount.circles++;
                break;
            case FigureNames.TRIANGLE:
                FiguresAmount.triangles++;
                break;

            default:
                FiguresAmount.others++;
        }
    });

    return FiguresAmount;

}

interface CustomFigure extends Figure {
    data?: {};
}

const figuresData: CustomFigure[] = [
    {
        name: FigureNames.RECT,
        data: { a: 5, b: 10 },
    },
    {
        name: FigureNames.RECT,
        data: { a: 6, b: 11 },
    },
    {
        name: FigureNames.TRIANGLE,
        data: { a: 5, b: 10, c: 14 },
    },
    {
        name: FigureNames.LINE,
        data: { l: 15 },
    },
    {
        name: FigureNames.CIRCLE,
        data: { r: 10 },
    },
    {
        name: FigureNames.CIRCLE,
        data: { r: 5 },
    },
    {
        name: FigureNames.RECT,
        data: { a: 15, b: 7 },
    },
    {
        name: FigureNames.TRIANGLE,
    },
];

console.log(calculateAmountOfFigures(figuresData));
/* 

3rd way - how to copy OBJECT

interface ObjectInterface<Parents> {
    name: string;
    age: number;
    parents: Parents;
}

const someOjb: ObjectInterface<{ mother: string, father: string }> = {
    name: "Ervin",
    age: 12,
    parents: {
        mother: "Oksana",
        father: "Adalbert",
    },
};

const newObject : ObjectInterface<{ mother: string, father: string }> = JSON.parse(JSON.stringify(someOjb));

someOjb.parents.mother = "Ksyucha";

console.log(newObject.parents.mother); 

*/

//========================================================================================================================================================
//========================================================================================================================================================
// GENERICS - CLASSES

class User<T, S> {
    name: T;
    age: S;

    constructor(name: T, age: S) {
        this.name = name;
        this.age = age;
    }

    sayMyFullName<T>(surname: T): string {
        if (typeof surname !== 'string') {
            return `I have only name: ${this.name}`
        } else {
            return `${this.name} ${surname}`
        }
    }
}

class AdminUser<T> extends User<string, number> {
}

const ivanUser = new User<string, number>("Ivan", 30);
console.log(ivanUser);
console.log(ivanUser.sayMyFullName(10));
console.log(ivanUser.sayMyFullName("Ochkovich"));

//========================================================================================================================================================
//========================================================================================================================================================
// Readonly, Partial, Required - Built-in Generics

const array: Array<number> = [1, 2, 3];
const arrayTwo: number[] = [1, 2, 3];

const roArray: ReadonlyArray<number> = [1, 2, 3, 4];

interface IState {
    data: {
        name: string;
    },
    tag?: string
}

function action(state: Readonly<IState>) {
    state.data.name = 'abc';
}

//========================================================================================================================================================
// operator ?
const state: Partial<IState> = {
    data: {
        name: 'John',
    }
}

//========================================================================================================================================================
// required - deletes ? operator
const strictState: Required<IState> = {
    data: {
        name: "Marija",
    },
    tag: "Dom",
}

strictState.tag = 'new';

//========================================================================================================================================================
//========================================================================================================================================================
// Type manipulations and how they are implemented

// Operator keyof

interface ICompany {
    name: string;
    debts: number;
}

type CompanyKeys = keyof ICompany;
const keys: CompanyKeys = 'name';

function printDebts<T, K extends keyof T, S extends keyof T>(company: T, companyName: K, debts: S) {
    console.log(`Company ${company[companyName]}, debts: ${company[debts]}`);
}

const hh: ICompany = {
    name: "HH",
    debts: 50000,
}

printDebts(hh, 'name', 'debts');

//========================================================================================================================================================
//========================================================================================================================================================
// Typeof - Type request

const google = {
    name: "Google",
    debts: 50000,
};

type GoogleKeys = keyof typeof google;

const keyss: GoogleKeys = 'debts';

//========================================================================================================================================================
//========================================================================================================================================================
// Indexed Access Types

interface ICompanyTwo {
    name: string;
    debts: number;
    departments: Department[];
    management: {
        owner: string;
    }
}

interface Department {
    [key: string]: string; /* This syntaxis is being used when we dont know how much values we will have, but we know what typeof they will have */
}


type CompanyDebtsType = ICompanyTwo['debts']; /* Example of Indexed Access Types */
const debts = "debts";
type CompanyDebtsTypeTwo = ICompanyTwo[typeof debts];
type CompanyOwnerType = ICompanyTwo['management']['owner'];
type CompanyDepartmentsType = ICompanyTwo['departments'][number];
type CompanyDepartmentsTypes = ICompanyTwo['departments'];
type Test = ICompanyTwo[keyof ICompanyTwo]; /* In this example we got all of the types that are inside the Interface ICompanyTwo */

//========================================================================================================================================================
//========================================================================================================================================================
// PRACTICING

interface IPhone {
    company: string;
    number: number;
}

// IMobilePhone должен наследоваться от IPhone,
// тип свойства companyPartner зависит от свойства company

interface IMobilePhone extends IPhone {
    size: string;
    companyPartner: IPhone["company"];
    manufactured: Date;
}

// Типизировать объект phones

const phones: IMobilePhone[] = [
    {
        company: "Nokia",
        number: 1285637,
        size: "5.5",
        companyPartner: "MobileNokia",
        manufactured: new Date("2022-09-01"),
    },
    {
        company: "Samsung",
        number: 4356637,
        size: "5.0",
        companyPartner: "SamMobile",
        manufactured: new Date("2021-11-05"),
    },
    {
        company: "Apple",
        number: 4552833,
        size: "5.7",
        companyPartner: "no data",
        manufactured: new Date("2022-05-24T12:00:00"),
    },
];

interface IPhonesManufacturedAfterDate extends IMobilePhone {
    initialDate: string;
}

// Функция должна отфильтровать массив данных и вернуть новый массив
// с телефонами, выпущенными после даты в третьем аргументе

function filterPhonesByDate(phones: IMobilePhone[], key: keyof IMobilePhone, initial: string): IPhonesManufacturedAfterDate[] {

    return phones.filter((phone) => {
        const manufactured = phone[key];

        if (manufactured instanceof Date && manufactured.getTime() > new Date(initial).getTime()) {
            return phone;
        }

    }).map((phone) => {
        const newObj = { ...phone, initialDate: initial };
        return newObj;
    })

}

// Второй аргумент при вызове функции должен быть связан с первым,
// а значит мы получим подсказки - свойства этого объекта

console.log(filterPhonesByDate(phones, "manufactured", "2022-01-01"));

//========================================================================================================================================================
//========================================================================================================================================================
// CONDITIONAL TYPES AND INFER

// Condition ? true : false

type Example = 'string' extends 'Hello' ? string : number;

type FromUserOrFromBase<T extends string | number> = T extends string ? IDataFromUser : IDataFromBase; /* EXAMPLE */

interface UserConditional<T extends 'created' | Date> {
    created: T extends 'created' ? 'created' : Date;
}

const someUser: UserConditional<'created'> = {
    created: 'created',
}

interface IDataFromUser {
    weight: string;
};

interface IDataFromBase {
    calories: number;
};

const test: FromUserOrFromBase<number> = {
    calories: 2,
} /* EXAMPLE */

//========================================================================================================================================================

// function calculateDailyCalories(str: string): IDataFromUser;
// function calculateDailyCalories(str: number): IDataFromBase;
function calculateDailyCalories<T extends string | number>(numOrStrg: T): T extends string ? IDataFromUser : IDataFromBase {
    if (typeof numOrStrg === 'string') {
        const obj: IDataFromUser = {
            weight: numOrStrg,
        };
        return obj as FromUserOrFromBase<T> /* EXAMPLE */
    } else {
        const obj: IDataFromBase = {
            calories: numOrStrg,
        };
        return obj as FromUserOrFromBase<T>;
    }
}

type GetStringType<T extends "hello" | "world" | string> = T extends "hello" ? "hello" : T extends "world" ? "world" : string;

// infer - rare but sometimes we use it

type GetFirstType<T> = T extends Array<infer First> ? First : T;
type Ex = GetFirstType<number[]>;

//========================================================================================================================================================

type ToArray<T> = T extends any ? T[] : never;
type ExArray = ToArray<Ex | string>;