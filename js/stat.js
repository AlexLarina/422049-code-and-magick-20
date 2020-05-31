'use strict';

var FONT_SIZE = 16;

var resultCloud = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  GAP: 10
};

var resultBar = {
  WIDTH: 40,
  MAX_HEIGHT: 150
};

var indent = {
  BOTTOM_TEXT_INDENT: 10,
  TOP_TEXT_INDENT: 10,
  BOTTOM_BAR_INDENT: 30,
  LEFT_TEXT_INDENT: 30,
  RIGHT_BAR_INDENT: 50,
  TOP_LABEL_INDENT: 25
};

var scoreRange = {
  MIN: 0,
  MAX: 5000
};

var playersNames = ['Вы', 'Кекс', 'Катя', 'Игорь'];

var createRandomFromRange = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, resultCloud.WIDTH, resultCloud.HEIGHT);
};

var renderLabel = function (ctx, x, y, color, text) {
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var createScores = function () {
  var scoresArray = [];
  for (var i = 0; i < playersNames.length; i++) {
    scoresArray.push(createRandomFromRange(scoreRange.MIN, scoreRange.MAX));
  }

  return scoresArray;
};

window.renderStatistics = function (ctx) {
  renderCloud(
      ctx,
      resultCloud.X + resultCloud.GAP,
      resultCloud.Y + resultCloud.GAP,
      'rgba(0, 0, 0, 0.3)');
  renderCloud(
      ctx,
      resultCloud.X,
      resultCloud.Y,
      '#fff');
  renderLabel(
      ctx,
      resultCloud.X + indent.LEFT_TEXT_INDENT,
      resultCloud.Y + indent.TOP_LABEL_INDENT,
      '#000',
      'Ура вы победили!'
  );
  renderLabel(
      ctx,
      resultCloud.X + indent.LEFT_TEXT_INDENT,
      resultCloud.Y + indent.TOP_LABEL_INDENT + FONT_SIZE,
      '#000',
      'Список результатов:'
  );

  var playersScores = createScores();
  var maxScore = Math.max.apply(null, playersScores);

  playersNames.forEach(function (name, index) {
    ctx.fillStyle = '#000';
    ctx.fillText(
        name,
        resultCloud.X + indent.LEFT_TEXT_INDENT + index * (indent.RIGHT_BAR_INDENT + resultBar.WIDTH),
        resultCloud.HEIGHT - indent.BOTTOM_TEXT_INDENT);
    ctx.fillText(
        playersScores[index],
        resultCloud.X + indent.LEFT_TEXT_INDENT + index * (indent.RIGHT_BAR_INDENT + resultBar.WIDTH),
        resultCloud.HEIGHT - indent.BOTTOM_BAR_INDENT - resultBar.MAX_HEIGHT * (playersScores[index] / maxScore) - indent.TOP_TEXT_INDENT);
    ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(230,' + createRandomFromRange(0, 100) + '%, 50%)';
    ctx.fillRect(
        resultCloud.X + indent.LEFT_TEXT_INDENT + index * (indent.RIGHT_BAR_INDENT + resultBar.WIDTH),
        resultCloud.HEIGHT - indent.BOTTOM_BAR_INDENT - resultBar.MAX_HEIGHT * (playersScores[index] / maxScore),
        resultBar.WIDTH,
        resultBar.MAX_HEIGHT * (playersScores[index] / maxScore));
  });
};
