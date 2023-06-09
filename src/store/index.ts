import { atom, selector } from "recoil";
import { getSearchData, getPopularData, getRelatedData } from "./../service";
// import { getPopularMock, getSearchMock, getRelatedMock } from "../service";
import { sessionStorageEffect } from "../utils";
import { IVideosInfo, VIDEO_KEYS, IVideo, VIDEO_TYPE } from "./../types";

// (q, videoId 가 분리되어있어 sessionStorage 로 데이터 관리)
export const videoKeysAtom = atom({
  key: "videoKeysAtom",
  default: {
    key: "videos",
    type: VIDEO_TYPE.POPULAR,
    search: "",
    detailId: "",
    channelId: "",
  } as VIDEO_KEYS,
  effects: [sessionStorageEffect("videoKeys")],
});

export const videosInfoAtom = selector({
  key: "videosInfoAtom",
  get: ({ get }) => {
    // info 는 key 를 구독한다.
    const currentKey = get(videoKeysAtom);

    // 구독한 key 에 따라, fn 과 함께 묶어서 return 한다.
    if (currentKey.type === VIDEO_TYPE.SEARCH) {
      return {
        queryKey: Object.values(currentKey),
        queryFn: () => getSearchData(currentKey.search ?? ""),
      } as IVideosInfo;
    } else if (currentKey.type === VIDEO_TYPE.RELATED) {
      return {
        queryKey: Object.values(currentKey),
        queryFn: () => getRelatedData(currentKey.channelId ?? ""),
      } as IVideosInfo;
    }
    return { queryKey: Object.values(currentKey), queryFn: () => getPopularData() } as IVideosInfo;
  },
});

export const currentVideoAtom = atom({
  key: "currentVideo",
  default: {} as IVideo,
});
