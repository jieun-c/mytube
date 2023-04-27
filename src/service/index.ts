import axios from "axios";

const { VITE_YOUTUBE_API_BASE_URL: BASE_URL, VITE_YOUTUBE_API_KEY: KEY } = import.meta.env;

export const getPopularData = async () => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet",
      chart: "mostPopular",
      maxResults: "25",
      key: KEY,
    },
  });

  if (response.status >= 400 && response.status <= 599) {
    throw Error;
  }
  return response.data.items;
};

export const getSearchData = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      maxResults: "25",
      key: KEY,
    },
  });

  if (response.status >= 400 && response.status <= 599) {
    throw Error;
  }
  return response.data.items.map((item: any) => ({ ...item, id: item.id.videoId }));
};

// Mock Data - Popular
export const getPopularMock = () => {
  return fetch("/mock/videos.json")
    .then((res) => res.json())
    .then((data) => data.items);
};

// Mock Data - Search
export const getSearchMock = (query: string) => {
  return fetch("/mock/search.json")
    .then((res) => res.json())
    .then((data) => data.items.map((item: any) => ({ ...item, id: item.id.videoId })));
};
