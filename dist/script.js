console.clear();

const {
  core: { describe, it, expect, run },
  prettify
} = window.jestLite;

function remoteControl(word) {
  const keyboardGrid = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];

  const setButtons = function (arrowsMove, buttons) {
    for (let i = 0; i < Math.abs(arrowsMove[0]); i++) {
      buttons += `${arrowsMove[1]}, `;
    }
    return buttons;
  };

  const letters = word.toLowerCase().split("");

  let curr_i = 0;
  let curr_j = 0;
  let upDownMove = [0, "up/down"];
  let leftRightMove = [0, "left/right"];
  let buttons = "";

  for (let n = 0; n < letters.length; n++) {
    for (let i = 0; i < keyboardGrid.length; i++) {
      let j = keyboardGrid[i].indexOf(letters[n]);
      if (j >= 0) {
        upDownMove[0] = i - curr_i;
        leftRightMove[0] = j - curr_j;
        curr_i = i;
        curr_j = j;
        break;
      }
    }

    upDownMove[1] = upDownMove[0] > 0 ? "down" : "up";
    leftRightMove[1] = leftRightMove[0] > 0 ? "right" : "left";

    buttons = setButtons(upDownMove, buttons);
    buttons = setButtons(leftRightMove, buttons);

    buttons += "select";
    if (n < letters.length - 1) {
      buttons += ", ";
    }
  }

  return buttons;
}

// This week's default test suite includes only one possible button path for each tested word. In these paths, when the next letter is on another row the directions move up or down first, before moving left or right. Could you create a test suite that can validate different paths through the keys?

describe("remoteControl", (word) => {
  it("checks if ", () => {
    expect(remoteControl("car")).toBe(
      "down, down, right, right, select, up, left, left, select, up, right, right, right, select"
    );
    expect(remoteControl("queen")).toBe(
      "select, right, right, right, right, right, right, select, left, left, left, left, select, select, down, down, right, right, right, select"
    );
    expect(remoteControl("code")).toBe(
      "down, down, right, right, select, up, up, right, right, right, right, right, right, select, down, left, left, left, left, left, left, select, up, select"
    );
  });
});

prettify.toHTML(run(), document.body);