import { atom } from "recoil";

export const analyze = atom({
  key: "analyzeRes",
  default: [],
});

export const loading = atom({
  key: "loadingState",
  default: false,
});
