import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpApi } from 'src/api/http';
import {
  getPostReview,
  getPostSimilarApp,
  getWordCloud,
} from 'src/api/appsearch';

export const appSlice = createSlice({
  name: 'appInfo',
  initialState: {
    isLogIn: false,
    isLoading: true,
    analyzeState: [],
    info: [],
    review: [],
    similarApp: [],
    word: [],
    reviewPage: 0,
    selectStore: 'apple',
    selectCountry: 'kr',
    requestStatus: '',
  },
  reducers: {
    setReviewPage: (state) => {
      state.reviewPage += 100;
    },

    clear: (state) => {
      (state.appId = ''), (state.analyzeState = []);
    },
    setIsLogIn: (state, action) => {
      state.isLogIn = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setReview: (state, action) => {
      state.review = action.payload;
    },
    setSimilarApp: (state, action) => {
      state.similarApp = action.payload;
    },
    setWord: (state, action) => {
      state.word = action.payload;
    },
    filteredTag: (state, action) => {
      state.word = state.word.filter((ele) => ele.text !== action.payload);
    },
  },
});

export const getId = createAsyncThunk(
  'app/getId',
  async (payload, thunkAPI) => {
    console.log('시작');
    const apiUrl =
      payload.store === 'apple' ? '/job/appsearch' : '/job/gpappsearch';
    const res = await httpApi.get(apiUrl, {
      params: {
        name: payload.appName,
      },
    });
    if (res.status === 200) {
      const postUrl =
        payload.store === 'apple' ? '/job/appinfo' : 'job/gplayappinfo';
      const postInfo = await httpApi.post(postUrl, {
        country: payload.country,
        appId: res.data.result[0],
      });
      thunkAPI.dispatch(setInfo(postInfo.data.result));
      if (postInfo.data.statusCode === 201) {
        const reviews = await getPostReview(
          payload.store,
          payload.country,
          res.data.result[0]
        );
        thunkAPI.dispatch(setReview(reviews.data.result));

        const similarAppInfo = await getPostSimilarApp(
          payload.store,
          payload.country,
          res.data.result[0]
        );
        thunkAPI.dispatch(setSimilarApp(similarAppInfo.data.result));

        const wordCloudObj = await getWordCloud(
          payload.country,
          res.data.result[0]
        );
        thunkAPI.dispatch(setWord(wordCloudObj));
      }
    } else {
      console.log('불러오기 실패');
    }
  }
);

export default appSlice.reducer;
export const {
  clear,
  setIsLogIn,
  setInfo,
  setReview,
  setReviewPage,
  setSimilarApp,
  setWord,
  filteredTag,
} = appSlice.actions;
