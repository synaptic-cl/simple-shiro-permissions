const { getPermissions, check } = require('./index')

const permissions = [
    'loanFlow:view',
    'loanFlow:review',
    'loanFlow:create',
    'user:view',
    'user:create',
    'user:update',
    'user:delete',
    'user:edit-profile',
    'a.small_custom-module:query'
]


describe('Get Permissions', () => {
  it('It should validate `loanFlow:view`', () => {
    expect(getPermissions(permissions, 'loanFlow:view')).toStrictEqual(['loanFlow:view'])
  })
  
  it('It should validate `loanFlow:view,review`', () => {
    expect(getPermissions(permissions, 'loanFlow:view,review')).toStrictEqual(['loanFlow:view', 'loanFlow:review'])
  })

  it('It should validate `loanFlow:*`', () => {
    expect(getPermissions(permissions, 'loanFlow:*')).toStrictEqual(['loanFlow:view', 'loanFlow:review', 'loanFlow:create'])
  })

  it('It should validate `*:*`', () => {
    expect(getPermissions(permissions, '*:*')).toStrictEqual([
      'loanFlow:view',
      'loanFlow:review',
      'loanFlow:create',
      'user:view',
      'user:create',
      'user:update',
      'user:delete',
      'user:edit-profile',
      'a.small_custom-module:query'
    ])
  })

  it('It should validate `*:view`', () => {
    expect(getPermissions(permissions, '*:view')).toStrictEqual(['loanFlow:view', 'user:view'])
  })

  it('It should validate `*:view,create`', () => {
    expect(getPermissions(permissions, '*:view,create')).toStrictEqual(['loanFlow:view', 'loanFlow:create', 'user:view', 'user:create'])
  })

  it('It should validate `[loanFlow:view, loanFlow:review]`', () => {
    expect(getPermissions(permissions, ['loanFlow:view', 'loanFlow:review'])).toStrictEqual(['loanFlow:view', 'loanFlow:review'])
  })

  it('It should reject other data types', () => {
    expect(getPermissions(permissions, 1234)).toStrictEqual([])
    expect(getPermissions(permissions, {})).toStrictEqual([])
    expect(getPermissions(permissions, /user:view/)).toStrictEqual([])
  })
})

describe('Check Permissions', () => {
  it('It should validate `loanFlow:view`', () => {
    expect(check(permissions, 'loanFlow:view')).toBe(true)
  })

  it('It should validate `a.small_custom-module:query`', () => {
    expect(check(permissions, 'a.small_custom-module:query')).toBe(true)
  })
  
  it('It should validate `loanFlow:view,review`', () => {
    expect(check(permissions, 'loanFlow:view,review')).toBe(true)
  })

  it('It should validate `loanFlow:*`', () => {
    expect(check(permissions, 'loanFlow:*')).toBe(true)
  })

  it('It should validate `*:*`', () => {
    expect(check(permissions, '*:*')).toBe(true)
  })

  it('It should validate `*:view`', () => {
    expect(check(permissions, '*:view')).toBe(true)
  })

  it('It should validate `*:view,create`', () => {
    expect(check(permissions, '*:view,create')).toBe(true)
  })

  it('It should validate `*:*,create`', () => {
    expect(check(permissions, '*:*,create')).toBe(false)
  })

  it('It should validate `user:edit-profile`', () => {
    expect(check(permissions, 'user:edit-profile')).toBe(true)
  })

  it('It should validate `[loanFlow:view, loanFlow:review]`', () => {
    expect(check(permissions, ['loanFlow:view', 'loanFlow:review'])).toBe(true)
  })

  it('It should reject other data types', () => {
    expect(check(permissions, 1234)).toBe(false)
    expect(check(permissions, {})).toBe(false)
    expect(check(permissions, /user:view/)).toBe(false)
  })
})
