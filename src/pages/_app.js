import { Router } from 'next/router';
import NProgress from 'nprogress';
import '../styles/nprogress.css';
import {
  SettingsConsumer,
  SettingsProvider,
} from 'src/context/settingsContext';
import ThemeComponent from '../styles/theme/ThemeComponent';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

Router.events.on('routeChangeStart', () => {
  //경로가 변경되기 시작할때 발생
  console.log('시작');
  NProgress.start();
});
Router.events.on('routeChangeError', () => {
  //경로 변경시 오류가 발생하거나 경로 전환 취소시 발생 (err.cancelled - 탐색이 취소되었는지 여부)
  NProgress.done();
});
Router.events.on('routeChangeComplete', () => {
  //경로가 완전히 변경되면 발생
  console.log('완료');
  NProgress.done();
});

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <RecoilRoot>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Component {...pageProps} />
                  </ThemeComponent>
                );
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </RecoilRoot>
      </CacheProvider>
    </QueryClientProvider>
  );
}
