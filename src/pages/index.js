import "./index.css";
import { enableValidation, resetValidation, settings } from "../scripts/validation.js";

import logo from "../images/Logo.svg";
import avatar from "../images/avatar.jpg";
import editIcon from "../images/Edit-Icon.svg";
import plusIcon from "../images/Plus-icon.svg";

document.querySelector(".header__logo").src = logo;
document.querySelector(".profile__avatar").src = avatar;
document.querySelector(".profile__edit-button img").src = editIcon;
document.querySelector(".profile__add-button img").src = plusIcon;

enableValidation(settings);

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-modal");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = editProfileModal.querySelector(".modal__form");
const newPostForm = newPostModal.querySelector(".modal__form");

const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
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
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

document.querySelectorAll(".modal__close-button").forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".modal"));
  });
});

function createCard(data) {
  const card = cardTemplate.cloneNode(true);

  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  image.src = data.link;
  image.alt = data.name;
  title.textContent = data.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  image.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return card;
}

initialCards.forEach((card) => {
  cardsList.append(createCard(card));
});

document.querySelector(".profile__edit-button").addEventListener("click", () => {
  editProfileForm.elements["profile-name"].value = profileName.textContent;
  editProfileForm.elements["profile-description"].value =
    profileDescription.textContent;

  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileName.textContent =
    editProfileForm.elements["profile-name"].value;
  profileDescription.textContent =
    editProfileForm.elements["profile-description"].value;

  closeModal(editProfileModal);
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  cardsList.prepend(
    createCard({
      name: newPostForm.elements["post-caption"].value,
      link: newPostForm.elements["post-url"].value,
    })
  );

  newPostForm.reset();
  resetValidation(newPostForm, settings);
  closeModal(newPostModal);
});
