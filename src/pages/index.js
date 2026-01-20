import "./index.css";
import Api from "../utils/Api";
import { enableValidation, resetValidation, settings } from "../scripts/validation.js";

import logo from "../images/Logo.svg";
import avatar from "../images/avatar.jpg";
import editIcon from "../images/Edit-Icon.svg";
import plusIcon from "../images/Plus-icon.svg";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c7e0ad30-3a01-4fbd-a80b-87629451769a",
    "Content-Type": "application/json",
  },
});

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

document.addEventListener("DOMContentLoaded", () => {
  const headerLogo = document.querySelector(".header__logo");
  const profileAvatar = document.querySelector(".profile__avatar");
  const editBtnIcon = document.querySelector(".profile__edit-button img");
  const addBtnIcon = document.querySelector(".profile__add-button img");

  if (headerLogo) {
    headerLogo.src = logo;
    headerLogo.alt = "Spots logo";
  }
  if (profileAvatar) {
    profileAvatar.src = avatar;
    profileAvatar.alt = "User avatar";
  }
  if (editBtnIcon) {
    editBtnIcon.src = editIcon;
    editBtnIcon.alt = "Edit icon";
  }
  if (addBtnIcon) {
    addBtnIcon.src = plusIcon;
    addBtnIcon.alt = "Plus icon";
  }

  enableValidation(settings);

  const cardsList = document.querySelector(".cards__list");
  const template = document.querySelector("#card-template");
  const cardTemplate = template?.content?.querySelector(".card");

  const editProfileModal = document.querySelector("#edit-profile-modal");
  const newPostModal = document.querySelector("#new-post-modal");
  const previewModal = document.querySelector("#preview-modal");

  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  const editProfileForm = editProfileModal?.querySelector(".modal__form");
  const newPostForm = newPostModal?.querySelector(".modal__form");

  const previewImage = previewModal?.querySelector(".modal__image");
  const previewCaption = previewModal?.querySelector(".modal__caption");

  if (!cardsList || !cardTemplate) {
    console.error("Missing .cards__list or #card-template in HTML");
    return;
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_is-opened");
      if (openedModal) closeModal(openedModal);
    }
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("modal_is-opened");
    document.addEventListener("keydown", handleEscClose);
  }

  function closeModal(modal) {
    if (!modal) return;
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

  // ---- Cards ----
  function createCard(data) {
    const card = cardTemplate.cloneNode(true);

    const image = card.querySelector(".card__image");
    const title = card.querySelector(".card__title");
    const likeButton = card.querySelector(".card__like-button");
    const deleteButton = card.querySelector(".card__delete-button");

    title.textContent = data.name;

    image.src = data.link;
    image.alt = data.name;

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
    });

    deleteButton.addEventListener("click", () => {
      card.remove();
    });

    image.addEventListener("click", () => {
      if (!previewModal || !previewImage || !previewCaption) return;
      previewImage.src = data.link;
      previewImage.alt = data.name;
      previewCaption.textContent = data.name;
      openModal(previewModal);
    });

    return card;
  }

  function renderCard(data, method = "append") {
    const cardEl = createCard(data);
    if (method === "prepend") cardsList.prepend(cardEl);
    else cardsList.append(cardEl);
  }

  initialCards.forEach((card) => renderCard(card));

  // ---- Edit profile ----
  const editBtn = document.querySelector(".profile__edit-button");
  editBtn?.addEventListener("click", () => {
    if (!editProfileForm) return;

    editProfileForm.elements["profile-name"].value = profileName?.textContent ?? "";
    editProfileForm.elements["profile-description"].value =
      profileDescription?.textContent ?? "";

    resetValidation(editProfileForm, settings);
    openModal(editProfileModal);
  });

  editProfileForm?.addEventListener("submit", (evt) => {
    evt.preventDefault();

    if (profileName) {
      profileName.textContent = editProfileForm.elements["profile-name"].value;
    }
    if (profileDescription) {
      profileDescription.textContent =
        editProfileForm.elements["profile-description"].value;
    }

    closeModal(editProfileModal);
  });

  const addBtn = document.querySelector(".profile__add-button");
  addBtn?.addEventListener("click", () => {
    if (!newPostForm) return;
    resetValidation(newPostForm, settings);
    openModal(newPostModal);
  });

  newPostForm?.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const name = newPostForm.elements["post-caption"].value;
    const link = newPostForm.elements["post-url"].value;

    renderCard({ name, link }, "prepend");

    newPostForm.reset();
    resetValidation(newPostForm, settings);
    closeModal(newPostModal);
  });
});
