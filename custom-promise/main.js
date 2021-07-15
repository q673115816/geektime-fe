const customPromise = require('./index.js').default

customPromise.deferred = () => {
    const result = {}
    result.promise = new customPromise((resolve, reject) => {
        result.resolve = resolve
        result.reject = reject
    })
    return result
}

module.exports = customPromise