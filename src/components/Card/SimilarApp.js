import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { similarInfo } from "../../state/Analyze";
import Image from "next/image";
import Carousel from "nuka-carousel/lib/carousel";

export default function SimilarApp() {
  const info = useRecoilValue(similarInfo);

  return (
    <>
      {info.length !== 0 && (
        <Card>
          <>
            <CardContent sx={{ display: "flex" }}>
              <Typography fontWeight="900">Similar App</Typography>
            </CardContent>
            <CardContent>
              <Carousel swiping slidesToShow="7" withoutControls>
                {info.map((item) => (
                  <Box key={item.id} height="250px" position="relative">
                    <Image
                      src={item.icon}
                      alt="image"
                      width={100}
                      height={100}
                    />
                    <Typography fontWeight="900"> {item.title}</Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        position: "absolute",
                        bottom: "0px",
                      }}>
                      <Typography
                        fontSize="12px"
                        fontWeight="800"
                        color="primary">
                        비교하기
                      </Typography>
                    </Button>
                  </Box>
                ))}
              </Carousel>
            </CardContent>
          </>
        </Card>
      )}
    </>
  );
}
