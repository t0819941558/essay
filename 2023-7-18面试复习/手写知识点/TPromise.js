const RESOLVED = 'fullFilling';
const PENDING = 'pending';
const REJECTED = 'rejected';

class TPromise {
  status = PENDING;
  resolveFn = [];
  rejectFn = [];
  resolveValue = '';
  rejectReason = '';

  constructor(executor) {
    const resolve = (params) => {
      if (this.status === PENDING) {
        setTimeout(() => {
          this.status = 'fullFilling';
          this.resolveValue = params
          this.resolveFn.forEach(fn => fn(params))
        }, 0);
      }
    }

    const reject = (params) => {
      if (this.status === PENDING) {
        setTimeout(() => {
          this.status = 'reject';
          this.rejectReason = params
          this.rejectFn.forEach(fn => fn(params))
        }, 0);
      }
    }

    try {
      executor(resolve, reject)
    }
    catch (e) {
      reject(e)
    }
  }

  then(success, fail) {
    let successDefault = success || ((value) => { return value })
    let failDefault = fail || ((error) => { throw error })

    return new TPromise((resolve, reject) => {
      if (this.status === 'fullFilling') {
        try {
          const result = successDefault(this.resolveValue);
          resolve(result)
        } catch (e) {
          reject(e)
        }
      }

      if (this.status === 'reject') {
        try {
          const result = fail(this.rejectReason)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      }

      if (this.status === PENDING) {
        this.resolveFn.push(() => {
          try {
            const result = successDefault(this.resolveValue);
            resolve(result)
          } catch (e) {
            reject(e)
          }
        });
        this.rejectFn.push(() => {
          try {
            const result = fail(this.rejectReason)
            resolve(result)
          } catch (e) {
            reject(e)
          }
        });
      }
    })

  }

  catch(reject) {
    return this.then(undefined, reject)
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
        Promise.resolve(item).then((res) => {
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

  static resolve(value) {
    return new TPromise((resolve) => {
      resolve(value)
    })
  }
}

const aaa = new Promise((resolve) => {
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
}).catch((rej) => {
  console.log(`进入rej`)
}).then((res) => {
  console.log(`最后res`, res)
})

// const bbb = new Promise((resolve) => {
//   console.log(1111)
//   setTimeout(() => {
//     resolve(11111)
//   }, 1000);
// }).then((res) => {
//   console.log(res)
//   console.log(2222222)
// })

