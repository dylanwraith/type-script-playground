var MinHeap = /** @class */ (function () {
    function MinHeap(vals) {
        this.heap = [];
        this.heap = vals;
        this.createHeap();
    }
    MinHeap.prototype.peek = function () {
        return this.heap[0];
    };
    MinHeap.prototype.poll = function () {
        var min = this.heap[0];
        this.swapNodes(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown();
        return min;
    };
    MinHeap.prototype.add = function (val) {
        this.heap.push(val);
        this.heapifyUp();
    };
    MinHeap.prototype.heapifyDown = function () {
        var i = 0;
        while (i < Math.floor(this.heap.length / 2)) {
            if (this.hasLeftChild(i) && this.hasRightChild(i)) {
                var leftChild = this.heap[this.leftChildIndex(i)];
                var rightChild = this.heap[this.rightChildIndex(i)];
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
                else
                    break;
            }
            else {
                var leftChild = this.heap[this.leftChildIndex(i)];
                if (Math.min(this.heap[i], leftChild) !== this.heap[i]) {
                    this.swapNodes(i, this.leftChildIndex(i));
                    i = i * 2 + 1;
                }
                else
                    break;
            }
        }
    };
    MinHeap.prototype.heapifyUp = function () {
        var i = this.heap.length - 1;
        while (i > 0) {
            var parentIndex = Math.ceil(i / 2) - 1;
            if (this.heap[i] < this.heap[parentIndex]) {
                this.swapNodes(i, parentIndex);
                i = parentIndex;
            }
            else
                break;
        }
    };
    MinHeap.prototype.createHeap = function () {
        // Only check nodes with children, swapping values with smallest children
        for (var i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            var leftChild = this.heap[this.leftChildIndex(i)];
            var rightChild = this.heap[this.rightChildIndex(i)];
            // If one of the children is smaller than the parent
            if (Math.min(this.heap[i], leftChild, rightChild) !== this.heap[i]) {
                // Swap parent with smallest child
                if (leftChild <= rightChild || !this.hasRightChild(i))
                    this.swapNodes(i, this.leftChildIndex(i));
                else
                    this.swapNodes(i, this.rightChildIndex(i));
            }
        }
    };
    MinHeap.prototype.swapNodes = function (index1, index2) {
        var temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    };
    MinHeap.prototype.leftChildIndex = function (index) {
        return index * 2 + 1;
    };
    MinHeap.prototype.rightChildIndex = function (index) {
        return index * 2 + 2;
    };
    MinHeap.prototype.hasLeftChild = function (index) {
        return index * 2 + 1 < this.heap.length;
    };
    MinHeap.prototype.hasRightChild = function (index) {
        return index * 2 + 2 < this.heap.length;
    };
    MinHeap.prototype.getLength = function () {
        return this.heap.length;
    };
    return MinHeap;
}());
var testHeap = new MinHeap([2, 7, 3, 4, 5, 8, 1, 12]);
console.log('length = ' + testHeap.getLength());
console.log('min = ' + testHeap.poll());
console.log('length = ' + testHeap.getLength());
testHeap.add(11);
console.log('length = ' + testHeap.getLength());
testHeap.add(1);
console.log('length = ' + testHeap.getLength());
