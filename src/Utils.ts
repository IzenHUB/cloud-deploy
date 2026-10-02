function hello(){
    console.log("Hello World");
}

function add(a: number, b: number):number{
    return a+b
}

function formatAddition(a: number, b: number): string {
    return `${a} + ${b} = ${add(a, b)}`;
}

export const utils = {
    hello,
    add,
    formatAddition
}
