import { Box, Button, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import WordCloud from 'react-d3-cloud';
import { useDispatch, useSelector } from 'react-redux';
import { filteredTag, setReviewPage, setWord } from '../../reduxSlice/appSlice';

export default function Word() {
  const word = useSelector((state) => state.appInfo.word);
  const [idx, setIdx] = useState(0);
  const dispatch = useDispatch();

  const handleDelete = (text) => {
    dispatch(filteredTag(text));
  };
  return (
    <>
      {/* {isLoading === true ? '로딩중입니다' : <WordCloud data={word} />} */}

      <Button
        variant="contained"
        onClick={() => {
          // dispatch(setReviewPage(100));
          // setIdx((prev) => prev + 100);
        }}
        sx={{ mb: 5 }}
      >
        키워드 더보기
      </Button>
      <Box maxHeight="200px" overflow={word.length > 20 ? 'scroll' : 'none'}>
        {word.map((item, idx) => (
          <Chip
            key={idx}
            name={item.text}
            label={item.text}
            variant="outlined"
            color="primary"
            sx={{ mr: '3px', mb: '2px' }}
            onDelete={() => handleDelete(item.text)}
          ></Chip>
        ))}
      </Box>
    </>
  );
}
