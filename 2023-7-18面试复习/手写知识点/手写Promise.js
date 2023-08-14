const RESOLVED = 'fullFilling';
const PENDING = 'pending';
const REJECTED = 'rejected';

class TPromise {
  status = PENDING;
  resolveFn = new Set();
  rejectFn = new Set();;

  constructor(executor) {
    const resolve = (params) => {
      this.status = 'fullFilling';

      // if (this.status === 'fullFilling') {
      setTimeout(() => {
        for (const value of this.resolveFn) {
          value(params);
        }
      }, 0);
      // }
    }

    const reject = (params) => {
      this.status = 'reject';
      // if (this.status === 'reject') {
      setTimeout(() => {
        for (const value of this.rejectFn) {
          value(params)
        }
      }, 0);
      // }
    }

    executor(resolve, reject)
  }

  then(success, fail) {
    let successDefault = success || (() => { })
    let failDefault = fail || (() => { })

    if (this.status === 'fullFilling') {
      for (const value of this.resolveFn) {
        value(params);
      }
    }

    if (this.status === 'reject') {
      for (const value of this.resolveFn) {
        value(params);
      }
    }

    this.resolveFn.add(successDefault);
    this.rejectFn.add(failDefault)
    return new TPromise((resolve, reject) => {
      if (this.status === 'fullFilling') {
        resolve()
      }
      if (this.status === 'reject') {
        reject();
      }
    })
  }

  catch(reject) {
    this.then(undefined, reject)
  }

  finally(finallyFn) {
    this.then(() => {
      finallyFn();
    }, () => {
      finallyFn();
    })
  }

  static all(promiseArr) {
    let achieveLength = 0;
    let resolveArr = [];

    return new Promise((resolve, reject) => {
      promiseArr.forEach((item) => {

        item.then((res) => {
          achieveLength++
          resolveArr.push(res)
          if (achieveLength === promiseArr) {
            resolve()
          }
        }).catch((rej) => {
          reject([rej])
        })

      })
    })
  }
}

const aaa = new TPromise((resolve) => {
  console.log(1111)
  setTimeout(() => {
    resolve(11111)
  }, 1000);
}).then((res) => {
  console.log(res)
  console.log(2222222)
}).then((res) => {
  debugger;
  console.log(res)
})
// .catch((rej) => {
//   console.log(`进入rej`)
// }).then((res) => {
//   console.log(`最后res`, res)
// })

// const bbb = new Promise((resolve) => {
//   console.log(1111)
//   setTimeout(() => {
//     resolve(11111)
//   }, 1000);
// }).then((res) => {
//   console.log(res)
//   console.log(2222222)
// })

