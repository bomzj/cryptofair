const map = new Map()

export default class Cache {
  static has(key) {
    return map.has(key)
  }

  static get(key) {
    return map.has(key) ? map.get(key)[0] : null
  }

  static set(key, value) {
    return map.set(key, [value, Date.now()])
  }

  static delete(key) {
    return map.delete(key)
  }

  static clear() {
    return map.clear()
  }
}