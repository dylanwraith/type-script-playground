class MinHeap {
    private heap: number[] = [];
    constructor(vals: number[]) {
        this.heap = vals;
        this.createHeap();
    }
    public peek(): number { 
        return this.heap[0];
    }
    public poll(): number {
        const min = this.heap[0];
        this.swapNodes(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown();
        return min;
    }
    public add(val: number): void {
        this.heap.push(val);
        this.heapifyUp();
    }
    private heapifyDown(): void {
        let i = 0;
        while (i <  Math.floor(this.heap.length / 2)) {
            if (this.hasLeftChild(i) && this.hasRightChild(i)) {
                const leftChild = this.heap[this.leftChildIndex(i)];
                const rightChild = this.heap[this.rightChildIndex(i)];
                if (Math.min(this.heap[i], leftChild, rightChild) !== this.heap[i]) {
                    if (leftChild <= rightChild || !this.hasRightChild(i)) {
                        this.swapNodes(i, this.leftChildIndex(i));
                        i = i * 2 + 1;
                    }
                    else {
                        this.swapNodes(i, this.rightChildIndex(i));
                        i = i * 2 + 2;
                    }
                }
                else break;
            }
            else {
                const leftChild = this.heap[this.leftChildIndex(i)];
                if (Math.min(this.heap[i], leftChild) !== this.heap[i]) {
                    this.swapNodes(i, this.leftChildIndex(i));
                    i = i * 2 + 1;
                }
                else break;
            }
        }
    }
    private heapifyUp() {
        let i = this.heap.length - 1;
        while (i > 0) {
            const parentIndex = Math.ceil(i / 2) - 1;
            if (this.heap[i] < this.heap[parentIndex]) {
                this.swapNodes(i, parentIndex);
                i = parentIndex;
            }
            else break;
        }
    }
    private createHeap(): void {
        // Only check nodes with children, swapping values with smallest children
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            const leftChild = this.heap[this.leftChildIndex(i)];
            const rightChild = this.heap[this.rightChildIndex(i)];
            // If one of the children is smaller than the parent
            if (Math.min(this.heap[i], leftChild, rightChild) !== this.heap[i]) {
                // Swap parent with smallest child
                if (leftChild <= rightChild || !this.hasRightChild(i))
                    this.swapNodes(i, this.leftChildIndex(i));
                else
                    this.swapNodes(i, this.rightChildIndex(i));
            }
        }
    }
    private swapNodes(index1: number, index2: number): void {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }
    private leftChildIndex(index: number): number {
        return index * 2 + 1;
    }
    private rightChildIndex(index: number): number {
        return index * 2 + 2;
    }
    private hasLeftChild(index: number): boolean {
        return index * 2 + 1 < this.heap.length;
    }
    private hasRightChild(index: number): boolean {
        return index * 2 + 2 < this.heap.length;
    }
    public getLength(): number {
        return this.heap.length;
    }
}

let testHeap = new MinHeap([2, 7, 3, 4, 5, 8, 1, 12]);
console.log('length = ' + testHeap.getLength());
console.log('min = ' + testHeap.poll());
console.log('length = ' + testHeap.getLength());
testHeap.add(11);
console.log('length = ' + testHeap.getLength());
testHeap.add(1);
console.log('length = ' + testHeap.getLength());