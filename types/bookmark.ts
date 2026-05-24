export type BookmarkId = string;
export type CollectionId = string;
export type TagId = string;

export type Bookmark = {
  id: BookmarkId;
  title: string;
  url: string;
  description?: string;
  collectionId?: CollectionId;
  tagIds: TagId[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Collection = {
  id: CollectionId;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type Tag = {
  id: TagId;
  name: string;
  color?: string;
};
