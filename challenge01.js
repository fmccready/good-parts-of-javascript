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

var three = identityf(3);

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

var addf = liftf(add);
addf(3)(4);

console.log(liftf(mul)(5)(6));

function curry(binary, arg){
    return function(arg){
        return function(binary){
            return binary(arg);
        }
    }
}