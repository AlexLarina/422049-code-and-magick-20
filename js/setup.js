'use strict';

var WIZARDS_COUNT = 5;

var WIZARD = {
  NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  SURNAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  COAT_COLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYE_COLORS: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

var setupElement = document.querySelector('.setup');
var wizardTemplateElement = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var wizardListElement = document.querySelector('.setup-similar-list');
var wizardSimilarElement = document.querySelector('.setup-similar');

var createRandom = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var shuffle = function (array) {
  return array
    .slice()
    .sort(function () {
      return Math.random() - 0.5;
    });
};

var createWizardsArray = function (count) {
  return Array(count).fill().map(function (value, index) {
    return {
      name: shuffle(WIZARD.NAMES)[index] + ' ' + shuffle(WIZARD.SURNAMES)[index],
      coatColor: WIZARD.COAT_COLORS[createRandom(0, WIZARD.COAT_COLORS.length - 1)],
      eyesColor: WIZARD.EYE_COLORS[createRandom(0, WIZARD.EYE_COLORS.length - 1)]
    };
  });
};

var renderWizardElement = function (wizard) {
  var wizardElement = wizardTemplateElement.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizardsArray) {
  var fragment = new DocumentFragment();

  wizardsArray.forEach(function (wizard) {
    fragment.appendChild(renderWizardElement(wizard));
  });

  return fragment;
};

var wizardsDataArray = createWizardsArray(WIZARDS_COUNT);
wizardListElement.appendChild(renderWizards(wizardsDataArray));

setupElement.classList.remove('hidden');
wizardSimilarElement.classList.remove('hidden');
