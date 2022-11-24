import { Box, Button, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import WordCloud from 'react-d3-cloud';
import { useRecoilValue } from 'recoil';
import { httpApi } from 'src/api/http';
import { appIdState, selectCountryState } from '../../state/Analyze';

export default function Word() {
  const country = useRecoilValue(selectCountryState);
  const appId = useRecoilValue(appIdState);
  const [word, setWord] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const getWord = async () => {
      const res = await httpApi.get('/job/wordcloud', {
        params: {
          country,
          appId,
        },
      });
      console.log('워드클라우드', res.data.result);
      const result = res.data.result;
      const resultArray = Object.entries(result);
      const wordObj = resultArray
        .slice(idx, idx + 200)
        .map((item) => ({ text: item[0], value: item[1] * 100 }));
      setWord(wordObj);
    };
    getWord();
  }, [country, appId, idx]);

  const handleDelete = (text) => {
    const filteredTag = word.filter((ele) => ele.text !== text);
    setWord(filteredTag);
  };
  return (
    <>
      <WordCloud data={word} />
      <Button
        variant="contained"
        onClick={() => {
          setIdx((prev) => prev + 200);
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
