/*let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    const gameArea = document.getElementById('gameArea');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let cellContent = '';
            if (fields[index] === 'circle') {
                cellContent = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                cellContent = generateXSVG();
            }
            tableHTML += `<td id="cell-${index}" onclick="handleCellClick(${index})">${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    gameArea.innerHTML = tableHTML;
}

function generateCircleSVG() {
    const svgHTML = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="#F9262F" stroke-width="5" fill="none">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 188.4" 
                    to="188.4, 188.4" 
                    dur="0.2s" 
                    fill="freeze" />
            </circle>
        </svg>
    `;
    return svgHTML;
}

function generateXSVG() {
    const svgHTML = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#B10FFF" stroke-width="5">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 70.71" 
                    to="70.71, 70.71" 
                    dur="0.2s" 
                    fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#B10FFF" stroke-width="5">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 70.71" 
                    to="70.71, 70.71" 
                    dur="0.2s" 
                    fill="freeze" />
            </line>
        </svg>
    `;
    return svgHTML;
}

function handleCellClick(index) {
    if (fields[index] !== null) {
        return; // Feld ist bereits belegt
    }
    fields[index] = currentPlayer;
    const cellContent = currentPlayer === 'circle' ? generateCircleSVG() : generateXSVG();
    document.getElementById(`cell-${index}`).innerHTML = cellContent;
    document.getElementById(`cell-${index}`).onclick = null;
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}; */

let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    const gameArea = document.getElementById('gameArea');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let cellContent = '';
            if (fields[index] === 'circle') {
                cellContent = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                cellContent = generateXSVG();
            }
            tableHTML += `<td id="cell-${index}" onclick="handleCellClick(${index})">${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    gameArea.innerHTML = tableHTML;
}

function generateCircleSVG() {
    const svgHTML = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="#F9262F" stroke-width="5" fill="none">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 188.4" 
                    to="188.4, 188.4" 
                    dur="0.2s" 
                    fill="freeze" />
            </circle>
        </svg>
    `;
    return svgHTML;
}

function generateXSVG() {
    const svgHTML = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#B10FFF" stroke-width="5">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 70.71" 
                    to="70.71, 70.71" 
                    dur="0.2s" 
                    fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#B10FFF" stroke-width="5">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 70.71" 
                    to="70.71, 70.71" 
                    dur="0.2s" 
                    fill="freeze" />
            </line>
        </svg>
    `;
    return svgHTML;
}

function handleCellClick(index) {
    if (fields[index] !== null) {
        return; // Feld ist bereits belegt
    }
    fields[index] = currentPlayer;
    const cellContent = currentPlayer === 'circle' ? generateCircleSVG() : generateXSVG();
    document.getElementById(`cell-${index}`).innerHTML = cellContent;
    document.getElementById(`cell-${index}`).onclick = null;

    // Überprüfe, ob das Spiel vorbei ist
    const winner = checkWinner();
    if (winner) {
        drawWinLine(winner);
        disableAllCells();
        return;
    }

    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6] // Diagonalen
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return pattern;
        }
    }

    return null;
}

function drawWinLine(winningPattern) {
    const gameArea = document.getElementById('gameArea');
    const cells = winningPattern.map(index => document.getElementById(`cell-${index}`));

    const [cell1, cell2, cell3] = cells;
    const rect1 = cell1.getBoundingClientRect();
    const rect3 = cell3.getBoundingClientRect();
    const gameAreaRect = gameArea.getBoundingClientRect();

    let x1, y1, x2, y2;

    if (rect1.left === rect3.left) { // Vertikale Linie
        x1 = rect1.left + rect1.width / 2 - gameAreaRect.left;
        y1 = rect1.top - gameAreaRect.top;
        x2 = x1;
        y2 = rect3.bottom - gameAreaRect.top;
    } else if (rect1.top === rect3.top) { // Horizontale Linie
        x1 = rect1.left - gameAreaRect.left;
        y1 = rect1.top + rect1.height / 2 - gameAreaRect.top;
        x2 = rect3.right - gameAreaRect.left;
        y2 = y1;
    } else if (rect1.left < rect3.left) { // Diagonale von links oben nach rechts unten
        x1 = rect1.left - gameAreaRect.left;
        y1 = rect1.top - gameAreaRect.top;
        x2 = rect3.right - gameAreaRect.left;
        y2 = rect3.bottom - gameAreaRect.top;
    } else { // Diagonale von rechts oben nach links unten
        x1 = rect1.right - gameAreaRect.left;
        y1 = rect1.top - gameAreaRect.top;
        x2 = rect3.left - gameAreaRect.left;
        y2 = rect3.bottom - gameAreaRect.top;
    }

    const line = document.createElement('div');
    line.className = 'win-line';
    line.style.width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + 'px';
    line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI}deg)`;
    line.style.left = x1 + 'px';
    line.style.top = y1 + 'px';

    gameArea.appendChild(line);
}

function disableAllCells() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).onclick = null;
    }
}


function resetGame() {
    fields.fill(null);
    currentPlayer = 'circle';
    init();
}
