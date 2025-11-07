const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-button');

const newPostButton = document.querySelector('.profile__add-button');
const newPostModal = document.querySelector('#new-post-modal');
const newPostCloseButton = newPostModal.querySelector('.modal__close-button');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const editProfileForm = editProfileModal.querySelector('.form');
const nameInput = editProfileForm.querySelector('.modal__input_type_name');
const descriptionInput = editProfileForm.querySelector('.modal__input_type_description');

const newPostForm = newPostModal.querySelector('.form');
const postTitleInput = newPostForm.querySelector('.modal__input_type_title');
const postLinkInput = newPostForm.querySelector('.modal__input_type_link');

function openModal(modal) {
  modal.classList.add('modal_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('modal_is-opened');
}

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener('click', () => closeModal(editProfileModal));

newPostButton.addEventListener('click', () => openModal(newPostModal));

newPostCloseButton.addEventListener('click', () => closeModal(newPostModal));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log('New Post Title:', postTitleInput.value);
  console.log('New Post Link:', postLinkInput.value);
  closeModal(newPostModal);
}

newPostForm.addEventListener('submit', handleNewPostSubmit);
