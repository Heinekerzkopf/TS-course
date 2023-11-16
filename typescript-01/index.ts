const string: string = '1';

console.log(string);

//========================================================================================================================================================

let userName: string = "Ervin";

userName = "Vika";
// userName = 1; - error

const isBirthday: boolean = true;
const age: number = 40;
const firstName: string = "John";

if (isBirthday) {
    console.log(`Congrats, ${firstName}! You turned into ${age + 1} years old`);
}

//========================================================================================================================================================

function logBrtMsg(isBirthday: boolean, firstName: string, age: number): void {
    if (isBirthday) {
        console.log(`Congrats, ${firstName}! You turned into ${age + 1} years old`);
    }
}

logBrtMsg(isBirthday, firstName, age);

//========================================================================================================================================================

// special type any -- try not to use this :D

const userData = '{"isBirthdayData": true, "ageData": 40, "userNameData": "John"}';

const userObject: {
    isBirthdayData: boolean,
    ageData: number,
    userNameData: string
} = JSON.parse(userData); // we have here ANY type, cuz JSON can save any data-type, THATS WHY WE WROTE OBJECT after ":"

console.log(userObject.ageData);

//========================================================================================================================================================
// practicing - code typification 


// 1
const currentRate: string = "1.05";

// 2
const fetchCurrent = (response : string) : number => {
    const data : number = JSON.parse(response);
    return data;
};

// 3
function traferEurToUsd(available: true, amount: number, commision: number) : void {

    if (available) {
        let result: number = fetchCurrent(currentRate) * amount * commision;
        console.log(result);
    } else {
        console.log("Not available at the moment");
    }

}

traferEurToUsd(true, 500, 1.05);

//========================================================================================================================================================
// type NEVER

const createError = (message : string) => { // return type NEVER
    throw new Error(message);
};

function birthdayMessage(isBirthday: boolean, firstName: string, age: number): void {
    if (isBirthday) {
        console.log(`Congrats, ${firstName}! You turned into ${age + 1} years old`);
    } else {
        return createError("Some error appeared, try later!");
    }
}

birthdayMessage(true, "Ervin", 20);


function birthdayMessageExampleNumberTwo(isBirthday: boolean, firstName: string, age: number): string /* we return type string */ {
    if (isBirthday === true) {
        console.log(`Congrats, ${firstName}! You turned into ${age + 1} years old`);
    } else if (isBirthday === false) {
        return "Thats bad :("
    }
    return createError("Some error appeared, try later!");
}


//========================================================================================================================================================
// types null & undefined

const test : null = null;
const testTwo : any = null;
// const testThree : string = null;
// const testFour : number = null;

function getRndData() {
    if (Math.random() < 0.5) {
        return null;
    } else {
        return '   Some data    ';
    }
}

const data = getRndData();

const trimmedData = data?.trim();

console.log(trimmedData);


//========================================================================================================================================================
// types bigInt & symbol

let id : symbol = Symbol("id");

const dataObject = {
    [id]: 1
};

console.log(dataObject[id]);

const numberOne : bigint = 1n;