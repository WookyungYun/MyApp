import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { similarInfo } from "../../state/Analyze";
import Image from "next/image";

export default function SimilarApp() {
  const info = useRecoilValue(similarInfo);

  return (
    <>
      {info.length !== 0 && (
        <Card>
          <CardContent sx={{ display: "flex" }}>Similar App</CardContent>
          <Box display="flex" width="300px">
            {info.map((item) => (
              <Box key={item.id} margin="20px 15px">
                <Image src={item.icon} alt="image" width={100} height={100} />
                <Typography fontWeight="900"> {item.title}</Typography>
              </Box>
            ))}
          </Box>
        </Card>
      )}
    </>
  );
}
