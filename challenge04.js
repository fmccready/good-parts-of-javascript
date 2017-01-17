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

var ele = element(['a', 'b', 'c', 'd']);

console.log(ele());
console.log(ele());
console.log(ele());
console.log(ele());
console.log(ele());

/*
var doubl = twice(add);

var square = twice(mul);

var bus = reverse(sub);

var add_ltd = limit(add, 1);

var index = fromTo(0, 3);

console.log(index());
console.log(index());
console.log(index());
console.log(index());
*/