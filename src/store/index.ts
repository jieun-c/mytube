import { atom, selector } from "recoil";
import { IVideosInfo, VIDEO_KEYS } from "./../types/index";

export const VIDEO_TYPE = {
  POPULAR: "popular",
  SEARCH: "search",
};

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

export const videoKeysAtom = atom({
  key: "videoKeysAtom",
  default: ["videos", { type: VIDEO_TYPE.POPULAR }, { search: "" }, { detailId: "" }] as VIDEO_KEYS,
});

export const videosInfoAtom = selector({
  key: "videosInfoAtom",
  get: ({ get }) => {
    // info 는 key 를 구독한다.
    const currentKey = get(videoKeysAtom);

    // 구독한 key 에 따라, fn 과 함께 묶어서 return 한다.
    if (currentKey[1].type === VIDEO_TYPE.SEARCH && currentKey[2].search) {
      return { queryKey: currentKey, queryFn: () => getSearchData() } as IVideosInfo;
    }
    return { queryKey: currentKey, queryFn: () => getData() } as IVideosInfo;
  },
});
