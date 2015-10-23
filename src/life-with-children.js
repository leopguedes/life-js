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
        } else if (aliveNeightbors === 2) {
            cell.nextStatus = (Math.floor(Math.random() * 100) === 50 ? 1 : 0);
        }
    } else {
        if (aliveNeightbors < 2 || aliveNeightbors > 3) {
            cell.nextStatus = 0;
        }
    }
}