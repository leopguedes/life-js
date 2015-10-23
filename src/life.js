var roundInterval = 250,
    tilesOnX = 50,
    tilesOnY = 50,
    mapWidth = 500,
    mapHeight = 500,
    tileWidth = mapWidth / tilesOnX,
    tileHeight = mapHeight / tilesOnY;

var svgMap = d3.select('svg#gameMap')
    .attr('width', mapWidth)
    .attr('height', mapHeight);

var lifeMap = new Map();
lifeMap.Cell = function(map) {
    this.map = map;
    this.status = Math.floor(Math.random() * 2);
    this.nextStatus = this.status;
    this.rect = null;
};
lifeMap.initialize(tilesOnX, tilesOnY);
lifeMap.forEachCell(createRectangle);
lifeMap.forEachCell(showStatus);

setInterval(nextRound.bind(null, lifeMap), roundInterval);

function nextRound(map) {
    map.forEachCell(applyLifeRules);
    map.forEachCell(nextStatus);
    map.forEachCell(showStatus);
}

function applyLifeRules(cell, x, y) {
    var status = cell.status;
    var neightbors = cell.map.getNeightborhood(x, y, 1);
    var aliveNeightbors = neightbors.reduce(function (a, n) {
        return a + n.cell.status;
    }, 0);
    cell.nextStatus = status;
    if (status === 0) {
        if (aliveNeightbors === 3) {
            cell.nextStatus = 1;
        }
    } else {
        if (aliveNeightbors < 2 || aliveNeightbors > 3) {
            cell.nextStatus = 0;
        }
    }
}

function createRectangle(cell, x, y) {
    cell.rect = svgMap.append('rect')
        .attr('x', x * tileWidth)
        .attr('y', y * tileHeight)
        .attr('width', tileWidth)
        .attr('height', tileHeight)
        .attr('stroke-width', '1px')
        .attr('stroke', '#EEEEEE')
        .attr('fill', 'white');
}

function nextStatus(cell) {
    cell.status = cell.nextStatus;
}

function showStatus(cell) {
    cell.rect.attr('fill', (cell.status === 1 ? 'black' : 'white'));
}

