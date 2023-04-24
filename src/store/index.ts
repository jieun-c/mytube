import { atom, selector } from "recoil";
import { IVideosInfo } from "./../types/index";

export const KEYS = ["popular", "search"];

const getData = () => {
  return fetch("/videos.json")
    .then((res) => res.json())
    .then((data) => data.items);
};

const getSearchData = () => {
  return fetch("/search.json")
    .then((res) => res.json())
    .then((data) => data.items);
};

export const keyAtom = atom({
  key: "key",
  default: [KEYS[0], ""],
});

// const initialVideosInfoAtom = atom({
//   key: "initialInfoAtom",
//   default: {
//     queryKey: [KEYS[0], ""],
//     fn: () => getData(),
//   },
// });

export const videosInfoAtom = selector({
  key: "videosInfoAtom",
  get: ({ get }) => {
    const key = get(keyAtom);

    // key[0] 가 search 이고, key[1] 에 값(search keyword)이 있을 경우,
    if (key[0] === KEYS[1] && key[1]) {
      return { queryKey: [KEYS[1], ""], fn: () => getSearchData() } as IVideosInfo;
    }

    return { queryKey: [KEYS[0], ""], fn: () => getData() } as IVideosInfo;
  },
});
