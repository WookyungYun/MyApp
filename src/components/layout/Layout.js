import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box height="100vh">
      <Box maxWidth="440px" margin="auto">
        {children}
      </Box>
    </Box>
  );
}
