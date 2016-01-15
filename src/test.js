/* @flow */
(function (){
    let a = 0;
    let b: number = 0;

    let func = function(first: string, second: string): (p1: number, p2: number) => boolean {
        return function(a: number) {return !!first};
    }

    let newFunc = (): number => {return 1};

    console.log(func('1', '2'));

    let o = {
        test: function(one: string) : string {
            return one;
        }
    }

    let my: MyClass = new MyClass();

    o.test('123123');
})();

class MyClass {
    myFunction(arg: string) : number {
        let a: Array<number> = [42, 43];
        const b: number = a[0];

        var bool: boolean = !!a;

        return 42;
    };
}

let constructor: Class<MyClass> = MyClass;
var d = MyClass;
let b: MyClass = new d();

let func: Function = p => p;

let someClass: {myFunction: (arg: string) => number} = new MyClass();