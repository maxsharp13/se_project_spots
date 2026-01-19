const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(form, input, message, config) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = message;
  error.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.textContent = "";
  error.classList.remove(config.errorClass);
}

function toggleButtonState(inputs, button, config) {
  const isInvalid = inputs.some((input) => !input.validity.valid);
  button.disabled = isInvalid;
  button.classList.toggle(config.inactiveButtonClass, isInvalid);
}

function enableValidation(config) {
  document.querySelectorAll(config.formSelector).forEach((form) => {
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputs, button, config);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.validity.valid
          ? hideInputError(form, input, config)
          : showInputError(form, input, input.validationMessage, config);

        toggleButtonState(inputs, button, config);
      });
    });
  });
}

function resetValidation(form, config) {
  const inputs = [...form.querySelectorAll(config.inputSelector)];
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => hideInputError(form, input, config));
  toggleButtonState(inputs, button, config);
}

export { enableValidation, resetValidation, settings };
