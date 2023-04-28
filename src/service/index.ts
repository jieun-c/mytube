import axios from "axios";
import { IVideo } from "../types";

const { VITE_YOUTUBE_API_BASE_URL: BASE_URL, VITE_YOUTUBE_API_KEY: KEY } = import.meta.env;

export const getPopularData = async () => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      key: KEY,
      regionCode: "KR",
      part: "snippet",
      chart: "mostPopular",
      maxResults: "25",
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
      key: KEY,
      regionCode: "KR",
      part: "snippet",
      maxResults: "25",
      q: query,
    },
  });

  if (response.status >= 400 && response.status <= 599) {
    throw Error;
  }

  const filteredItems = response.data.items.filter((item: IVideo) => !item.id.channelId);
  return filteredItems.map((item: IVideo) => ({ ...item, id: item.id.videoId }));
};

export const getRelatedData = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      key: KEY,
      regionCode: "KR",
      part: "snippet",
      maxResults: "25",
      type: "video",
      relatedToVideoId: id,
    },
  });

  if (response.status >= 400 && response.status <= 599) {
    throw Error;
  }

  const filteredItems = response.data.items.filter((item: IVideo) => !item.id.channelId);
  return filteredItems.map((item: IVideo) => ({ ...item, id: item.id.videoId }));
};

export const getCurrentData = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet",
      key: KEY,
      regionCode: "KR",
      id,
    },
  });

  if (response.status >= 400 && response.status <= 599) {
    throw Error;
  }
  return response.data.items;
};

// Mock Data - Popular
export const getPopularMock = () => {
  return fetch("/mock/videos.json")
    .then((res) => res.json())
    .then((data) => data.items);
};

// Mock Data - Search
export const getSearchMock = (_query: string) => {
  return fetch("/mock/search.json")
    .then((res) => res.json())
    .then((data) => data.items.map((item: any) => ({ ...item, id: item.id.videoId })));
};

// Mock Data - Related
export const getRelatedMock = (_id: string) => {
  return fetch("/mock/related.json")
    .then((res) => res.json())
    .then((data) => data.items.map((item: any) => ({ ...item, id: item.id.videoId })));
};

// Mock Data - Current
export const getCurrentMock = (_id: string) => {
  return fetch("/mock/current.json")
    .then((res) => res.json())
    .then((data) => data.items);
};
