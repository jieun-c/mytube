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

// q, videoId 가 분리되어있어 sessionStorage 로 데이터 관리
const sessionStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any, _: any, isReset: any) => {
      const confirm = newValue.length === 0;
      confirm
        ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const videoKeysAtom = atom({
  key: "videoKeysAtom",
  default: ["videos", { type: VIDEO_TYPE.POPULAR }, { search: "" }, { detailId: "" }] as VIDEO_KEYS,
  effects: [sessionStorageEffect("videoKeys")],
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
