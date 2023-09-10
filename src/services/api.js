import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, currentPage) {
  const params = new URLSearchParams({
    key: '38416379-238676dbcbb7f9c6c32e98c6d',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: 12,
  });

  const resp = await axios.get(`?${params}`);
  return await resp.data;
}
