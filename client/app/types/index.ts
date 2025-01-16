export interface MediaItem {
  id: string;
  url: string;
  type: string;
}

// Make sure there's a proper module export
export type * from './index';
