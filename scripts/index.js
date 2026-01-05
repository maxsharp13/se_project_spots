const initialCards = [
  { name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
  { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
  { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
  { name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
  { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
  { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" }
];

const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-modal");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = editProfileModal.querySelector(".modal__form");
const newPostForm = newPostModal.querySelector(".modal__form");

const nameInput = editProfileForm.querySelector(".modal__input_type_name");
const descriptionInput = editProfileForm.querySelector(".modal__input_type_description");
const titleInput = newPostForm.querySelector(".modal__input_type_title");
const linkInput = newPostForm.querySelector(".modal__input_type_link");

const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModalEl = document.querySelector(".modal_is-opened");
    if (openModalEl) closeModal(openModalEl);
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) closeModal(modal);
  });
});

function createCard(data) {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-button");
  const deleteBtn = card.querySelector(".card__delete-button");

  image.src = data.link;
  image.alt = data.name;
  title.textContent = data.name;

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_is-active");
  });

  deleteBtn.addEventListener("click", () => card.remove());

  image.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return card;
}

function renderCard(data) {
  cardsContainer.prepend(createCard(data));
}

initialCards.forEach(renderCard);

document.querySelector(".profile__edit-button").addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = Array.from(editProfileForm.querySelectorAll(".modal__input"));
  inputs.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(editProfileForm, input, input.validationMessage, settings);
    }
  });

  if (!editProfileForm.checkValidity()) return;

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = Array.from(newPostForm.querySelectorAll(".modal__input"));
  inputs.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(newPostForm, input, input.validationMessage, settings);
    }
  });

  if (!newPostForm.checkValidity()) return;

  renderCard({ name: titleInput.value, link: linkInput.value });
  newPostForm.reset();
  resetValidation(newPostForm, settings);
  closeModal(newPostModal);
});

document.querySelectorAll(".modal__close-button").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});
