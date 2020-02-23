// Make a method that receives a graph, source, and destination, then outputs the path needed for the shortest trip along with the total cost

class Graph {
    start: string = ''
    end: string = '';
    cost: number = null;
}

class ShortestPath {
    shortestPath: Graph[];
    cost: number;
}

const sampleGraph: Graph[] = [
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

const sampleShortestPath: ShortestPath = {
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
}

// Beginning of solution

class DestinationCost {
    destiantion: string;
    cost: number;
}

class SourceCost {
    source: string;
    cost: number;
}

function findShortestPath(graph: Graph[], source: string, destination: string): ShortestPath {
    let destinationCosts = new Map<string, DestinationCost[]>();
    let shortestPathMap = new Map<string, SourceCost>();
    let checkedSources = new Set<string>();
    // Initialize maps and set for algorithm
    const startingPoint: SourceCost = {
        source: source,
        cost: 0
    };
    shortestPathMap.set(source, startingPoint);
    for (const coordinate of graph) {
        const destinationCost: DestinationCost = {
            destiantion: coordinate.end,
            cost: coordinate.cost
        };
        if (shortestPathMap.has(coordinate.start)) {
            const destinationCostList: DestinationCost[] = destinationCosts.get(coordinate.start);
            destinationCostList.push(destinationCost);
            destinationCosts.set(coordinate.start, destinationCostList);
        }
        else {
            const destinationCostList: DestinationCost[] = [destinationCost];
            destinationCosts.set(coordinate.start, destinationCostList);
            shortestPathMap.set(coordinate.start, null);
        }
    }
    // Perform dijkstra's algorithm to find shortest path
    return dijkstra(destinationCosts, shortestPathMap, source, destination, source, checkedSources);
}

function dijkstra(destinationCosts: Map<string, DestinationCost[]>, shortestPathMap: Map<string, SourceCost>, source: string, destination: string, current: string, checkedSources: Set<string>): ShortestPath {
    const currentCost: number = shortestPathMap.get(current).cost;
    // Check all outsources of current node, updating map for new shortest paths accordingly
    for (const sourceDest of destinationCosts.get(current)) {
        const currentShortestPath = shortestPathMap.get(sourceDest.destiantion).cost;
        const newShortestPath = currentCost + sourceDest.cost;
        if (newShortestPath < currentShortestPath || currentShortestPath === null) {
            const sourceCost: SourceCost = {
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
        const lowestCost = null;
        let nextSource = null;
        // O(n) time complexity, might be possible to improve using min-heap
        for (const key in shortestPathMap) {
            if (!checkedSources.has(key)) {
                const keyCost = shortestPathMap.get(key);
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