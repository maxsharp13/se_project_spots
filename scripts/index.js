const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-button');

const newPostButton = document.querySelector('.profile__add-button');
const newPostModal = document.querySelector('#new-post-modal');
const newPostCloseButton = newPostModal.querySelector('.modal__close-button');

function openModal(modal) {
  modal.classList.add('modal_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('modal_is-opened');
}

editProfileButton.addEventListener('click', () => openModal(editProfileModal));
editProfileCloseButton.addEventListener('click', () => closeModal(editProfileModal));

newPostButton.addEventListener('click', () => openModal(newPostModal));
newPostCloseButton.addEventListener('click', () => closeModal(newPostModal));
