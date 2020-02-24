// // Make a method that receives a graph, source, and destination, then outputs the path needed for the shortest trip along with the total cost
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
var TripData = /** @class */ (function () {
    function TripData() {
    }
    return TripData;
}());
var Coordinate = /** @class */ (function () {
    function Coordinate() {
    }
    return Coordinate;
}());
function findShortestPath(graph, source, destination) {
    // destinationCosts[Destination] => (Cost)
    var shortestPaths = new Map();
    // tripData[Destination] => (Source, Cost)
    var tripData = new Map();
    // set of all checked sources
    var checkedSources = new Set();
    // coordinates[Source] = ([Destination, Cost])
    var coordinates = new Map();
    // set initial values of maps
    shortestPaths.set(source, 0);
    var initialTripData = {
        source: source,
        cost: 0
    };
    tripData.set(source, initialTripData);
    // read data from graph into map
    for (var _i = 0, graph_1 = graph; _i < graph_1.length; _i++) {
        var coordinate = graph_1[_i];
        // create new coordinate
        var newCoordinate = {
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
            var existingCoordinates = coordinates.get(coordinate.start);
            existingCoordinates.push(newCoordinate);
            coordinates.set(coordinate.start, existingCoordinates);
        }
    }
    return dijkstra(coordinates, source, destination, source, checkedSources, shortestPaths, tripData);
}
function dijkstra(coordinates, source, destination, currentSource, checkedSources, shortestPaths, tripData) {
    if (currentSource === destination) {
        var current = destination;
        var dijkstraPath = new ShortestPath();
        dijkstraPath.cost = shortestPaths.get(destination);
        dijkstraPath.shortestPath = [];
        while (current !== source) {
            var graph = new Graph();
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
    for (var _i = 0, _a = coordinates.get(currentSource); _i < _a.length; _i++) {
        var coordinate = _a[_i];
        var currentShortestPath = shortestPaths.get(coordinate.destination);
        var newShortestPath = shortestPaths.get(currentSource) + coordinate.cost;
        if (currentShortestPath === null || newShortestPath < currentShortestPath) {
            var tripDataEntry = {
                source: currentSource,
                cost: newShortestPath
            };
            shortestPaths.set(coordinate.destination, newShortestPath);
            tripData.set(coordinate.destination, tripDataEntry);
        }
    }
    // console.log('trip data = ');
    // console.log(tripData);
    checkedSources["delete"](currentSource);
    var min = null;
    var nextSource = null;
    checkedSources.forEach(function (newSource) {
        var sourceMin = shortestPaths.get(newSource);
        if ((min == null || min > sourceMin) && sourceMin !== null) {
            min = sourceMin;
            nextSource = newSource;
        }
    });
    return dijkstra(coordinates, source, destination, nextSource, checkedSources, shortestPaths, tripData);
}
console.log(findShortestPath(sampleGraph, 'C', 'F'));
