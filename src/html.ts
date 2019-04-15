// Functions for constructing and manipulating html elements.

function getElement(id: string): HTMLElement {

// Returns an HTML element. Wrapper function to avoid constant casting. No
// null checks take place because the limited amount of ids in the program
// have been confirmed to exist through testing. This may be unsafe for future
// code, but the limited scope of this project makes this trade-off in the name
// of berevity. It's unlikely that other features will be added to the game.

    return (<HTMLElement>document.getElementById(id));
}

function makeClass(html: string, name: string, content?: string): HTMLElement {

// Make a new HTML element and name its class.    

    let e = document.createElement(html);
    e.className = name;
    if (content) {
        e.innerHTML = content;
    }
    return e;
}

function makeId(html: string, name: string, content?: string): HTMLElement {

// Make a new HTML element and name its ID.

    let e = document.createElement(html);
    e.id = name;
    if (content) {
        e.innerHTML = content;
    }
    return e;
}

function appendChildren(first: HTMLElement, ...rest: HTMLElement[]): void {

// Append all the HTML nodes in ...rest to first.    
    
    rest.forEach((x) => first.appendChild(x));
}

function removeChildren(html: HTMLElement): void {

// Removes all children from an HTML node.

    while (html.firstChild) {
        html.removeChild(html.firstChild);
    }
}

function setTextN(html: HTMLElement, n: number, newText: string): void {

// Rewrite the inner HTML of a node's child n.

    (<HTMLElement>html.childNodes[n]).innerHTML = newText;
}

function setClassN(html: HTMLElement, n: number, newName: string): void {

// Rename an HTML node's child n to a new class.

    (<HTMLElement>html.childNodes[n]).className = newName;

}
