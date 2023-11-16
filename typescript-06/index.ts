//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// interface split

// lesson 39 - https://coursehunter.net/course/polnyy-kurs-po-sovremennomu-typescript?lesson=39
// main theme is that u have to split one big interface for many types (f.e. - car, ship etc) into smaller interfaces, where one interface has one element

//========================================================================================================================================================
// practicing

//--GENERAL
type Animal = 'cat' | 'dog' | 'bird';

enum AvailableAnimal {
    Available = "available",
    NotAvailable = "not available",
}

interface AnimalData {
    animal: Animal;
    breed: string;
    sterilized?: string;
}


//--------------------------------------------------------------------------------
//--DATA-INTERFACES
interface AvailableAnimalData extends AnimalData {
    location: string,
    age?: number
}

interface NotAvailableAnimalData {
    message: string,
    nextUpdateIn: Date
}

//--------------------------------------------------------------------------------
//--RESPONSE-INTERFACES

interface AvailableResponse {
    status: AvailableAnimal.Available,
    data: AvailableAnimalData;
}

interface NotAvailableResponse {
    status: AvailableAnimal.NotAvailable,
    data: NotAvailableAnimalData;
}

type Status = AvailableResponse | NotAvailableResponse;

//--------------------------------------------------------------------------------
//--CHECKING-FOR-AVAILABILITY

function isAvailable(statusOfAnimal: Status): statusOfAnimal is AvailableResponse {

    if (statusOfAnimal.status === AvailableAnimal.Available) {
        return true;
    } else {
        return false;
    }

}

//--MAIN-FUNCTION
function checkAnimalData(animal: Status): AvailableAnimalData | String {
    if (isAvailable(animal)) {
        // Заменить условие!
        return animal.data;
    } else {
        return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
    }
}

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// work with DOM

const box = document.querySelector('.box') as HTMLElement;
// box.textContent = 'some info';

const input = document.querySelector('input'); // TS here understands, that we use INPUT, if u focus mouse on input u will see it
input?.value;

const link = document.querySelector('a');

const paragraph = document.querySelector('.paragraph') as HTMLParagraphElement;



if (link) {
    link.href = 'asdasd';
}

const newElemenet = document.createElement('a');

link?.addEventListener('click', (e) => {
    e.preventDefault();
});

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// PRACTICING: Work with DOM

//-GETTING HTML ELEMENTS

const inputEmail = document.querySelector('#email') as HTMLInputElement;
const inputTitle = document.querySelector('#title') as HTMLInputElement;
const textField = document.querySelector('#text') as HTMLTextAreaElement;
const inputCheckbox = document.querySelector('#checkbox') as HTMLInputElement;
const buttons = document.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>;

//------------------------------//

interface Data {
    email: string, title: string, text: string, checkbox: false
};

const formData: Data = {
    email: "",
    title: "",
    text: "",
    checkbox: false,
}

// Последовательность действий:
// 1) Происходит submit любой из форм
// 2) Все данные из 4х полей со страницы переходят в свойства объекта formData
// 3) Запускается функция validateFormData с этим объектом, возвращает true/false
// 4) Если на предыдущем этапе true, то запускается функция checkFormData с этим объектом

buttons.forEach(button => button.addEventListener("click", (e) => {
    e.preventDefault();
    validateFormData(formData);
}));


type DataAnnotation = { email: string, title: string, text: string, checkbox: boolean };

function validateFormData(data: DataAnnotation): boolean {

    data.email = inputEmail.value;
    data.title = inputTitle.value;
    data.text = textField.value;
    data.checkbox = inputCheckbox.checked;

    // Если каждое из свойств объекта data правдиво...
    if (Object.values(data).every((value) => value)) {
        checkFormData(data);
        return true;
    } else {
        console.log("Please, complete all fields");
        return false;
    }
}

function checkFormData(data: DataAnnotation): void {
    const { email } = data;
    const emails = ["example@gmail.com", "example@ex.com", "admin@gmail.com"];

    // Если email совпадает хотя бы с одним из массива
    if (emailCheck(email, emails)) {
        console.log("This email is already exist");
    } else {
        console.log("Posting data...");
    }
}

function emailCheck(email: string, emails: string[]): boolean {

    let res = emails.find(el => el === email);

    if (res) {
        return true;
    } else {
        return false;
    }
};

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// additionally - using void in TS

const names = ['Anna', 'John'];
const newArr = names.slice();

names.forEach((name, i, arr) => arr.push('Hey!'));

//-----------------

type voidFunc = () => void;

const returnString: voidFunc = () => {
    return "string";
};

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// GENERICS - what is that?

function processingData<T>(data: T): T {

    return data;

}

let resultOne = processingData(1);
let resultTwo = processingData("1");

const num = 10;
const resultThree = processingData<number>(num);

interface PrintUK {
    design: number;
}

interface PrintES {
    design: string;
}

interface Print<T> {
    design: T;
}

const somePrint: Print<string> = {
    design: "Times New Roman",
}

const somePrintTwo: Print<number> = {
    design: 12,
}

// RefferalSystem<UserID, UserRefferals> = K, V as K-Key, V-Value;
//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// GENERICS - FUNCTIONS

function genPrac<T, S>(data: T, options: S): string {

    // data.length;

    switch (typeof data) {
        case "string":
            return `${data}, speed: ${options}`;

        case "number":
            return `${data.toFixed()}, speed: ${options}`;

        default:
            return "Not valid";
    }
}

const fn1 = genPrac<number, string>(10, "slow");

function processing<T>(data: T): T {
    return data;
}

interface ProcessingFn {
    <T>(data: T): T
}

let newFunc: ProcessingFn = processing;

interface DataSaver {
    // processing: typeof processing;
    processing: ProcessingFn;
}

const saver: DataSaver = {
    // processing(data) {
    //     console.log(data);
    //     return data;
    // },

    // processing: <T>(data: T) => {
    //     return data;
    // }

    // processing: (data) => {
    //     return data;
    // }

    processing: processing,

}

//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// GENERICS - TYPES & INTERFACES, CONSTRAINTS

type Smth<T> = T;

const num1: Smth<number> = 5;

interface Parents {
    mother: string;
    father: string;
}

interface User<ParentsData extends Parents> {
    login: string;
    age: number;
    parents: ParentsData;
};

const user: User<{ mother: string, father: string }> = {
    login: "login",
    age: 20,
    parents: {
        mother: "Anna",
        father: "No data",
    }
}

//========================================================================================================================================================

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];

const data: OneOrMany<number[]> = [5];
const datatwo: OneOrMany<number> = 5;

//========================================================================================================================================================
// GENERICS constraints

// main theme is that - mother and father parameters are necessary, we must write them, but we dont have to write the rest, for example - married.
// if we use only interface we cant do it, we wont be that flexible, we will have only fixed parameters

interface ParentsOfUser {
    mother: string;
    father: string;
}

interface UserTwo<ParentsData extends ParentsOfUser /* example of CONSTRAINT */> {
    login: string;
    age: number;
    parents: ParentsData; /* extending interface */
};

const userTwo: UserTwo<{ mother: string, father: string, married: boolean }> = {
    login: "login",
    age: 20,
    parents: {
        mother: "Anna",
        father: "No data",
        married: true, /* not necessary */

    }
}

//========================================================================================================================================================

const depositMoney = <T extends number | string>(amount: T): T => {
    console.log(`${amount}`);
    return amount;
}

const depositMoneyWithOutGeneric = (amount: number | string): number | string => {
    console.log(`${amount}`);
    return amount;
}