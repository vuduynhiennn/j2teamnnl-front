//Highlighter stuff ignore
hljs.initHighlightingOnLoad();
//Highlighter stuff ignore

//Just a dump from the docs:
// https://www.typescriptlang.org/docs/handbook/basic-types.html

// BOOLEAN:
let isDone: boolean = false;

// NUMBERS:
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// STRINGS
let color: string = "blue";
let otherColor: string = 'Red';

// Template strings ( Strings with expressions)
// Notice the backtick ` and mutltiline support

let fullName: string = `Keno`;
let age: number = 101;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`
console.log(sentence);

// "Hello, my name is Keno.

// I'll be 102 years old next month."

// ARRAYS
let listA: number[] = [1, 2, 3];
let numList: Array<number> = [1, 2, 3];

// TUPLES : Paired values 
let coords: [number, number, number, boolean];
coords = [2,4,2,false];

// ENUM  a way of giving more friendly names to sets of numeric values.
enum Color {Red, Green, Blue};
let c: Color = Color.Green; // 1

// ANY  as in any type
let notSure: any = 4;
let list: any[];