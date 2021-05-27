/**
 * @param {string[]} x 
 * @param {string[]} y 
 * @returns {string[]}
 */
const concat = (x, y) => x.concat(y ? y : [])

/**
 * @param {string} value 
 * @returns {boolean}
 */
const validateFormat = (value) => (
  /^([\w._-]+|\*):([\w,._-]+|\*)$/.test(value)
)

/**
 * @param {string[]} permissionsList 
 * @param {string} value 
 * @returns {string[]}
 */
const findPermissions = (permissionsList, value) => {
  if (!validateFormat(value)) {
    console.warn('The format is invalid')
    return []
  }
  const [domain, action] = value.split(':')
  let response = permissionsList.filter((permission) => {
    if (typeof permission !== 'string') {
      throw new Error('the permission must a array of string ["domain:action", "domain2:action2"]')
    }
    if (value === '*:*') {
      return true
    }

    // [DOMAIN]:*
    if (action === '*') {
      return permission.startsWith(`${domain}:`)
    }

    // *:[ACTION]
    if (domain === '*') {
      return permission.endsWith(`:${action}`)
    }

    // Case without * only exact
    return permission.startsWith(`${domain}:`) && permission.endsWith(`:${action}`)
  })

  // if multi actions [DOMAIN]:[ACTION],[ACTION]
  const multiAction = action.split(',').map((val) => (domain === '*' ? `:${val}` : `${domain}:${val}`))
  if (multiAction.length > 1) {
    const res = permissionsList.filter((perm) => multiAction.find(v => {
      return perm.endsWith(v)
    }))
    response = res.length >= multiAction.length  ? res : []
  }
  return response
}

exports.validateFormat = validateFormat

/**
 * @param {string[]} permissionsList 
 * @param {string | string[]} value 
 * @returns {boolean}
 */
exports.check = (permissionsList, value) => {
  if (typeof value === 'string') {
    return findPermissions(permissionsList, value).length > 0
  } 
  if (typeof value === 'object') {
    return value.map((v) => findPermissions(permissionsList, v)).reduce(concat, []).length > 0
  }
  return false
}

/**
 * @param {string[]} permissionsList 
 * @param {string | string[]} value 
 * @returns {string[]}
 */
exports.getPermissions = (permissionsList, value) => {
  if (typeof value === 'string') {
    return findPermissions(permissionsList, value)
  } 
  if (typeof value === 'object') {
    return value.map((v) => findPermissions(permissionsList, v)).reduce(concat, [])
  }
  return []
}
