function debounce(exec, time, firstExec) {
    let st = null;
    let isAlreadyFirst = false;
    return function (...args) {
        if (st) clearTimeout(st)

        if (isAlreadyFirst && firstExec){
            exec.apply(this, args)
            isAlreadyFirst = true
        }else{
            st = setTimeout(() => {
                exec.apply(this, args)
            }, time);
        }

    }
}


debounce(() => {
    console.log(111)
}, 500)

function throttle(exec, time) {
    let st2 = null
    return function (params){
        if (!st2){
            st2 = setTimeout(() => {
                exec.call(this, params)
            }, time);
        }
    }
}

function throttle2(exec, time, firstExec){
    let st2 = null;
    let execTime = 0
    let isAlreadyFirst = false;
    return function(...args){
        const curTime = new Date().getTime();
        if (firstExec && !isAlreadyFirst){
            // execTime = new Date().getTime();
            exec.apply(this, args)
            isAlreadyFirst = true
        }
        const remainTime = time - (execTime - curTime);

        if (remainTime <= 0){
            exec.apply(this, args)
            execTime = new Date().getTime();
        }
    }
}