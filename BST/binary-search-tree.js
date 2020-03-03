var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
    return TreeNode;
}());
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = null;
    }
    Tree.prototype.insert = function (value) {
        if (this.root === null) {
            var root = new TreeNode(value);
            this.root = root;
        }
        else
            this.recursInsert(this.root, value);
    };
    Tree.prototype.recursInsert = function (root, value) {
        try {
            if (value <= root.value) {
                if (root.left === null) {
                    var newNode = new TreeNode(value);
                    root.left = newNode;
                }
                else
                    this.recursInsert(root.left, value);
            }
            else {
                if (root.right === null) {
                    var newNode = new TreeNode(value);
                    root.right = newNode;
                }
                else
                    this.recursInsert(root.right, value);
            }
        }
        catch (ex) {
            console.log('Failed to Insert: ' + ex);
        }
    };
    Tree.prototype["delete"] = function (value) {
        if (this.root !== null) {
            if (this.root.value === value)
                this.deleteRoot();
            else
                this.recursDelete(this.root, value);
        }
        else
            console.log('Failed to Delete: Empty Tree');
    };
    Tree.prototype.deleteRoot = function () {
        if (this.root.left === null && this.root.right === null)
            this.root = null;
        else if (this.root.right === null) {
            this.root = this.root.left;
        }
        else if (this.root.left === null)
            this.root = this.root.right;
        else {
            var nextInorder = this.findNextInorder(this.root);
            var parent_1 = this.findParent(this.root, nextInorder);
            if (parent_1 === this.root)
                this.root.right = null;
            else if (nextInorder.right === null)
                parent_1.left = null;
            else
                parent_1.left = nextInorder.right;
            this.root.value = nextInorder.value;
        }
    };
    Tree.prototype.recursDelete = function (root, value) {
        var node = this.findNode(root, value);
        if (node !== null) {
            // No children
            if (node.left === null && node.right === null) {
                var parent_2 = this.findParent(root, node);
                if (parent_2.left === node)
                    parent_2.left = null;
                else
                    parent_2.right = null;
            }
            // Has left child
            else if (node.right === null) {
                var parent_3 = this.findParent(root, node);
                if (parent_3.left === node)
                    parent_3.left = node.left;
                else
                    parent_3.right = node.left;
            }
            // Has right child
            else if (node.left === null) {
                var parent_4 = this.findParent(root, node);
                if (parent_4.left === node)
                    parent_4.left = node.right;
                else
                    parent_4.right = node.right;
            }
            // Has two children
            else {
                var nextInorder = this.findNextInorder(node);
                var parent_5 = this.findParent(node, nextInorder);
                if (parent_5 === node)
                    node.right = null;
                else if (nextInorder.right === null)
                    parent_5.left = null;
                else
                    parent_5.left = nextInorder.right;
                node.value = nextInorder.value;
            }
        }
        else
            console.log('Failed to Delete: Value does not exist');
    };
    Tree.prototype.findNode = function (root, value) {
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
    };
    Tree.prototype.findParent = function (currentNode, target) {
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
    };
    Tree.prototype.findNextInorder = function (currentNode) {
        var next = currentNode.right;
        while (next.left !== null)
            next = next.left;
        return next;
    };
    Tree.prototype.display = function () {
        if (this.root !== null)
            this.recursDisplay(this.root);
        else
            console.log('Failed to Display: Empty Tree');
    };
    Tree.prototype.recursDisplay = function (root) {
        if (root.left !== null)
            this.recursDisplay(root.left);
        console.log(root.value);
        if (root.right !== null)
            this.recursDisplay(root.right);
    };
    return Tree;
}());
var treeTest = new Tree();
treeTest.insert(100);
treeTest.insert(130);
treeTest.insert(30);
treeTest.insert(10);
treeTest.insert(50);
treeTest.insert(110);
treeTest.insert(150);
treeTest["delete"](100);
treeTest["delete"](130);
treeTest["delete"](150);
treeTest["delete"](110);
treeTest["delete"](30);
treeTest["delete"](10);
treeTest["delete"](50);
treeTest.display();
