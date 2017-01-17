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

/*
var array = [];
var col = collect(fromTo(0,2), array);
*/
function filter(gen, predicate){
    return function recur(){
        var value = gen();
        if(value === undefined || predicate(value)){
            return value;
        }
        return recur();
    }
}

var fil = filter(fromTo(0,5), 
    function third(value){        
        return (value % 3) === 0;
    });

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

var con = concat(fromTo(0,3), fromTo(0,2));
console.log(con());
console.log(con());
console.log(con());
console.log(con());
console.log(con());
console.log(con());
