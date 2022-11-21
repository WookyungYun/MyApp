import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appIdState, selectCountryState } from '../../state/Analyze';
import { httpApi } from 'src/api/http';
import Word from './Word';
import { Button, Card, Typography } from '@mui/material';

export default function AppReview() {
  const country = useRecoilValue(selectCountryState);
  const appId = useRecoilValue(appIdState);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(700);

  useEffect(() => {
    const getReview = async () => {
      try {
        const res = await httpApi.post('/job/appreview', {
          country,
          appId,
        });
        console.log('앱리뷰', res.data.result);
        setData(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getReview();
  }, [appId, country]);

  const handlePage = () => {
    setPage((prev) => prev + 500);
  };

  return (
    <>
      <Typography>리뷰</Typography>
      <Card sx={{ mb: 5 }}>
        <Box>
          워드클라우드 영역
          {/* <Word /> */}
        </Box>
        <Box>
          <Box width="100%" maxHeight={page} p="10px" overflow="hidden">
            {data.map((item) =>
              item.map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                  <Box m="10px 20px">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Box fontWeight="800">
                        {item.title} {item.score}
                      </Box>
                      <Box>{item.userName}</Box>
                    </Box>
                    <Box>{item.text}</Box>
                  </Box>
                </Card>
              ))
            )}
          </Box>
          {data[0].length >= 8 && (
            <Box display="flex" justifyContent="center">
              <Button variant="contained" onClick={handlePage} sx={{ m: 2 }}>
                더보기
              </Button>
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
}
