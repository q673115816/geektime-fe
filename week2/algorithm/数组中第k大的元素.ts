/*
 * @lc app=leetcode.cn id=215 lang=typescript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
function findKthLargest(nums: number[], k: number): number {
    let temp = -Infinity
    const list = [temp]
    for(const num of nums) {
        if(num > temp) {
            temp = num
            list.unshift(num)
        } else {
            list.push(num);
        }
    }

}
// @lc code=end
