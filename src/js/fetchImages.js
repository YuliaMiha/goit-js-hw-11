import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32790565-383584a211a893fe9ad088e3f';


 export function getGallery(value, page, per_page) {
        const config = {
                key: API_KEY,
                q: value,
                image_type: "photo",
                orientation: "horizontal",
            safesearch: "true",
            page: page,
            per_page: per_page,
            
        }
     const response = axios.get(`${BASE_URL}`,{ params: config });
     return response;
    } 
