import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { httpApi } from 'src/api/http';
import { useRecoilValue } from 'recoil';
import { selectCountryState, appIdState } from '../../state/Analyze';
import Image from 'next/image';
import Carousel from 'nuka-carousel/lib/carousel';
import { useMutation } from 'react-query';

export default function SimilarApp() {
  const country = useRecoilValue(selectCountryState);
  const appId = useRecoilValue(appIdState);
  const [info, setInfo] = useState([]);

  const getSimilarInfo = async () => {
    const res = await httpApi.post('/job/similarappinfo', {
      country,
      appId,
    });
    console.log('유사앱', res.data.result);
    setInfo(res.data.result);
  };

  const { mutate, onError, isLoading } = useMutation(getSimilarInfo, {
    onError: () => {
      console.log('error');
    },
  });

  useEffect(() => {
    if (country && appId) {
      mutate({ country, appId });
    }
  }, [mutate, country, appId]);

  console.log(onError, isLoading);
  return (
    <>
      <Card>
        <>
          <CardContent sx={{ display: 'flex' }}>
            <Typography fontWeight="900">Similar App</Typography>
          </CardContent>
          {isLoading ? (
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
                  </Box>
                ))}
              </Carousel>
            </CardContent>
          )}
          {onError && isLoading === false && (
            <CardContent>유사앱이 없습니다.</CardContent>
          )}
        </>
      </Card>
    </>
  );
}
