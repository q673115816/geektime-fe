// import process from 'node:process'
// const argv = process.argv
// const [, , num, notation] = argv
const hash = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",

    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    
    "α", 'β'
]

type iProps = number | string

const bitChange = (entry: iProps, flag: iProps): string => {
    entry = String(Number.parseFloat(String(entry)))
    flag = Number(flag) || 2
    const [int, float] = entry.split('.')

    return bitInt(int, flag) + '.' + bitFloat(float, flag)
}

const bitInt = (str: iProps, flag = 2) => {
    let result = ''
    let num = Number(str)
    
    while(num > 0) {
        result = hash[num % flag] + result
        num /= flag
        num >>= 0
    }
    return result || '0'
}

const bitFloat = (str: iProps, flag = 2) => {
    let result = ''
    let num = Number(`0.${str}`)
    let len = 52
    while(num > 0 && len > 0) {
        const carry = Number.parseInt(String(num * flag))
        result += hash[carry]
        num *= flag
        num -= carry
        len--
    }
    return result || '0'
}

export default bitChange

// console.log(bitChange(num, notation));
