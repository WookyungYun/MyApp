import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appIdState, selectCountryState } from '../../state/Analyze';
import { httpApi } from 'src/api/http';
import Word from './Word';
import { Button, Card, FormControl, MenuItem, Select } from '@mui/material';

export default function AppReview() {
  const country = useRecoilValue(selectCountryState);
  const appId = useRecoilValue(appIdState);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(700);
  const [order, setOrder] = useState('최신순');

  useEffect(() => {
    setPage(700);
    const getReview = async () => {
      try {
        const res = await httpApi.post('/job/appreview', {
          country,
          appId,
        });
        console.log('앱리뷰', res.data.result);
        const _ = require('lodash');
        const result = _.flatten(res.data.result);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };
    getReview();
  }, [appId, country]);

  const handlePage = () => {
    if (data.length === 0) {
      alert('작성된 리뷰가 존재하지 않습니다.');
      setPage(0);
    } else {
      setPage((prev) => prev + 500);
    }
  };

  const handleClick = () => {
    setPage(0);
  };

  const handleChange = (e) => {
    setOrder(e.target.value);
  };

  const handleDate = () => {
    const sortedRating = data.sort((a, b) => b.score - a.score);
    setData(sortedRating);
  };

  return (
    <>
      <Card sx={{ mb: 5 }}>
        {/* <Box>
          워드클라우드 영역
          <Word data={data} />
        </Box> */}
        {/* <Box>워드클라우드 필터 영역</Box> */}

        <Box>
          <Box width="100%" maxHeight={page} p="10px" overflow="hidden">
            <Box display="flex" justifyContent="flex-end">
              <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
                <Select value={order} onChange={handleChange}>
                  <MenuItem onClick={handleDate} value="평점순">
                    평점순
                  </MenuItem>
                  <MenuItem value="최신순">최신순</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {data.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <Box m="10px 20px">
                  <Box display="flex" justifyContent="space-between" mb="10px">
                    <Box fontWeight="800">
                      {item.title} {item.score}
                    </Box>
                    <Box>{item.userName}</Box>
                  </Box>
                  <Box>{item.text}</Box>
                </Box>
              </Card>
            ))}
          </Box>
          <Box display="flex" justifyContent="center">
            <Button variant="outlined" onClick={handlePage} sx={{ m: 2 }}>
              더보기
            </Button>
            <Button variant="outlined" onClick={handleClick} sx={{ m: 2 }}>
              리뷰 접기
            </Button>{' '}
          </Box>
        </Box>
      </Card>
    </>
  );
}
