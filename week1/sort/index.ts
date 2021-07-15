const arr = Array.from({length: 10000}, () => Math.random() * 10000 >> 0)

function quickSort(nums: number[]) {
    return recursive(nums, 0, nums.length - 1)
}

function recursive(arr: number[], left: number, right: number) {
    if (left >= right) return
    const index = partition(arr, left, right)
    recursive(arr, left, index - 1)
    recursive(arr, index + 1, right)
    return arr
}

function partition(arr: number[], left: number, right: number) {
    let temp = arr[left]
    let start = left + 1
    let end = right
    while (start <= end) {
        while (start <= end && arr[start] < temp) start++
        while (start <= end && arr[end] > temp) end--
        if (start <= end) {
            [arr[start], arr[end]] = [arr[end], arr[start]]
            start++
            end--
        }
    }
    [arr[left], arr[end]] = [arr[end], arr[left]]
    return end
}
console.time('QuickSort')
console.log(quickSort([...arr]));
console.timeEnd('QuickSort')
console.time('ArraySort');
console.log(Array.prototype.sort.call([...arr], (a, b) => a - b));
console.timeEnd('ArraySort')
