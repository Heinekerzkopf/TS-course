// MAPPED TYPES, +/- operators
//========================================================================================================================================================

type Currencies = {
    usa: 'usd',
    china: 'cny',
    ukraine: 'uah',
    kz: 'tenge';
};

type CreateCustomCurr<T> = {
    [Currency in keyof T]: string;
}

type CreateCustomCurrasd<T> = {
    -readonly [Currency in keyof T]+?: string;
}

type CustomCurrenciesTwo = CreateCustomCurr<Currencies>;

type CustomCurrencies = {
    usa: string,
    china: string,
    ukraine: string,
    kz: string;
}

// type SovopostovimiyType = {
//     [proizvolniyIdentifikator in Mnozhestvo] : ProizvolniyDataType 
// }

type Keys = 'name' | 'age' | 'role';

type User = {
    [K in Keys]: string;
}

//========================================================================================================================================================
//========================================================================================================================================================
// Template literal types

type MyAnimation = "fade" | "swipe";
type Direction = "in" | "out";

type MyNewAnimation = `${MyAnimation}${Capitalize<Direction>}`

type CreateCustomCurrModified<T> = {
    [Currency in keyof T as `custom${Capitalize<string & Currency>}`]: string;
}

type newCurrencies = CreateCustomCurrModified<Currencies>;

//=======================================================================================================================================================
//========================================================================================================================================================
// Utility types: Pick, Omit, Extract, Exclude, Record

// Omit - we use Omit when we want to make new type without some of keys
type CurrenciesWithoutUSA = Omit<Currencies, 'usa'>; // exception

// Pick - filters properties
type CurrenciesUSAandUkraine = Pick<Currencies, 'ukraine' | 'usa'>; // filtering by property

// Exclude
type FadeType = Exclude<MyAnimation, 'swipe'>; // deleting from UNION type
type SomeKeys = 'onion' | 'cucumber' | 'tomato';
type NoOnion = Exclude<SomeKeys, 'onion'>;
type CurrenciesExclude = Exclude<keyof Currencies, 'usa'>;

// Extract
type SwipeType = Extract<keyof Currencies, 'usa'>; // extracting type that we want

// Record
type PlayersNames = 'alex' | 'john';
type GameDataCurrency = Record<PlayersNames, newCurrencies>;

const gameData: GameDataCurrency = {
    alex: {
        customChina: 'a',
        customKz: 'b',
        customUkraine: 'c',
        customUsa: 'd'
    },
    john: {
        customChina: 'e',
        customKz: 'f',
        customUkraine: 'g',
        customUsa: 'h'
    }
}

//========================================================================================================================================================
//========================================================================================================================================================
// PRACTICING

// Необходимо типизировать этот большой объект
// Свойство futureClasses должно быть в зависимости от classes по типу
// Свойства exClients и futureClients тоже должны быть в зависимости от currClients
// ИЛИ все три зависят от общего родителя

// Простыми словами: при добавлении свойства в целевой объект они должны быть
// автоматически добавлены в зависимые (сразу подсказка от TS)

interface fitnessClubCenterType {
    clubName: string,
    location: string,
    classes: ClassesType[],
    futureClasses: IFutureClass[],
    currClients: CurrentClients[],
    exClients: ExClients[],
    futureClients: FutureClientsException[],
}

interface ClassesType {
    name: string,
    startsAt: string,
    duration: number,
}

interface IFutureClass extends Omit<ClassesType, "startsAt"> {
    willStartsAt: string;
}

interface CurrentClients {
    name: string,
    age: number | string,
    gender: string,
    timeLeft: string,
}

interface ExClients extends Omit<CurrentClients, 'timeLeft'> {
    makeCallFor: Date;
}

type FutureClientsException = Pick<ExClients, 'name' | 'makeCallFor'>;

const fitnessClubCenter: fitnessClubCenterType = {
    clubName: "Fitness club Center",
    location: "central ave. 45, 5th floor",
    classes: [
        {
            name: "yoga",
            startsAt: "8:00 AM",
            duration: 60,
        },
        {
            name: "trx",
            startsAt: "11:00 AM",
            duration: 45,
        },
        {
            name: "swimming",
            startsAt: "3:00 PM",
            duration: 70,
        },
    ],
    futureClasses: [
        {
            name: "boxing",
            willStartsAt: "6:00 PM",
            duration: 40,
        },
        {
            name: "breath training",
            willStartsAt: "8:00 PM",
            duration: 30,
        },
    ],
    currClients: [
        {
            name: "John Smith",
            age: "-",
            gender: "male",
            timeLeft: "1 month",
        },
        {
            name: "Alise Smith",
            age: 35,
            gender: "female",
            timeLeft: "3 month",
        },
        {
            name: "Ann Sonne",
            age: 24,
            gender: "female",
            timeLeft: "5 month",
        },
    ],
    exClients: [
        {
            name: "Tom Smooth",
            age: 50,
            gender: "male",
            makeCallFor: new Date("2023-08-12"),
        },
    ],
    futureClients: [
        {
            name: "Maria",
            makeCallFor: new Date("2023-07-10"),
        },
    ],
};

