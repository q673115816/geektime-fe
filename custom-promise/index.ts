const enum STATUS {
    PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED'
}

class mPromise {
    private status: STATUS = STATUS.PENDING
    private value: any = null
    private reason: any = null
    private onFulfilledCallbacks = []
    private onRejectedCallbacks = []
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.resolve(error)
        }
    }

    resolve = (value?: any) => {
        if (this.status !== STATUS.PENDING) return
        this.value = value
        this.status = STATUS.FULFILLED
        this.onFulfilledCallbacks.forEach(fn => fn())
    }

    reject = (reason?: any) => {
        if (this.status !== STATUS.PENDING) return
        this.reason = reason
        this.status = STATUS.REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
    }

    resolvePromise = (promise2, x, resolve, reject) => {
        if(promise2 === x) {
            return reject(new TypeError('stack overflow'))
        }
        if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
            let called = false
            try {
                let then = x.then
                if(typeof then === 'function') {
                    then.call(x, (value) => {
                        if(called) return 
                        called = true
                        this.resolvePromise(x, value, resolve, reject)
                    }, (reason) => {
                        if(called) return
                        called = true 
                        reject(reason)
                    })
                } else {
                    if (called) return
                    called = true
                    resolve(x)
                }
            } catch (error) {
                if (called) return
                called = true
                reject(error)
            }
        } else {
            resolve(x)
        }
    }

    then(onFulfilled?: any, onRejected?: any) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value: any) => value
        onRejected = typeof onRejected === 'function' ? onRejected : (reason: any) => {
            throw reason
        }

        const promise2 = new mPromise((resolve, reject) => {
            const onFulfilledCallback = () => {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                });
            }
            const onRejectedCallback = () => {
                setTimeout(() => {
                 try {
                     const x = onRejected(this.reason)
                     this.resolvePromise(promise2, x, resolve, reject)
                 } catch (error) {
                     reject(error)
                 }   
                });
            }

            const callbacks = {
                [STATUS.FULFILLED]: onFulfilledCallback,
                [STATUS.REJECTED]: onRejectedCallback,
                [STATUS.PENDING]: () => {
                    this.onFulfilledCallbacks.push(onFulfilledCallback)
                    this.onRejectedCallbacks.push(onRejectedCallback)
                },
            }
            callbacks[this.status]()
        })
        return promise2
    }

    catch(onFulfilled) {
        return this.then(_, onFulfilled)
    }

    finally(fn) {
        return this.then((value) => {
            fn()
            return value
        }, (reason) => {
            fn()
            return reason
        })
    }

    static resolve(value?: any) {
        return new mPromise((resolve) => resolve(value))
    }

    static reject(reason?: any) {
        return new mPromise((_, reject) => reject(reason))
    }

    static race(promises) {
        return new mPromise((resolve, reject) => {
            for(const promise of promises) {
                if(typeof promise.then === 'function') {
                    promise.then(resolve, reject)
                } else {
                    resolve(promise)
                }
            } 
        })
    }

    static all(promises) {
        if(Array.isArray(promises)) return mPromise.resolve(promises)
        return new mPromise((resolve, reject) => {
            const len = promises.length
            let n = 0 
            const success = (index, item) => {
                result[index] = item
                n++
                if (n === len) resolve(result)
            }
            const result = []
            for (let i = 0; i < len;i++) {
                const promise = promises[i]
                if(typeof promise === 'function') {
                    promise.then((value) => {
                        success(i, value)
                    }, reject)
                } else {
                    success(i, promise)
                }
            }
        })
    }
    
}

export default mPromise