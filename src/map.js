var Map = (function() {
    var cellsArray;
    var mapWidth, mapHeight;

    function Map() {

    }

    function Cell() {

    }

    Map.Cell = Cell;

    Map.prototype.initialize = function(width, height) {
        cellsArray = [];
        mapWidth = width;
        mapHeight = height;
        var cellsLength = width * height;
        for (var i = 0; i < cellsLength; i++) {
            cellsArray[i] = new this.Cell(this);
        }
    };

    Map.prototype.forEachCell = function(fn) {
        cellsArray.forEach(function(cell, index) {
            fn(cell, getXFromIndex(index), getYFromIndex(index));
        });
    };

    Map.prototype.getCellAt = function(x, y) {
        return this.getCellAtIndex(getIndexFromXY(x, y));
    };

    Map.prototype.getCellAtIndex = function(index) {
        return cellsArray[index];
    };

    Map.prototype.getNeightborhood = function(fromX, fromY, distance) {
        var neightbors = [];
        for (var iy = fromY - distance; iy <= fromY + distance; iy++) {
            var y = iy;
            if (iy < 0)
                y = mapHeight + iy;
            else if (iy >= mapHeight)
                y = iy - mapHeight;

            for (var ix = fromX - distance; ix <= fromX + distance; ix++) {
                var x = ix;
                if (ix < 0)
                    x = mapWidth + ix;
                else if (ix >= mapWidth)
                    x = ix - mapWidth;

                if (x === fromX && y === fromY)
                    continue;

                neightbors.push({
                    x: x,
                    y: y,
                    cell: this.getCellAt(x, y)
                })
            }
        }
        return neightbors;
    };

    function getXFromIndex(index) {
        return index % mapWidth;
    }

    function getYFromIndex(index) {
        return Math.floor(index / mapWidth);
    }

    function getIndexFromXY(x, y) {
        return (y * mapWidth) + x;
    }

    return Map;
})();