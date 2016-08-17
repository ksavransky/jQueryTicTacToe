var View = function (game, $el) {
  this.$el = $el;
  this.setupBoard();
  this.game = game;
};

View.prototype.bindEvents = function () {
  this.$el.on("click", "li", (event) => {
    const $square = $(event.currentTarget);
    if($square.attr('class')){
      alert("Don't click on me again! Help!!!!");
    } else {
      this.makeMove($square);
      this.isOver();
    }
  });
};

View.prototype.isOver = function () {
  if (this.game.isOver()){
    this.$el.off("click", "li");
    if (this.game.winner()) {
      console.log(this.game.winner());
      let winner = this.game.winner();
      let loser = this.game.currentPlayer;
      $("li").css("background", "white");
      $(`.${winner}`).css("background", "green");
      $(`.${winner}`).css("color", "white");
      $(`.${loser}`).css("color", "red");
      this.$el.append($(`<h2>The winner is, ${winner}!</h2>`));

    } else {
      $("li").css("color", "red");
      this.$el.append($("<h2>Draw, stupid</h2>"));
    }
  }
};



View.prototype.makeMove = function ($square) {
  let id = parseInt($square.data("id"));
  let pos = [ Math.floor(id/3), id % 3];
  let mark = this.game.currentPlayer;
  this.game.playMove(pos);
  $square.addClass(mark);
  $square.text(mark);
};

View.prototype.setupBoard = function () {
  const $ul = $("<ul></ul>");
  this.$el.append($ul);
  $ul.addClass("group");

  for (let i = 0; i < 9; i++){
    const $li = $("<li></li>");
    $li.data("id", i);
    $ul.append($li);
  }
  this.bindEvents();

};

module.exports = View;
