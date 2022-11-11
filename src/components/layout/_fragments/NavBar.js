import { Box, Button, Typography } from "@mui/material";

export default function NavBar() {
  const onClickWeb = () => {
    alert("준비중입니다.");
  };
  return (
    <Box display="flex" width="100%" padding="10px">
      <Button
        sx={{ width: "50%", height: 50 }}
        variant="contained"
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Typography fontSize="30px" fontWeight="900" color="white">
          APP
        </Typography>
      </Button>
      <Button
        sx={{ width: "50%", height: 50 }}
        variant="contained"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={onClickWeb}>
        <Typography fontSize="30px" fontWeight="900" color="white">
          WEB
        </Typography>
      </Button>
    </Box>
  );
}
