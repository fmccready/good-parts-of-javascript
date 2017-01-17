// ES5
function constructor(init){
    var that = other_constructor(init),
        member,
        method = function(){
            // init, member, method
        };
    that.method = method;
    return that;
}

// ES6
function constructor(spec){
    let {member} = spec;
    const {other} = other_constructor(spec);
    const method = function(){
        // spec, member, other, method
    };

    return Object.freeze({
        method,
        other
    });
}
