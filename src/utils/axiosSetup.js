import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'https://api.tvmaze.com/singlesearch/shows'
});

const makeRequest = (searchTerm, options = { method: 'GET' }) => {
  return apiInstance({
    method: options.method,
    params: { q: searchTerm, embed: 'episodes' }
  }).then(response => response.data);
};

export default makeRequest;
