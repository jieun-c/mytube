export const VIDEO_TYPE = {
  POPULAR: "popular",
  SEARCH: "search",
  RELATED: "related",
};
type VIDEO_TYPE = (typeof VIDEO_TYPE)[keyof typeof VIDEO_TYPE];

export interface VIDEO_KEYS {
  key: string;
  type: string;
  search: string;
  detailId: string;
  channelId: string;
}

export interface IVideosInfo {
  queryKey: string[];
  queryFn: () => Promise<any>;
}

export interface IVideo {
  etag: any;
  id: any;
  kind: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    localized: {
      description: string;
      title: string;
    };
    publishedAt: Date;
    tags: string[];
    thumbnails: {
      default: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
      maxres: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      standard: {
        url: string;
        width: number;
        height: number;
      };
    };
    title: string;
  };
}
