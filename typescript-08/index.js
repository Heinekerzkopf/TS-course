// MAPPED TYPES, +/- operators
//========================================================================================================================================================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var gameData = {
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
};
var fitnessClubCenter = {
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
function createSlider(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.container, container = _c === void 0 ? "" : _c, _d = _b.numberOfSlides, numberOfSlides = _d === void 0 ? 1 : _d, _e = _b.speed, speed = _e === void 0 ? 300 : _e, _f = _b.direction, direction = _f === void 0 ? "horizontal" : _f, _g = _b.dots, dots = _g === void 0 ? true : _g, _h = _b.arrows, arrows = _h === void 0 ? true : _h;
    console.log(container, numberOfSlides, speed, direction, dots, arrows);
}
createSlider();
var customSliderOptions = {
    container: "id",
    numberOfSlides: 4,
    speed: 1100,
    direction: "horizontal",
    dots: true,
    arrows: true,
};
function createCustomSlider(options) {
    if ("container" in options) {
        console.log(options);
    }
}
// two ways of solving
var validationDataTwo = {
    login: { isValid: false, errorMsg: "At least 3 characters" },
    password: { isValid: true },
};
var validationData = {
    login: { isValid: false, errorMsg: "At least 3 characters" },
    password: { isValid: true },
};
//========================================================================================================================================================
//========================================================================================================================================================
// Additional Utility Types
function calculate(a, b) {
    return a * b;
}
var anotherResult = 5;
var Example = /** @class */ (function () {
    function Example(a) {
    }
    return Example;
}());
//========================================================================================================================================================
//========================================================================================================================================================
// Working with server requests & Promise & JSON
var jsonTest = '{"name": "Test", "data": 4}';
var objFromJson = JSON.parse(jsonTest);
var toDoList = [];
fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function (response) { return response.json(); })
    .then(function (data) {
    if ('id' in data) {
        toDoList.push(data);
    }
    else if (Array.isArray(data)) {
        toDoList = data;
    }
    else {
        console.log("".concat(data, " - is a string"));
    }
    console.log(toDoList);
});
var promise = new Promise(function (resolve, reject) {
    resolve('Test');
});
promise.then(function (value) {
    console.log(value);
});
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            users = [
                {
                    name: 'Alex'
                }
            ];
            return [2 /*return*/, users];
        });
    });
}
var someUser = fetchUsers();
