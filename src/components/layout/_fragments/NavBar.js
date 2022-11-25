import { Box } from '@mui/material';
import Link from 'next/link';

export default function NavBar() {
  return (
    <>
      <Box display="flex" justifyContent="space-around" padding="10px">
        <Box>
          <Link href="/">Home</Link>
        </Box>
        <Box>appSearch</Box>
        <Box>keywordSearch</Box>
      </Box>
    </>
  );
}
