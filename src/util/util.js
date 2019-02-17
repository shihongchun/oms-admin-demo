const storage = window.localStorage
export default {
  setLocalStorage (query) {
    for (let key in query) {
      storage[key] = JSON.stringify(query[key])
    }
  },
  getLocalStorage (key) {
    return storage.getItem(key)
  },
  removeLocalStorage (key) {
    return storage.removeItem(key)
  },
  throttle (fn, delay = 500) {
    let before = new Date()
    let timer = null
    return function () {
      let context = this
      let args = arguments
      let now = new Date()
      if (before + delay > now) {
        fn.apply(context, args)
        before = now
      } else {
        clearTimeout(timer)
        timer = setTimeout(function () {
          fn.apply(context, args)
        }, delay)
      }
    }
  },
  debunce (fn) {
    let timer = null
    return function () {
      clearTimeout(timer)
      let context = this
      let args = arguments
      setTimeout(function () {
        fn.apply(context, args)
      }, 300)
    }
  }
}
