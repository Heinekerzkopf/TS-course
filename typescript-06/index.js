//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// interface split
var AvailableAnimal;
(function (AvailableAnimal) {
    AvailableAnimal["Available"] = "available";
    AvailableAnimal["NotAvailable"] = "not available";
})(AvailableAnimal || (AvailableAnimal = {}));
//--------------------------------------------------------------------------------
//--CHECKING-FOR-AVAILABILITY
function isAvailable(statusOfAnimal) {
    if (statusOfAnimal.status === AvailableAnimal.Available) {
        return true;
    }
    else {
        return false;
    }
}
//--MAIN-FUNCTION
function checkAnimalData(animal) {
    if (isAvailable(animal)) {
        // Заменить условие!
        return animal.data;
    }
    else {
        return "".concat(animal.data, ", you can try in ").concat(animal.data.nextUpdateIn);
    }
}
//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// work with DOM
var box = document.querySelector('.box');
// box.textContent = 'some info';
var input = document.querySelector('input'); // TS here understands, that we use INPUT, if u focus mouse on input u will see it
input === null || input === void 0 ? void 0 : input.value;
var link = document.querySelector('a');
var paragraph = document.querySelector('.paragraph');
if (link) {
    link.href = 'asdasd';
}
var newElemenet = document.createElement('a');
link === null || link === void 0 ? void 0 : link.addEventListener('click', function (e) {
    e.preventDefault();
});
//========================================================================================================================================================
//========================================================================================================================================================
//========================================================================================================================================================
// PRACTICING: Work with DOM
//-GETTING HTML ELEMENTS
var inputEmail = document.querySelector('#email');
var inputTitle = document.querySelector('#title');
var textField = document.querySelector('#text');
var inputCheckbox = document.querySelector('#checkbox');
var buttons = document.querySelectorAll('.btn');
;
var formData = {
    email: "",
    title: "",
    text: "",
    checkbox: false,
};
// Последовательность действий:
// 1) Происходит submit любой из форм
// 2) Все данные из 4х полей со страницы переходят в свойства объекта formData
// 3) Запускается функция validateFormData с этим объектом, возвращает true/false
// 4) Если на предыдущем этапе true, то запускается функция checkFormData с этим объектом
buttons.forEach(function (button) { return button.addEventListener("click", function (e) {
    e.preventDefault();
    validateFormData(formData);
}); });
function validateFormData(data) {
    data.email = inputEmail.value;
    data.title = inputTitle.value;
    data.text = textField.value;
    data.checkbox = inputCheckbox.checked;
    // Если каждое из свойств объекта data правдиво...
    if (Object.values(data).every(function (value) { return value; })) {
        checkFormData(data);
        return true;
    }
    else {
        console.log("Please, complete all fields");
        return false;
    }
}
function checkFormData(data) {
    var email = data.email;
    var emails = ["example@gmail.com", "example@ex.com", "admin@gmail.com"];
    // Если email совпадает хотя бы с одним из массива
    if (emailCheck(email, emails)) {
        console.log("This email is already exist");
    }
    else {
        console.log("Posting data...");
    }
}
function emailCheck(email, emails) {
    var res = emails.find(function (el) { return el === email; });
    if (res) {
        return true;
    }
    else {
        return false;
    }
}
;
