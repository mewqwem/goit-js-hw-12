import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showBtn,
  hideBtn,
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const btnLoadMore = document.querySelector('.btn-load-more');

function errorToast(message) {
  iziToast.error({ message: message, position: 'topRight' });
}

let userQuery = '';
let currentPage = 1;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.currentTarget.elements['search-text'].value.trim();

  if (query === '') {
    errorToast('Please enter a search query!');
    return;
  }

  userQuery = query;
  currentPage = 1;
  clearGallery();
  hideBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(userQuery, currentPage);

    if (data.hits.length === 0) {
      errorToast('Sorry, no images found!');
      return;
    }

    createGallery(data.hits);

    if (data.totalHits > 15) {
      showBtn();
    }

    searchForm.reset();
  } catch (error) {
    errorToast('Something went wrong!');
    console.log(error);
  } finally {
    hideLoader();
  }
});

btnLoadMore.addEventListener('click', async () => {
  currentPage += 1;
  hideBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(userQuery, currentPage);

    createGallery(data.hits, true);

    const galleryItem = document.querySelector('.gallery-item');

    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage >= totalPages) {
      hideBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: `topRight`,
      });
    } else {
      showBtn();
    }
  } catch (error) {
    errorToast('Error loading more images!');
  } finally {
    hideLoader();
  }
});
