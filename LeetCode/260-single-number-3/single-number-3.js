// 260. Single Number 3
function singleNumber(nums) {
    var singlesOnly = new Set();
    for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
        var value = nums_1[_i];
        if (singlesOnly.has(value))
            singlesOnly["delete"](value);
        else
            singlesOnly.add(value);
    }
    var returnValues = [];
    singlesOnly.forEach(function (value) {
        returnValues.push(value);
    });
    return returnValues;
}
console.log(singleNumber([1, 2, 1, 2, 3, 3, 4, 5, 6, 6, 7, 7, 8, 4]));
