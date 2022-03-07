interface Default {
  url: string;
  width: number;
  height: number;
}

interface Medium {
  url: string;
  width: number;
  height: number;
}

interface High {
  url: string;
  width: number;
  height: number;
}

interface Standard {
  url: string;
  width: number;
  height: number;
}

interface Maxres {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
  standard?: Standard;
  maxres?: Maxres;
}

interface ResourceId {
  kind: string;
  videoId: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

interface ContentDetails {
  videoId: string;
  videoPublishedAt: string;
}

interface Status {
  privacyStatus: string;
}

export interface PlayListItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  status: Status;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface PlayList {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  items: PlayListItem[];
  pageInfo: PageInfo;
}
