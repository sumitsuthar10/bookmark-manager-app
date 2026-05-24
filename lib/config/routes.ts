export const routes = {
  home: "/",
  dashboard: "/dashboard",
  bookmarks: "/dashboard/bookmarks",
  collections: "/dashboard/collections",
  tags: "/dashboard/tags",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
