const View = require("./ttt-view.js");
const Game = require("../../solution/game.js");

$( () => {
  const $figure = $('.ttt');
  new View(new Game(), $figure);
});
