// Classes and enums governing the behavior of individual tiles on the game
// board. Actual game logic is not handled by tiles. They serve as clickable
// agnostic vessels containing closures that reference game state. The primary
// goal of the functions here is to initialize the board and little else.

enum TileType {

// Represents all the possible types of tiles.

    Points5 = 0,
    Points10,
    Points25,
    Points50,
    Points100,
    Volcano,
    Tornado,
    Hurricane,
    Thief
}

class Tile {

// Represents a single tile on the board, whose onlick action is the
// evaluation of its niladic closure f. This closure contains reference to
// the Teams struct and modifies the team scores accordingly.

    f: Function;
    img: string;
    html: HTMLElement;
    constructor(f: Function, type: TileType, n: number) {
        this.f = f;
        this.img = IMGS[<number>type];
        this.html = this.htmlConstructor(n);
    }
    htmlConstructor(n: number): HTMLElement {
        let tile = makeClass("div", "tile");
        tile.appendChild(makeTileSVG(n));
        tile.onclick = () => this.activate();
        return tile;
    }
    activate(): void {
        // If the closure evaluates successfully (ie the game is not in
        // teamSelect mode), then change the image of the tile and prevent
        // it from being clickable again.
        if (this.f()) {
            this.html.innerHTML = this.img;
            this.html.onclick = null;
        }
    }
}

function shuffleTiles(tls: TileType[]): TileType[] {

// Cannonical Fisher-Yates shuffle for randomizing tile order.

        var j, x, i;
        for (i = tls.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = tls[i];
                    tls[i] = tls[j];
                    tls[j] = x;
                }
        return tls;
}

class Board {

// Represents the full game board of all tiles. This only needs to be
// initialized and printed once, as each individual tile contains a closure
// with a reference to the Teams struct, where all state is managed.

    all: Tile[];
    html: HTMLElement;
    constructor(ts: Teams) {
        let tls: Tile[] = [];
        let tts = this.makeTileTypes();
        let fs = this.makeFs(ts);
        let tiles = makeId("div", "tiles");
        tts.forEach((x, i) => {
            let t = new Tile(fs[<number>x], x, i);
            tls.push(t);
            tiles.appendChild(t.html);
        });
        let gameBoard = makeId("div", "gameBoard");
        appendChildren(gameBoard, ts.html, tiles);
        this.all = tls;
        this.html = gameBoard;
        this.print();
    }
    makeTileTypes(): TileType[] {
        // Incredibly stupid syntax, but wanted to avoid for loops and remain
        // ES5 compliant here. Returns a shuffled list of TileTypes.
        let tts: TileType[] = [];
        const times8 = [1, 2, 3, 4, 5, 6, 7, 8];
        const times3 = [1, 2, 3];
        const times2 = [1, 2];
        const times1 = [1];
        times8.forEach(() => tts.push(TileType.Points5));
        times8.forEach(() => tts.push(TileType.Points10));
        times8.forEach(() => tts.push(TileType.Points25));
        times2.forEach(() => tts.push(TileType.Points50));
        times1.forEach(() => tts.push(TileType.Points100));
        times2.forEach(() => tts.push(TileType.Volcano));
        times3.forEach(() => tts.push(TileType.Tornado));
        times2.forEach(() => tts.push(TileType.Hurricane));
        times2.forEach(() => tts.push(TileType.Thief));
        return shuffleTiles(tts);
    }
    makeFs(ts: Teams): Function[] {
        // Returns a list of closures whose index corresponds to the TileType
        // enum. As the constructor iterates through a shuffled list of
        // TileTypes, it assigns these closures to the new tiles it creates.
        // The score-modifying functions are only activated if the game is
        // not in selectTeam mode. They simply return false otherwise.
            return [() => ts.selectTeam ? false : ts.applyPoints(5),
                    () => ts.selectTeam ? false : ts.applyPoints(10),
                    () => ts.selectTeam ? false : ts.applyPoints(25),
                    () => ts.selectTeam ? false : ts.applyPoints(50),
                    () => ts.selectTeam ? false : ts.applyPoints(100),
                    () => ts.selectTeam ? false : ts.applyVolcano(),
                    () => ts.selectTeam ? false : ts.applyTornado(),
                    () => ts.selectTeam ? false : ts.applyHurricane(),
                    () => ts.selectTeam ? false : ts.applyThief()];
    }
    print(): void {
        // Prints the tile board to the gameArea div. Only runs once.
        let gameArea = getElement("gameArea");
        removeChildren(gameArea);
        gameArea.appendChild(this.html);
    }
}
