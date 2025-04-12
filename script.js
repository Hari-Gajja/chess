// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
    let board = null; // Initialize the chessboard
    const game = new Chess(); // Create new Chess.js game instance
    const moveHistory = document.getElementById('move-history'); // Get move history container
    let moveCount = 1; // Initialize the move count
    let userColor = 'w'; // Initialize the user's color as white
    const humanMoveHistory = document.getElementById('human-moves');
    const cpuMoveHistory = document.getElementById('cpu-moves');
    let selectedSquare = null;
    let gameStarted = false;

    // Timer variables
    const GAME_TIME = 600; // 10 minutes in seconds
    let playerTimer = GAME_TIME;
    let cpuTimer = GAME_TIME;
    let activeTimer = null;
    let lastMoveTime = Date.now();

    // Add board color variables
    let boardColors = {
        light: '#ffffff',
        dark: '#4b7399'
    };

    // Piece values and position weights for AI evaluation
    const pieceValues = {
        'p': 100,
        'n': 320,
        'b': 330,
        'r': 500,
        'q': 900,
        'k': 20000
    };

    // Position weights for each piece type
    const piecePositionWeights = {
    'p': [
        [ 0,  0,  0,  0,  0,  0,  0,  0],
        [50, 50, 50, 50, 50, 50, 50, 50],
        [10, 10, 20, 30, 30, 20, 10, 10],
        [ 5,  5, 10, 25, 25, 10,  5,  5],
        [ 0,  0,  0, 20, 20,  0,  0,  0],
        [ 5, -5,-10,  0,  0,-10, -5,  5],
        [ 5, 10, 10,-20,-20, 10, 10,  5],
        [ 0,  0,  0,  0,  0,  0,  0,  0]
    ],
    'n': [
        [-50,-40,-30,-30,-30,-30,-40,-50],
        [-40,-20,  0,  5,  5,  0,-20,-40],
        [-30,  5, 10, 15, 15, 10,  5,-30],
        [-30,  0, 15, 20, 20, 15,  0,-30],
        [-30,  5, 15, 20, 20, 15,  5,-30],
        [-30,  0, 10, 15, 15, 10,  0,-30],
        [-40,-20,  0,  0,  0,  0,-20,-40],
        [-50,-40,-30,-30,-30,-30,-40,-50]
    ],
    'b': [
        [-20,-10,-10,-10,-10,-10,-10,-20],
        [-10,  0,  0,  0,  0,  0,  0,-10],
        [-10,  0,  5, 10, 10,  5,  0,-10],
        [-10,  5,  5, 10, 10,  5,  5,-10],
        [-10,  0, 10, 10, 10, 10,  0,-10],
        [-10, 10, 10, 10, 10, 10, 10,-10],
        [-10,  5,  0,  0,  0,  0,  5,-10],
        [-20,-10,-10,-10,-10,-10,-10,-20]
    ],
    'r': [
        [ 0,  0,  0,  0,  0,  0,  0,  0],
        [ 5, 10, 10, 10, 10, 10, 10,  5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [ 0,  0,  0,  5,  5,  0,  0,  0]
    ],
    'q': [
        [-20,-10,-10, -5, -5,-10,-10,-20],
        [-10,  0,  0,  0,  0,  0,  0,-10],
        [-10,  0,  5,  5,  5,  5,  0,-10],
        [ -5,  0,  5,  5,  5,  5,  0, -5],
        [  0,  0,  5,  5,  5,  5,  0, -5],
        [-10,  5,  5,  5,  5,  5,  0,-10],
        [-10,  0,  5,  0,  0,  0,  0,-10],
        [-20,-10,-10, -5, -5,-10,-10,-20]
    ],
    'k': [
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-20,-30,-30,-40,-40,-30,-30,-20],
        [-10,-20,-20,-20,-20,-20,-20,-10],
        [ 20, 20,  0,  0,  0,  0, 20, 20],
        [ 20, 30, 10,  0,  0, 10, 30, 20]
    ]
}

    // Function to format time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    // Function to update timer display
    const updateTimerDisplay = () => {
        document.querySelector('.player-timer .time').textContent = formatTime(playerTimer);
        document.querySelector('.cpu-timer .time').textContent = formatTime(cpuTimer);
        
        // Update timer colors based on remaining time
        ['player-timer', 'cpu-timer'].forEach(timerClass => {
            const timer = document.querySelector(`.${timerClass}`);
            const time = timerClass === 'player-timer' ? playerTimer : cpuTimer;
            timer.classList.remove('warning', 'danger');
            if (time <= 60) timer.classList.add('danger');
            else if (time <= 180) timer.classList.add('warning');
        });
    };

    // Function to start game timer
    const startGameTimer = () => {
        if (activeTimer) clearInterval(activeTimer);
        activeTimer = setInterval(() => {
            const currentTime = Date.now();
            const elapsed = Math.floor((currentTime - lastMoveTime) / 1000);
            
            if (game.turn() === userColor) {
                playerTimer = Math.max(0, playerTimer - 1);
            } else {
                cpuTimer = Math.max(0, cpuTimer - 1);
            }
            
            updateTimerDisplay();
            
            // Check for time out
            if (playerTimer === 0 || cpuTimer === 0) {
                handleGameEnd(`Game Over! ${playerTimer === 0 ? 'CPU' : 'Player'} wins by timeout!`);
            }
        }, 1000);
    };

    // Function to handle game end
    const handleGameEnd = (message) => {
        if (activeTimer) {
            clearInterval(activeTimer);
            activeTimer = null;
        }
        window.alert(message);
        setGameControls(false);
        gameStarted = false;
        document.querySelector('.start-game').disabled = false;
    };

    // Function to evaluate board position
    const evaluatePosition = (board) => {
        let score = 0;
        
        // Material and position evaluation
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = board[i][j];
                if (piece) {
                    const pieceValue = pieceValues[piece.type.toLowerCase()];
                    const positionValue = piecePositionWeights[piece.type.toLowerCase()]?.[i][j] || 0;
                    
                    if (piece.color === 'w') {
                        score += pieceValue + positionValue;
                    } else {
                        score -= pieceValue + positionValue;
                    }
                }
            }
        }
        
        return score;
    };

    // Add move ordering scoring
    const getMoveScore = (move) => {
        let score = 0;
        
        // Captures are likely good moves - prioritize by captured piece value
        if (move.captured) {
            score += pieceValues[move.captured] - pieceValues[move.piece]/10;
        }
        
        // Promotions are likely good moves
        if (move.promotion) {
            score += pieceValues[move.promotion];
        }
        
        // Bonus for center control with pawns
        if (move.piece === 'p') {
            const targetRank = parseInt(move.to[1]);
            const targetFile = move.to.charCodeAt(0) - 'a'.charCodeAt(0);
            if (targetRank >= 3 && targetRank <= 6 && targetFile >= 2 && targetFile <= 5) {
                score += 50;
            }
        }
        
        return score;
    };

    // Optimize minimax with quick evaluation for leaf nodes
    const minimax = (game, depth, alpha, beta, maximizingPlayer) => {
        if (depth === 0) {
            return evaluatePosition(game.board());
        }

        const moves = game.moves({ verbose: true });
        
        // Sort moves for better alpha-beta pruning
        moves.sort((a, b) => getMoveScore(b) - getMoveScore(a));
        
        if (maximizingPlayer) {
            let maxEval = -Infinity;
            for (const move of moves) {
                game.move(move);
                const eval = minimax(game, depth - 1, alpha, beta, false);
                game.undo();
                maxEval = Math.max(maxEval, eval);
                alpha = Math.max(alpha, eval);
                if (beta <= alpha) break;
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const move of moves) {
                game.move(move);
                const eval = minimax(game, depth - 1, alpha, beta, true);
                game.undo();
                minEval = Math.min(minEval, eval);
                beta = Math.min(beta, eval);
                if (beta <= alpha) break;
            }
            return minEval;
        }
    };

    // Add function to check draw conditions
    const getDrawReason = () => {
        if (game.in_stalemate()) return "Stalemate";
        if (game.in_threefold_repetition()) return "Threefold Repetition";
        if (game.insufficient_material()) return "Insufficient Material";
        if (game.in_draw()) return "50-move Rule";
        return null;
    };

    // Optimize makeAIMove for faster responses
    const makeAIMove = () => {
        if (game.game_over()) {
            let message = "Game Over! ";
            if (game.in_checkmate()) {
                message += game.turn() === 'w' ? "Black wins by checkmate!" : "White wins by checkmate!";
            } else {
                const drawReason = getDrawReason();
                message += `Game drawn by ${drawReason}!`;
            }
            handleGameEnd(message);
            return;
        }

        const moves = game.moves({ verbose: true });
        let bestMove = null;
        let bestEval = -Infinity;
        
        // Sort moves initially for better pruning
        moves.sort((a, b) => getMoveScore(b) - getMoveScore(a));
        
        // Use variable depth based on game phase
        const pieceCount = game.board().flat().filter(Boolean).length;
        const depth = pieceCount > 20 ? 2 : // Opening: shallow search
                     pieceCount > 10 ? 3 : // Middlegame: medium search
                     4;                    // Endgame: deep search

        // Use first move of previous best line if in time pressure
        if (cpuTimer < 30) {
            bestMove = moves[0];
        } else {
            for (const move of moves) {
                game.move(move);
                const eval = minimax(game, depth - 1, -Infinity, Infinity, false);
                game.undo();
                
                if (eval > bestEval) {
                    bestEval = eval;
                    bestMove = move;
                }
                
                // Early exit if we found a clearly winning move
                if (bestEval > 500) break;
            }
        }

        if (bestMove) {
            game.move(bestMove);
            board.position(game.fen());
            recordMove(bestMove.san, moveCount, true);
            moveCount++;
            lastMoveTime = Date.now();
            updateTimerDisplay();
        }
    };

    // Function to record and display a move in the move history
    const recordMove = (move, count, isCPU) => {
        // Just display the move notation without numbering
        const moveText = move;
        const targetHistory = isCPU ? cpuMoveHistory : humanMoveHistory;
        const moveElement = document.createElement('div');
        moveElement.textContent = moveText;
        moveElement.classList.add('move');
        targetHistory.appendChild(moveElement);
        targetHistory.scrollTop = targetHistory.scrollHeight;
    };

    // Function to remove all highlights from the board
    const removeHighlights = () => {
        $('.square-55d63').removeClass('highlight-square possible-move possible-capture');
    };

    // Function to highlight possible moves for a piece
    const highlightPossibleMoves = (square) => {
        const moves = game.moves({ square: square, verbose: true });
        moves.forEach(move => {
            const $square = $(`.square-${move.to}`);
            if (move.captured) {
                $square.addClass('possible-capture');
            } else {
                $square.addClass('possible-move');
            }
        });
    };

    // Function to update board colors
    const updateBoardColors = () => {
        $('.white-1e1d7').css('background-color', boardColors.light);
        $('.black-3c85d').css('background-color', boardColors.dark);
    };

    // Configuration options for the chessboard
    const boardConfig = {
        showNotation: true,
        draggable: false, // Disable dragging
        position: 'start',
        moveSpeed: 'fast',
        pieceTheme: 'img/chesspieces/wikipedia/{piece}.png'
    };

    // Initialize the chessboard
    board = Chessboard('board', boardConfig);
    updateBoardColors();

    // Function to enable/disable game controls
    const setGameControls = (enabled) => {
        const buttons = document.querySelectorAll('.play-again, .set-pos, .flip-board');
        buttons.forEach(button => button.disabled = !enabled);
        
        // Always enable color controls, even when game isn't started
        document.querySelector('.apply-colors').disabled = false;
        
        if (!enabled) {
            $('.board-b72b1').addClass('disabled');
        } else {
            $('.board-b72b1').removeClass('disabled');
        }
    };

    // Add click handler for squares
    $('.board-b72b1').on('click', '.square-55d63', function() {
        if (!gameStarted) return;
        const square = $(this).data('square');
        const piece = game.get(square);

        if (!selectedSquare) {
            // First click - select piece
            if (piece && piece.color === userColor) {
                removeHighlights();
                selectedSquare = square;
                $(this).addClass('highlight-square');
                highlightPossibleMoves(square);
            }
        } else {
            // Second click - attempt move
            const move = game.move({
                from: selectedSquare,
                to: square,
                promotion: 'q'
            });

            if (move) {
                removeHighlights();
                board.position(game.fen());
                recordMove(move.san, moveCount, false);
                moveCount++;
                
                if (game.game_over()) {
                    let message = "Game Over! ";
                    if (game.in_checkmate()) {
                        message += game.turn() === 'w' ? "Black wins by checkmate!" : "White wins by checkmate!";
                    } else {
                        const drawReason = getDrawReason();
                        message += `Game drawn by ${drawReason}!`;
                    }
                    handleGameEnd(message);
                } else {
                    window.setTimeout(makeAIMove, 250);
                }
                
                lastMoveTime = Date.now();
                updateTimerDisplay();
            } else {
                // Invalid move, check if selecting new piece
                if (piece && piece.color === userColor) {
                    removeHighlights();
                    selectedSquare = square;
                    $(this).addClass('highlight-square');
                    highlightPossibleMoves(square);
                } else {
                    removeHighlights();
                    selectedSquare = null;
                }
            }
        }
    });

    // Add start game button handler
    document.querySelector('.start-game').addEventListener('click', function() {
        if (!gameStarted) {
            if (window.confirm('Ready to start? White moves first!')) {
                gameStarted = true;
                this.disabled = true;
                setGameControls(true);
                playerTimer = GAME_TIME;
                cpuTimer = GAME_TIME;
                lastMoveTime = Date.now();
                updateTimerDisplay();
                startGameTimer();
            }
        }
    });

    // Event listener for the "Play Again" button
    document.querySelector('.play-again').addEventListener('click', () => {
        game.reset();
        board.start();
        humanMoveHistory.innerHTML = '<h3>Your Moves</h3>';
        cpuMoveHistory.innerHTML = '<h3>CPU Moves</h3>';
        moveCount = 1;
        userColor = 'w';
        selectedSquare = null;
        removeHighlights();
        
        // Reset game state
        gameStarted = false;
        document.querySelector('.start-game').disabled = false;
        setGameControls(false);
        
        // Reset timers without starting them
        playerTimer = GAME_TIME;
        cpuTimer = GAME_TIME;
        if (activeTimer) {
            clearInterval(activeTimer);
            activeTimer = null;
        }
        updateTimerDisplay();
    });

    // Event listener for the "Set Position" button
    document.querySelector('.set-pos').addEventListener('click', () => {
        const fen = prompt("Enter the FEN notation for the desired position!");
        if (fen !== null) {
            if (game.load(fen)) {
                board.position(fen);
                moveHistory.textContent = '';
                moveCount = 1;
                userColor = 'w';
            } else {
                alert("Invalid FEN notation. Please try again.");
            }
        }
    });

    // Event listener for the "Flip Board" button
    document.querySelector('.flip-board').addEventListener('click', () => {
        board.flip();
        makeAIMove();
        // Toggle user's color after flipping the board
        userColor = userColor === 'w' ? 'b' : 'w';
    });

    // Add color picker handlers
    document.getElementById('lightSquares').addEventListener('change', function() {
        boardColors.light = this.value;
        document.querySelector('.apply-colors').disabled = false; // Enable apply button when color changes
    });

    document.getElementById('darkSquares').addEventListener('change', function() {
        boardColors.dark = this.value;
        document.querySelector('.apply-colors').disabled = false; // Enable apply button when color changes
    });

    // Add apply colors button handler with state management
    document.querySelector('.apply-colors').addEventListener('click', () => {
        updateBoardColors();
        document.querySelector('.apply-colors').disabled = true; // Disable after applying
    });

    // Initialize game in disabled state
    setGameControls(false);
});