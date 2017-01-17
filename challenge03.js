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

var doubl = twice(add);
//console.log(doubl(11));

var square = twice(mul);
//console.log(square(11));

var bus = reverse(sub);
//console.log(bus(3,2));

//console.log(composeu(doubl, square)(5));

//console.log(composeb(add, mul)(2, 3, 7));

var add_ltd = limit(add, 1);
console.log(add_ltd(3,4));
console.log(add_ltd(3,5));