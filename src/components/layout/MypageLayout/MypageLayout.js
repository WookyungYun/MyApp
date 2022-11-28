import { Box } from '@mui/material';
import NavBar from '../_fragments/NavBar';

export default function MypageLayout({ children }) {
  return (
    <Box height="100vh">
      <NavBar />
      <Box margin="auto">{children}</Box>
    </Box>
  );
}
