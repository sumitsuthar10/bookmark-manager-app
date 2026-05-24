import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import { routes } from "@/lib/config/routes";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: SvgIconComponent;
};

export const dashboardNavigation: DashboardNavItem[] = [
  {
    label: "Overview",
    href: routes.dashboard,
    icon: DashboardOutlinedIcon,
  },
  {
    label: "Bookmarks",
    href: routes.bookmarks,
    icon: BookmarkBorderIcon,
  },
  {
    label: "Collections",
    href: routes.collections,
    icon: FolderOutlinedIcon,
  },
  {
    label: "Tags",
    href: routes.tags,
    icon: LocalOfferOutlinedIcon,
  },
];
