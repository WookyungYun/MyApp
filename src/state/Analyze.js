import { atom } from 'recoil';

export const analyzeState = atom({
  key: 'analyzeRes',
  default: [],
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});

export const selectCountryState = atom({
  key: 'country',
  default: 'kr',
});

export const appReviewState = atom({
  key: 'review',
  default: [],
});

export const appIdState = atom({
  key: 'appId',
  default: '',
});
