self.onmessage = function(e) {
    const { position, depth, workerIndex, workerCount } = e.data;
    
    // Divide the moves among workers
    const moves = generateMovesForWorker(position, workerIndex, workerCount);
    
    // Search each move
    const results = moves.map(move => {
        position.makeMove(move);
        const score = -alphaBeta(position, depth - 1, -Infinity, Infinity, false);
        position.undoMove();
        return { move, score };
    });

    // Introduce randomness to make moves less predictable
    results.sort((a, b) => b.score - a.score);
    const topResults = results.slice(0, Math.ceil(results.length / 2));
    const randomResult = topResults[Math.floor(Math.random() * topResults.length)];

    // Return best result
    self.postMessage(randomResult);
};

// Helper functions similar to main AI class...
function generateMovesForWorker(position, workerIndex, workerCount) {
    const allMoves = position.moves({ verbose: true });
    const movesPerWorker = Math.ceil(allMoves.length / workerCount);
    return allMoves.slice(workerIndex * movesPerWorker, (workerIndex + 1) * movesPerWorker);
}

function alphaBeta(position, depth, alpha, beta, isMaximizing) {
    if (depth === 0) {
        return evaluatePosition(position);
    }

    const moves = position.moves({ verbose: true });
    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const move of moves) {
            position.makeMove(move);
            const eval = alphaBeta(position, depth - 1, alpha, beta, false);
            position.undoMove();
            maxEval = Math.max(maxEval, eval);
            alpha = Math.max(alpha, eval);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            position.makeMove(move);
            const eval = alphaBeta(position, depth - 1, alpha, beta, true);
            position.undoMove();
            minEval = Math.min(minEval, eval);
            beta = Math.min(beta, eval);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

function evaluatePosition(position) {
    // Simplified evaluation function
    const board = position.board();
    let score = 0;
    for (let row of board) {
        for (let piece of row) {
            if (piece) {
                const value = pieceValues[piece.type];
                score += piece.color === 'w' ? value : -value;
            }
        }
    }
    return score;
}

const pieceValues = {
    'p': 100,
    'n': 320,
    'b': 330,
    'r': 500,
    'q': 900,
    'k': 20000
};
