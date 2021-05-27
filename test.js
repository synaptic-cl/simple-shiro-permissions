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

  it('It should validate `*:view,read`', () => {
    expect(getPermissions(permissions, '*:view,create')).toStrictEqual(['loanFlow:view', 'loanFlow:create', 'user:view', 'user:create'])
  })

  it('It should validate `[loanFlow:view, loanFlow:review]`', () => {
    expect(getPermissions(permissions, ['loanFlow:view', 'loanFlow:review'])).toStrictEqual(['loanFlow:view', 'loanFlow:review'])
  })
})

describe('Check Permissions', () => {
  it('It should validate `loanFlow:view`', () => {
    expect(check(permissions, 'loanFlow:view')).toBeTruthy()
  })

  it('It should validate `a.small_custom-module:query`', () => {
    expect(check(permissions, 'a.small_custom-module:query')).toBeTruthy()
  })
  
  it('It should validate `loanFlow:view,review`', () => {
    expect(check(permissions, 'loanFlow:view,review')).toBeTruthy()
  })

  it('It should validate `loanFlow:*`', () => {
    expect(check(permissions, 'loanFlow:*')).toBeTruthy()
  })

  it('It should validate `*:*`', () => {
    expect(check(permissions, '*:*')).toBeTruthy()
  })

  it('It should validate `*:view`', () => {
    expect(check(permissions, '*:view')).toBeTruthy()
  })

  it('It should validate `*:view,read`', () => {
    expect(check(permissions, '*:view,create')).toBeTruthy()
  })

  it('It should validate `*:*,read`', () => {
    expect(check(permissions, '*:*,create')).toBeFalsy()
  })

  it('It should validate `user:edit-profile`', () => {
    expect(check(permissions, 'user:edit-profile')).toBeTruthy()
  })

  it('It should validate `[loanFlow:view, loanFlow:review]`', () => {
    expect(check(permissions, ['loanFlow:view', 'loanFlow:review'])).toBeTruthy()
  })
})
