"use client";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { signOut, useSession } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useColorMode } from "@/lib/providers/AppThemeProvider";
import { drawerWidth } from "./DashboardSidebar";

type DashboardTopNavProps = {
  onMenuClick: () => void;
};

export function DashboardTopNav({ onMenuClick }: DashboardTopNavProps) {
  const { mode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();
  const isDark = mode === "dark";
  const userName = session?.user?.name ?? "Bookmark Manager";
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ minHeight: 72, gap: 2 }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { md: "none" } }}
          aria-label="open navigation"
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
            Dashboard
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Manage every saved resource from one focused workspace.
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <TextField
          size="small"
          placeholder="Search bookmarks"
          aria-label="Search bookmarks"
          sx={{
            display: { xs: "none", lg: "block" },
            width: 320,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: "background.default",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            <IconButton color="inherit" onClick={toggleColorMode}>
              {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <NotificationsNoneOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sign out">
            <IconButton color="inherit" onClick={() => signOut({ callbackUrl: "/login" })}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            {initials || "BM"}
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
