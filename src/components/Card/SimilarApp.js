import { Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import Carousel from 'nuka-carousel/lib/carousel';
import { useSelector } from 'react-redux';

export default function SimilarApp() {
  const similarApp = useSelector((state) => state.appInfo.similarApp);

  return (
    <>
      <Card>
        <>
          <CardContent sx={{ display: 'flex' }}>
            <Typography fontWeight="900">Similar App</Typography>
          </CardContent>

          <CardContent>
            <Carousel swiping slidesToShow="7" withoutControls>
              {similarApp.map((item) => (
                <Box
                  key={item.id}
                  height="250px"
                  position="relative"
                  marginTop="30px"
                >
                  <Image src={item.icon} alt="image" width={100} height={100} />
                  <Typography fontWeight="900"> {item.title}</Typography>
                </Box>
              ))}
            </Carousel>
          </CardContent>
        </>
      </Card>
    </>
  );
}
