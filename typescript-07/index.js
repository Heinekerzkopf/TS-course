//========================================================================================================================================================
//========================================================================================================================================================
// GENERICS - PRACTICING
var player1 = {
    game: "CS:GO",
    hours: 300,
    server: "basic",
};
var player2 = {
    game: 2048,
    hours: "300 h.",
    server: "arcade",
};
var player3 = {
    game: "Chess",
    hours: {
        total: 500,
        inMenu: 50,
    },
    server: "chess",
};
// Массив данных с фигурами содержит объекты, у каждого из которых обязательно есть свойство name
// Каждый объект может еще содержать дополнительные свойства в случайном виде
// Свойство name может иметь только 4 варианта
// Функция calculateAmountOfFigures должна принимать массив с объектами, у которых обязательно должно быть свойство name
// Возвращает она объект-экземпляр AmountOfFigures
// Внутри себя подсчитывает сколько каких фигур было в массиве и записывает результаты в AmountOfFigures
// С текущими данными в консоль должно попадать:
// { squares: 3, circles: 2, triangles: 2, others: 1 }
var FigureNames;
(function (FigureNames) {
    FigureNames["RECT"] = "rect";
    FigureNames["TRIANGLE"] = "triangle";
    FigureNames["CIRCLE"] = "circle";
    FigureNames["LINE"] = "line";
})(FigureNames || (FigureNames = {}));
function calculateAmountOfFigures(figures) {
    var FiguresAmount = {
        squares: 0,
        circles: 0,
        triangles: 0,
        others: 0,
    };
    figures.forEach(function (figure) {
        switch (figure.name) {
            case FigureNames.RECT:
                FiguresAmount.squares++;
                break;
            case FigureNames.CIRCLE:
                FiguresAmount.circles++;
                break;
            case FigureNames.TRIANGLE:
                FiguresAmount.triangles++;
                break;
            default:
                FiguresAmount.others++;
        }
    });
    return FiguresAmount;
}
var figuresData = [
    {
        name: FigureNames.RECT,
        data: { a: 5, b: 10 },
    },
    {
        name: FigureNames.RECT,
        data: { a: 6, b: 11 },
    },
    {
        name: FigureNames.TRIANGLE,
        data: { a: 5, b: 10, c: 14 },
    },
    {
        name: FigureNames.LINE,
        data: { l: 15 },
    },
    {
        name: FigureNames.CIRCLE,
        data: { r: 10 },
    },
    {
        name: FigureNames.CIRCLE,
        data: { r: 5 },
    },
    {
        name: FigureNames.RECT,
        data: { a: 15, b: 7 },
    },
    {
        name: FigureNames.TRIANGLE,
    },
];
console.log(calculateAmountOfFigures(figuresData));
/*

3rd way - how to copy OBJECT

interface ObjectInterface<Parents> {
    name: string;
    age: number;
    parents: Parents;
}

const someOjb: ObjectInterface<{ mother: string, father: string }> = {
    name: "Ervin",
    age: 12,
    parents: {
        mother: "Oksana",
        father: "Adalbert",
    },
};

const newObject : ObjectInterface<{ mother: string, father: string }> = JSON.parse(JSON.stringify(someOjb));

someOjb.parents.mother = "Ksyucha";

console.log(newObject.parents.mother);

*/
//========================================================================================================================================================
//========================================================================================================================================================
// GENERICS - CLASSES
