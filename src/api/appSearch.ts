import { httpApi } from './http';

export const getPostReview = async (
  store: string,
  country: string,
  appId: string
) => {
  const url = store === 'apple' ? '/job/appreview' : '/job/gplayappreview';
  return await httpApi.post(url, {
    country,
    appId,
  });
};

export const getPostSimilarApp = async (
  store: string,
  country: string,
  appId: string
) => {
  const url =
    store === 'apple' ? '/job/similarappinfo' : '/job/gplaysimilarapp';
  return await httpApi.post(url, {
    country,
    appId,
  });
};

export const getWordCloud = async (country: string, appId: string) => {
  const words = await httpApi.get('/job/wordcloud', {
    params: {
      country,
      appId,
    },
  });
  const resultArray = Object.entries(words.data.result);
  const wordObj = resultArray
    .slice(1, 100)
    .map((item: any) => ({ text: item[0], value: item[1] * 100 }));
  return wordObj;
};
