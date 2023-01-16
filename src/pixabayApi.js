import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const HEADERS = {
  key: '32798686-213103188f3fa7636822d64bb',
};

export class PixabayAPIMain {
  currentPage = 1;
  inputValue = null;
  perPage = 40;

  getPixabayApi(inputValue) {
    if (inputValue) {
      this.currentPage = 1;
      this.inputValue = inputValue;
    } else {
      this.currentPage++;
    }
    const params = new URLSearchParams({
      key: HEADERS.key,
      q: this.inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.currentPage,
      per_page: this.perPage,
    });
    return axios.get(`${BASE_URL}?${params}`);
  }
}