//========================================================================================================================================================
// DECORATORS

interface IUserSerivce {
    users: number;
    getUserInDatabase(): number;
}

@nullUser
@setUsers(2)
@threeUserAdvanced
@CreatedAt
class UserService implements IUserSerivce {

    users: number = 1000;

    @Log
    getUserInDatabase(): number {
        return this.users;
    }
}

function Log(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<((...args: any[]) => any)>) { /* Method decorator */
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);

    // const oldValue = descriptor.value;

    descriptor.value = () => {
        console.log('no error');
    }
}

function nullUser(target: Function) {
    target.prototype.users = 0;
}

function setUsers(users: number) {

    return (target: Function) => {
        target.prototype.users = 0;
    }

}

function threeUserAdvanced<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        users = 3;
    }
}

function logUsers(obj: IUserSerivce) {
    console.log(`Users: ${obj.users}`);
    return obj;
}

function CreatedAt<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        createdAt = new Date().toLocaleString();
    }
}

type CreatedAt = {
    createdAt: Date;
}

console.log(new UserService().getUserInDatabase());
console.log(new UserService());
console.log((new UserService() as IUserSerivce & CreatedAt).createdAt);
// console.log(nullUser(new UserService()).getUserInDatabase());
// console.log(nullUser(logUsers(new UserService())).getUserInDatabase());

//========================================================================================================================================================
//========================================================================================================================================================
// small practicing

class Cart {

    private productList: Product[] = [];
    private deliveryType!: DeliveryOptions;

    public addProduct(product: Product) {
        this.productList.push(product);
    }

    public deleteProductById(id: number) {
        this.productList = this.productList.filter((p: Product) => p.productId !== id);
    }

    public calcSum() {
        return this.productList.map((p: Product) => p.price).reduce((next, prev) => next + prev);
    }

    public setDelivery(delivery: DeliveryOptions) : void {
        this.deliveryType = delivery;
    }

    public checkOut() {
        if (this.productList.length === 0) {
            throw new Error("Empty cart");
        }
        if (!this.deliveryType) {
            throw new Error("Pick delivery type");
        }
        return { success : true };
    }

}


class Product {

    constructor(public productId: number, public productName: string, public price: number) { }

}

class Delivery {

    constructor(public date: Date) { }

}

class DeliveryHome extends Delivery {
    constructor(date: Date, public adress: string) {
        super(date)
    }
}

class PickPointDelivery extends Delivery {
    constructor(public shopId: number) {
        super(new Date())
    }
}

type DeliveryOptions = DeliveryHome | PickPointDelivery;


const cart = new Cart();
cart.addProduct(new Product(1, "cookie", 10));
cart.addProduct(new Product(2, "pie", 20));
cart.addProduct(new Product(3, "snicker", 40));
cart.deleteProductById(2);
cart.setDelivery(new DeliveryHome(new Date(), "asd"));

console.log(cart);
console.log(cart.calcSum());

//========================================================================================================================================================
//========================================================================================================================================================
// typeof

let str = "hello world";
type x = typeof str;

//========================================================================================================================================================
// Conditional type

const num = 16;
const isNumNegative = num >= 0 ? "no" : "yes";

interface StringRecord {
    [key: string] : string;
}

interface DataRecord {
    [key: string]: Date;
}

type MyRecord<T> = T extends string ? StringRecord : DataRecord;

type Object1 = MyRecord<string>;

const obj1 : Object1 = {
    r: '123',

}

//========================================================================================================================================================
// infer

function fromPair(pair : [string, string]) {
    const [key, value] = pair;

    return {
        [key]: value
    }
}

type FirstArg<T> = T extends (first : infer First, ...args: any[]) => any ? First : never

const myPair : FirstArg<typeof fromPair> = ['myKey', 'myValue'];

// fromPair(myPair as [string, string]);
fromPair(myPair);

type ConstructorFirstArg<T> = T extends { new(arg : infer A, ...args: any[]) : any } ? A : never;

class Computer {
    constructor(brand: string, style: number) {
    }
}

let brand : ConstructorFirstArg<typeof Computer>;
let dateArg: ConstructorFirstArg<typeof Date>;

//========================================================================================================================================================
// type mapping

type PCBrand = {
    name: string,
    country: string,
    createdAt: Date,
}

type WellKnownBrands = "apple" | "lenovo" | "asus" | "msi";

type MyPCRecord = {
    [BrandKey in WellKnownBrands]: PCBrand;
}

type PartOfWindow = {
    [Key in 'document' | 'screen' | 'navigator']?: Window[Key];
}

const p: PartOfWindow = {
    screen: window.screen,
}

function printPCCatalog(pcCatalog:MyPCRecord) {
    console.log(pcCatalog.apple?.country);
}

const brandRecord: MyPCRecord = {
    apple: {
        name: "apple",
        country: "USA",
        createdAt: new Date(),
    },
    lenovo: {
        name: "apple",
        country: "USA",
        createdAt: new Date(),
    },
    asus: {
        name: "apple",
        country: "USA",
        createdAt: new Date(),
    },
    msi: {
        name: "apple",
        country: "USA",
        createdAt: new Date(),
    }
}

type Currencies = {
    usa: 'usd',
    china: 'cny',
    ukraine: 'uah',
    kz: 'tenge';
};

type CreateCustomCurr<T> = {
    [Currency in keyof T]: string;
}

const currenciesObject : CreateCustomCurr<Currencies> = {
    ukraine: 'a',
    china: 'a',
    kz: 'a',
    usa: 'a',
}

//========================================================================================================================================================
//========================================================================================================================================================
// index access 

interface DataModel {
    id: string;
    title: string;
}

type DataModelId = DataModel['id'];

const sizes = ['small', 'medium', 'large'] as const /* as const - makes them readonly */;

type T2 = typeof sizes[number]; /* thanks to 'as const' we can pick all indexes */

//========================================================================================================================================================
//========================================================================================================================================================
// Template Literals

type Side = 'top' | 'right' | 'bottom' | 'left';
type Margin = `maring-${Side}`;
type Padding = `padding-${Side}`;
type MarginJS = `margin${Capitalize<Side>}`;


interface Car {
    brand: string;
    model: string;
    year: number;
}

type CarFactory = {
    [K in keyof Car as `set${Capitalize<K>}`]: (car: Car, value: Car[K]) => void;
}

//========================================================================================================================================================
//========================================================================================================================================================
