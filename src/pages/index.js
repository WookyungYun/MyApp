import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { getId, setIsLogIn } from '../reduxSlice/appSlice';
import { useMemo, useEffect, useState } from 'react';
import { MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Layout from '../components/layout/Layout';
import { LoadingButton } from '@mui/lab';
import TabBar from '../components/Card/TabBar';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const [appName, setAppName] = useState('');
  const [country, setCountry] = useState('kr');
  const [store, setStore] = useState('apple');

  const dispatch = useDispatch();
  const isLogIn = useSelector(
    (state) => state.appInfo.isLogIn
    // state.isLogIn
  );

  const menuData = useMemo(() => {
    if (isLogIn === null) return [];
    if (isLogIn) return MENU_LOGIN_STATE;
    return MENU;
  }, [isLogIn]);

  useEffect(() => {
    if (localStorage.getItem('token')) dispatch(setIsLogIn(true));
  }, [dispatch]);

  //로그아웃
  const onClickLogout = () => {
    localStorage.removeItem('token');
    dispatch(setIsLogIn(false));
  };

  //app 이름 저장
  const handleValue = (e) => {
    setAppName(e.target.value);
    console.log('현재', country, store, isLogIn, appName);
  };

  const onClickGetId = () => {
    dispatch(getId({ store, appName, country }));
    console.log('클릭후', appName, store, country, appName);
    router.push({ pathname: '', query: { keyword: `${appName}` } });
  };

  return (
    <>
      <Layout>
        <Box display="flex" justifyContent="flex-end">
          {menuData.map(({ label, route }) => (
            <Link key={label} href={route}>
              {label === '로그아웃' ? (
                <Typography onClick={onClickLogout} mr="20px">
                  {label}
                </Typography>
              ) : (
                <Typography>{label}</Typography>
              )}
            </Link>
          ))}
        </Box>
        <Box sx={{ width: '800px', m: '0 auto' }}>
          <Box display="flex" marginTop="50px">
            <Select
              value={store}
              onChange={(e) => setStore(e.target.value)}
              sx={{ width: 95, mr: 3 }}
            >
              <MenuItem value="apple">Apple</MenuItem>
              <MenuItem value="google">Google</MenuItem>
            </Select>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              sx={{ width: 90 }}
            >
              <MenuItem value="kr">Korea</MenuItem>
              <MenuItem value="us">US</MenuItem>
            </Select>
            <TextField
              value={appName}
              fullWidth
              sx={{ ml: 3 }}
              onChange={handleValue}
              placeholder="분석하고 싶은 앱의 이름을 입력해주세요"
            ></TextField>
            <LoadingButton
              loading={false}
              type="submit"
              variant="contained"
              sx={{ width: 200, height: 55, ml: 3 }}
            >
              <Typography
                fontWeight="900"
                fontSize="16px"
                color="common.white"
                onClick={onClickGetId}
              >
                분석하기
              </Typography>
            </LoadingButton>
            {/* {isLoading === false && isLogIn && ( */}
            <LoadingButton
              loading={false}
              type="submit"
              variant="contained"
              sx={{ width: 200, height: 55, ml: 3, bgcolor: 'warning.main' }}
            >
              <Typography fontWeight="900" fontSize="15px" color="common.white">
                구독하기
              </Typography>
            </LoadingButton>
            {/* )} */}
          </Box>
        </Box>
        <Box width="630px" m="0 auto">
          <Box display="flex" justifyContent="center" mt="50px"></Box>
        </Box>
        {/* {isLoading === true && ( */}
        <Box maxWidth="800px" margin="auto" mt="60px">
          <Box display="flex" height="250px" mt="100px">
            <Box
              flexGrow="1"
              width="210px"
              mr="20px"
              borderRadius="20px"
              bgcolor="white"
            >
              유튜브 <br />
              관련 동영상 App 분석보기
            </Box>
            <Box
              flexGrow="1"
              width="210px"
              mr="20px"
              borderRadius="20px"
              bgcolor="white"
            >
              카카오톡
              <br />
              관련 동영상 App 분석보기
            </Box>
            <Box flexGrow="1" width="210px" borderRadius="20px" bgcolor="white">
              인스타그램 <br />
              관련 동영상 App 분석보기
            </Box>
          </Box>
        </Box>
        {/* )} */}

        {/* {analyzeResult.length !== 0 && isLogIn && isLoading === false && ( */}
        {/* <> */}
        <Box maxWidth="800px" margin="auto" marginTop="10px">
          <Box display="flex" justifyContent="center" marginBottom="30px">
            <Box borderRadius="30px" overflow="hidden">
              {/* <Image
                src={analyzeResult.result.icon}
                alt="image"
                width={150}
                height={150}
              /> */}
            </Box>
          </Box>{' '}
          <TabBar />
        </Box>
        {/* </> */}
        {/* )} */}
      </Layout>
    </>
  );
}

const MENU_LOGIN_STATE = [
  {
    label: '로그아웃',
    route: '/',
  },
  {
    label: '마이페이지',
    route: '/mypage',
  },
];

const MENU = [
  {
    label: '로그인',
    route: '/login',
  },
  {
    label: '회원가입',
    route: '/register',
  },
];
