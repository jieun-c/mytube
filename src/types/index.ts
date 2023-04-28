export const VIDEO_TYPE = {
  POPULAR: "popular",
  SEARCH: "search",
  RELATED: "related",
};
type VIDEO_TYPE = (typeof VIDEO_TYPE)[keyof typeof VIDEO_TYPE];

export type VIDEO_KEYS = [
  string,
  { type: VIDEO_TYPE },
  { search: string | undefined },
  { detailId: string | undefined }
];

export interface IVideosInfo {
  queryKey: VIDEO_KEYS;
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
