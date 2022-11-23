import {
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { httpApi } from 'src/api/http';
import { useRecoilValue } from 'recoil';
import { selectCountryState, appIdState } from '../../state/Analyze';
import Image from 'next/image';
import Carousel from 'nuka-carousel/lib/carousel';

export default function SimilarApp() {
  const country = useRecoilValue(selectCountryState);
  const appId = useRecoilValue(appIdState);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    setInfo([]);
    const getSimilarInfo = async () => {
      try {
        const res = await httpApi.post('/job/similarappinfo', {
          country,
          appId,
        });
        console.log('유사앱', res.data.result);
        setInfo(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getSimilarInfo();
  }, [appId, country]);

  return (
    <>
      <Card>
        <>
          <CardContent sx={{ display: 'flex' }}>
            <Typography fontWeight="900">Similar App</Typography>
          </CardContent>
          {info.length === 0 ? (
            <CardContent sx={{ display: 'flex' }}>
              <Skeleton variant="rectangular" width={700} height={100} />
            </CardContent>
          ) : (
            <CardContent>
              <Carousel swiping slidesToShow="7" withoutControls>
                {info.map((item) => (
                  <Box
                    key={item.id}
                    height="250px"
                    position="relative"
                    marginTop="30px"
                  >
                    <Image
                      src={item.icon}
                      alt="image"
                      width={100}
                      height={100}
                    />
                    <Typography fontWeight="900"> {item.title}</Typography>
                    {/* <Button
                      variant="outlined"
                      sx={{
                        position: 'absolute',
                        bottom: '0px',
                      }}
                    >
                      <Typography
                        fontSize="12px"
                        fontWeight="800"
                        color="primary"
                      >
                        비교하기
                      </Typography>
                    </Button> */}
                  </Box>
                ))}
              </Carousel>
            </CardContent>
          )}
        </>
      </Card>
    </>
  );
}
