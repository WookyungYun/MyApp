import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { result } from 'lodash';
import { httpApi } from 'src/api/http';

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
    filteredWord: [],
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
        const url =
          payload.store === 'apple' ? '/job/appreview' : '/job/gplayappreview';
        const postReveiw = await httpApi.post(url, {
          country: payload.country,
          appId: res.data.result[0],
        });
        thunkAPI.dispatch(setReview(postReveiw.data.result));
        const postSimilarApp = await httpApi.post('/job/similarappinfo', {
          country: payload.country,
          appId: res.data.result[0],
        });
        thunkAPI.dispatch(setSimilarApp(postSimilarApp.data.result));
        const word = await httpApi.get('/job/wordcloud', {
          params: {
            country: payload.country,
            appId: res.data.result[0],
          },
        });
        const resultArray = Object.entries(word.data.result);
        const wordObj = resultArray
          .slice(1, 100)
          .map((item) => ({ text: item[0], value: item[1] * 100 }));
        thunkAPI.dispatch(setWord(wordObj));
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
