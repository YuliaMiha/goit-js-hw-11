import { PixabayAPIMain } from './pixabayApi';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  inputSearchForm: document.querySelector('.search-form_input'),
  buttonSearchForm: document.querySelector('.search-form_button'),
  galleryCards: document.querySelector('.gallery'),
  buttonLoad: document.querySelector('.load-more'),
};

const pixabayApi = new PixabayAPIMain();
refs.buttonLoad.style.visibility = 'hidden';

refs.searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  refs.buttonLoad.style.visibility = 'hidden';
  const inputValue = e.target.elements.searchQuery.value;
  e.target.reset();

  refs.galleryCards.innerHTML = '';
  // pixabayApi.currentPage = 1;

  if (inputValue.length && inputValue.trim() !== '') {
    const { data } = await pixabayApi.getPixabayApi(inputValue);

    if (data.hits.length) {
      createGalleryCardsMarkup(data.hits);
      if (data.totalHits <= pixabayApi.currentPage * pixabayApi.perPage) {
        refs.buttonLoad.style.visibility = 'hidden';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      refs.buttonLoad.style.visibility = 'visible';
      return;
    }
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
});

refs.buttonLoad.addEventListener('click', async e => {
  console.log(e.target);

  const { data } = await pixabayApi.getPixabayApi();
  createGalleryCardsMarkup(data.hits);
  if (data.totalHits <= pixabayApi.currentPage * pixabayApi.perPage) {
    refs.buttonLoad.style.visibility = 'hidden';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
});

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGalleryCardsMarkup(photos) {
  const markup = photos
    .map(elem => {
      return `<div class="photo-card">
          <a href="${elem.largeImageURL}">
          <img class ="photo-card_image" src="${elem.webformatURL}" alt="${elem.tags}" width ="350px" height ="230px" loading="lazy" /> 
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b><br>
              ${elem.likes}
            </p>
            <p class="info-item">
              <b>Views</b><br>
              ${elem.views}
            </p>
            <p class="info-item">
              <b>Comments</b><br>
              ${elem.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b><br>
              ${elem.downloads}
            </p>
          </div>
        </div>`;
    })
    .join('');
  refs.galleryCards.insertAdjacentHTML('beforeend', markup);
  simpleLightBox.refresh();
}