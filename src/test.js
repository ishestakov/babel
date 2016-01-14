/* @flow */
(function (){
    let a = 0;
    let b = 0;

    let func = function(first: string, second: string): string {
        return first > second;
    }

    let newFunc = (): number => {return 1};

    console.log(func('1', '2'));

    let o = {
        test: function(one: string) : string {
            return one;
        }
    }

    o.test('123123');
})();