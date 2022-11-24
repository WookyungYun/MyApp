import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const onClickWeb = () => {
    alert('준비중입니다.');
  };
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
