import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Box
        height="100vh"
        position="relative"
        fontSize="50px"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        Page Not Found
        <Box display="flex" mt="50px">
          <Link href="/">
            <Button variant="contained">Go Home</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
