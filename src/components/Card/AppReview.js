import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  appIdState,
  selectCountryState,
  selectStoreState,
} from '../../state/Analyze';
import { httpApi } from 'src/api/http';
import {
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  Pagination,
} from '@mui/material';
import Word from './Word';

export default function AppReview() {
  const store = useRecoilValue(selectStoreState);
  const country = useRecoilValue(selectCountryState);
  const appId = useRecoilValue(appIdState);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(5);
  // const [order, setOrder] = useState('최신순');

  useEffect(() => {
    const getReview = async () => {
      try {
        if (store === 'apple') {
          const res = await httpApi.post('/job/appreview', {
            country,
            appId,
          });
          console.log('앱리뷰', res.data.result);
          const _ = require('lodash');
          const result = _.flatten(res.data.result);
          setData(result);
        }
        if (store === 'google') {
          const res = await httpApi.post('/job/gplayappreview', {
            country,
            appId,
          });
          console.log('앱리뷰', res.data.result);
          const _ = require('lodash');
          const result = _.flatten(res.data.result);
          setData(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getReview();
  }, [appId, country, store]);

  //최신순? 평점순? 옵션 선택
  const handleChange = (e) => {
    setOrder(e.target.value);
  };

  const handleItem = (e) => {
    setItem(e.target.value);
  };
  const handlePageChange = (e, page) => {
    setPage(page);
  };

  console.log(page);
  //평점순으로 정렬
  const handleDate = () => {
    const sortedRating = data.sort((a, b) => b.score - a.score);
    setData(sortedRating);
  };

  return (
    <>
      {/* <Word /> */}
      <Card sx={{ mb: 5 }}>
        <Box>
          <Box width="100%" p="10px" overflow="hidden">
            <Box display="flex" justifyContent="flex-end"></Box>

            {data
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((item) => (
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
              ))}
            <Box sx={{ display: 'flex', justifyContent: ' center' }}>
              <Pagination
                count={data.length / item}
                page={page}
                onChange={handlePageChange}
              ></Pagination>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}
