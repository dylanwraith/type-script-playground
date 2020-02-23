var Graph = /** @class */ (function () {
    function Graph() {
        this.start = '';
        this.end = '';
        this.cost = null;
    }
    return Graph;
}());
var ShortestPath = /** @class */ (function () {
    function ShortestPath() {
    }
    return ShortestPath;
}());
var sampleGraph = [
    {
        start: 'C',
        end: 'B',
        cost: 1
    },
    {
        start: 'C',
        end: 'D',
        cost: 2
    },
    {
        start: 'C',
        end: 'F',
        cost: 6
    },
    {
        start: 'B',
        end: 'C',
        cost: 2
    },
    {
        start: 'B',
        end: 'D',
        cost: 1
    },
    {
        start: 'B',
        end: 'A',
        cost: 1
    },
    {
        start: 'A',
        end: 'E',
        cost: 1
    },
    {
        start: 'D',
        end: 'B',
        cost: 4
    },
    {
        start: 'D',
        end: 'A',
        cost: 1
    },
    {
        start: 'D',
        end: 'F',
        cost: 5
    },
    {
        start: 'D',
        end: 'B',
        cost: 4
    },
    {
        start: 'E',
        end: 'A',
        cost: 2
    },
    {
        start: 'E',
        end: 'D',
        cost: 7
    },
    {
        start: 'E',
        end: 'F',
        cost: 1
    },
    {
        start: 'F',
        end: 'E',
        cost: 3
    }
];
var sampleShortestPath = {
    shortestPath: [
        {
            start: 'C',
            end: 'B',
            cost: 1
        },
        {
            start: 'B',
            end: 'D',
            cost: 1
        },
        {
            start: 'D',
            end: 'A',
            cost: 1
        },
        {
            start: 'A',
            end: 'E',
            cost: 1
        },
        {
            start: 'E',
            end: 'F',
            cost: 1
        }
    ],
    cost: 5
};
// Beginning of solution
var DestinationCost = /** @class */ (function () {
    function DestinationCost() {
    }
    return DestinationCost;
}());
var SourceCost = /** @class */ (function () {
    function SourceCost() {
    }
    return SourceCost;
}());
function findShortestPath(graph, source, destination) {
    var destinationCosts = new Map();
    var shortestPathMap = new Map();
    var checkedSources = new Set();
    // Initialize maps and set for algorithm
    var startingPoint = {
        source: source,
        cost: 0
    };
    shortestPathMap.set(source, startingPoint);
    for (var _i = 0, graph_1 = graph; _i < graph_1.length; _i++) {
        var coordinate = graph_1[_i];
        var destinationCost = {
            destiantion: coordinate.end,
            cost: coordinate.cost
        };
        if (shortestPathMap.has(coordinate.start)) {
            var destinationCostList = destinationCosts.get(coordinate.start);
            destinationCostList.push(destinationCost);
            destinationCosts.set(coordinate.start, destinationCostList);
        }
        else {
            var destinationCostList = [destinationCost];
            destinationCosts.set(coordinate.start, destinationCostList);
            shortestPathMap.set(coordinate.start, null);
        }
    }
    // Perform dijkstra's algorithm to find shortest path
    return dijkstra(destinationCosts, shortestPathMap, source, destination, source, checkedSources);
}
function dijkstra(destinationCosts, shortestPathMap, source, destination, current, checkedSources) {
    var currentCost = shortestPathMap.get(current).cost;
    // Check all outsources of current node, updating map for new shortest paths accordingly
    for (var _i = 0, _a = destinationCosts.get(current); _i < _a.length; _i++) {
        var sourceDest = _a[_i];
        var currentShortestPath = shortestPathMap.get(sourceDest.destiantion).cost;
        var newShortestPath = currentCost + sourceDest.cost;
        if (newShortestPath < currentShortestPath || currentShortestPath === null) {
            var sourceCost = {
                source: current,
                cost: newShortestPath
            };
            shortestPathMap.set(sourceDest.destiantion, sourceCost);
        }
    }
    // Set source as checked
    checkedSources.add(current);
    // If all sources have been checked, return shortest path
    if (checkedSources.values === shortestPathMap.keys) {
        console.log('finished');
    }
    // Otherwise check the source with the smallest associated cost
    else {
        var lowestCost = null;
        var nextSource = null;
        // O(n) time complexity, might be possible to improve using min-heap
        for (var key in shortestPathMap) {
            if (!checkedSources.has(key)) {
                var keyCost = shortestPathMap.get(key);
                if (keyCost !== null) {
                    if (lowestCost == null || keyCost < lowestCost) {
                        nextSource = key;
                    }
                }
            }
        }
        return dijkstra(destinationCosts, shortestPathMap, source, destination, nextSource, checkedSources);
    }
}
findShortestPath(sampleGraph, 'C', 'F');
