export function readLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return null
  }
}

export function writeLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocal(key) {
  localStorage.removeItem(key)
}
