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
    this.forceStatus = false;
    this.rect = null;
};
lifeMap.initialize(tilesOnX, tilesOnY);
lifeMap.forEachCell(createRectangle);
lifeMap.forEachCell(showStatus);

var interval = setInterval(nextRound.bind(null, lifeMap), roundInterval);

function nextRound(map) {
    map.forEachCell(applyLifeRules);
    map.forEachCell(nextStatus);
    map.forEachCell(showStatus);
}

function createRectangle(cell, x, y) {
    cell.rect = svgMap.append('rect')
        .attr('x', x * tileWidth)
        .attr('y', y * tileHeight)
        .attr('width', tileWidth)
        .attr('height', tileHeight)
        .attr('stroke-width', '1px')
        .attr('stroke', '#EEEEEE')
        .attr('fill', 'white')
        .on('click', function() {
            cell.forceStatus = 1;
            cell.rect.attr('fill', 'black');
        })
        .on('dblclick', function() {
            if (interval !== false) {
                clearInterval(interval);
                interval = false;
            } else {
                interval = setInterval(nextRound.bind(null, lifeMap), roundInterval);
            }
        });
}

function nextStatus(cell) {
    if (cell.forceStatus !== false) {
        cell.status = cell.forceStatus;
        cell.forceStatus = false;
    } else {
        cell.status = cell.nextStatus;
    }
}

function showStatus(cell) {
    cell.rect.attr('fill', (cell.status === 1 ? 'black' : 'white'));
}

