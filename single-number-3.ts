// 260. Single Number 3
function singleNumber(nums: number[]): number[] {
    let singlesOnly = new Set<number>();
    for (const value of nums) {
        if (singlesOnly.has(value)) singlesOnly.delete(value);
        else singlesOnly.add(value);
    }
    let returnValues: number[] = [];
    singlesOnly.forEach(value => {
        returnValues.push(value);
    });
    return returnValues;
}
console.log(singleNumber([1,2,1,2,3,3,4,5,6,6,7,7,8,4]));