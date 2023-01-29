import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImagesBySearchQuery(searchQuery, page) {
  const { data } = await axios.get('', {
    params: {
      key: '32382807-167a2d79aeddf1c8c56a7ed15',
      q: searchQuery,
      image_type: 'photo',
      per_page: 12,
      page,
    },
  });
  return data;
}
