document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const size = 50; // Size of the grid
    let cells = [];
    let intervalId;

    function createGrid() {
        grid.innerHTML = '';
        cells = [];

        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () => toggleCell(cell));
            grid.appendChild(cell);
            cells.push(cell);
        }
    }

    function toggleCell(cell) {
        cell.classList.toggle('alive');
    }

    function getNextGeneration() {
        const newCells = cells.map(cell => cell.classList.contains('alive'));
        const nextGeneration = newCells.slice();

        for (let i = 0; i < size * size; i++) {
            const isAlive = newCells[i];
            const neighbors = getNeighbors(i);

            const liveNeighbors = neighbors.filter(index => newCells[index]).length;

            if (isAlive) {
                nextGeneration[i] = liveNeighbors === 2 || liveNeighbors === 3;
            } else {
                nextGeneration[i] = liveNeighbors === 3;
            }
        }

        cells.forEach((cell, index) => {
            cell.classList.toggle('alive', nextGeneration[index]);
        });
    }

    function getNeighbors(index) {
        const row = Math.floor(index / size);
        const col = index % size;
        const neighbors = [];

        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if ((r !== row || c !== col) && r >= 0 && r < size && c >= 0 && c < size) {
                    neighbors.push(r * size + c);
                }
            }
        }

        return neighbors;
    }

    function startGame() {
        if (!intervalId) {
            intervalId = setInterval(getNextGeneration, 100);
        }
    }

    function stopGame() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function clearGrid() {
        cells.forEach(cell => cell.classList.remove('alive'));
    }

    function randomizeGrid() {
        cells.forEach(cell => {
            if (Math.random() < 0.5) {
                cell.classList.add('alive');
            } else {
                cell.classList.remove('alive');
            }
        });
    }

    document.getElementById('start').addEventListener('click', startGame);
    document.getElementById('stop').addEventListener('click', stopGame);
    document.getElementById('clear').addEventListener('click', clearGrid);
    document.getElementById('random').addEventListener('click', randomizeGrid);

    createGrid();
});
