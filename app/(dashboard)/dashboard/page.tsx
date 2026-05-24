import AddLinkIcon from "@mui/icons-material/AddLink";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const stats = [
  {
    label: "Bookmarks",
    value: "1,248",
    change: "+12%",
    icon: BookmarkBorderIcon,
  },
  {
    label: "Collections",
    value: "32",
    change: "+4",
    icon: FolderOutlinedIcon,
  },
  {
    label: "Tags",
    value: "86",
    change: "+9",
    icon: LocalOfferOutlinedIcon,
  },
];

const recentBookmarks = [
  {
    title: "Design systems checklist",
    url: "designsystem.guide",
    collection: "Product",
  },
  {
    title: "Next.js App Router patterns",
    url: "nextjs.org",
    collection: "Engineering",
  },
  {
    title: "Research notes on knowledge graphs",
    url: "papers.example",
    collection: "Research",
  },
];

export default function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Bookmark workspace
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Track saved links, organize collections, and keep useful resources close.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddLinkIcon />} size="large">
          Add bookmark
        </Button>
      </Box>

      <Grid container spacing={2.5}>
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Grid key={stat.label} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                      }}
                    >
                      <Icon />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Chip
                      icon={<TrendingUpIcon />}
                      label={stat.change}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h6">Recent bookmarks</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Latest resources added to your library.
                  </Typography>
                </Box>
                <IconButton aria-label="Bookmark actions">
                  <MoreHorizIcon />
                </IconButton>
              </Stack>
              <Stack spacing={1.5}>
                {recentBookmarks.map((bookmark) => (
                  <Box
                    key={bookmark.title}
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      p: 1.5,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 700 }}>
                        {bookmark.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {bookmark.url}
                      </Typography>
                    </Box>
                    <Chip label={bookmark.collection} size="small" />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Organization score</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Your library is 74% categorized.
              </Typography>
              <LinearProgress
                variant="determinate"
                value={74}
                sx={{ mt: 3, mb: 2, height: 8, borderRadius: 999 }}
              />
              <Stack spacing={1.25}>
                <Typography variant="body2">18 links need tags</Typography>
                <Typography variant="body2">7 links need collections</Typography>
                <Typography variant="body2">4 duplicate URLs detected</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
