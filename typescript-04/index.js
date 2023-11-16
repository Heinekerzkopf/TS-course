//========================================================================================================================================================
// type or interface?
// главный объект со всеми данными, должен подходить под формат TotalWarehouse
var totalData = {
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
function printReport(data) {
    var objValues = Object.entries(totalData);
    var newArray = [];
    for (var i = 0; i < objValues.length; i++) {
        if (objValues[i][1] === "empty") {
            newArray.push(objValues[i][0]);
        }
    }
    if (newArray.length === 0) {
        return "Everything is fine!";
    }
    else {
        return "We need this items: ".concat(newArray.join(", "));
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
var result = printReport(totalData);
console.log(result);
var user = {
    login: "ervin123",
    password: "qwerty",
    age: 20,
    address: undefined,
};
var dataBaseName = '1235';
function sendUserData(obj, db) {
    var _a, _b;
    console.log((_b = (_a = obj.parents) === null || _a === void 0 ? void 0 : _a.father) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase(), db === null || db === void 0 ? void 0 : db.toLocaleLowerCase());
}
//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Non-Null & Non-Undefined
var dbName;
// sendUserDataTwo(user, 'sakpdf');
console.log(dbName);
function sendUserDataTwo(obj, db) {
    var _a;
    dbName = '12345';
    console.log((_a = obj.parents.father) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase(), db.toLocaleLowerCase()); /* using ! */
}
var userTwo = {
    login: "ervin123",
    password: "qwerty",
    age: 20,
    address: undefined,
};
// userTwo.login = 'ervin1240'; - getting error - readonly parametr
var Animal = /** @class */ (function () {
    function Animal() {
        this.name = 'name';
    }
    return Animal;
}());
var basicPorts = [3000, 3001, 5555];
// basicPorts[0] = 5; -> getting error - cant modify
var cortegeArray = [1, 'stijr', 'kasf'];
// cortegeArray.push('skad'); = getting error as well
var userFreeze = {
    login: "ervin123",
    password: "qwerty",
    age: 20,
    address: undefined,
};
// Readonly<UserTwo> - generic - makes all the parametrs readonly
var basicPortsTwo = [3000, 3001, 5555];
//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// Enums
var Directions;
(function (Directions) {
    Directions[Directions["TOP"] = 0] = "TOP";
    Directions[Directions["RIGHT"] = 1] = "RIGHT";
    Directions[Directions["LEFT"] = 2] = "LEFT";
    Directions[Directions["BOTTOM"] = 3] = "BOTTOM";
})(Directions || (Directions = {}));
var TimingFunction;
(function (TimingFunction) {
    TimingFunction["EASE"] = "ease";
    TimingFunction["EASE_IN"] = "ease-in";
    TimingFunction["LINEAR"] = "linear";
})(TimingFunction || (TimingFunction = {}));
function frame(elem, dir, timingFunc) {
    if (dir = Directions.RIGHT) {
        console.log(timingFunc);
    }
}
frame('id', Directions.RIGHT, TimingFunction.EASE);
