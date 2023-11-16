// request for type
var dataFromControl = {
    water: 200,
    el: 350,
};
function checkReadings(data) {
    var dataFromUser = {
        water: 200,
        el: 350,
    };
    if (data.el === dataFromUser.el && data.water === dataFromUser.water) {
        return true;
    }
    else {
        return false;
    }
}
/** interesting example */
var pi = 3.14;
var piClone;
//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// PRACTICING
// Перечисление с названием TypesOfMedia, которое включает строчные типы video, audio
var TypesOfMedia;
(function (TypesOfMedia) {
    TypesOfMedia["video"] = "video";
    TypesOfMedia["audio"] = "audio";
})(TypesOfMedia || (TypesOfMedia = {}));
// Перечисление с названием FormatsOfMedia, которое включает строчные видео-форматы: .mp4, .mov, .mkv, .flv, .webM
var FormatsOfMedia;
(function (FormatsOfMedia) {
    FormatsOfMedia["mp4"] = ".mp4";
    FormatsOfMedia["mov"] = ".mov";
    FormatsOfMedia["mkv"] = ".mkv";
    FormatsOfMedia["flv"] = ".flv";
    FormatsOfMedia["webM"] = ".webM";
})(FormatsOfMedia || (FormatsOfMedia = {}));
function playMedia(_a) {
    var _b = _a === void 0 ? {
        name: "example",
        type: TypesOfMedia.audio,
        format: FormatsOfMedia.mp4,
    } : _a, name = _b.name, type = _b.type, format = _b.format, subtitle = _b.subtitle, marks = _b.marks;
    var marksLog;
    // Создать функционал, что если marks - это массив, то "сложить" все эелементы в одну строку и поместить в marksLog
    // Если это строка, то просто поместить её в marksLog
    // Если что-то другое - то marksLog = "Unsupported type of marks"
    // Не допускайте any!
    if (Array.isArray(marks)) {
        marksLog = marks.join(", ");
    }
    else if (typeof marks === "string") {
        marksLog = marks;
    }
    else {
        marksLog = "Unsupported type of marks";
    }
    console.log("Media ".concat(name).concat(format, " is ").concat(type, "\n    Marks: ").concat(marksLog, "\n    Subtitles: ").concat(subtitle !== null && subtitle !== void 0 ? subtitle : "none"));
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
var requestOptions = {
    url: 'https://someurl.com',
    method: "POST",
}; /* as const */
var fetchData = function (url, method) {
    console.log(method);
};
// fetchData('qqq', 'GET');
fetchData(requestOptions.url, requestOptions.method || "POST");
//========================================================================================================================================================
// another syntaxis <>
fetchData(requestOptions.url, /* HERE */ requestOptions.method);
//========================================================================================================================================================
var box = document.querySelector('.box');
var input = document.querySelector('input');
var someNumber = +input.value;
console.log(someNumber);
