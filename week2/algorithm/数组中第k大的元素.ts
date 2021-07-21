/*
 * @lc app=leetcode.cn id=215 lang=typescript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
function findKthLargest(nums: number[], k: number): number {
  const heap = new MinHeap<number>(defaultCompare, k);
  for (const num of nums) {
    heap.insert(num);
  }
  return heap.findMinimum();
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};

function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

type ICompareFunction<T> = (a: T, b: T) => number;

function swap(array, a, b) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}

class MinHeap<T> {
  protected heap: T[] = [];

  constructor(
    protected compareFn: ICompareFunction<T> = defaultCompare,
    protected length: number
  ) {}

  private getLeftIndex(index: number) {
    return 2 * index + 1;
  }

  private getRightIndex(index: number) {
    return 2 * index + 2;
  }

  private getParentIndex(index: number) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() <= 0;
  }

  clear() {
    this.heap = [];
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  insert(value: T) {
    if (value === null) return false;
    const index = this.heap.length;
    this.heap.push(value);
    this.siftUp(index);
    return true;
  }

  private siftDown(index: number) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();

    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) ===
        Compare.BIGGER_THAN
    ) {
      element = left;
    }

    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) ===
        Compare.BIGGER_THAN
    ) {
      element = right;
    }

    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }

  private siftUp(index: number): void {
    let parent = this.getParentIndex(index);
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) ===
        Compare.BIGGER_THAN
    ) {
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }

  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.siftDown(0);
    return removedValue;
  }

  heapify(array: T[]) {
    if (array) {
      this.heap = array;
    }

    const maxIndex = Math.floor(this.size() / 2) - 1;

    for (let i = 0; i <= maxIndex; i++) {
      this.siftDown(i);
    }

    return this.heap;
  }

  getAsArray() {
    return this.heap;
  }
}
// @lc code=end
