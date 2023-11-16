// Basic working with CLASSES
//========================================================================================================================================================

class Box<T> {
    width!: T;
    height: number;

    constructor(width: T) {
        this.width = width;
        this.height = 500;
    }
}

const firstBox = new Box(200);
console.log(firstBox);

class User {
    name!: string;
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
    width!: number;
    height: number = 500;
    volume!: number | undefined;
    _content!: string | undefined;

    constructor(width: number, volume?: number, content?: string) {
        this.width = width;
        this.volume = volume;
        this._content = content;
        // this.height = 500;
    }

    calcVolume(): void {
        if (!this.volume) {
            this.volume = this.width * this.height;
            console.log(`Package volume: ${this.volume}cm3`);
        } else {
            console.log(`Package volume: ${this.volume}cm3`);
        }
    }

    checkBoxSize(transport: number): string;
    checkBoxSize(transport: number[]): string;
    checkBoxSize(transport: number | number[]): string {
        if (typeof transport === 'number') {
            return transport >= this.width ? 'Ok' : 'Not ok';
        } else {
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
    [s: string]: string | ((s: string) => boolean);
}

const style = new Styles();
const newColor = style.color = "blue" ? "red" : "yellow";
style.color = "blue"

console.log(newColor);

//========================================================================================================================================================
//========================================================================================================================================================
// Class Extends

class PresentBox extends BoxTwo {
    wrap!: string;
    height: number = 600;

    constructor(wrap: string, width: number) {
        super(width)
        this.wrap = wrap;
    }

    // we use operator "override" to override method from parent class
    // override ... {...}
    // we can use method from parent : super.content(value), using key word 'super'


}

new PresentBox('red', 500)._content;

//========================================================================================================================================================
//========================================================================================================================================================
// TS - Implements - interfaces in classes

interface IUser {
    login: string;
    password: string;
    token?: number;
}

interface IValidation {
    valid: boolean;
    isValid: (data: string) => boolean;
}

class UserForm implements IUser, IValidation {
    login!: string;
    password!: string;
    valid: boolean = false;
    isValid(login: string) {
        return login.length > 3;
    }
}

//========================================================================================================================================================
//========================================================================================================================================================
// PRACTICING - INTERFACE IMPLEMENTATION

enum TransferStatus {
    Pending = "pending",
    Rejected = "rejected",
    Completed = "completed",
}

enum ErrorMessages {
    NotFound = "Not found: 404",
    NotEnoughSpace = "Not enough space: 507",
    Forbidden = "Forbidden: 403",
}

interface ITransfer {
    path: string;
    data: string[];
    date?: Date;
    start: (p: string, d: string[]) => string;
    stop: (reason: string) => string;
}

interface TransferError {
    message: ErrorMessages;
}

// Класс должен имплементировать ITransfer и TransferError
class SingleFileTransfer implements ITransfer, TransferError {

    // Место для реализаций

    // Необходимо создать метод checkTransferStatus, проверяющий состояние передачи данных
    // Можно вывести в консоль данные, можно вернуть строку

    // Необходимо создать метод, который будет останавливать передачу данных
    // И возвращать строку с причиной и датой остановки (Дата в любом формате)

    // Необходимо создать метод, который будет возвращать строку, содержащую
    // Статус передачи и любое сообщение об ошибке. На ваш выбор или отталкиваться от приходящего аргумента
    // Метод может показаться странным, но может использоваться для тестов, например

    path!: string;
    data!: string[];
    date?: Date | undefined;
    message!: ErrorMessages;
    transferStatus!: TransferStatus;

    constructor(status: TransferStatus) {
        this.transferStatus = status;
    }

    start(p: string, d: string[]) {
        return 'Transfer started'
    }

    checkTransferStatus(): string {
        return this.transferStatus;
    }

    stop(reason: string): string {
        return `Transfer stopped, reason: ${reason}, Date: ${new Date().toLocaleString()}`;
    };

    makeError(): string {
        return `Transfer status: ${TransferStatus.Rejected}, error message: ${ErrorMessages.Forbidden}`
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
    public email: string;
    public name: string;

    constructor(email: string, name: string) {
        this.email = email;
        this.name = name;
    }
}

class User2 {
    constructor(public email: string, public name: string) { }
}

//--------------------------------------------------------------------------

class Player {
    private static game: string = "COD";
    private login!: string;
    private _password!: string;
    public server!: string;
    protected consent!: boolean; // we use 'protected' if we want to have an access to parents properties inside the class, but we cant use them out of the class

    constructor(consent: boolean, login: string) {
        this.consent = consent;
        this.login = login;
    }

    get password() {
        return this._password;
    }

    set password(newPassword: string) {
        this._password = newPassword;
    }

    static getGameName() {
        return Player.game;
    }

    logIn(this: Player) {
        return `Player ${this.login} online!`
    }

}

class CompetitivePlayer extends Player {
    rank!: number;

    isConsented() {
        return this.consent ? "Yes" : "No";
    }

}

const player = new CompetitivePlayer(true, 'Vasiliy');
// player.login = 'erv1nxxx';
// player.consent  - error 

console.log(player.isConsented());

//========================================================================================================================================================
//========================================================================================================================================================
// private fields (#, opportunity in JS) - lesson 72 - done

//========================================================================================================================================================
//========================================================================================================================================================
// static properties & methods

// Player.game;

console.log(Player.getGameName());

Math.hypot();

// if we want to make our "static class" we can make our CONSTRUCTOR private - /* private constructor(){} */ , but then class wont be extendable
// also we can use protected

class StaticClass {
    name!: string;
    private constructor() { };
}

// new StaticClass; - error 

function setName() {
    return "COD"
}

class StaticMethod {
    private static game: string;
    name!: string;

    static {
        StaticMethod.game = setName();
    }

    // constructor(game: string){
    //     StaticMethod.game = game;
    // };
}

//========================================================================================================================================================
//========================================================================================================================================================
// this & context typization 

const newPlayer = new Player(true, "erv1nxx");
console.log(newPlayer.logIn());

const testfunc = newPlayer.logIn.bind(newPlayer);

//========================================================================================================================================================
//========================================================================================================================================================
// abstract classes

interface IEngine {
    model: string;
    capacity: number;
    startEngine: (time: Date) => string;
}

abstract class AbstractVehicle {
    model!: string;
    capacity!: number;
    abstract startEngine: (time: Date) => string;
    stopEngine(time: Date): string {
        this.startEngine(new Date());
        return 'Engine Stopped'
    }
}

// new AbstractVehicle(); - error

class Vehicle extends AbstractVehicle {
    startEngine = (time: Date) => {
        return "Started";
    };
}

new Vehicle().capacity;

//========================================================================================================================================================
//========================================================================================================================================================
// PRACTICING

interface Queue<T> {
    enqueue(item: T): void; // поставить в очередь
    dequeue(): T | undefined; // исключить из очереди
    peek(): T | undefined | null; // посмотреть первый элемент
    isEmpty(): boolean; // проверка на "пустоту" сущности
    length(): number; // проверка на длину
}

// Реализация очереди через массив
// Класс ArrayQueue должен имплементировать интерфейс Queue
// Класс может работать с любым типом данных, то есть помещать любые данные в массив  <-- Важно

// Очередь - это структура данных, которая выглядит как реальная очередь в магазине
// Первый, кто подошел к прилавку, первым и уйдет. Так же и в коде при выполнении задач
// Чуть подробнее можно найти в википедии или на других сайтах по поиску "Очередь структура данных"

class ArrayQueue<T> implements Queue<T> {
    // Создать приватное свойство queue, которое по умолчанию массив и содержит массив любого типа
    private queue: T[] = [];
    // Подсказка по методам:
    // при добавлении в очередь можно выполнить метод push
    // при удалении - shift, так как нужно удалить первый элемент.
    // Обратите внимание на возвращаемое значение
    // isEmpty может использоваться в других методах
    enqueue(this: ArrayQueue<T>, item: T): void {
        this.queue.push(item);
    }

    dequeue(this: ArrayQueue<T>): T {

        if (this.isEmpty()) {
            throw new Error("Queue Underflow");
        }

        return this.queue.shift() as T
    }

    peek(this: ArrayQueue<T>): T | null {

        if (this.isEmpty()) {
            return null;
        }

        return this.queue[0];
    }

    isEmpty(this: ArrayQueue<T>): boolean {
        return this.queue.length === 0;
    }

    length(this: ArrayQueue<T>): number {
        return this.queue.length
    }
}

// Стэк - это еще одна структура данных. Проще всего её представить как стопку листов на столе
// Последний, который вы положите сверху, вы и первым потом возьмете.
// Чуть подробнее можно найти в википедии или на других сайтах по поиску "Стэк структура данных"
// Класс Stack содержит другие методы, так что ничего имплементировать не нужно
// Класс может работать с любым типом данных, то есть помещать любые данные в массив и содержит массив любого типа  <-- Важно

class Stack<T> {
    // Создать приватное свойство stack, которое по умолчанию массив и содержит массив любого типа
    private stack: T[] = [];
    // Создать приватное свойство limit, которое будет типом number
    private limit: number;

    // Здесь мы установим лимит на стопку листов.
    // При переполнении стэка программа зависает, а очень высокая стопка листов падает
    // Так что лимит всегда должен быть
    constructor(limit: number = Number.MAX_VALUE) {
        this.limit = limit;
    }

    push(this: Stack<T>, value: T) {


        if (this.length() + 1 > this.limit) {
            throw new Error("Stack limit!");
        }

        this.stack.push(value);
        // Добавляет элемент в стэк
        // Если стэк переполнен - выбрасывает ошибку (throw new Error)
    }

    pop(this: Stack<T>) : T {

        if (this.isEmpty()) {
            throw new Error("Stack is empty!");
        }

        return this.stack.pop() as T;

        // Удаляет последний элемент массива
        // Если в стеке пусто - выбрасывает ошибку (throw new Error)
        // При удалении элемента возвращает его
        // Простыми словами: вы берете верхний лист в стопке и используете его
        // Если на столе нет листов - получается ошибка, брать нечего
    }

    length(this: Stack<T>) {
        // Возвращает кол-во элементов в стэке
        return this.stack.length

    }

    isEmpty(this: Stack<T>) : boolean {
        // Проверяет стэк на "пустоту"
        return this.stack.length === 0;
    }

    top(this: Stack<T>): T | null {
        // Возвращает последний (верхний) элемент стэка, но не удаляет его
        // Вы просто читаете, что написано на верхнем листе
        // Если стэк пуст - вернется null
        if (this.isEmpty()) {
            return null
        }

        return this.stack.slice(-1) as T;
    }
}

// Для тестов

const arrTest1 = new ArrayQueue<number>();
arrTest1.enqueue(5);
arrTest1.enqueue(10);
console.log(arrTest1.peek());
console.log(arrTest1.dequeue());
console.log(arrTest1.length());

const arrTest2 = new ArrayQueue<string>();
arrTest2.enqueue("5");
arrTest2.enqueue("10");
console.log(arrTest2.peek());
console.log(arrTest2.dequeue());
console.log(arrTest2.length());

const stackTest1 = new Stack<number>(10);
stackTest1.push(20);
stackTest1.push(50);
console.log(stackTest1.top());
console.log(stackTest1.pop());
console.log(stackTest1.length());

const stackTest2 = new Stack<string>(10);
stackTest2.push("20");
stackTest2.push("50");
console.log(stackTest2.top());
console.log(stackTest2.pop());
console.log(stackTest2.length());
