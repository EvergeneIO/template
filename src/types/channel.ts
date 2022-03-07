interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

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

interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
}

interface Localized {
  title: string;
  description: string;
}

interface Snippet {
  title: string;
  description: string;
  publishedAt: Date;
  thumbnails: Thumbnails;
  localized: Localized;
  country: string;
}

interface RelatedPlaylists {
  likes: string;
  uploads: string;
}

interface ContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

interface Statistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

export interface ChannelItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
  brandingSettings: BrandingSettings;
}

export interface Channel {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: ChannelItem[];
}

interface ChannelBranding {
  title: string;
  keywords?: string;
  country?: string;
}

interface Image {
  bannerExternalUrl?: string;
}

interface BrandingSettings {
  channel: ChannelBranding;
  image?: Image;
}
