'use strict';

var FONT_SIZE = 16;

var Colors = {
  MY_SCORE_BAR: 'rgba(255, 0, 0, 1)',
  TEXT_COLOR: '#000',
  CLOUD_COLOR: '#fff',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.3)'
};

var RESULT_CLOUD = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  GAP: 10
};

var RESULT_BAR = {
  WIDTH: 40,
  MAX_HEIGHT: 150
};

var INDENT = {
  BOTTOM_TEXT_INDENT: 10,
  TOP_TEXT_INDENT: 10,
  BOTTOM_BAR_INDENT: 30,
  LEFT_TEXT_INDENT: 30,
  RIGHT_BAR_INDENT: 50,
  TOP_LABEL_INDENT: 25
};

var SCORE_RANGE = {
  MIN: 0,
  MAX: 5000
};

var Labels = {
  VICTORY: 'Ура вы победили!',
  RESULT: 'Список результатов:'
};

var PLAYER_NAMES = ['Вы', 'Кекс', 'Катя', 'Игорь'];

var createRandomFromRange = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, RESULT_CLOUD.WIDTH, RESULT_CLOUD.HEIGHT);
};

var renderText = function (ctx, x, y, color, text) {
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var renderScoreBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;

  ctx.fillRect(x, y, width, height);
};

var createScores = function () {
  var scoresArray = [];
  for (var i = 0; i < PLAYER_NAMES.length; i++) {
    scoresArray.push(createRandomFromRange(SCORE_RANGE.MIN, SCORE_RANGE.MAX));
  }

  return scoresArray;
};

var assignBarColor = function (name) {
  return (name === 'Вы') ? Colors.MY_SCORE_BAR : 'hsl(230,' + createRandomFromRange(0, 100) + '%, 50%)';
};

var renderPlayerScore = function (ctx, name, index, scores, max) {

  renderText(
      ctx,
      RESULT_CLOUD.X + INDENT.LEFT_TEXT_INDENT + index * (INDENT.RIGHT_BAR_INDENT + RESULT_BAR.WIDTH),
      RESULT_CLOUD.HEIGHT - INDENT.BOTTOM_TEXT_INDENT,
      Colors.TEXT_COLOR,
      name
  );

  renderText(
      ctx,
      RESULT_CLOUD.X + INDENT.LEFT_TEXT_INDENT + index * (INDENT.RIGHT_BAR_INDENT + RESULT_BAR.WIDTH),
      RESULT_CLOUD.HEIGHT - INDENT.BOTTOM_BAR_INDENT - RESULT_BAR.MAX_HEIGHT * (scores[index] / max) - INDENT.TOP_TEXT_INDENT,
      Colors.TEXT_COLOR,
      scores[index]
  );

  // ctx.fillStyle = assignBarColor(name);

  renderScoreBar(
      ctx,
      RESULT_CLOUD.X + INDENT.LEFT_TEXT_INDENT + index * (INDENT.RIGHT_BAR_INDENT + RESULT_BAR.WIDTH),
      RESULT_CLOUD.HEIGHT - INDENT.BOTTOM_BAR_INDENT - RESULT_BAR.MAX_HEIGHT * (scores[index] / max),
      RESULT_BAR.WIDTH,
      RESULT_BAR.MAX_HEIGHT * (scores[index] / max),
      assignBarColor(name)
  );
};

window.renderStatistics = function (ctx) {
  renderCloud(
      ctx,
      RESULT_CLOUD.X + RESULT_CLOUD.GAP,
      RESULT_CLOUD.Y + RESULT_CLOUD.GAP,
      Colors.SHADOW_COLOR);

  renderCloud(
      ctx,
      RESULT_CLOUD.X,
      RESULT_CLOUD.Y,
      Colors.CLOUD_COLOR);

  renderText(
      ctx,
      RESULT_CLOUD.X + INDENT.LEFT_TEXT_INDENT,
      RESULT_CLOUD.Y + INDENT.TOP_LABEL_INDENT,
      Colors.TEXT_COLOR,
      Labels.VICTORY
  );

  renderText(
      ctx,
      RESULT_CLOUD.X + INDENT.LEFT_TEXT_INDENT,
      RESULT_CLOUD.Y + INDENT.TOP_LABEL_INDENT + FONT_SIZE,
      Colors.TEXT_COLOR,
      Labels.RESULT
  );

  var playerScores = createScores();
  var maxScore = Math.max.apply(null, playerScores);

  PLAYER_NAMES.forEach(function (name, index) {
    renderPlayerScore(ctx, name, index, playerScores, maxScore);
  });
};
