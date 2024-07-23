let fields = [
    null,
    null,
    null,
    null,
    null,
    'cross',
    null,
    null,
    'circle',
];

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
            tableHTML += `<td>${cellContent}</td>`;
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

