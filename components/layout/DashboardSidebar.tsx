"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { dashboardNavigation } from "./dashboard-navigation";

export const drawerWidth = 280;

type DashboardSidebarProps = {
  isMobileOpen: boolean;
  onMobileClose: () => void;
};

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ minHeight: 72 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
            Bookmark Manager
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Curate, tag, and revisit
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1.5, py: 2 }}>
        {dashboardNavigation.map((item) => {
          const Icon = item.icon;
          const selected = pathname === item.href;

          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              onClick={onNavigate}
              selected={selected}
              sx={{
                minHeight: 48,
                borderRadius: 2,
                mb: 0.5,
                color: selected ? "primary.main" : "text.secondary",
                "&.Mui-selected": {
                  bgcolor:
                    theme.palette.mode === "light"
                      ? "primary.50"
                      : "rgba(37, 99, 235, 0.16)",
                },
                "&.Mui-selected:hover": {
                  bgcolor:
                    theme.palette.mode === "light"
                      ? "primary.50"
                      : "rgba(37, 99, 235, 0.22)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontWeight: selected ? 700 : 600,
                      fontSize: 14,
                    },
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            p: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Pro workspace
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Keep research organized across projects.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export function DashboardSidebar({
  isMobileOpen,
  onMobileClose,
}: DashboardSidebarProps) {
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="dashboard navigation"
    >
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <SidebarContent onNavigate={onMobileClose} />
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRightStyle: "solid",
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
}
