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
  EYES_COLORS: [
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

var chooseRandomArrayIndex = function (array, size) {
  return array
    .slice()
    .sort(function () {
      return Math.random() - 0.5;
    })
    .slice(0, size);
};

var chooseWizardNames = function (names, surnames) {
  var randomIndexArray = chooseRandomArrayIndex(
      Array.from(WIZARD.NAMES.keys()),
      WIZARDS_COUNT
  );

  return (
    randomIndexArray.map(function (index) {
      return names[index] + ' ' + surnames[index];
    })
  );
};

var createWizardData = function (names) {
  return names.map(function (name) {
    return {
      name: name,
      coatColor: WIZARD.COAT_COLORS[createRandom(0, WIZARD.COAT_COLORS.length - 1)],
      eyesColor: WIZARD.EYES_COLORS[createRandom(0, WIZARD.EYES_COLORS.length - 1)]
    };
  });
};

var createWizardsArray = function () {
  var wizardNames = chooseWizardNames(WIZARD.NAMES, WIZARD.SURNAMES);

  return createWizardData(wizardNames);
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

var wizardsDataArray = createWizardsArray();
wizardListElement.appendChild(renderWizards(wizardsDataArray));

setupElement.classList.remove('hidden');
wizardSimilarElement.classList.remove('hidden');
