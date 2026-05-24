"use client";

import { useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { DashboardSidebar, drawerWidth } from "./DashboardSidebar";
import { DashboardTopNav } from "./DashboardTopNav";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <DashboardTopNav onMenuClick={() => setIsMobileOpen(true)} />
      <DashboardSidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minWidth: 0,
          px: { xs: 2, sm: 3, lg: 4 },
          pb: { xs: 3, lg: 4 },
        }}
      >
        <Toolbar sx={{ minHeight: 72 }} />
        {children}
      </Box>
    </Box>
  );
}
