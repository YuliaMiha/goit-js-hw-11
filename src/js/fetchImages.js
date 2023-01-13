export const fetchImages = async (inputValue, numberId) => {
    return await fetch(`https://pixabay.com/api/?key=32803223-d7ae4ad2160d4578da0803e08&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${numberId}`
    )
     .then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
    
};