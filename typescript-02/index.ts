// typification of objects and destructurization
//========================================================================================================================================================

const userData = {
    isBirthday: true,
    age: 40,
    userName: "John",
};

const createError = (message: string) => { // return type NEVER
    throw new Error(message);
};

function birthdayMessage({ isBirthday, age, userName }: {
    isBirthday: boolean,
    age: number,
    userName: string,
}): string {
    if (isBirthday) {
        return `Congrats, ${userName}! You turned into ${age + 1} years old`;
    } else {
        return createError("Some error appeared, try later!");
    }
}

console.log(birthdayMessage(userData));

//========================================================================================================================================================
// typification of ARRAYS

const departments: string[] = ['dev', 'design', 'marketing'];

const numbersArray: number[][] = [[1, 2, 3], [4, 5, 6]];

const report = departments
    .filter((d: string) => d !== "dev")
    .map((d: string) => `${d} - new department`);

console.log(report);

const [firstDep, secondDep, thirdDep] = [...departments];

console.log(firstDep);

//========================================================================================================================================================
// typification - practicing

const electricityUserData = {
    readings: 95,
    units: "kWt",
    mode: "double",
};

const waterUserData = {
    readings: 3,
    units: "m3",
};

const elRate: number = 0.45;
const wRate: number = 2;

const monthPayments: number[] = [0, 0]; // [electricity, water]

const calculatePayments = ({ readings, mode }: { readings: number, mode: string }, wData: { readings: number }, elRate: number, wRate: number): void => {
    if (mode === "double" && readings < 50) {
        monthPayments[0] = readings * elRate * 0.7;
    } else {
        monthPayments[0] = readings * elRate;
    }

    monthPayments[1] = wData.readings * wRate;
};

calculatePayments(electricityUserData, waterUserData, elRate, wRate);

const sendInvoice = (
    [electricity, water]: number[],
    electricityUserData: { readings: number, units: string },
    waterUserData: { readings: number, units: string, }
): string => {
    const text = `    Hello!
        This month you used ${electricityUserData.readings} ${electricityUserData.units} of electricity
        It will cost: ${electricity}€
        
        This month you used ${waterUserData.readings} ${waterUserData.units} of water
        It will cost: ${water}€`;

    return text;
};

const invoice = sendInvoice(monthPayments, electricityUserData, waterUserData);
console.log(invoice);

//========================================================================================================================================================
// Tuples (кортежи)

const userTuple: [boolean, number, string] = [true, 40, "Ervin"];

const userTupleTwo: [boolean, number, ...string[]] = [true, 40, "Ervin", "Ervin", "Ervin"];

//========================================================================================================================================================
// Union - connecting types

const message: string | number = 123;

const messages: string[] | number[] = ["a", "b"];

function printMessage(message: string | number): void {
    if (typeof message === "string") {
        console.log(message.toLocaleLowerCase());
    }
}

printMessage("AJSIOFASFIKOAS");

//========================================================================================================================================================
// Narrowing 

function printMsg(message: string[] | number): void {
    if (Array.isArray(message)) {
        message.forEach(message => console.log(message));
    }
}

//========================================================================================================================================================

printMsg(["Hello", "Barbie", "Oppenheimer"]);

const printReadings = (a: string | number, b: number | boolean) => {
    if (a === b) {
        console.log(a);
    }
}

//========================================================================================================================================================

const checkReadings = (readings: { system: number } | { user: number }): void => {

    // firstable we r checking if our parameter does exist in object 

    if ("system" in readings) {
        console.log(readings.system + 100);
    } else {
        console.log(readings.user - 100);
    }

}

const obj = { system: 3 };

checkReadings(obj);

//========================================================================================================================================================

function logValue(x: string | Date) {

    if (x instanceof Date) {
        console.log(x.getFullYear());
    } else {
        console.log("it was a string!!!!!");
    }

}

const newDate = new Date(10000000000000);

logValue(newDate);