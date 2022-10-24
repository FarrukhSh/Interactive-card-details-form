"use strict";

let cardNameInput = document.querySelector("#cardHolderNameInput");
let cardNameOutput = document.querySelector("#cardHolderNameOutput");

let cardNumberInput = document.querySelector("#cardNumberInput");
let cardNumberOutput = document.querySelector("#cardNumberOutput");

let monthInput = document.querySelector("#dateMmInput");
let monthOutput = document.querySelector("#cardExpDateMmOutput");

let yearInput = document.querySelector("#dateYyInput");
let yearOutput = document.querySelector("#cardExpDateYyOutput");

let cvcInput = document.querySelector("#cvcInput");
let cvcOutput = document.querySelector("#cardCvcOutput");

let confirmButton = document.querySelector("#confirmButton");

let formAction = document.querySelector(".input-form");
let compForm = document.querySelector(".completed-form");

let continueButton = document.querySelector("#continueButton");

let errorNumber = document.querySelector("#wrongFormat");
let errorMoYe = document.querySelector(".error-text-mmyy");
let errorCvc = document.querySelector(".error-text-cvc");

function markAsDirty(element, errorElement) {
  if (element) {
    element.style.borderColor = "hsl(0, 100%, 66%)";
  }
  if (errorElement) {
    errorElement.style.display = "flex";
  }
}

function markAsValid(element, errorElement) {
  if (element) {
    element.style.borderColor = "";
  }
  if (errorElement) {
    errorElement.style.display = "none";
  }
}

const formElements = [
  {
    inputElement: cardNameInput,
    outputElement: cardNameOutput,
    errorElement: null,
    formatter: function () {
      this.outputElement.value = (this.inputElement.value || "").toUpperCase();
    },
    validator: function () {
      if (this.inputElement.value) {
        markAsValid(this.inputElement);
        return true;
      }
      markAsDirty(this.inputElement);
      return false;
    },
  },
  {
    inputElement: cardNumberInput,
    outputElement: cardNumberOutput,
    errorElement: errorNumber,
    formatter: function () {
      this.outputElement.value = (this.inputElement.value || "").replace(
        /(\d)(?=(\d{4})+(\D|$))/g,
        "$1 "
      );
    },
    validator: function () {
      const value = this.inputElement.value;
      const isValid = value && value.length === 16 && !isNaN(value);

      if (isValid) {
        markAsValid(this.inputElement, this.errorElement);
        return true;
      }

      markAsDirty(this.inputElement, this.errorElement);
      return false;
    },
  },
  {
    inputElement: monthInput,
    outputElement: monthOutput,
    errorElement: errorMoYe,
    formatter: function () {
      this.outputElement.value = this.inputElement.value;
    },
    validator: function () {
      const value = this.inputElement.value;
      const numberValue = Number(value);

      const isValid = value && value.length === 2 && !isNaN(value) && numberValue > 0 && numberValue <= 12;

      if (isValid) {
        markAsValid(this.inputElement, this.errorElement);
        return true;
      }

      markAsDirty(this.inputElement, this.errorElement);
      return false;
    },
  },
  {
    inputElement: yearInput,
    outputElement: yearOutput,
    errorElement: errorMoYe,
    formatter: function () {
      this.outputElement.value = this.inputElement.value;
    },
    validator: function () {
      const value = this.inputElement.value;
      const isValid = value && value.length === 2 && !isNaN(value);

      if (isValid) {
        markAsValid(this.inputElement, this.errorElement);
        return true;
      }

      markAsDirty(this.inputElement, this.errorElement);
      return false;
    },
  },
  {
    inputElement: cvcInput,
    outputElement: cvcOutput,
    errorElement: errorCvc,
    formatter: function () {
      this.outputElement.value = this.inputElement.value;
    },
    validator: function () {
      const value = this.inputElement.value;
      const isValid = value && value.length === 3 && !isNaN(value);

      if (isValid) {
        markAsValid(this.inputElement, this.errorElement);
        return true;
      }

      markAsDirty(this.inputElement, this.errorElement);
      return false;
    },
  },
];

for (const item of formElements) {
  item.inputElement.addEventListener("input", item.formatter.bind(item));
}

confirmButton.addEventListener("click", () => {
  let isAllValid = true;

  for (const item of formElements) {
    if (!item.validator()) {
      isAllValid = false;
    }
  }

  if (isAllValid) {
    formAction.style.display = "none";
    compForm.style.display = "flex";
  }
});
const dataBase = [];

continueButton.addEventListener('click', () => {

  for (const item of formElements) {
    dataBase.push(item.inputElement.value);
  }

  for (const item of formElements) {
    item.inputElement.value = '';
    item.outputElement.value = '';
  }

  formAction.style.display = 'flex';
  compForm.style.display = "none";
});
