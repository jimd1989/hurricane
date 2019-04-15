The Hurricane Game is a popular activity among younger students, and a good way to review a particular topic. Its rules are simple:

1. Divide the class into teams. Each team has a score.
2. On each turn, a single representative from each team comes to the front of the class.
3. Ask the representatives a question.
4. The first representative to answer correctly gets to choose a card from the board.
5. Behind the card is a certain event...
    1. If the card has a number on it, the representative's team gets that number added to their score.
    2. If the card has a volcano on it, the representative's team loses all their points.
    3. If the card has a tornado on it, a random team loses a random number of points.
    4. If the card has a robber on it, a random team gives all their points to the representative's team.
    5. If the card has a hurricane on it, everybody loses all their points.
6. Repeat this process with a new set of representatives for every turn, until all the cards have been exhausted. The team with the most points at the end is the winner.

This activity rewards knowledge, but its chance-heavy nature keeps things exciting and ensures that no one team dominates the game. It can also be extended to just about any topic the teacher wishes to drill students on. A 36 card game generally takes about 50 minutes to complete—an easy way to eat up an entire period.

## Screenshot

[![layout of the Hurricane game board](path)](path)


## Installation

I've written the Hurricane game in [Typescript](https://www.typescriptlang.org/). Make sure you have its compiler, which is usually installed via `npm`.

+ `chmod +x build.sh`
+ `./build.sh`

After compilation, the entire program is available as `hurricane.js`, which is already pointed to by `index.html` in the same directory.

## Usage

Navigate to `index.html` in your browser and follow the setup menus. The program is light on text because it is meant to be used in ESL contexts. The flow of the game is simple; click an avatar to select the team that got the question right, then click on one of the 36 tiles. Repeat. Tiles are numbered so that students can shout out the digits of their desired tile rather than having to walk up to the screen and point.

## Demo

You can play Hurricane online [here](https://dalrym.pl/media/code/js/hurricane-demo/index.html).

## Caveats

+ There is no technical end to the game or winner screen at the moment. Surely kids can figure that out themselves though.
+ Hurricane has only been tested in Firefox. I don't know how portable the css is.
+ The game expects at least 800 pixels of width, which rules out cell phones for the time being. If there is a simple css trick that does away with this rigidness, let me know.
+ All the art was done by yours truly with a finger on an iPad. It shows.
