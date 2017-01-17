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
        return add(first, second);
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

let inc1 = addf(3);
let inc2 = liftf(add)(1);
let inc3 = curry(add, 1);

console.log(inc3(4));
