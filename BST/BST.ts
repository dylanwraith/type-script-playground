class TreeNode {
    left: TreeNode;
    right: TreeNode;
    value: number;
    constructor(value: number) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

class Tree {
    root: TreeNode = null;
    public insert(value: number) {
        if (this.root === null) {
            const root: TreeNode = new TreeNode(value);
            this.root = root;
        }
        else
            this.recursInsert(this.root, value);
    }
    private recursInsert(root: TreeNode, value: number) {
        try {
            if (value <= root.value) {
                if (root.left === null) {
                    const newNode: TreeNode = new TreeNode(value);
                    root.left = newNode;
                }
                else
                    this.recursInsert(root.left, value);
            }
            else {
                if (root.right === null) {
                    const newNode: TreeNode = new TreeNode(value);
                    root.right = newNode;
                }
                else
                    this.recursInsert(root.right, value);
            }
        }
        catch(ex) {
            console.log('Failed to Insert: ' + ex);
        }
    }
    public delete(value: number) {
        if (this.root !== null) {
            if (this.root.value === value)
                this.deleteRoot();
            else
                this.recursDelete(this.root, value);
        }
        else
            console.log('Failed to Delete: Empty Tree');
    }
    private deleteRoot() {
        if (this.root.left === null && this.root.right === null)
            this.root = null;
        else if (this.root.right === null) {
            this.root = this.root.left;
        }
        else if (this.root.left === null)
            this.root = this.root.right;
        else {
            let nextInorder = this.findNextInorder(this.root);
            let parent = this.findParent(this.root, nextInorder);
            if (parent === this.root)
                this.root.right = null;
            else if (nextInorder.right === null)
                parent.left = null;
            else
                parent.left = nextInorder.right;
            this.root.value = nextInorder.value;
        }
    }
    private recursDelete(root: TreeNode, value: number) {
        let node = this.findNode(root, value);
        if (node !== null) {
            // No children
            if (node.left === null && node.right === null) {
                let parent = this.findParent(root, node);
                if (parent.left === node)
                    parent.left = null;
                else
                    parent.right = null;
            }
            // Has left child
            else if (node.right === null) {
                let parent = this.findParent(root, node);
                if (parent.left === node)
                    parent.left = node.left;
                else
                    parent.right = node.left;
            }
            // Has right child
            else if (node.left === null) {
                let parent = this.findParent(root, node);
                if (parent.left === node)
                    parent.left = node.right;
                else
                    parent.right = node.right;
            }
            // Has two children
            else {
                let nextInorder = this.findNextInorder(node);
                let parent = this.findParent(node, nextInorder);
                if (parent === node)
                    node.right = null;
                else if (nextInorder.right === null)
                    parent.left = null;
                else
                    parent.left = nextInorder.right;
                node.value = nextInorder.value;
            }
        }
        else
            console.log('Failed to Delete: Value does not exist');
    }
    private findNode(root: TreeNode, value: number): TreeNode {
        if (root.value === value)
            return root;
        else if (value < root.value) {
            if (root.left !== null)
                return this.findNode(root.left, value);
            else
                return null;
        }
        else {
            if (root.right !== null)
                return this.findNode(root.right, value);
            else
                return null;
        }
    }
    private findParent(currentNode: TreeNode, target: TreeNode) {
        if (target.value < currentNode.value) {
            if (currentNode.left.value === target.value)
                return currentNode;
            else
                return this.findParent(currentNode.left, target);
        }
        else {
            if (currentNode.right.value === target.value)
                return currentNode;
            else
                return this.findParent(currentNode.right, target);
        }
    }
    private findNextInorder(currentNode: TreeNode) {
        let next = currentNode.right;
        while (next.left !== null)
            next = next.left;
        return next;
    }
    public display() {
        if (this.root !== null)
            this.recursDisplay(this.root);
        else
            console.log('Failed to Display: Empty Tree');
    }
    private recursDisplay(root: TreeNode) {
        if (root.left !== null)
            this.recursDisplay(root.left);
        console.log(root.value);
        if (root.right !== null)
            this.recursDisplay(root.right);
    }
}

let treeTest: Tree = new Tree();
treeTest.insert(100);
treeTest.insert(130);
treeTest.insert(30);
treeTest.insert(10);
treeTest.insert(50);
treeTest.insert(110);
treeTest.insert(150);
// treeTest.delete(100);
// treeTest.delete(130);
// treeTest.delete(150);
// treeTest.delete(110);
// treeTest.delete(30);
// treeTest.delete(10);
// treeTest.delete(50);
treeTest.display();