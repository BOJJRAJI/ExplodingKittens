#Exploding Kittens Card Game
# **Exploding Kittens Card Game**
👋 Welcome! The objective of this exercise is to build a web-based game. 
This will be an online single-player card game that consists of 4 different types of cards

- Cat card 😼
- Defuse card 🙅‍♂️
- Shuffle card 🔀
- Exploding kitten card 💣

There will be a button to start the game. When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw. 

Rules –
- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.

Now create a react app which allows a player to draw a random card from the deck once the game is started.
Allow users to create a username to enter the game and create a leaderboard to record how many games they won
You can use SQLite as a database to store the points of all the users and NodeJS with Express for the backend. One game won is equal to one point. 
Bonus -
Automatically save the game for a user at every stage so the user can continue from where he left off last time.
Real-time update of points on the leaderboard for all the users if they are playing simultaneously. 
