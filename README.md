
# **Exploding Kittens Card Game**

👋 Welcome! The objective of this exercise is to build a web-based game. 
This will be an online single-player card game that consists of 4 different types of cards

- Cat card 😼
- Defuse card 🙅‍♂️
- Shuffle card 🔀
- Exploding kitten card 💣

There will be a button to start the game. When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw. 

**## Rules –**
- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.
**
## **Features**
User Registration: Users can create a username to enter the game.
Single-Player Gameplay: Players draw cards from the deck and interact with different card types according to the game rules.
Card Types: Cat cards are harmless, Defuse cards prevent explosion, Shuffle cards restart the game, and Exploding Kitten cards end the game.
Leaderboard: Tracks the number of games won by each user.

## **Technologies Used**
- Backend: Node.js && Express.js
- Frontend: React.js
- Database: SQLITE3

## **Setup Instructions**
- Clone the repository from GitHub: git clone https://github.com/BOJJRAJI/ExplodingKuttens.git
- Navigate to the project directory: cd ExplodingKittens
- Install dependencies:
- Backend: cd backend && npm install
- Client: cd frontend && npm install
- Run the frontend server: npm start
- Run the backend server: nodemon run server
