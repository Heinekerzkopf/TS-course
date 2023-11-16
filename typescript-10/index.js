"use strict";
// Basic working with CLASSES
//========================================================================================================================================================
class Box {
    width;
    height;
    constructor(width) {
        this.width = width;
        this.height = 500;
    }
}
const firstBox = new Box(200);
console.log(firstBox);
class User {
    name;
}
const ivan = new User();
ivan.name = "IVAN";
//========================================================================================================================================================
//========================================================================================================================================================
// Constructors, overloading, generics - lesson number 65
//========================================================================================================================================================
//========================================================================================================================================================
// Methods, their oveloads, getter & setter
class BoxTwo {
    width;
    height = 500;
    volume;
    _content;
    constructor(width, volume, content) {
        this.width = width;
        this.volume = volume;
        this._content = content;
        // this.height = 500;
    }
    calcVolume() {
        if (!this.volume) {
            this.volume = this.width * this.height;
            console.log(`Package volume: ${this.volume}cm3`);
        }
        else {
            console.log(`Package volume: ${this.volume}cm3`);
        }
    }
    checkBoxSize(transport) {
        if (typeof transport === 'number') {
            return transport >= this.width ? 'Ok' : 'Not ok';
        }
        else {
            return transport.some(el => el >= this.width) ? 'Ok' : 'Not ok';
        }
    }
    get boxContent() {
        return this._content;
    }
    set boxContent(value) {
        this._content = value;
    }
}
const newBox = new BoxTwo(250);
// newBox.volume = 50000; - DO NOT
newBox.calcVolume();
console.log(newBox.checkBoxSize(270));
console.log(newBox.boxContent = "test");
console.log(newBox.boxContent);
//========================================================================================================================================================
//========================================================================================================================================================
// Initial value and Index Signatures
class Styles {
}
const style = new Styles();
const newColor = style.color = "blue" ? "red" : "yellow";
style.color = "blue";
console.log(newColor);
//========================================================================================================================================================
//========================================================================================================================================================
// Class Extends
class PresentBox extends BoxTwo {
    wrap;
    height = 600;
    constructor(wrap, width) {
        super(width);
        this.wrap = wrap;
    }
}
new PresentBox('red', 500)._content;
class UserForm {
    login;
    password;
    valid = false;
    isValid(login) {
        return login.length > 3;
    }
}
//========================================================================================================================================================
//========================================================================================================================================================
// PRACTICING - INTERFACE IMPLEMENTATION
var TransferStatus;
(function (TransferStatus) {
    TransferStatus["Pending"] = "pending";
    TransferStatus["Rejected"] = "rejected";
    TransferStatus["Completed"] = "completed";
})(TransferStatus || (TransferStatus = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["NotFound"] = "Not found: 404";
    ErrorMessages["NotEnoughSpace"] = "Not enough space: 507";
    ErrorMessages["Forbidden"] = "Forbidden: 403";
})(ErrorMessages || (ErrorMessages = {}));
// Класс должен имплементировать ITransfer и TransferError
class SingleFileTransfer {
    // Место для реализаций
    // Необходимо создать метод checkTransferStatus, проверяющий состояние передачи данных
    // Можно вывести в консоль данные, можно вернуть строку
    // Необходимо создать метод, который будет останавливать передачу данных
    // И возвращать строку с причиной и датой остановки (Дата в любом формате)
    // Необходимо создать метод, который будет возвращать строку, содержащую
    // Статус передачи и любое сообщение об ошибке. На ваш выбор или отталкиваться от приходящего аргумента
    // Метод может показаться странным, но может использоваться для тестов, например
    path;
    data;
    date;
    message;
    transferStatus;
    constructor(status) {
        this.transferStatus = status;
    }
    start(p, d) {
        return 'Transfer started';
    }
    checkTransferStatus() {
        return this.transferStatus;
    }
    stop(reason) {
        return `Transfer stopped, reason: ${reason}, Date: ${new Date().toLocaleString()}`;
    }
    ;
    makeError() {
        return `Transfer status: ${TransferStatus.Rejected}, error message: ${ErrorMessages.Forbidden}`;
    }
}
const transfer = new SingleFileTransfer(TransferStatus.Pending);
console.log(transfer.checkTransferStatus());
console.log(transfer.stop("Test"));
console.log(transfer.makeError());
//========================================================================================================================================================
//========================================================================================================================================================
// Property Visibility Modifiers
class User1 {
    email;
    name;
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
}
class User2 {
    email;
    name;
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
}
//--------------------------------------------------------------------------
class Player {
    login;
    _password;
    server;
    consent; // we use 'protected' if we want to have an access to parents properties inside the class, but we cant use them out of the class
    constructor(consent) {
        this.consent = consent;
    }
    get password() {
        return this._password;
    }
    set password(newPassword) {
        this._password = newPassword;
    }
}
class CompetitivePlayer extends Player {
    rank;
    isConsented() {
        return this.consent ? "Yes" : "No";
    }
}
const player = new CompetitivePlayer(true);
// player.login = 'erv1nxxx';
// player.consent  - error 
console.log(player.isConsented());
//========================================================================================================================================================
//========================================================================================================================================================


