import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  appIdState,
  selectCountryState,
  selectStoreState,
} from '../../state/Analyze';
import { httpApi } from 'src/api/http';
import { Card, Pagination } from '@mui/material';
import { useMutation } from 'react-query';

export default function AppReview() {
  const store = useRecoilValue(selectStoreState);
  const country = useRecoilValue(selectCountryState);
  const appId = useRecoilValue(appIdState);
  const [reviewData, setReveiwData] = useState([]);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(5);

  console.log(appId);

  const getReview = async () => {
    if (store === 'apple') {
      const res = await httpApi.post('/job/appreview', {
        country,
        appId,
      });
      setReveiwData(res.data.result);
    } else if (store === 'google') {
      const res = await httpApi.post('/job/gplayappreview', {
        country,
        appId,
      });
      setReveiwData(res.data.result);
    }
  };

  const { mutate, data } = useMutation(getReview, {
    onSuccess: () => {
      console.log('data', data);
      console.log(reviewData);
    },
    onError: () => {
      console.log('error');
    },
  });

  useEffect(() => {
    if (country && appId) {
      mutate({ country, appId });
    }
  }, [mutate, appId, country]);

  const handlePageChange = (e, page) => {
    setPage(page);
  };

  //평점순으로 정렬
  // const handleDate = () => {
  //   const sortedRating = data.sort((a, b) => b.score - a.score);
  //   setData(sortedRating);
  // };

  return (
    <>
      <Card sx={{ mb: 5 }}>
        <Box>
          <Box width="100%" p="10px" overflow="hidden">
            <Box display="flex" justifyContent="flex-end"></Box>

            {reviewData
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                  <Box m="10px 20px">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Box fontWeight="800" display="flex" sx={{ mr: 2 }}>
                        {item.title}
                        {item.score === 1 && <Box>⭐</Box>}
                        {item.score === 2 && <Box>⭐⭐</Box>}
                        {item.score === 3 && <Box>⭐⭐⭐</Box>}
                        {item.score === 4 && <Box>⭐⭐⭐⭐</Box>}
                        {item.score === 5 && <Box>⭐⭐⭐⭐⭐</Box>}{' '}
                      </Box>
                      <Box></Box>
                    </Box>
                    <Box sx={{ mb: '10px' }}>{item.text}</Box>
                    <Box sx={{ fontSize: '13px', color: 'gray.500' }}>
                      by {item.userName}
                    </Box>
                  </Box>
                </Card>
              ))}
            <Box sx={{ display: 'flex', justifyContent: ' center' }}>
              {reviewData.length > 5 ? (
                <Pagination
                  count={Math.ceil(reviewData.length / item)}
                  page={page}
                  onChange={handlePageChange}
                ></Pagination>
              ) : (
                <Box>1</Box>
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}
