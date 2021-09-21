const add = require('./add')
const foo = require('./foo')
const bar = require('./bar')

jest.mock('./bar.js', () => {
  return jest.fn()
})

test('should 1+1 = 2', () => {
  expect(add(1, 1)).toBe(2)
})

test('foo', () => {
  foo()
  expect(bar).toHaveBeenCalled()
})
