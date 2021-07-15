import CustomNumber from './index'

test('trans 63 to β', () => {
    expect(CustomNumber(63, 64)).toBe('β.0')
})