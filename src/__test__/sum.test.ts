test('get sum', () => {
  function sum(a: number, b: number) {
    return a + b
  }

  expect(sum(1, 2)).toBe(3)
})
