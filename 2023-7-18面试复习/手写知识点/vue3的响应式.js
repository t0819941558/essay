let activeFn = null;

function watchFn(fn) {
  activeFn = fn;
  fn();
  activeFn = null;
}

class Depend {
  constructor() {
    this.fns = new Set();
  }

  depend() {
    if (activeFn) {
      this.fns.add(activeFn)
    }
  }

  notify() {
    this.fns.forEach(fn => {
      fn()
    })
  }
}

const weakMap = new WeakMap();

function getDepend(target, key) {
  let map = weakMap.get(target);
  if (!map) {
    map = new Map();
    weakMap.set(target, map)
  }

  let depend = map.get(key)

  if (!depend) {
    depend = new Depend();
    map.set(key, depend)
  }

  return depend;
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const depend = getDepend(target, key);

      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)

      const depend = getDepend(target, key);

      depend.notify();
    }
  })
}

const sss = reactive({
  name: 't08',
  age: 18
})

watchFn(() => {
  console.log(sss.name)
})

sss.name = 'bar'



sss.name = '123'