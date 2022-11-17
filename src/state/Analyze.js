import { atom } from "recoil";

export const analyze = atom({
  key: "analyzeRes",
  default: [],
});

export const loading = atom({
  key: "loadingState",
  default: false,
});

export const selectCountry = atom({
  key: "country",
  default: "kr",
});

export const appId = atom({
  key: "id",
  default: "",
});

export const similarInfo = atom({
  key: "similarInfo",
  default: [],
});

export const appReview = atom({
  key: "review",
  default: [],
});
