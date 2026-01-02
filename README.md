# ♟️ Chess Game

A fully functional chess game built with vanilla JavaScript, HTML, and CSS. Play chess directly in your browser with complete rule validation, check detection, and checkmate recognition.

## 🎮 Features

- **Complete Chess Rules Implementation**
  - All piece movements (Pawn, Rook, Knight, Bishop, Queen, King)
  - Legal move validation
  - Path blocking detection
  - Capture mechanics

- **Game Logic**
  - Turn-based gameplay (White starts first)
  - Check detection
  - Checkmate detection
  - Prevents moves that would put your own king in check

- **User Interface**
  - Interactive chessboard with classic light/dark squares
  - Visual piece selection highlighting
  - Unicode chess piece symbols
  - Responsive click-to-move controls

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start playing!

```bash
# Clone the repository
git clone https://github.com/yourusername/chess-game.git

# Navigate to the project folder
cd chess-game

# Open in browser
open index.html
```

## 🎯 How to Play

1. **Select a Piece**: Click on any piece of your color (White moves first)
2. **Make a Move**: Click on a valid destination square
3. **Capture**: Click on an opponent's piece to capture it
4. **Turns**: Players alternate turns automatically

### Game Rules

- White always moves first
- You cannot move into check
- You must move out of check if your king is threatened
- The game ends when a king is checkmated

## 🎨 Piece Symbols

| Piece | White | Black |
|-------|-------|-------|
| King | ♔ | ♚ |
| Queen | ♕ | ♛ |
| Rook | ♖ | ♜ |
| Bishop | ♗ | ♝ |
| Knight | ♘ | ♞ |
| Pawn | ♙ | ♟ |

## 📁 Project Structure

```
chess-game/
│
├── index.html          # Main HTML file with chessboard structure
├── style.css           # Styling for the chessboard and pieces
├── script.js           # Game logic and piece movement rules
└── README.md           # Project documentation
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Structure and layout
- **CSS3**: Styling and visual design
- **Vanilla JavaScript**: Game logic and interactivity

### Key Functions

- `isValidMove()`: Validates piece movements according to chess rules
- `isKingInCheck()`: Detects if a king is under attack
- `isCheckmate()`: Determines if checkmate has occurred
- `attemptMove()`: Handles move execution and turn switching
- `renderBoard()`: Updates the visual display of the board

## 🐛 Known Limitations

- No castling implementation
- No en passant capture
- No pawn promotion
- No draw detection (stalemate, threefold repetition, fifty-move rule)
- No move history or undo functionality
- No AI opponent (2-player only)

## 🚀 Future Enhancements

- [ ] Add castling move
- [ ] Implement en passant
- [ ] Add pawn promotion dialog
- [ ] Implement stalemate detection
- [ ] Add move history display
- [ ] Create an AI opponent
- [ ] Add timer/clock functionality
- [ ] Save/load game state
- [ ] Multiplayer online support
- [ ] Move sound effects

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Your Name - [Your GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Chess piece Unicode symbols from Unicode Standard
- Inspired by classic chess implementations
- Built as a learning project for JavaScript game development

## 📧 Contact

For questions or feedback, please open an issue on GitHub or contact me at your.email@example.com

---

**Happy Playing! ♟️**
