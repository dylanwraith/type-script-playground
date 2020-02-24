// // Make a method that receives a graph, source, and destination, then outputs the path needed for the shortest trip along with the total cost
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
        cost: 3
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

class TripData {
    source: string;
    cost: number;
}

class Coordinate {
    destination: string;
    cost: number;
}

function findShortestPath(graph: Graph[], source: string, destination: string): ShortestPath {
    // destinationCosts[Destination] => (Cost)
    let shortestPaths = new Map<string, number>();
    // tripData[Destination] => (Source, Cost)
    let tripData = new Map<string, TripData>();
    // set of all checked sources
    let checkedSources = new Set<string>();
    // coordinates[Source] = ([Destination, Cost])
    let coordinates = new Map<string, Coordinate[]>();
    // set initial values of maps
    shortestPaths.set(source, 0);
    const initialTripData = {
        source: source,
        cost: 0
    };
    tripData.set(source, initialTripData);
    // read data from graph into map
    for (const coordinate of graph) {
        // create new coordinate
        const newCoordinate: Coordinate = {
            destination: coordinate.end,
            cost: coordinate.cost
        };
        // if source has not been seen, add to destination costs map and add coordinate to new list in map
        if (!checkedSources.has(coordinate.start)) {
            if (coordinate.start !== source)
                shortestPaths.set(coordinate.start, null);
            coordinates.set(coordinate.start, [newCoordinate]);
            checkedSources.add(coordinate.start);
        }
        // else add coordinate to existing list in coordinate map
        else {
            const existingCoordinates = coordinates.get(coordinate.start);
            existingCoordinates.push(newCoordinate);
            coordinates.set(coordinate.start, existingCoordinates);
        }
    }
    return dijkstra(coordinates, source, destination, source, checkedSources, shortestPaths, tripData);
}

function dijkstra(coordinates: Map<string, Coordinate[]>, source: string, destination: string, currentSource: string, checkedSources: Set<string>,
    shortestPaths: Map<string, number>, tripData: Map<string, TripData>): ShortestPath {
        if (currentSource === destination) {
            let current = destination;
            let dijkstraPath: ShortestPath = new ShortestPath();
            dijkstraPath.cost = shortestPaths.get(destination);
            dijkstraPath.shortestPath = [];
            while (current !== source) {
                let graph: Graph = new Graph();
                graph.end = current;
                graph.start = tripData.get(current).source;
                graph.cost = tripData.get(current).cost - tripData.get(graph.start).cost;
                dijkstraPath.shortestPath.push(graph);
                current = tripData.get(current).source;
            }
            dijkstraPath.shortestPath.reverse();
            return dijkstraPath;
        }
        // check all coordinates leaving current source, looking for new shortest paths
        for (const coordinate of coordinates.get(currentSource)) {
            const currentShortestPath = shortestPaths.get(coordinate.destination);
            const newShortestPath = shortestPaths.get(currentSource) + coordinate.cost;
            if (currentShortestPath === null || newShortestPath < currentShortestPath) {
                const tripDataEntry: TripData = {
                    source: currentSource,
                    cost: newShortestPath
                };
                shortestPaths.set(coordinate.destination, newShortestPath);
                tripData.set(coordinate.destination, tripDataEntry);
            }
        }
        // console.log('trip data = ');
        // console.log(tripData);
        checkedSources.delete(currentSource);
        let min = null;
        let nextSource = null;
        checkedSources.forEach(newSource => {
            const sourceMin = shortestPaths.get(newSource);
            if ((min == null || min > sourceMin) && sourceMin !== null) {
                min = sourceMin;
                nextSource = newSource;
            }
        })
        return dijkstra(coordinates, source, destination, nextSource, checkedSources, shortestPaths, tripData);
}

console.log(findShortestPath(sampleGraph, 'C', 'F'));
