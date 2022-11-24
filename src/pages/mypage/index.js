import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Mypage from '../../components/MyPage';

export default function MyPage() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      router.push('/login');
    }
  }, []);
  //loadevent , 페이지 수정, 로그인 토큰없을때 처리 다시하기
  return (
    <>
      <Mypage />
    </>
  );
}
