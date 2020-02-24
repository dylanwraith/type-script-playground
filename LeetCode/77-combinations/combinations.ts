function combine(n: number, k: number): number[][] {
    const returnArray: number[][] = [];
    let firstValue = 1;
    while (firstValue <= n - k) {
        let lastValue = firstValue + k;
        while (lastValue <= n) {
            const entry: number[] = [];
            entry.push(firstValue);
            for (let i = 1; i < k; i++) {
                entry.push(firstValue + i);
            }
            entry.push(lastValue);
            returnArray.push(entry);
            lastValue++;
        }
        firstValue++;
    }
    return returnArray;
}
console.log(combine(4, 2));