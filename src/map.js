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
        for (var x = 0; x < mapWidth; x++) {
            cellsArray[x] = [];
            for (var y = 0; y < mapHeight; y++) {
                cellsArray[x][y] = new this.Cell(this);
            }
        }
    };

    Map.prototype.forEachCell = function(fn) {
        cellsArray.forEach(function(row, x) {
            row.forEach(function(cell, y) {
                fn(cell, x, y);
            });
        });
    };

    Map.prototype.getCellAt = function(x, y) {
        return cellsArray[x][y];
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

    return Map;
})();