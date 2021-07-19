/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function reverseList(head: ListNode | null): ListNode | null {
    // let prev = null
    // let next = head
    // while(next) {
    //     const temp = next.next
    //     next.next = prev
    //     prev = next
    //     next = temp
    // }
    // return prev
    if(!head || !head.next) return head
    const next = reverseList(head.next)
    head.next.next = head
    head.next = null
    return next
}
// @lc code=end
