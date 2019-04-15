// Objects and functions governing the creation and maniupulation of teams.
// Since the game involves tiles that act upon teams, most of the score-keeping
// logic and general program flow takes place within these structs as well.


enum TeamStatus {

// Represents the current status of a given team. The team's display portrait
// changes based upon this value.

    Normal = 0,
    Incremented,
    Decremented,
    Inactive,
}

class Team {

// Represents the score of a single team. This struct is tasked with tracking
// that score along with the TeamStatus, both of which it prints to the
// scoreBoard div.

    score: number;
    status: TeamStatus;
    html: HTMLElement;
    constructor(ct: ChooseTeam) {
        this.score = 0;
        this.status = TeamStatus.Normal;
        this.html = this.htmlConstructor(ct);
    }
    htmlConstructor(ct: ChooseTeam): HTMLElement {
        let points = makeClass("p", "scorePoints", "0");
        let scoreTeam = makeClass("div", "scoreTeam");
        appendChildren(scoreTeam, ct.html, points);
        return scoreTeam;
    }
    setStatus(s: TeamStatus): void {
        // Change the status of a team to a new enum value.
        this.status = s;
    }
    print(): void {
        // Updates the team's avatar and score in the scoreBoard. The css
        // class name of the avatar state is referenced in the array xs, which
        // is pointed to by the TeamStatus enum value.
        let xs = ["scoreAvatar", "scoreAvatarIncremented",
                  "scoreAvatarDecremented", "scoreAvatarInactive"];
        setClassN(this.html, 0, xs[<number>this.status]);
        setTextN(this.html, 1, this.score.toString());
    }
}

class ChooseTeam {

// Represents a single image that a team can select as their avatar. The sole
// purpose of this struct is to be clicked on once and assigned to a team.

    html: HTMLElement;
    constructor(ts: Teams, img: string) {
        let avatar = (<HTMLImageElement>makeClass("img", "scoreAvatar"));
        avatar.src = img;
        avatar.onclick = () => ts.setAvatar(this);
        this.html = avatar; 
    }
}

class ChooseTeams {

// Represents a master array of all available avatars a team can select. Loops
// through all the avatars in the img folder and makes them into ChooseTeam
// structs.
 
    all: ChooseTeam[];
    html: HTMLElement;
    constructor(ts: Teams) {
        let cts = (<ChooseTeam[]>[]);
        let selectText = makeId("p", "selectText");
        let chooseTeams = makeId("div", "chooseTeams");
        chooseTeams.appendChild(selectText);
        for (let i = 0 ; i < NUM_AVATARS ; i++) {
            let ct = new ChooseTeam(ts, "img/0" +(i+1).toString() + ".png");
            cts.push(ct);
            chooseTeams.appendChild(ct.html);
        }
        this.all = cts;
        this.html = chooseTeams;
    }
}

class Teams {

// Represents all of the teams playing the game. This is where game state is
// held and the main loop takes place. All tile functions reference this
// struct in their respective closures. This object asks the user to pick an
// active team, then allows that team to pick a tile. The function in the tile
// affects the teams here.

    active: number;
    all: Team[];
    board: Board | null;
    chooseTeams: ChooseTeams;
    count: number;
    selectTeam: boolean;
    html: HTMLElement;
    constructor(n: number) {
        this.active = 0;
        this.all = (<Team[]>[]);
        this.board = null;
        this.count = n;
        this.selectTeam = false;
        this.html = this.htmlConstructor();
        this.chooseTeams = new ChooseTeams(this);
    }
    htmlConstructor(): HTMLElement {
        let gameMsg = makeId("p", "gameMsg", "Select team");
        let scoreBoard = makeId("div", "scoreBoard");
        appendChildren(scoreBoard, gameMsg);
        return scoreBoard;
    }
    selectAvatar(): void {
        // Allows the players to select an avatar from the ChooseTeams array.
        // This function will break into the actual game loop once all teams
        // have chosen.
        if (this.active >= this.count) {
            this.board = new Board(this);
            this.all.forEach((x, i) => 
                (<HTMLElement>x.html.childNodes[0]).onclick =
                    () => this.setActive(i));
            this.selectActive();
        } else {
            setTextN(this.chooseTeams.html, 0,
                "Select team " + (this.active+1).toString());
        }
    }
    setAvatar(ct: ChooseTeam): void {
        // Applies a ChooseTeam's closure to the active team in this struct,
        // assigning its avatar to the team. Makes the next team active and
        // presents them with the selectAvatar screen.
        let t = new Team(ct);
        this.all.push(t);
        this.html.appendChild(t.html);
        ct.html.onclick = null;
        ct.html.className = "scoreAvatarHidden";
        this.active++;
        this.selectAvatar();
    }
    print(): void {
        // Update the scores and avatars of all teams.
        this.all.forEach(x => x.print());
    }
    selectActive(): void {
        // The first stage of the game loop. Asks the players to choose the
        // active team by clicking on an avatar. This team will be modified by
        // some later tile choices. Blurs out the tile board to focus on the
        // scoreBoard.
        this.active = -1;
        this.board!.all.forEach(x => x.html.className = "tileInactive");
        this.selectTeam = true;
        setTextN(this.html, 0, "Select team");
        this.print();
    }
    setActive(n: number): void {
        // The next stage of the game loop. Allows the active team to choose
        // a tile. Note that the active team can still be switched at this
        // point. This is a conscious design choice. Unblurs the tiles.
        this.active = n;
        this.all.forEach(x => x.status = TeamStatus.Inactive);
        this.all[this.active].status = TeamStatus.Normal;
        this.board!.all.forEach(x => x.html.className = "tile");
        this.selectTeam = false;
        setTextN(this.html, 0, "Select tile");
        this.print();
    }
    applyPoints(n: number): boolean {
        // The most common tile action. Gives n points to the active team.
        this.all.forEach(x => x.status = TeamStatus.Normal);
        let a = this.all[this.active];
        a.score += n;
        a.status = TeamStatus.Incremented;
        this.selectActive();
        return true;
    }
    applyVolcano(): boolean {
        // Zeroes the active team's score.
        this.all.forEach(x => x.status = TeamStatus.Normal);
        let a = this.all[this.active];
        a.score = 0;
        a.status = TeamStatus.Decremented;
        this.selectActive();
        return true;
    }
    applyHurricane(): boolean {
        // Zeroes everyone's score.
        this.all.forEach(x => { x.score = 0; 
                                x.status = TeamStatus.Decremented; });
        this.selectActive();
        return true;
    }
    applyTornado(): boolean {
        // Takes a random amount of points from a random team.
        this.all.forEach(x => x.status = TeamStatus.Normal);
        let a = this.all[this.active];
        a.status = TeamStatus.Normal;
        let t = this.all[Math.floor(Math.random() * this.count)];
        t.score -= Math.floor(Math.random() * t.score);
        t.status = TeamStatus.Decremented;
        this.selectActive();
        return true;
    }
    applyThief(): boolean {
        // Takes all points from a random victim and gives them to the
        // active team.
        this.all.forEach(x => x.status = TeamStatus.Normal);
        let n = this.active;
        while (n === this.active) {
            n = Math.floor(Math.random() * this.count);
        }
        let a = this.all[this.active]
        let t = this.all[n]
        let loss = t.score;
        t.score = 0;
        t.status = TeamStatus.Decremented;
        a.score += loss;
        a.status = TeamStatus.Incremented;
        this.selectActive();
        return true;
    }
}
