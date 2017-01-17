var identity = function identity (first) {
    return first;
}
function add(first, second){
    return first + second;
}
function sub(first, second){
    return first - second;
}
function mul(first, second){
    return first * second;
}


function identityf(first){
    return function(){
        return first;
    };
}

function addf(first){
    return function (second){
        return first + second;
    }
}

function liftf(binary){
    return function(first){
        return function(second){
            return binary(first, second);
        }
    }
}

function curry(binary, first){
    return function(second){
        return binary(first, second);
    }
}


function twice(binary){
    return function (arg){
        return binary(arg, arg);
    }
}

function reverse(binary){
    return function(first, second){
        return binary(second, first);
    }
}

function composeu(func1, func2){
    return function(arg){
        return func2(func1(arg));
    }
}

function composeb(func1, func2){
    return function (arg1, arg2, arg3){
        return func2(func1(arg1, arg2), arg3);
    }
}

function limit(func, count){
    return function(a, b){
        if(count >=1){
            count -= 1;
            return func(a,b);
        }
        return undefined;
    }
}

function from(start){
    return function(){
        var next = start;
        start += 1;
        return next;
    }
}

function to(gen, end){
    return function(){
        var value = gen();
        if(value < end){
            return value;
        }
        return undefined;
    }
}

function fromTo(start, end){
    return to(
        from(start),
        end
    );
}

function element(array, gen){
    if (gen === undefined){
        gen = fromTo(
            0,
            array.length
        );
    }
    return function() {
        var index = gen();
        if (index !== undefined){
            return array[index];
        }
    }
}

function collect (range, array){
    return function(){
        let val = range();
        if (val !== undefined){
            array.push(val);
        }
        return val;
    }
}

function filter(gen, predicate){
    return function recur(){
        var value = gen();
        if(value === undefined || predicate(value)){
            return value;
        }
        return recur();
    }
}

function concat(gen1, gen2){
    var gen = gen1;
    return function (){
        var value = gen();
        if (value !== undefined) {
            return value;
        }
        gen = gen2;
        return gen();
    }
}

function gensymf(series){
    var index = 0;
    return function(){
        index += 1;
        return series + index;
    }
}

function gensymff(unary, seed){
    return function(prefix){
        var number = seed;
        return function(){
            number = unary(number);
            return prefix + number;
        }
    }
}

function fibonaccif(a, b){
    return concat(
        element([a,b]),
        function fibonacci(){
           var next = a + b;
           a = b;
           b = next;
           return next; 
        }
    )
}

function counter(num){
    return {
        up: function(){
            num += 1;
            return num;
        },
        down: function(){
            num -= 1;
            return num;
        }
    }
}

function revocable(binary){
    return {
        invoke: function(first, second){
            if (binary !== undefined){
                return binary(
                    first,
                    second
                );
            }
        },
        revoke: function(){
            binary = function(){
                return undefined;
            }
        }
    }
}

function m (value, source){
    return {
        value: value,
        source: (typeof source === 'string')
            ? source
            : String(value)
    };
}

function liftm(binary, op){
    return function(a, b){
        if (typeof a === 'number'){
            a = m(a);
        }
        if (typeof b === 'number'){
            b = m(b);
        }
        return m(
            binary(a.value, b.value),
            "(" + a.source + op + b.source + ")"
        );
    };
}

function exp(value){
    return (Array.isArray(value))
        ? value[0](
            exp(value[1]),
            exp(value[2])
        )
        : value;
}

function addg(first){
    function more(next){
        if (next === undefined){
            return first;
        }
        first += next;
        return more;
    }
    if (first !== undefined){
        return more;
    }
}

function liftg(binary){
    return function(first){
        if (first === undefined){
            return first;
        }
        return function more(next){
            if(next === undefined){
                return first;
            }
            first = binary(first, next);
            return more;
        };
    };
}

function arrayg(value){
    return function(first){
        if (first === undefined){
            return [];
        }
        return liftg(
            function(array, value){
                array.push(value);
                return array;
            }
        )([first]);
    }
}

function continuize(unary){
    return function(callback, arg){
        return callback(unary(arg));
    };
}

myvector = vector();
myvector = append(7);
myvector.store(1, 8);
myvector.get(0);
myvector.get(1);