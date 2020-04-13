const validateFormat = (value) => (
  /^([\w]+|\*):([\w,]+|\*)$/.test(value)
)

const findPermissions = (permissionsList, value) => {
  if (!validateFormat(value)) {
    console.warn('The format is invalid')
    return false
  }
  const [domain, action] = value.split(':')
  let response = permissionsList.filter((permission) => {
    if (typeof permission !== 'string') {
      throw new ('the permission must a array of string ["domain:action", "domain2:action2"]')
    }
    // if is */*
    if (/^(\*):(\*)$/.test(value)) {
      return true
    }
    // if is [DOMIAN]:*
    if (/^([\w]+):(\*)$/.test(value)) {
      return permission.startsWith(`${domain}:`)
    }

    // if is *:[ACTION]
    if (/^(\*):([\w]+|\*)$/.test(value)) {
      return permission.endsWith(`:${action}`)
    }

    // Case without * only exact
    if (/^([\w]+):([\w]+)$/.test(value)) {
      if (permission.startsWith(`${domain}:`)) {
        return permission.startsWith(`${domain}:`) && permission.endsWith(`:${action}`)
      }
    }
    return false
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
exports.check = (permissionsList, value) => {
  if (typeof value === 'string') {
    return findPermissions(permissionsList, value).length > 0
  } 
  if (typeof value === 'object') {
    return value.flatMap((v) => findPermissions(permissionsList, v)).length > 0
  }
  return []
}
exports.getPermissions = (permissionsList, value) => {
  if (typeof value === 'string') {
    return findPermissions(permissionsList, value)
  } 
  if (typeof value === 'object') {
    return value.flatMap((v) => findPermissions(permissionsList, v))
  }
  return []
}
