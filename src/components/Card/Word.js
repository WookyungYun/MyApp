import { tabPanelClasses } from '@mui/lab';
import { Box, Button, Chip } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import WordCloud from 'react-d3-cloud';
import { useRecoilValue } from 'recoil';
import { httpApi } from 'src/api/http';
import { appIdState, selectCountryState } from '../../state/Analyze';

export default function Word() {
  const country = useRecoilValue(selectCountryState);
  const appId = useRecoilValue(appIdState);
  const [word, setWord] = useState([]);
  const [tag, setTag] = useState([]);

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
      const a = Object.entries(result);
      const b = a
        .slice(0, 200)
        .map((item) => ({ text: item[0], value: item[1] * 100 }));
      setWord(b);
      setTag(b);
      console.log('tag', tag);
    };
    getWord();
  }, [country, appId]);

  const handleDelete = (text) => {
    const filteredTag = tag.filter((ele) => ele.text !== text);
    setWord(filteredTag);
    setTag(filteredTag);
  };
  return (
    <>
      <WordCloud data={word} />
      <Box maxHeight="200px" overflow="scroll">
        {tag.map((item, idx) => (
          // <Button key={idx}>
          //   {item.text}
          //   <Button onDelete={() => console.log(!23)}>x</Button>
          // </Button>

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
