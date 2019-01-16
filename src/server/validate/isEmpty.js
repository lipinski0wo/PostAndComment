export default val => {
    if (val === null) return true
    if (val === undefined) return true
    if (typeof val === 'object' && Object.keys(val).length === 0) return true
    if (typeof val === 'string' && val.trim().length === 0) return true
    return false
}
