const { getPermissions, check } = require('./index')

const permissions = [
    'loanFlow:view',
    'loanFlow:review',
    'loanFlow:create',
    'user:view',
    'user:create',
    'user:update',
    'user:delete'
]


describe('Get Permissions', () => {
  it('It should valid `loanFlow:view`', (done) => {
    expect(getPermissions(permissions, 'loanFlow:view')).toStrictEqual(['loanFlow:view'])
    return done()
  })
  
  it('It should valid `loanFlow:view,review`', (done) => {
    expect(getPermissions(permissions, 'loanFlow:view,review')).toStrictEqual(['loanFlow:view', 'loanFlow:review'])
    return done()
  })

  it('It should valid `loanFlow:*`', (done) => {
    expect(getPermissions(permissions, 'loanFlow:*')).toStrictEqual(['loanFlow:view', 'loanFlow:review', 'loanFlow:create'])
    return done()
  })

  it('It should valid `*:*`', (done) => {
    expect(getPermissions(permissions, '*:*')).toStrictEqual([
      'loanFlow:view',
      'loanFlow:review',
      'loanFlow:create',
      'user:view',
      'user:create',
      'user:update',
      'user:delete'
    ])
    return done()
  })

  it('It should valid `*:view`', (done) => {
    expect(getPermissions(permissions, '*:view')).toStrictEqual(['loanFlow:view', 'user:view'])
    return done()
  })

  it('It should valid `*:view,read`', (done) => {
    expect(getPermissions(permissions, '*:view,create')).toStrictEqual(['loanFlow:view', 'loanFlow:create', 'user:view', 'user:create'])
    return done()
  })

  it('It should valid `[loanFlow:view, loanFlow:review]`', (done) => {
    expect(getPermissions(permissions, ['loanFlow:view', 'loanFlow:review'])).toStrictEqual(['loanFlow:view', 'loanFlow:review'])
    return done()
  })
})

describe('Check Permissions', () => {
  it('It should valid `loanFlow:view`', (done) => {
    expect(check(permissions, 'loanFlow:view')).toBeTruthy()
    return done()
  })
  
  it('It should valid `loanFlow:view,review`', (done) => {
    expect(check(permissions, 'loanFlow:view,review')).toBeTruthy()
    return done()
  })

  it('It should valid `loanFlow:*`', (done) => {
    expect(check(permissions, 'loanFlow:*')).toBeTruthy()
    return done()
  })

  it('It should valid `*:*`', (done) => {
    expect(check(permissions, '*:*')).toBeTruthy()
    return done()
  })

  it('It should valid `*:view`', (done) => {
    expect(check(permissions, '*:view')).toBeTruthy()
    return done()
  })

  it('It should valid `*:view,read`', (done) => {
    expect(check(permissions, '*:view,create')).toBeTruthy()
    return done()
  })

  it('It should valid `*:*,read`', (done) => {
    expect(check(permissions, '*:*,create')).toBeFalsy()
    return done()
  })

  it('It should valid `[loanFlow:view, loanFlow:review]`', (done) => {
    expect(check(permissions, ['loanFlow:view', 'loanFlow:review'])).toBeTruthy()
    return done()
  })
})
