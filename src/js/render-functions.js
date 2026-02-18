import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.btn-load-more');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images, append = false) {
  const markup = images
    .map(image => {
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${image.largeImageURL}">
            <img 
              class="gallery-image" 
              src="${image.webformatURL}" 
              alt="${image.tags}" 
            />
          </a>
          <div class="info">
            <div class="info-item"><b>Likes</b><span>${image.likes}</span></div>
            <div class="info-item"><b>Views</b><span>${image.views}</span></div>
            <div class="info-item"><b>Comments</b><span>${image.comments}</span></div>
            <div class="info-item"><b>Downloads</b><span>${image.downloads}</span></div>
          </div>
        </li>`;
    })
    .join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }

  lightbox.refresh();
}
export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-active');
}

export function hideLoader() {
  loader.classList.remove('is-active');
}
export function showBtn() {
  btnLoadMore.classList.remove('visually-hidden');
}
export function hideBtn() {
  btnLoadMore.classList.add('visually-hidden');
}
