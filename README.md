# Simple Shiro Permissions
It is a simple module based in apache Shiro style.

Ref: Apache shiro: https://shiro.apache.org/permissions.html
For this module only use DOMAIN:ACTION, for more information, go to https://shiro.apache.org/permissions.html#multiple-parts


# Install

```bash
npm install simple-shiro-permissions
```

## How to use

List permissions

```js
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

getPermissions(permissions, 'loanFlow:view')
// Result
// ['loanFlow:view']
check(permissions, 'loanFlow:view')
// Result
// True

getPermissions(permissions, 'loanFlow:view,review')
// Result
// ['loanFlow:view', 'loanFlow:review']
check(permissions, 'loanFlow:view,review')
// Result
// true

getPermissions(permissions, 'loanFlow:*')
// Result
// ['loanFlow:view', 'loanFlow:review', 'loanFlow:create']

getPermissions(permissions, '*:*')
// Result
// [
//   'loanFlow:view',
//   'loanFlow:review',
//   'loanFlow:create',
//   'user:view',
//   'user:create',
//   'user:update',
//   'user:delete'
// ]

getPermissions(permissions, '*:view')
// Result
// ['loanFlow:view', 'user:view']

getPermissions(permissions, '*:view,create')
// Result
// ['loanFlow:view', 'loanFlow:create', 'user:view', 'user:create']

```
