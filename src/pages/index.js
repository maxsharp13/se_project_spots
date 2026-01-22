import "./index.css";
import Api from "../utils/Api";
import { enableValidation, resetValidation, settings } from "../scripts/validation.js";

import logo from "../images/Logo.svg";
import editIcon from "../images/Edit-Icon.svg";
import plusIcon from "../images/Plus-icon.svg";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c7e0ad30-3a01-4fbd-a80b-87629451769a",
    "Content-Type": "application/json",
  },
});

const headerLogo = document.querySelector(".header__logo");
const profileAvatar = document.querySelector(".profile__avatar");
const avatarButton = document.querySelector(".profile__avatar-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-modal");
const deleteModal = document.querySelector("#delete-confirm-modal");
const avatarModal = document.querySelector("#avatar-modal");

const editProfileForm = editProfileModal.querySelector(".modal__form");
const newPostForm = newPostModal.querySelector(".modal__form");
const deleteForm = deleteModal.querySelector(".modal__form");
const avatarForm = avatarModal.querySelector(".modal__form");

const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

let selectedCard;
let selectedCardId;

headerLogo.src = logo;
document.querySelector(".profile__edit-button img").src = editIcon;
document.querySelector(".profile__add-button img").src = plusIcon;

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".modal_is-opened");
    if (opened) closeModal(opened);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) closeModal(modal);
  });
});

document.querySelectorAll(".modal__close-button").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

function handleLikeCard(cardId, likeButton) {
  const request = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? api.dislikeCard(cardId)
    : api.likeCard(cardId);

  request
    .then(() => {
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .updateAvatar({ avatar: avatarForm.elements["avatar-link"].value })
    .then((user) => {
      profileAvatar.src = user.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

function createCard(data) {
  const card = cardTemplate.cloneNode(true);

  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const deleteBtn = card.querySelector(".card__delete-button");

  title.textContent = data.name;
  image.src = data.link;
  image.alt = data.name;

  if (data.isLiked) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  likeBtn.addEventListener("click", () =>
    handleLikeCard(data._id, likeBtn)
  );

  deleteBtn.addEventListener("click", () =>
    handleDeleteCard(card, data._id)
  );

  image.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return card;
}

function renderCard(data, prepend = false) {
  const card = createCard(data);
  prepend ? cardsList.prepend(card) : cardsList.append(card);
}

api
  .getAppInfo()
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.src = user.avatar;

    cards.forEach((card) => renderCard(card));
  })
  .catch(console.error);

document.querySelector(".profile__edit-button").addEventListener("click", () => {
  editProfileForm.elements["profile-name"].value = profileName.textContent;
  editProfileForm.elements["profile-description"].value =
    profileDescription.textContent;

  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .editUserInfo({
      name: editProfileForm.elements["profile-name"].value,
      about: editProfileForm.elements["profile-description"].value,
    })
    .then((user) => {
      profileName.textContent = user.name;
      profileDescription.textContent = user.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  resetValidation(newPostForm, settings);
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .addCard({
      name: newPostForm.elements["post-caption"].value,
      link: newPostForm.elements["post-url"].value,
    })
    .then((card) => {
      renderCard(card, true);
      closeModal(newPostModal);
      newPostForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
});

deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Deleting...";

  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Yes";
    });
});

avatarButton.addEventListener("click", () => {
  resetValidation(avatarForm, settings);
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(settings);
