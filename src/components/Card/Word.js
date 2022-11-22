import { Box } from '@mui/material';
import React from 'react';
import WordCloud from 'react-d3-cloud';

export default function AppReview({ data }) {
  console.log(data);

  const filteredReview = data.map((item) => item.map((item) => item.text));
  const filteredWords = filteredReview.join('').split(' ');

  console.log('result', filteredWords);

  const filteredDuplicateWord = filteredWords
    .filter((ele, idx) => {
      return filteredWords.indexOf(ele) === idx;
    })
    .filter((item) => item.length > 1);

  console.log('중복값+한 글자수 제거', filteredWords);
  const words = filteredDuplicateWord.map((item) => ({
    text: item,
    value: 500,
  }));
  console.log('객체로', words);

  return <WordCloud data={words} />;
}
