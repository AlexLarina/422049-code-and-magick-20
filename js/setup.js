'use strict';

(function () {
  var WIZARDS_COUNT = 5;
  var Key = {
    ESCAPE: 'Escape',
    ENTER: 'Enter'
  };

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
    ],
    FIREBALL_COLORS: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };

  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');

  var wizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardListElement = document.querySelector('.setup-similar-list');
  var wizardSimilarElement = document.querySelector('.setup-similar');

  var wizardCoatElement = setupElement.querySelector('.setup-wizard .wizard-coat');
  var wizardEyesElement = setupElement.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireballElement = setupElement.querySelector('.setup-fireball-wrap');

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

  var removeChildren = function (parentNode) {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }
  };

  var resetSetupForm = function () {
    removeChildren(wizardListElement);
  };

  var showSimilarWizards = function () {
    var wizardsDataArray = createWizardsArray(WIZARDS_COUNT);
    wizardListElement.appendChild(renderWizards(wizardsDataArray));
    wizardSimilarElement.classList.remove('hidden');
  };

  var escClosePopupHandler = function (evt) {
    if (evt.key === Key.ESCAPE) {
      evt.preventDefault();
      setupElement.classList.add('hidden');
    }
  };

  var changeCoatColorHandler = function () {
    var wizardCoatInputElement = setupElement.querySelector('input[name="coat-color"]');

    var coatColor = WIZARD.COAT_COLORS[createRandom(0, WIZARD.COAT_COLORS.length - 1)];
    wizardCoatElement.style.fill = coatColor;
    wizardCoatInputElement.value = coatColor;
  };

  var changeEyeColorHandler = function () {
    var wizardEyesInputElement = setupElement.querySelector('input[name="eyes-color"]');

    var eyesColor = WIZARD.EYE_COLORS[createRandom(0, WIZARD.EYE_COLORS.length - 1)];
    wizardEyesElement.style.fill = eyesColor;
    wizardEyesInputElement.value = eyesColor;
  };

  var changeFireballColorHandler = function () {
    var wizardFireballInputElement = setupElement.querySelector('input[name="fireball-color"]');

    var fireballColor = WIZARD.FIREBALL_COLORS[createRandom(0, WIZARD.FIREBALL_COLORS.length - 1)];
    wizardFireballElement.style.backgroundColor = fireballColor;
    wizardFireballInputElement.value = fireballColor;
  };

  var openPopupHandler = function () {
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', escClosePopupHandler);
    showSimilarWizards();

    wizardCoatElement.addEventListener('click', changeCoatColorHandler);
    wizardEyesElement.addEventListener('click', changeEyeColorHandler);
    wizardFireballElement.addEventListener('click', changeFireballColorHandler);
  };

  var closePopupHandler = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', escClosePopupHandler);
    resetSetupForm();

    wizardCoatElement.removeEventListener('click', changeCoatColorHandler);
    wizardEyesElement.removeEventListener('click', changeEyeColorHandler);
    wizardFireballElement.removeEventListener('click', changeFireballColorHandler);
  };

  setupOpenElement.addEventListener('click', function () {
    openPopupHandler();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.key === Key.ENTER) {
      openPopupHandler();
    }
  });

  setupCloseElement.addEventListener('click', function () {
    closePopupHandler();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.key === Key.ENTER) {
      closePopupHandler();
    }
  });
})();
