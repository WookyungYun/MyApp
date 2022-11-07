import createCache from "@emotion/cache";

export const createEmotionCache = () => {
  return createCache({ key: "css" });
};

//이 파일은 앱이 css 스타일을 어떻게 적용해야 할지 빠르게 인식할 수 있도록 도와주는 역할을 한다.
