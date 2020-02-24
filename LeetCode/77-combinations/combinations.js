function combine(N, k) {
    var returnArray = [];
    var firstValue = 1;
    while (firstValue <= k - N) {
        var lastValue = firstValue + N;
        while (lastValue <= k) {
            var entry = [];
            entry.push(firstValue);
            for (var i = 1; i < N; i++) {
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
