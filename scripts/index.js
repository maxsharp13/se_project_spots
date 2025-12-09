const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
  }
];


function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileClose = editProfileModal.querySelector(".modal__close-button");

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");

const editProfileForm = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector(".modal__input_type_name");
const descriptionInput = editProfileModal.querySelector(".modal__input_type_description");

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClose = newPostModal.querySelector(".modal__close-button");

const newPostForm = newPostModal.querySelector(".modal__form");
const postTitleInput = newPostModal.querySelector(".modal__input_type_title");
const postLinkInput = newPostModal.querySelector(".modal__input_type_link");

const cardsList = document.querySelector(".cards__list");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewClose = previewModal.querySelector(".modal__close-button_type_preview");



function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}



function renderCard(data) {
  const cardEl = getCardElement(data);
  cardsList.prepend(cardEl);
}



initialCards.forEach((card) => renderCard(card));



editProfileButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
});

editProfileClose.addEventListener("click", () => closeModal(editProfileModal));

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;

  closeModal(editProfileModal);
});



newPostButton.addEventListener("click", () => openModal(newPostModal));
newPostClose.addEventListener("click", () => closeModal(newPostModal));

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCard = {
    name: postTitleInput.value,
    link: postLinkInput.value
  };

  renderCard(newCard);
  closeModal(newPostModal);

  postTitleInput.value = "";
  postLinkInput.value = "";
});



previewClose.addEventListener("click", () => closeModal(previewModal));