//========================================================================================================================================================
// #2

interface ISlider {
    container?: string;
    numberOfSlides?: number;
    speed?: 300 | 500 | 700;
    direction?: "horizontal" | "vertical";
    dots?: boolean;
    arrows?: boolean;
    animationName?: string;
}

function createSlider({
    container = "",
    numberOfSlides = 1,
    speed = 300,
    direction = "horizontal",
    dots = true,
    arrows = true,
}: ISlider = {}): void {
    console.log(container, numberOfSlides, speed, direction, dots, arrows);
}

createSlider();

// Необходимо типизировать объект настроек, который будет зависим
// от интерфейса ISlider
// Все поля в нем обязательны для заполнения

interface NewSlider extends Required<Omit<ISlider, 'animationName' | 'speed'>> {
    speed: number;
}


const customSliderOptions: NewSlider = {
    container: "id",
    numberOfSlides: 4,
    speed: 1100,
    direction: "horizontal",
    dots: true,
    arrows: true,
};

function createCustomSlider(options: NewSlider): void {
    if ("container" in options) {
        console.log(options);
    }
}

//========================================================================================================================================================
// #3 

interface IForm {
    login: string;
    password: string;
}

// Необходимо типизировать объект валидации
// Учтите, что данные в форме могут расширяться и эти поля
// должны появиться и в объекте валидации

type Validation<T> = {
    [P in keyof T]: { isValid: true } | { isValid: false, errorMsg: string } /* MORE LOGICALLY */
}

interface ValidatingData extends Omit<IForm, 'login' | 'password'> {
    login: {
        isValid: boolean;
        errorMsg?: string
    };
    password: {
        isValid: boolean;
    }
}

// two ways of solving
const validationDataTwo: Validation<IForm> = {
    login: { isValid: false, errorMsg: "At least 3 characters" },
    password: { isValid: true },
};

const validationData: ValidatingData = {
    login: { isValid: false, errorMsg: "At least 3 characters" },
    password: { isValid: true },
};

//========================================================================================================================================================
//========================================================================================================================================================
// Additional Utility Types

function calculate(a:number, b:number) : number {
    return a * b;
}

type CalculateRT = ReturnType<typeof calculate>; /* we get type of function */

let anotherResult : CalculateRT = 5;

type CalculateParametrType = Parameters<typeof calculate>[0]/* we dont have to write [0] if we want to get all of the types */ /* Returning type of parameters */
type PT1 = Parameters<(a:number) => number>;
type PT2 = Parameters<<T>(arg: T) => T>;

class Example {
    constructor(a: number) {
        
    }
}

type T0 = ConstructorParameters<typeof Example>; /* getting type/s from CONSTRUCTOR */

//========================================================================================================================================================
//========================================================================================================================================================
// Working with server requests & Promise & JSON

const jsonTest = '{"name": "Test", "data": 4}';

const objFromJson = JSON.parse(jsonTest);

let toDoList: ToDo[] = [];

interface ToDo {
    userId: number,
    id: number;
    title: string;
    completed: boolean;
}

fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
        if('id' in data) {
            toDoList.push(data);
        } else if (Array.isArray(data)) {
            toDoList = data;
        } else {
            console.log(`${data} - is a string`);
        }
        console.log(toDoList);
    });


const promise = new Promise<string>((resolve, reject) => {
    resolve('Test')
})

promise.then(value => {
    console.log(value.toLocaleLowerCase());
})

//========================================================================================================================================================
//========================================================================================================================================================
// Awaited

// type FromPromise = Promise<number>;
type FromPromise = Awaited<Promise<Promise<number>>>;

interface UserA {
    name: string;
}

async function fetchUsers() : Promise<UserA[]> {
    
    const users: UserA[] = [
        {
            name: 'Alex'
        }
    ]
    return users;
}

const someUser = fetchUsers();

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>;
